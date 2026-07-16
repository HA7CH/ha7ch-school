# AI Native · 第 2 课：ChatGPT Work 之后的零 Token 设计

> source: https://www.ha7ch.com/writing/zero-token-after-chatgpt-work ｜ 类型：讲授(文章) ｜ 前置：`ai-native/01-zero-token-design`
> 教法遵循 `references/pedagogy.md`。这节课的关键是讲清"相对第 1 课，新在哪"。

## 一句话本质（开场钩子）
**第 1 课的零 token 设计其实只对"装了编程 agent 的开发者"成立；ChatGPT Work 把 agent workspace 塞进了每个人口袋，于是这套架构第一次对所有人成立——产品该被 agent 调用，而不是自己再造一个入口。**

## 为什么要在乎（钩子展开）
先回扣第 1 课，再戳它的漏洞：
> "上节课我们说：让用户的 agent 干活、产品接住结果。但你有没有发现一个前提没被说出来——**它假设人人都有 agent workspace**。可现实里，只有开发者才装了 Codex/Claude Code、会开终端、懂 npx。你妈会为了用你的小产品去装个编程 agent 吗？不会。所以第 1 课其实只是'开发者的设计'。这节课讲那块缺失的拼图是怎么补上的。"

## 核心概念（逐个讲透，内容给足）

### 1. 没说出口的前提：第 1 课只对开发者成立
第 1 课默认"人人都有 agent workspace"，但现实只有开发者有。这是漏洞，也是这节课的起点。

### 2. ChatGPT Work 就是那个 agent workspace（本课的"更新"，重点）
ChatGPT Work 不再是老聊天框——**能读文件、连外部服务、跑多步工作流、长时间持续工作，本身就是一个 agent workspace**。关键是它**在云端、在手机上**，把过去只在开发者笔记本里的执行环境，搬进了每个人口袋。缺失的拼图补上了，零 token 从"开发者的架构"变成"所有人的架构"。

### 3. npx 的角色翻转
以前 npx 是**用户**启动产品能力的方式（得懂命令行）；现在 npx 只是**开发者**把能力打包进产品的方式，用户根本不用知道它存在，只需开口问。执行环境已在 ChatGPT 背后的云端。

### 4. 同一系统的两个界面：输入 vs 展示（用 Raily 例子讲）
高铁 app Raily 的"截图导入"**不该做进 Raily**：用户把 12306 截图直接发给 ChatGPT 说"把这趟车加到我的 Raily"，Raily Skill 解析车次/时间/座位、调 Raily API 写进同一个账号/数据库/server，下次打开 Raily 行程已在时间线上。**但 Raily 不会消失**——聊天框不适合看行程。ChatGPT 管"理解意图+拉进真实输入"，Raily 管"把行程漂亮地展示"，两者是**同一个系统的两个界面，共享底层数据**。记账、报销同理。

### 5. 先设计 API，再设计页面（对做产品的人最狠的一刀）
ChatGPT Work 把注册/登录/上传/搜索/表单/帮助中心/自建聊天框这层通用外壳，从每个产品里剥掉。未来小产品可能只需四样：**清晰的数据结构、可靠的 server、能被 agent 调用的 Skill/Plugin、一个真正值得独立存在的展示界面**。创始人第一问从"要做几个页面"变成"我的产品能被 agent 调用吗"。

### 6. 新分发：agent 版 SEO
分发逻辑从"怎么让用户再打开我一次"变成"怎么让 ChatGPT 在对的时刻调用我"。一种新优化会取代 SEO：**让 agent 理解你的能力、信任你的接口、在对的场景调用你。**

## 带学生读 source（引原话）
- "The agent workspace that used to live only on a developer's laptop now sits in everyone's pocket."
- "They're not two competing products. They're two interfaces of the same system. One handles input, one handles display, and they share the same data underneath."
- "There may be a new kind of optimization ahead: getting an agent to understand your capability, trust your interface, and call you in the right situation."
- "Where a product happens and where the user enters it become the same place, for the first time."

## 讲完这节，你应该能答上（可选巩固 · 别逐题盘问、别当门槛）
1. **Q：这篇相对上一篇，最核心的"更新"是什么？**
   - 好答案信号：能说出上一篇暗含"人人都有 agent workspace"的前提，现实只有开发者有；ChatGPT Work（云端+手机上的真 agent workspace）补上这块拼图，零 token 第一次从"开发者架构"变成"所有人架构"。
2. **Q：为什么"截图导入"不该做进 Raily，而 Raily 又为什么不会被 ChatGPT 取代？**
   - 好答案信号：输入/理解交给 ChatGPT（它管拉进真实输入、写进共享数据），展示交给 Raily（聊天框不适合看行程）；两者是同一系统的两个界面、共享底层数据，不是竞品。
3. **Q（进阶）：如果你现在要做一个新的小产品，这篇会让你把第一件事从"做几个页面"改成问什么？**
   - 好答案信号：先问"我的产品能不能被 agent 可靠调用、和 agent 共享同一份数据与身份"，先设计 API/Skill，再设计展示面。

## 常见误解（听到就纠正）
- ❌"ChatGPT 会取代所有垂直 app。" → 作者明确反对：app 管漂亮展示，是"同一系统的两个界面"。
- ❌"零 token 的意义是省钱。" → 结尾修正：真正重要的是重新定义了"产品被允许发生在哪"。
- ❌"用户还得懂 npx、装 Codex。" → 这次恰恰相反：用户只需打开 ChatGPT，npx 变成开发者打包能力的方式。

## 收尾 & 排下一课
- `Write` 进度：`comprehension` + notes。若第 5、6 点（先设计 API / agent 版 SEO）他听懂了，记 `interests` 里"对做产品来劲"。
- 下一课默认：`ai-native/03-lab-cv-pro`——**亲手做一个零 token 产品出来**，把这两节课的理念落地到手上。
