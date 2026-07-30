// Copies the repo's skill content (SKILL.md + manifest.json + references/) into cli/skill/
// so it ships inside the published npm package. Runs before every build.
// references/harvest/ 是采集工作区，不属于课程内容，不打进包。
// manifest.json 必须一起装：它是学生本地「开课前自检」的版本基准（见 SKILL.md §〇 第 0 步）。
import { cpSync, rmSync, existsSync, mkdirSync, readFileSync } from "node:fs";
import { join, dirname } from "node:path";
import { fileURLToPath } from "node:url";

const here = dirname(fileURLToPath(import.meta.url));
const repoRoot = join(here, "..", "..");
const cliRoot = join(here, "..");
const dest = join(cliRoot, "skill");

const skillMdSrc = join(repoRoot, "SKILL.md");
const referencesSrc = join(repoRoot, "references");
const manifestSrc = join(repoRoot, "manifest.json");
const harvestDir = join(referencesSrc, "harvest");

if (!existsSync(skillMdSrc) || !existsSync(referencesSrc) || !existsSync(manifestSrc)) {
  console.error(`prepare-skill: expected ${skillMdSrc}, ${referencesSrc} and ${manifestSrc} to exist — run this from the ha7ch-school repo.`);
  process.exit(1);
}

// 版本必须对齐：manifest.json 里的 version 是学生本地自检的基准，线上 manifest 是对照。
// 一旦 npm 包里带的 manifest 版本落后于线上，学生装完仍被判定为「旧版」→ 每次开课都重装，死循环。
const manifestVersion = JSON.parse(readFileSync(manifestSrc, "utf8")).version;
const pkgVersion = JSON.parse(readFileSync(join(cliRoot, "package.json"), "utf8")).version;
if (manifestVersion !== pkgVersion) {
  console.error(
    `prepare-skill: 版本不一致 — manifest.json=${manifestVersion}，cli/package.json=${pkgVersion}。\n` +
      `两者必须相同，否则学生装完自检仍判定落后，会陷入每次开课重装的死循环。`,
  );
  process.exit(1);
}

rmSync(dest, { recursive: true, force: true });
mkdirSync(dest, { recursive: true });
cpSync(skillMdSrc, join(dest, "SKILL.md"));
cpSync(manifestSrc, join(dest, "manifest.json"));
cpSync(referencesSrc, join(dest, "references"), {
  recursive: true,
  filter: (src) => !src.startsWith(harvestDir),
});

console.log(`prepare-skill: bundled skill content (v${manifestVersion}) into ${dest}`);
