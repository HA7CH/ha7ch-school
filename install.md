# 安装 HA7CH School

> 本页是给**正在运行的 AI agent**（Claude Code / Codex / 其它）读的安装说明。用户已让你安装 HA7CH School。请照下面把它装成本地 skill，再开始上课。别把本页当课程内容念给用户。

## 第一步 · 确定装到哪个目录（按你是哪个 agent，你自己知道）

- **Claude Code** → `~/.claude/skills/ha7ch-school/`
- **Codex**（新版有技能目录）→ `~/.codex/skills/ha7ch-school/`
- **其它 agent（Cursor / Cline / …）** → 装到你自己的技能 / 规则目录；不确定就用 `~/.claude/skills/ha7ch-school/`。

下面用 `<DIR>` 指代你选定的 `ha7ch-school/` 目录。

## 第二步 · 下载课程文件

1. **拿清单**：`curl -fsSL https://school.ha7ch.com/manifest.json`。`files` 每项有 `url`（相对 `https://school.ha7ch.com`）和 `dest`（相对 `<DIR>`）。
2. **逐个下载**：先 `mkdir -p` 每个 dest 的父目录，再 `curl -fsSL https://school.ha7ch.com/<url> -o <DIR>/<dest>`。
   - ⚠️ 关键：`school.md` 的 dest 是 `SKILL.md`（入口必须叫 SKILL.md）。
3. **校验**：`<DIR>/SKILL.md` 存在，且 `references/` 下有 12 个 `.md`。

## 第三步 · 开课

- 装好了，告诉用户：**新开一个会话**（skill 在会话启动时扫描），然后说「带我学 AI Native」「想学 FDE」或 `/ha7ch-school` 就能上课。
- **想现在就上**：直接 `Read <DIR>/SKILL.md`，当场照它当导师开讲，不用等重开会话。

## 装不了？免安装也能用

让用户任何时候贴这句：**「读 https://school.ha7ch.com/school.md ，带我上课」**——你 `curl` 取 `school.md` 照它开讲即可。

---
学习进度自动存 `~/.ha7ch-school/{handle}.json`，跨会话续学。更新课程：重跑本安装即可（覆盖成最新）。
