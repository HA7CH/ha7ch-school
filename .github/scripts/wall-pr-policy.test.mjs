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

test("accepts a stale branch when its patch is one valid EOF append", () => {
  const result = validateWallChange({
    pr,
    files,
    headContent: `${baseContent}${validLine}\n`,
  });
  assert.equal(result.ok, true);
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
