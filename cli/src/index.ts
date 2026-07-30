#!/usr/bin/env node
import { existsSync, mkdirSync, cpSync, readFileSync } from "node:fs";
import { homedir } from "node:os";
import { join, dirname } from "node:path";
import { fileURLToPath } from "node:url";

const pkg = JSON.parse(
  readFileSync(new URL("../package.json", import.meta.url), "utf8"),
) as { version: string };

const HELP = `
ha7ch-school — install the HA7CH AI Native School skill
https://school.ha7ch.com

USAGE
  npx @ha7ch/school [options]

OPTIONS
  --dir <path>     Install to a custom directory (default: auto-detect)
  --codex          Install into ~/.codex/skills/ha7ch-school instead of Claude Code
  --force          Overwrite an existing install with the latest content
  -h, --help       Show this help
  -v, --version    Show version

WHAT THIS DOES
  Copies the ha7ch-school skill (SKILL.md + manifest.json + references/)
  into your agent's local skills directory. Everything needed ships inside
  this package — no account, no extra network calls at install time.
  After this, your tutor checks for course updates before each class and
  refreshes itself when it finds one — you never have to re-run this.

AFTER INSTALL
  Start a new session in your agent, then say 「带我学 AI Native」/「想学 FDE」
  /「带我练一号位沟通」
  or run /ha7ch-school (Claude Code) to enroll.
`;

type Args = {
  dir?: string;
  codex: boolean;
  force: boolean;
  help: boolean;
  version: boolean;
};

function parseArgs(argv: string[]): Args {
  const args: Args = { codex: false, force: false, help: false, version: false };
  for (let i = 0; i < argv.length; i++) {
    const a = argv[i];
    if (a === "--dir") args.dir = argv[++i];
    else if (a === "--codex") args.codex = true;
    else if (a === "--force") args.force = true;
    else if (a === "-h" || a === "--help") args.help = true;
    else if (a === "-v" || a === "--version") args.version = true;
  }
  return args;
}

function resolveTargetDir(args: Args): string {
  if (args.dir) return args.dir;
  const home = homedir();
  if (args.codex) return join(home, ".codex", "skills", "ha7ch-school");
  if (existsSync(join(home, ".claude"))) return join(home, ".claude", "skills", "ha7ch-school");
  if (existsSync(join(home, ".codex"))) return join(home, ".codex", "skills", "ha7ch-school");
  return join(home, ".claude", "skills", "ha7ch-school");
}

function main() {
  const args = parseArgs(process.argv.slice(2));

  if (args.help) {
    console.log(HELP);
    return;
  }
  if (args.version) {
    console.log(pkg.version);
    return;
  }

  const here = dirname(fileURLToPath(import.meta.url));
  const skillSrc = join(here, "..", "skill");
  if (!existsSync(skillSrc)) {
    console.error(
      "Bundled skill content not found — this package build is broken. Please report at https://github.com/HA7CH/ha7ch-school/issues",
    );
    process.exitCode = 1;
    return;
  }

  const target = resolveTargetDir(args);

  if (existsSync(target) && !args.force) {
    console.log(`⚠️  ${target} already exists.`);
    console.log(
      "   Re-run with --force to overwrite it with the latest content (your learning progress lives separately in ~/.ha7ch-school/ and is never touched).",
    );
    process.exitCode = 1;
    return;
  }

  mkdirSync(target, { recursive: true });
  cpSync(skillSrc, target, { recursive: true });

  console.log(`✅ Installed HA7CH AI Native School (v${pkg.version}) to:`);
  console.log(`   ${target}`);
  console.log("");
  console.log("Start a new session in your agent, then say 「带我学 AI Native」/「想学 FDE」/「带我练一号位沟通」");
  console.log("or run /ha7ch-school (Claude Code) to enroll.");
}

main();
