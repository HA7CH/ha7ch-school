// Copies the repo's skill content (SKILL.md + manifest.json + references/) into cli/skill/
// so it ships inside the published npm package. Runs before every build.
// references/harvest/ 是采集工作区，references/material/ 是未编入讲义的现场素材；
// 两者都不属于课程内容，不打进包（素材未经课程化，直接发到学生本机会被误当教法）。
// manifest.json 必须一起装：它是学生本地「开课前自检」的版本基准（见 SKILL.md §〇 第 0 步）。
import { cpSync, rmSync, existsSync, mkdirSync, readFileSync } from "node:fs";
import { join, dirname, relative, sep } from "node:path";
import { fileURLToPath } from "node:url";

const here = dirname(fileURLToPath(import.meta.url));
const repoRoot = join(here, "..", "..");
const cliRoot = join(here, "..");
const dest = join(cliRoot, "skill");

const skillMdSrc = join(repoRoot, "SKILL.md");
const referencesSrc = join(repoRoot, "references");
const manifestSrc = join(repoRoot, "manifest.json");
const vercelIgnoreSrc = join(repoRoot, ".vercelignore");
const harvestDir = join(referencesSrc, "harvest");
const materialDir = join(referencesSrc, "material");
const excludedDirs = [harvestDir, materialDir];

// 精确到目录边界：裸 startsWith 会连 references/material-notes/ 一起误伤。
const isUnder = (src, dir) => src === dir || src.startsWith(dir + sep);

if (
  !existsSync(skillMdSrc) ||
  !existsSync(referencesSrc) ||
  !existsSync(manifestSrc) ||
  !existsSync(vercelIgnoreSrc)
) {
  console.error(`prepare-skill: expected ${skillMdSrc}, ${referencesSrc}, ${manifestSrc} and ${vercelIgnoreSrc} to exist — run this from the ha7ch-school repo.`);
  process.exit(1);
}

// 排除清单必须两处对齐：本文件只挡住装到学生本机的 npm 包，.vercelignore 才挡得住
// school.ha7ch.com 的公开托管（见 .vercelignore 抬头注释）。只改一处，未编入讲义的素材
// 就会从另一条路流出去，并被当成本校的教法引用——所以这里直接对账，不靠记性。
const toRepoPath = (abs) => relative(repoRoot, abs).split(sep).join("/");
const vercelIgnoredReferences = readFileSync(vercelIgnoreSrc, "utf8")
  .split("\n")
  .map((line) => line.trim())
  .filter((line) => line && !line.startsWith("#") && line.startsWith("references/"))
  .map((line) => line.replace(/\/+$/, ""))
  .sort();
const npmExcludedReferences = excludedDirs.map(toRepoPath).sort();
if (vercelIgnoredReferences.join("\n") !== npmExcludedReferences.join("\n")) {
  console.error(
    `prepare-skill: 排除清单不一致 — .vercelignore=[${vercelIgnoredReferences.join(", ")}]，` +
      `本脚本=[${npmExcludedReferences.join(", ")}]。\n` +
      `两处必须一起维护：npm 那条只挡住学生本机，挡不住 school.ha7ch.com 的公开托管。`,
  );
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
  filter: (src) => !excludedDirs.some((dir) => isUnder(src, dir)),
});

console.log(`prepare-skill: bundled skill content (v${manifestVersion}) into ${dest}`);
