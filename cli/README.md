# @ha7ch/school

一条命令把 [HA7CH AI Native School](https://school.ha7ch.com) 装进你的 Claude Code / Codex skill 目录。

```bash
npx @ha7ch/school
```

默认自动探测装到 `~/.claude/skills/ha7ch-school`（有 `~/.codex` 没有 `~/.claude` 时装到 Codex 目录）。也可以自己指定：

```bash
npx @ha7ch/school --codex          # 强制装到 ~/.codex/skills/ha7ch-school
npx @ha7ch/school --dir <path>     # 装到自定义目录
npx @ha7ch/school --force          # 已装过时覆盖成最新内容（学习进度在 ~/.ha7ch-school/，不受影响）
```

装完新开一个会话，说「带我学 AI Native」「想学 FDE」，或者在 Claude Code 里 `/ha7ch-school`，即可入学。

课程讲什么、锚定了哪些真实素材，见仓库根目录 [README.md](https://github.com/HA7CH/ha7ch-school#readme)。
