// 三条分发路径必须运送同一份课程，这里把它们钉死。
//
// 路径一 npm（@ha7ch/school）      ：cli/scripts/prepare-skill.mjs 把 SKILL.md + references/ 打进包。
// 路径二 托管站（school.ha7ch.com）：仓库根即站点根，同一个入口在这里叫 school.md。
// 路径三 手工安装（install.md 第二步）：agent 读 manifest.json 的 files 逐个 curl 下来。
//
// 这三处目前全靠人工对齐，master 至今也一直对得上。麻烦的是对不上的时候不会有任何报错：
// 站点照样部署、npm 照样发版，只有某一条路径上的学生拿到旧的入口说明，或者导师去 Read
// 一份根本没被下载下来的讲义。把「人工记得同步」换成一道会失败的测试，是这个文件的全部目的。

import { test } from "node:test";
import assert from "node:assert/strict";
import { readFileSync, readdirSync } from "node:fs";
import { join, dirname } from "node:path";
import { fileURLToPath } from "node:url";

const repoRoot = join(dirname(fileURLToPath(import.meta.url)), "..", "..");
const read = (p) => readFileSync(join(repoRoot, p), "utf8");
const manifest = JSON.parse(read("manifest.json"));

// prepare-skill.mjs 排除的两个目录：未编入讲义的现场素材与采集工作区，不进任何分发路径。
const EXCLUDED_DIRS = ["references/material", "references/harvest"];

function listReferenceDocs(dir = "references") {
  const out = [];
  for (const entry of readdirSync(join(repoRoot, dir), { withFileTypes: true })) {
    const rel = `${dir}/${entry.name}`;
    if (entry.isDirectory()) {
      if (!EXCLUDED_DIRS.includes(rel)) out.push(...listReferenceDocs(rel));
    } else if (entry.name.endsWith(".md")) {
      out.push(rel);
    }
  }
  return out.sort();
}

test("SKILL.md 与 school.md 必须逐字节一致", () => {
  // manifest 把 school.md 装成 SKILL.md（install.md 第二步第 1 条），
  // 所以 npm 包里的 SKILL.md 和站点上的 school.md 是同一个入口的两个副本。
  // 一旦错开，两条路径上的学生拿到的是两套教务处说明。
  assert.equal(
    read("SKILL.md"),
    read("school.md"),
    "SKILL.md 与 school.md 内容不同 —— 它们是同一个入口在 npm 与托管站上的两个副本，改一个必须同步另一个",
  );
});

test("manifest.json 的每个 url 都要在仓库里真实存在", () => {
  for (const { url } of manifest.files) {
    assert.doesNotThrow(
      () => read(url),
      `manifest.json 指向了不存在的文件 ${url} —— 手工安装路径会 curl 到 404`,
    );
  }
});

test("manifest.json 的 dest 只允许 school.md → SKILL.md 这一处改名", () => {
  for (const { url, dest } of manifest.files) {
    const expected = url === "school.md" ? "SKILL.md" : url;
    assert.equal(dest, expected, `manifest.json 中 ${url} 的 dest 应为 ${expected}，实为 ${dest}`);
  }
});

test("references/ 下每份课程文件都要在 manifest.json 里", () => {
  const listed = new Set(manifest.files.map((f) => f.url));
  const missing = listReferenceDocs().filter((p) => !listed.has(p));
  assert.deepEqual(
    missing,
    [],
    `新增的课程文件没写进 manifest.json：${missing.join("、")} —— npm 装的学生有、手工安装的学生没有，导师会读到不存在的讲义`,
  );
});

test("manifest.json 不得运送 material/ 与 harvest/", () => {
  const leaked = manifest.files.filter(({ url }) =>
    EXCLUDED_DIRS.some((dir) => url === dir || url.startsWith(`${dir}/`)),
  );
  assert.deepEqual(
    leaked.map((f) => f.url),
    [],
    "现场素材/采集工作区被写进了 manifest.json —— prepare-skill.mjs 与 .vercelignore 都刻意排除了它们",
  );
});

test("install.md 里的自检文件数要跟 manifest.json 对得上", () => {
  // install.md 第二步第 3 条让 agent 数一遍 references/ 下的文件数做校验，
  // 数字写死在正文里；manifest 加了条目却忘了改它，agent 会判定装漏了。
  const expected = manifest.files.filter(({ url }) => url.startsWith("references/")).length;
  const match = read("install.md").match(/当前\s*(\d+)\s*个\s*`\.md`/);
  assert.ok(match, "install.md 里找不到「当前 N 个 `.md`」这句自检基准");
  assert.equal(
    Number(match[1]),
    expected,
    `install.md 写的是 ${match[1]} 个，manifest.json 实际有 ${expected} 个 references/ 条目`,
  );
});
