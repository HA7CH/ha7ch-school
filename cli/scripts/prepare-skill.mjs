// Copies the repo's skill content (SKILL.md + references/) into cli/skill/
// so it ships inside the published npm package. Runs before every build.
// references/harvest/ 是采集工作区，不属于课程内容，不打进包。
import { cpSync, rmSync, existsSync, mkdirSync } from "node:fs";
import { join, dirname } from "node:path";
import { fileURLToPath } from "node:url";

const here = dirname(fileURLToPath(import.meta.url));
const repoRoot = join(here, "..", "..");
const cliRoot = join(here, "..");
const dest = join(cliRoot, "skill");

const skillMdSrc = join(repoRoot, "SKILL.md");
const referencesSrc = join(repoRoot, "references");
const harvestDir = join(referencesSrc, "harvest");

if (!existsSync(skillMdSrc) || !existsSync(referencesSrc)) {
  console.error(`prepare-skill: expected ${skillMdSrc} and ${referencesSrc} to exist — run this from the ha7ch-school repo.`);
  process.exit(1);
}

rmSync(dest, { recursive: true, force: true });
mkdirSync(dest, { recursive: true });
cpSync(skillMdSrc, join(dest, "SKILL.md"));
cpSync(referencesSrc, join(dest, "references"), {
  recursive: true,
  filter: (src) => !src.startsWith(harvestDir),
});

console.log(`prepare-skill: bundled skill content into ${dest}`);
