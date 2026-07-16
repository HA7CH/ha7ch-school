# AI Native · 第 4 课（延伸）：HA7CH 精选

> source: https://www.ha7ch.com/writing 系列文章 ｜ 类型：延伸阅读（按兴趣可选、可拆） ｜ 前置：`01`、`02`
> 这节不是必修。按学生 `interests` 挑 1-2 篇深聊，把前几课的内核连成面。别一次全塞。

## 怎么用这节课
前面 01/02 讲了零 token 的"内核"，03 让学生亲手做了一个。这节把 HA7CH 的其他思考按主题接上去。**导师按学生兴趣选，不是逐篇念**。每篇给学生一句话勾一下，问他"这个方向你想不想展开"，想才深入（可用 `WebFetch` 取原文一起读）。

## 精选片单（按主题分，挑着用）

### A. 协作方法论 —— 怎么真正和 AI 一起干活
- **《A Six-Cell Strategy for Working with AI》** — https://www.ha7ch.com/writing/six-cell-ai-collaboration
  一句话：把"和 AI 协作"从 prompt 级升维到项目级的 3×2 决策框架——按目标清晰度、方法清晰度、自身能力三维，选模型、配 harness、定验证方式。
  教学点：**"知道方法"和"能执行方法"是两回事**，能力缺口要用不同的协作与质控策略补；目标不清必须先走"目标澄清"再进交付。适合当这门课的协作主线。

### B. AI native 心态 —— 默认入口不是 chatbot，是 code agent
- **《Claude Code for Everything》** — https://www.ha7ch.com/writing/claude-code-for-everything
  一句话：作者把 Claude Code 当日常基础设施——写代码、读整个 codebase、多语种写作都靠它，主张 2026 年知识工作者默认工具是 code agent 而非 chatbot。
  教学点：AI native 不是给流程加个功能，而是**改变获取知识与创造力的默认路径**，用 agent 取代大量"去问同事"的协调开销。和第 1 课互补（一个讲怎么造、这篇讲怎么用）。

### C. 可复制的 AI native 工作流（最适合当作业蓝本）
- **《My Best Resume Material Was Hidden in 700 Conversations, But I Was Too Lazy to Dig》** — https://www.ha7ch.com/writing/resume-material-from-700-conversations
  一句话：用多个 agent 自动扫 700 场对话/token 数据/git commit，几分钟出 19 份报告，再逐条人工核验，只留自己能讲清楚的真实成就。
  教学点：(1) 怎么编排多 agent 处理海量个人数据；(2) **为什么"人的判断"不能外包**——AI 会给看似合理却不真实的结论，鉴真只能靠本人。可布置成作业：让学生挖自己的对话史/commit 史。

### D. 引擎盖下 —— agent 为什么贵（给纯用户补机制常识）
- **《Code Agent and Token Cost》** — https://www.ha7ch.com/writing/code-agent-and-token-efficiency
  一句话：拆解 code agent 基于 ReAct、上下文随历史二次方增长的机制，对比 harness 级与 model 级两条降本路径，论证换更强/更便宜的模型常比堆框架更实在。
  教学点：学生大量用 agent 之前，先懂它为什么贵、context 为什么膨胀。是理解 zero-token 思路的前置技术阅读。

### E. 产品批判 —— 把 AI 塞进平台 ≠ 做出好 AI 产品
- **《Deep Notes from Using Databricks AI Products》** — https://www.ha7ch.com/writing/databricks-ai-product-experience
  一句话：实测 Databricks 的 Genie Space / Genie Code，指出它们对新手好看但不透明、不可控、底座不如 Claude Code，得出"把 AI 塞进平台"不等于做出好 AI 产品。
  教学点：给学生一套判断 AI 产品好坏的标准——**透明度、用户控制权、底座模型能力**，而不是"有没有加 AI"。适合放课程后段讨论产品设计。

## 讲完这节，你应该能答上（可选巩固 · 别逐题盘问、别当门槛）
- 读完某篇后，让学生用**一句自己的话**说"这篇和零 token 设计/AI native 内核有什么关系"。能连上=真读进去了；连不上=再引一句原文帮他挂钩。

## 收尾
- `Write` 进度：记录读了哪几篇、哪个方向他最来劲（写 `interests`）。
- 这门课到此可收尾。若他对"AI native 怎么变成职业/落地"来劲 → 引导去 **FDE 课**；对"怎么造产品"来劲 → 记下，可作后续加课方向。
