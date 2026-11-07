import test from "node:test";
import assert from "node:assert/strict";
import { existsSync, mkdirSync, mkdtempSync, readdirSync, rmSync } from "node:fs";
import { tmpdir } from "node:os";
import { join } from "node:path";
import { fileURLToPath } from "node:url";
import { spawnSync } from "node:child_process";

const entry = fileURLToPath(new URL("../dist/index.js", import.meta.url));

function sandbox(run) {
  const root = mkdtempSync(join(tmpdir(), "ha7ch-cli-test-"));
  const home = join(root, "home");
  mkdirSync(home);
  try {
    run(root, home, (args) => spawnSync(process.execPath, [entry, ...args], {
      cwd: root,
      env: { ...process.env, HOME: home, USERPROFILE: home },
      encoding: "utf8",
    }));
  } finally {
    rmSync(root, { recursive: true, force: true });
  }
}

for (const args of [["--dir"], ["--dir", ""], ["--dir", "--force"], ["--dir", "--codex"]]) {
  test(`rejects a missing directory: ${JSON.stringify(args)}`, () => {
    sandbox((root, home, run) => {
      const result = run(args);
      assert.equal(result.status, 1);
      assert.match(result.stderr, /--dir requires a directory path/);
      assert.deepEqual(readdirSync(root), ["home"]);
      assert.deepEqual(readdirSync(home), []);
    });
  });
}

test("installs into a directory containing spaces", () => {
  sandbox((root, home, run) => {
    const target = join(root, "custom skills", "school");
    const result = run(["--dir", target]);
    assert.equal(result.status, 0, result.stderr);
    assert.ok(existsSync(join(target, "SKILL.md")));
    assert.ok(existsSync(join(target, "manifest.json")));
    assert.deepEqual(readdirSync(home), []);
  });
});

test("preserves --force with an explicit directory", () => {
  sandbox((root, home, run) => {
    const target = join(root, "school");
    assert.equal(run(["--dir", target]).status, 0);
    assert.equal(run(["--dir", target]).status, 1);
    const result = run(["--force", "--dir", target]);
    assert.equal(result.status, 0, result.stderr);
    assert.ok(existsSync(join(target, "SKILL.md")));
    assert.deepEqual(readdirSync(home), []);
  });
});
