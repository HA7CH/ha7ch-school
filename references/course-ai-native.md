# 课程 · AI Native

**这门课要让学生带走的一件事**：AI native 不是"用 AI 提效"，而是**重构工作与产品本身的方式**——从"零 token 设计"这个内核，到 ChatGPT 之后活儿到底怎么变，最后**亲手做一个 AI native 产品**（把简历变活）体会一次。学完他应该能分辨"AI 皮"和"AI native 内核"的区别。

按 `references/pedagogy.md` 的动态循环教。下面是这门课的模块、目标、图谱依赖与兜底路径、自适应分支。

## 模块清单

| # | 课号 | 标题 | lesson 文件 | 目标（学生学完能……） | 类型 |
|---|---|---|---|---|---|
| 1 | `ai-native/01-zero-token-design` | 零 token 设计 | `lessons/ai-native/01-zero-token-design.md` | 说清"零 token 设计"是什么、为什么它是 AI native 的内核 | 讲授(文章) |
| 2 | `ai-native/02-zero-token-after-chatgpt` | ChatGPT 之后，活儿怎么变 | `lessons/ai-native/02-zero-token-after-chatgpt.md` | 说清 ChatGPT 之后工作方式的具体变化、比第一节新在哪 | 讲授(文章) |
| 3 | `ai-native/03-lab-cv-pro` | 实操：把简历变活 | `lessons/ai-native/03-lab-cv-pro.md` | 亲手用 cv.ha7ch.com 做出自己的活简历，体会 AI native 产品长什么样 | 实验课(cv-pro) |
| 4 | `ai-native/04-ha7ch-picks` | 延伸：HA7CH 精选 | `lessons/ai-native/04-ha7ch-picks.md` | 顺着兴趣，再读几篇 HA7CH 的相关思考，把内核连成面 | 延伸阅读 |

## 共修节点（与 FDE 课共用 · 没有序号，按信号接入）

知识是图谱，不是序列。两门课共用的基础节点放在 `lessons/shared/`，**不编课号、不定顺序**——要不要学、什么时候学，由导师按这个学生的情况现场决定：

| 节点 | lesson 文件 | 目标（学生学完能……） | 依赖 |
|---|---|---|---|
| `shared/github-concepts`（概念课） | `lessons/shared/github-concepts.md` | 不背命令，看懂 repo/commit/PR/issue/fork/merge 这套协作词汇，能读懂 diff、敢做验收 | 无 |
| `shared/github-lab-first-pr`（实验课） | `lessons/shared/github-lab-first-pr.md` | 真实开出人生第一个 issue 和第一个 PR（提进 `HA7CH/ha7ch-school`），合并后名字上 `school.ha7ch.com/WALL.md` | 六个词的理解——通常来自概念课；真懂 Git 的现场 30 秒补齐即可直接做 |
| `executive-communication`（专项课） | `course-executive-communication.md` | 把 AI 技术翻译成企业产品机会，并与一号位推进低风险验证 | 已有一个 AI native 产品/能力准备带进企业时 |

**接入信号（本课视角）**：
- 学生露出"不会 GitHub / 没账号 / 听不懂 PR、仓库是什么"的信号（尤其产品/商务/运营背景）→ 先走概念课（顺势接实验课），别让他带着黑盒进 03 的 cv-pro 实操。
- 03 做完、学生对"产品长在哪个生态上"来劲 → 概念课正好回答"cv-pro 这类零 token 产品为什么都长在 GitHub+npm 上"。
- 工程师背景真懂 Git → 概念课不用上；实验课当彩蛋推荐（"把你的第一个……好吧，第 N 个 PR 提进你正在上的这所学校"）。
- 回扣边：概念课的"merge 即上线"与 01 的零 token 生态前提互相印证——产品不烧 token，靠的就是这套公开协作与分发的基础设施。
- 学生开始问“怎么把这个能力卖给企业 / 怎么见老板 / 怎么讲案例 / 怎么做 POC” → 接入一号位沟通专项。
- AI Native 化回扣：不能只说“我会做 Agent”，必须说清企业哪个环节、哪个角色、什么问题、产品形态和验证指标。

## 图谱与兜底路径
文件名里的数字只是文件 ID，不是规定顺序——排课始终由导师按学生画像在图上现选（见 pedagogy §1）。依赖边：02 建在 01 的概念上；03 实操是 01/02 理念的落地（也允许先做当钩子、再回补理念）；04 是延伸，随时可接。**没有任何画像信号时的兜底走法**：01 → 02 → 03 → 04，共修 GitHub 节点按上面的信号接入。

## 自适应分支（按 pedagogy §1 头等原则：先从他强/熟的那块切入，把最弱的压到后面重点精讲）
> 这门课的两块能力＝理念理解 vs 动手构建。理论型的人先讲透 01/02 理念、把动手(03 实操)当压轴重点带；动手型的人先做 03 实操当钩子、再回补 01/02 理念。
- **完全新手（beginner）**：老实走 01 → 02，多举例、慢一点，再上 03 实操。04 可留作"以后想深入再看"。
- **已经懂"零 token / AI native 是什么"**（摸底或对话里露出来）：用一个 check 验一下，真懂就**跳过 01**、直接从 02 或**直接 03 实操**切入，别浪费他时间。
- **动手型 / 想快看到东西**：可以**先做 03 实操**（做出活简历）当钩子，再回头讲 01/02 解释"你刚做的这个为什么是 AI native"。这是允许的乱序——实操先行、理论回补。
- **理论型 / 爱追问**：01/02 讲深一点，04 优先排，把内核连成体系。
- **实操做完必回扣**：03 结束一定要问"你刚做的这个，和 01 说的零 token 设计有什么关系"——这是本课理解的试金石。

## 和 FDE 课的关系
学生如果对"AI native 到底怎么变成职业/落地"来劲，可以引一句"这正是 FDE 课在讲的"，顺势推荐他之后上 FDE 课——但别硬拽，记进 `interests` 即可。
