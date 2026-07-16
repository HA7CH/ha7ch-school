# AI Native · 第 1 课：零 Token 设计（Zero-Token Design）

> source: https://www.ha7ch.com/writing/zero-token-design ｜ 类型：讲授(文章) ｜ 前置：无
> 教法遵循 `references/pedagogy.md`：像课本一样把概念讲透、给足，不盘问、不当门槛。

## 一句话本质（开场钩子）
**零 token 设计 = AI 产品不再在自己服务器上烧自己的 token 跑推理，而是让用户用他手里已有的 agent（Codex / Claude Code / Cursor）去干活，产品只负责把结果接住、漂亮地承载和分发。**

## 为什么要在乎（钩子展开）
学生大概率默认："做个 AI 产品，不就是网页里塞个聊天框、每次用户点一下我后台就调一次模型、我替他付推理费吗？" —— 这节课就是要拆掉这个"默认必须自己烧 token"的假设。先抛给学生一个问题勾住他：
> "如果你要做一个 AI 简历产品，用户每改一次简历都要调一次大模型——这笔 token 钱谁出？有没有可能，你一分钱推理费都不用付，产品还照样是 AI 产品？"

## 核心概念（逐个讲透，内容给足）

### 1. 运行时烧 token（要挑战的旧默认）
传统 AI SaaS：用户每操作一次 → 产品调一次模型 → 产品替用户付推理费。这在 2023 年多数人还没有个人 AI 工作区时是合理的。**作者要挑战的就是"这是唯一做法"这个假设。**

### 2. 用户的 agent 工作区（零 token 成立的前提）
Codex、Claude Code、OpenCode、Cursor 这类本地 agent 现在已经成熟——能读目录、处理文档、执行命令、改代码、跑完整工作流。**正因为用户手里已经有了这些，才可能把推理"外包"给他们。**

### 3. 零 token 设计的分工原则
一句话：**"让用户的 agent 干活，让产品接住结果。"** 推理归 agent，承载归产品。以 CV.pro 为例——简历解析 / JD 定制 / 内容改写这些推理，由用户复制一段快速启动 prompt（含 npx 命令）到自己 agent 里跑；产品只负责 schema、数据库、URL 视图、版本、渲染和分发。

### 4. 它和 BYOK 不是一回事（最容易混的点，重点讲）
BYOK（Bring Your Own Key）只是把账单转给用户，UX 负担还很重：要拿 API key、做配置、懂计费、完成集成。**零 token 不是让用户在你产品里配个 key，而是让产品去对接用户"本来就在用的工具"**——UX 负担落在 agent 那边，用户几乎无感。

## 带学生读 source
把学生领到原文这几句前（可用 `WebFetch` 取一段一起读）：
- "an AI product doesn't always need to burn its own tokens at runtime." —— 点破旧默认。
- "It is about letting my product work with the tools they already use, like Codex, Claude Code, OpenCode, or Cursor." —— 和 BYOK 的分界。
- "Let the user's agent do the work. Let the product handle the result." —— 分工原则。

## 金句（引用时标出处：Lawted《Zero-Token Design》）
- "I'm not saying the product doesn't need AI. What I mean is: an AI product doesn't always need to burn its own tokens at runtime."
- "Zero-token design is not about asking users to configure a key inside my product. It is about letting my product work with the tools they already use."
- "Let the user's agent do the work. Let the product handle the result."
- "Should your product do all the reasoning by itself? Or should it become a system that can be operated by agents, capture the result, and distribute it beautifully? That's the difference."

## 讲完这节，你应该能答上（可选巩固 · 别逐题盘问、别当门槛）
1. **Q：零 token 设计和 BYOK 有什么本质区别？**
   - 好答案信号：能说出 BYOK 只转移了账单，却仍把"拿 key / 配置 / 懂计费 / 集成"留给用户；零 token 不要求用户在产品里配 key，是让产品去对接用户本来就在用的 agent，推理在用户工作区发生、产品只接结果。
2. **Q：为什么零 token "现在"才成立，2023 年不行？**
   - 好答案信号：能指出前提是用户手里已有成熟本地 agent（能读目录、执行命令、改代码）；2023 年多数人没有个人 AI 工作区，产品只能自己烧 token。
3. **Q：用 CV.pro 说明"agent 干活、产品管结果"怎么分工？**
   - 好答案信号：推理侧（解析/定制/改写）由用户在自己 agent 里跑；产品侧只管 schema、数据库、URL 视图、版本、渲染、分发。

## 常见误解（听到就纠正）
- ❌"零 token = 不需要 AI / 不算 AI 产品。" → 作者明说 "I'm not saying the product doesn't need AI"；CV.pro 依然是 AI 产品，只是推理不发生在它自己服务器上。
- ❌"零 token = BYOK 换个说法。" → 见核心概念 4，UX 负担落点完全不同。
- ❌"零 token 只是个省钱技巧。" → 它更是**产品架构与定位**的转变：从"自己做全部推理"变成"被 agent 操作、捕获并分发结果的系统"。

## 收尾 & 排下一课
- 讲完 `Write` 进度：这节 `comprehension` + 一句 notes（他哪懂了/哪卡了）。
- 下一课默认：`ai-native/02-zero-token-after-chatgpt`（这套架构原本只对开发者成立，第 2 课讲它怎么变成"所有人"的）。若学生已牢牢抓住内核且想快点动手，可提议直接去 `03-lab-cv-pro` 实操，再回补第 2 课。
