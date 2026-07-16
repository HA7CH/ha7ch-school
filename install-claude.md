# 安装 HA7CH School → Claude Code

> 本页是给**正在运行的 Claude Code agent** 读的安装说明。用户已让你安装 HA7CH School。请照下面把它装成本地 skill，再开始上课。别把本页当课程内容念给用户。

## 安装步骤（按顺序做）

1. **拿文件清单**：`curl -fsSL https://school.ha7ch.com/manifest.json`。`files` 列了所有要下的文件，每项有 `url`（相对 `https://school.ha7ch.com`）和 `dest`（相对 `~/.claude/skills/ha7ch-school/`）。
2. **逐个下载**：对每个文件，先 `mkdir -p` 它 dest 的父目录，再
   `curl -fsSL https://school.ha7ch.com/<url> -o ~/.claude/skills/ha7ch-school/<dest>`。
   - ⚠️ 关键：`school.md` 的 dest 是 `SKILL.md`（skill 入口必须叫 SKILL.md）。
3. **校验**：`~/.claude/skills/ha7ch-school/SKILL.md` 存在，且 `references/` 下有 12 个 `.md`。
4. **装好了**，告诉用户：**新开一个 Claude Code 会话**（skill 在会话启动时扫描），然后说「带我学 AI Native」「想学 FDE」或 `/ha7ch-school` 就能上课。
5. **想现在就上**：你可以直接 `Read ~/.claude/skills/ha7ch-school/SKILL.md`，当场照它当导师开讲，不用等重开会话。

学习进度自动存 `~/.ha7ch-school/{handle}.json`，跨会话续学。更新课程：重跑本安装即可（覆盖成最新）。
