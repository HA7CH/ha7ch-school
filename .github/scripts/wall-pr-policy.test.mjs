import test from "node:test";
import assert from "node:assert/strict";

import {
  appendEntry,
  isAdmissionIssue,
  parseClosingIssueNumbers,
  validateWallChange,
} from "./wall-pr-policy.mjs";

const baseContent = "# Wall\n\n- 2026-08-01 · @HA7CH · 开墙\n";
const validLine = "- 2026-08-25 · @student-one · 从真实问题开始学习 FDE";
const pr = {
  state: "open",
  draft: false,
  user: { login: "student-one" },
};
const files = [
  {
    filename: "WALL.md",
    status: "modified",
    additions: 1,
    deletions: 0,
    changes: 1,
    patch: `@@ -3,1 +3,2 @@\n - 2026-08-01 · @HA7CH · 开墙\n+${validLine}`,
  },
];

test("accepts one authored line appended to WALL.md", () => {
  const result = validateWallChange({
    pr,
    files,
    headContent: `${baseContent}${validLine}\n`,
  });
  assert.equal(result.ok, true);
  assert.equal(result.line, validLine);
});

test("rejects changes outside WALL.md", () => {
  const result = validateWallChange({
    pr,
    files: [{ ...files[0], filename: "README.md" }],
    headContent: `${baseContent}${validLine}\n`,
  });
  assert.equal(result.ok, false);
  assert.match(result.errors.join(" "), /只能修改 WALL\.md/);
});

test("rejects edits mixed with the appended line", () => {
  const result = validateWallChange({
    pr,
    files: [{ ...files[0], deletions: 1, changes: 2 }],
    headContent: `${baseContent}${validLine}\n`,
  });
  assert.equal(result.ok, false);
  assert.match(result.errors.join(" "), /不能删除或改写旧内容/);
});

test("rejects a wall handle that differs from the PR author", () => {
  const otherLine = "- 2026-08-25 · @someone-else · 代别人上墙";
  const result = validateWallChange({
    pr,
    files: [{ ...files[0], patch: `@@ -3,1 +3,2 @@\n+${otherLine}` }],
    headContent: `${baseContent}${otherLine}\n`,
  });
  assert.equal(result.ok, false);
  assert.match(result.errors.join(" "), /必须与 PR 作者/);
});

// 学生点了 GitHub 的「Update branch」把主干合回来之后，PR 版本的 WALL.md 里
// 会多出后来上墙的同学，patch 也随之带上多行上下文；此时仍应只认出自己那一行新增。
test("accepts a branch updated from master, with several context lines in the patch", () => {
  const newerOne = "- 2026-08-20 · @student-two · 先到了一步";
  const newerTwo = "- 2026-08-22 · @student-three · 也在学 FDE";
  const result = validateWallChange({
    pr,
    files: [
      {
        ...files[0],
        patch:
          `@@ -3,3 +3,4 @@\n - 2026-08-01 · @HA7CH · 开墙\n ${newerOne}\n ${newerTwo}\n+${validLine}`,
      },
    ],
    headContent: `${baseContent}${newerOne}\n${newerTwo}\n${validLine}\n`,
  });
  assert.equal(result.ok, true);
  assert.equal(result.line, validLine);
});

test("rejects one added line when it was inserted before the file end", () => {
  const result = validateWallChange({
    pr,
    files,
    headContent: `# Wall\n\n${validLine}\n- 2026-08-01 · @HA7CH · 开墙\n`,
  });
  assert.equal(result.ok, false);
  assert.match(result.errors.join(" "), /文件末尾/);
});

test("extracts and deduplicates explicit closing references", () => {
  assert.deepEqual(parseClosingIssueNumbers("Closes #58\nfixes #58\nResolved #60"), [58, 60]);
});

test("only infers admission issues owned by the PR author", () => {
  const issue = {
    state: "open",
    title: "[入学打卡] student-one",
    body: "从哪来：杭州\n想学什么：FDE",
    user: { login: "student-one" },
  };
  assert.equal(isAdmissionIssue(issue, "student-one"), true);
  assert.equal(isAdmissionIssue(issue, "someone-else"), false);
});

test("an explicit issue link still requires the same author", () => {
  const issue = {
    state: "open",
    title: "职业迷茫期",
    body: "希望从零开始学习 AI",
    user: { login: "student-one" },
  };
  assert.equal(isAdmissionIssue(issue, "student-one", { explicit: true }), true);
  assert.equal(isAdmissionIssue(issue, "someone-else", { explicit: true }), false);
});

test("appendEntry is idempotent", () => {
  const first = appendEntry(baseContent, validLine);
  assert.equal(first.added, true);
  const second = appendEntry(first.content, validLine);
  assert.equal(second.added, false);
  assert.equal(second.content, first.content);
});

// 以下钉住拒绝分支。机器人跑在 pull_request_target + contents: write 下，
// 「什么时候不自动处理」就是它的安全边界；这些分支此前一条都没有测试守着，
// 改坏任何一条都不会让测试变红，但会让机器人替外部 PR 动主干。
function wallChange({ prPatch = {}, filePatch = {}, line = validLine, headTail = "\n" } = {}) {
  return {
    pr: { ...pr, ...prPatch },
    files: [{ ...files[0], patch: `@@ -3,1 +3,2 @@\n+${line}`, ...filePatch }],
    headContent: `${baseContent}${line}${headTail}`,
  };
}

function rejects(name, input, expected) {
  test(name, () => {
    const result = validateWallChange(input);
    assert.equal(result.ok, false);
    assert.match(result.errors.join(" "), expected);
  });
}

rejects("rejects a draft PR", wallChange({ prPatch: { draft: true } }), /Draft PR 不自动处理/);

rejects(
  "rejects a PR that is no longer open",
  wallChange({ prPatch: { state: "closed" } }),
  /PR 不是 open 状态/,
);

rejects(
  "rejects a PR that touches a second file besides WALL.md",
  {
    ...wallChange(),
    files: [
      { ...files[0], patch: `@@ -3,1 +3,2 @@\n+${validLine}` },
      { filename: "README.md", status: "modified", additions: 1, deletions: 0, changes: 1, patch: "@@ -1,1 +1,2 @@\n+x" },
    ],
  },
  /必须且只能修改一个文件/,
);

rejects(
  "rejects WALL.md arriving as anything other than a modification",
  wallChange({ filePatch: { status: "added" } }),
  /必须是追加修改/,
);

// GitHub 在 diff 过大时会整个省掉 patch 字段。WALL.md 只会越来越长，
// 这条保证那时机器人是停下来交给人工，而不是在无法确认新增行的情况下继续。
rejects(
  "rejects a file object whose patch GitHub omitted",
  wallChange({ filePatch: { patch: undefined } }),
  /patch 必须能确认恰好新增一行/,
);

rejects(
  "rejects a head WALL.md without a trailing newline",
  wallChange({ headTail: "" }),
  /末尾缺少换行/,
);

rejects(
  "rejects a line that does not match the wall format",
  wallChange({ line: "* 2026-08-25 @student-one 少了分隔符" }),
  /不符合 `- YYYY-MM-DD · @GitHub用户名 · 一句话` 格式/,
);

// 2026-02-30 能被 Date 解析成 3 月 2 日，只有回写比对才认得出来。
rejects(
  "rejects a date that does not exist on the calendar",
  wallChange({ line: "- 2026-02-30 · @student-one · 不存在的日期" }),
  /日期不是有效的 YYYY-MM-DD/,
);

rejects(
  "rejects invisible control characters in the message",
  wallChange({ line: "- 2026-08-25 · @student-one · 前\u0007后" }),
  /不可见控制字符/,
);

rejects(
  "rejects an over-long message",
  wallChange({ line: `- 2026-08-25 · @student-one · ${"啊".repeat(501)}` }),
  /超过 500 个字符/,
);

// 列 issue 的接口连 PR 一起返回。漏掉这个判断，机器人会把学生自己的上墙 PR
// 当成入学 issue 关掉。
test("never treats a pull request as an admission issue", () => {
  const prAsIssue = {
    state: "open",
    title: "[入学打卡] student-one",
    body: "从哪来：杭州\n想学什么：FDE",
    user: { login: "student-one" },
    pull_request: { url: "https://api.github.com/repos/HA7CH/ha7ch-school/pulls/1" },
  };
  assert.equal(isAdmissionIssue(prAsIssue, "student-one"), false);
  assert.equal(isAdmissionIssue(prAsIssue, "student-one", { explicit: true }), false);
});

// 学生常写「入学打卡，issue #73」这种不带关键词的描述（见 PR #74）。
// 这里没有匹配才会走到机器人的「按作者名下唯一入学 issue」兜底。
test("ignores an issue reference that carries no closing keyword", () => {
  assert.deepEqual(parseClosingIssueNumbers("入学打卡，issue #73"), []);
  assert.deepEqual(parseClosingIssueNumbers("见 #73，closes #74"), [74]);
});

test("appendEntry refuses to write when the trunk file lacks a trailing newline", () => {
  assert.throws(() => appendEntry("# Wall\n\n- 2026-08-01 · @HA7CH · 开墙", validLine), /末尾缺少换行/);
});
