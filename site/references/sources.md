# Source 清单（全部课程的真实素材）

每节课都落到真实素材。需要引原文时按下面取。**取材原则：引真东西、标出处、不编造**；线上文章用 `WebFetch` 取，本地口播稿用 `Read` 取。

## AI Native 课

| 课号 | source | 类型 | 取法 |
|---|---|---|---|
| 01 | https://www.ha7ch.com/writing/zero-token-design | 文章 | WebFetch |
| 02 | https://www.ha7ch.com/writing/zero-token-after-chatgpt-work | 文章 | WebFetch |
| 03 | https://cv.ha7ch.com ＋ `cv-pro` skill（`~/.claude/skills/cv-pro/SKILL.md`） | 产品+skill | 网页认领 handle；`Skill(cv-pro)` 驱动真实 `npx @ha7ch/cv-pro@latest` 命令 |
| 04 | HA7CH 精选（下列 5 篇） | 文章 | WebFetch，按兴趣挑 |

**04 精选片单**（详见 `lessons/ai-native/04-ha7ch-picks.md`）：
- 协作方法论：https://www.ha7ch.com/writing/six-cell-ai-collaboration
- AI native 心态：https://www.ha7ch.com/writing/claude-code-for-everything
- 可复制工作流（作业蓝本）：https://www.ha7ch.com/writing/resume-material-from-700-conversations
- 引擎盖下/token 成本：https://www.ha7ch.com/writing/code-agent-and-token-efficiency
- 产品批判：https://www.ha7ch.com/writing/databricks-ai-product-experience

## FDE 课

| 课号 | source | 类型 | 取法 |
|---|---|---|---|
| 01 | Lawted 本人口播稿/访谈（本地归档，下详） | 口播稿 | Read |
| 02 | `fde-pro` skill（`~/.claude/skills/fde-pro/SKILL.md`）＋ `~/dev/fde-playground`（货代擂台） | skill+本地项目 | `Skill(fde-pro)`；playground 本地 `npm run dev` |
| 03 | https://www.ha7ch.com/writing/four-cities-fde-report | 文章 | WebFetch |

**01 口播稿归档位置**：`~/Documents/Lawted's-Video/小红书全量归档_2026-07-13/`
- 总索引：`全部笔记文本索引.md`
- 单篇正文：`笔记/{日期}_{id}_{标题}/完整内容.md`
- 本课重点精读的 9 篇：《一张图看懂 FDE 到底怎么做（FDE 九宫格）》《为什么我更看好 FDE》《采访 Lawted：FDE 与 ha7ch（上/中/下）》《FDE 还在做标准品，就错了》《大客户不需要一个全能选手》《AI 时代，为什么 FDE 会爆发》《AI 时代，程序员都要做 FDE》。
- 需要更多 Lawted 原话时，可再从总索引里按关键词（FDE / Echo / Delta / 驻场 / 货代）找更多篇。

## 实操产品/项目一览（"skill 里面套 skill"要拉起的东西）
- `cv-pro` —— AI native 在线简历，cv.ha7ch.com。装在 `~/.claude/skills/cv-pro/`。
- `fde-pro` —— FDE 适配诊断器，fde.ha7ch.com。装在 `~/.claude/skills/fde-pro/`。
- `fde-playground` —— 货代实战擂台（Phase 1 摸需求前门）。`~/dev/fde-playground`，本地起服务。

## 注意
- 线上文章可能更新；引用时以当次 WebFetch 到的原文为准，别用记忆里的旧版本。
- 本地路径是 Lawted 本机的（口播稿、fde-playground）。**别人装了这个 skill 后，这些本地 source 可能不存在**——FDE 第 1 课若读不到本地口播稿，降级用 lesson 文件里已蒸馏好的金句和概念讲（lesson 文件本身自带足够内容），并如实告诉学生"原始口播稿在作者本机、这里用的是提炼版"。
