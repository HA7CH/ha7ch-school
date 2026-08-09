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
| 02 | 《一张图看懂 FDE 到底怎么做（FDE 九宫格）》口播稿+原图（本地归档，位置同 01） | 口播稿 | Read |
| 03 | School 内置 `references/skills/fde-diagnosis/SKILL.md`（源自 `HA7CH/fde-pro`）＋ `~/dev/fde-playground`（货代擂台） | 校内 skill+本地项目 | 按运行模式 `Read` / `WebFetch`；playground 本地 `npm run dev` |
| 04 | https://www.ha7ch.com/writing/four-cities-fde-report | 文章 | WebFetch |

**01 口播稿归档位置**：`~/Documents/Lawted's-Video/小红书全量归档_2026-07-13/`
- 总索引：`全部笔记文本索引.md`
- 单篇正文：`笔记/{日期}_{id}_{标题}/完整内容.md`
- 本课重点精读的 9 篇：《一张图看懂 FDE 到底怎么做（FDE 九宫格）》《为什么我更看好 FDE》《采访 Lawted：FDE 与 Ha7ch（上/中/下）》《FDE 还在做标准品，就错了》《大客户不需要一个全能选手》《AI 时代，为什么 FDE 会爆发》《AI 时代，程序员都要做 FDE》。
- 需要更多 Lawted 原话时，可再从总索引里按关键词（FDE / Echo / Delta / 驻场 / 货代）找更多篇。

## 共修课（两门课共用）

| 课号 | source | 类型 | 取法 |
|---|---|---|---|
| `shared/github-concepts` | https://github.com/HA7CH/ha7ch-school （公开仓库，**本校即教具**）＋ school.ha7ch.com | 仓库+网站 | 带学生网页浏览仓库/issue/PR 页；需要引页面内容用 WebFetch |
| `shared/github-lab-first-pr` | 同上仓库 ＋ `WALL.md`（校友墙，线上 https://school.ha7ch.com/WALL.md）＋ `gh` CLI | 实操 | `gh auth login` / `gh issue create` / `gh repo fork` / `gh pr create`；gh 不可用降级走 GitHub 网页编辑流（lesson 里有） |

**共修课金句出处**（本地口播稿/图文归档，位置同上「01 口播稿归档位置」）：《采访 Lawted：FDE 与 Ha7ch（中）》（GitHub Issue 三连——梳理需求转 Issue、晚上让 Claude Code 完成、实现变便宜判断变贵）、《我愿称之为🚽开发法》（只建 issue 不动代码、手机验收合并 PR #102）、《被忽略的大陆》（这代人天然会提 issue 发 PR fork）、《Ha7ch 是 Builder 飞轮》（能不能拆 issue 提 PR 是第一层筛选）。别人机器读不到归档时，lesson 文件里的蒸馏版已够用。

## 共修专项 · 与一号位沟通

| source | 类型 | 取材边界 |
|---|---|---|
| HA7CH 一线企业沟通经验：自媒体获客、会前企业研究、一号位沟通、竞品/边界/POC、录音复盘 | 一线经验 | 课程讲义与场景库已经蒸馏；后续只加入脱敏真实案例，不保存客户原始录音、账号或商业秘密 |
| 《麦肯锡方法》（*The McKinsey Way*，Ethan M. Rasiel）——书目引用，不附电子版链接，读者自行取得正版 | 商业问题解决方法 | 只吸收事实建立可信度、初始假设、关键驱动因素、电梯测验、先做小成果、控制承诺与访谈准备；不把麦肯锡术语本身做成课程，也不大段复制原文 |

本专项的核心判断来自 HA7CH 的企业现场经验，麦肯锡方法只用来补结构，不能覆盖或冲淡一线判断。

## 现场素材（素材层，**导师不主动读**）

| source | 类型 | 状态 |
|---|---|---|
| 某场 FDE 专场交流会现场记录（仓库内 `references/material/`，**学生机上不存在**） | 现场转录蒸馏 | **未编入任何讲义，导师上课时不读，也不要尝试 Read** |
| Lawted 2026-08-03 至 2026-08-09 小红书公开现场笔记（`references/material/lawted-xhs-field-notes-2026-08.md`，**学生机上不存在**） | 公开内容蒸馏 | **已去客户身份并标注机器证据边界；未编入任何讲义，导师上课时不读** |

**这一节是素材，不是课。** 上课一律以 `lessons/` 下的讲义为准；本节文件**不在授课路径上**，也不进 `manifest.json`、不 bump version（动 version 会触发全体学生端自检重装）。素材被**两处**排除：`cli/scripts/prepare-skill.mjs` 挡住 npm 包（装不到学生本机），`.vercelignore` 挡住站点部署（`school.ha7ch.com` 上取不到）。两处必须一起维护——只挡 npm 挡不住公开托管。

要把其中某条升级成正式课程内容，需人工判断后走完整发版流程（写进 lesson → 更新 manifest → 同步三处版本号 → 打 tag）。**在那之前，素材里的做法不代表本校的教法。**

## 实操产品/项目一览（"skill 里面套 skill"要拉起的东西）
- `cv-pro` —— AI native 在线简历，cv.ha7ch.com。装在 `~/.claude/skills/cv-pro/`。
- `fde-diagnosis` —— FDE 适配诊断器，已经内置在 School；旧 `fde-pro` 仓库与 `fde.ha7ch.com` 只做兼容维护。
- `fde-playground` —— 货代实战擂台（Phase 1 摸需求前门）。`~/dev/fde-playground`，本地起服务。

## 注意
- 线上文章可能更新；引用时以当次 WebFetch 到的原文为准，别用记忆里的旧版本。
- 本地路径是 Lawted 本机的（口播稿、fde-playground）。**别人装了这个 skill 后，这些本地 source 可能不存在**——FDE 第 1 课若读不到本地口播稿，降级用 lesson 文件里已蒸馏好的金句和概念讲（lesson 文件本身自带足够内容），并如实告诉学生"原始口播稿在作者本机、这里用的是提炼版"。
