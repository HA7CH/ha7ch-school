# 安装 HA7CH School → Codex

> 本页是给**正在运行的 Codex agent** 读的安装说明。用户已让你安装 HA7CH School。装好再开始上课，别把本页当课程内容念给用户。

新版 Codex 有自己的技能目录 `~/.codex/skills/`（和 Claude Code 类似）。照下面装：

## 安装步骤（按顺序做）

1. **拿文件清单**：`curl -fsSL https://school.ha7ch.com/manifest.json`（`files` 列所有文件，每项 `url` + `dest`）。
2. **逐个下载**到 `~/.codex/skills/ha7ch-school/<dest>`（先 `mkdir -p` 父目录）：
   `curl -fsSL https://school.ha7ch.com/<url> -o ~/.codex/skills/ha7ch-school/<dest>`。
   - ⚠️ 关键：`school.md` 的 dest 是 `SKILL.md`。
3. **校验**：`~/.codex/skills/ha7ch-school/SKILL.md` 存在、`references/` 下 12 个 `.md`。
4. **装好了**：告诉用户下一轮对话说「带我学 AI Native」「想学 FDE」或 `/ha7ch-school` 就能上课。想现在就上，直接 `Read` 那个 SKILL.md 照它开讲。

> 若你的 Codex 版本没有 `~/.codex/skills/`，改用**免安装**：让用户贴「读 https://school.ha7ch.com/school.md ，带我上课」，你 `curl` 取 school.md 照它开讲即可。

学习进度存 `~/.ha7ch-school/{handle}.json`，跨会话续学。更新课程重跑本安装即可。
