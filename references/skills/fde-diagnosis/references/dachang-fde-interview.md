# 大厂线 FDE 面试参考

> 走大厂线时按需调用。本文不替代 SKILL.md 的诊断内核——它长在 Echo+Delta 上,只补一件事:**当一个人被判到大厂线(目标=大厂、入场券要自己攒),他到底要考什么、怎么准备、什么是强/弱信号。** SKILL.md 现有的"大厂线建议很薄"(只有强化 Agent/RAG/企业集成/证 ROI/沉淀模板),这里把它补成一张可用的考试地图。

## 谁该读这个文件 / 你是哪类读者

只在 SKILL.md 第二节路线判定命中 **大厂线**(目标=大厂 且有平台=在岗 / 目标=大厂 且现无平台=在职或应届转岗)时调用。两类读者**分流读**,各取所需:

- **海外求职 FDE**(投 Palantir / OpenAI / Anthropic / Google / Scale 等英文岗)——**这就是你的实战手册**。下面的面试流程骨架、各轮考什么、decomposition 框架、企业约束清单、公司差异速览、准备清单,**直接照着练**;薪资段是你的真实量级锚点(仍须看清"未独立核实 + 重股权结构")。这些不是"看看就好",是你这一轮要拿来用的东西。
- **国内求职 / 土 FDE 迁移**——拿走**能力模型与思维方式**(decomposition、I-not-we、客户结果叙事、企业约束意识、eval 意识)。国内对标岗(大厂 AI 落地 / 解决方案架构 / 交付岗)流程与薪资和海外差别大,公司 loop、薪资数字、文化读物**别照搬**。

土线的人不必面试,但可直接跳到末尾"对土 FDE 的反哺"一节——那里的 decomposition checklist、客户结果叙事、eval 意识对进现场同样有用。被判"现在别碰 FDE"的人,这个文件还太早。

## 读法声明:能力模型对所有人,公司细节/薪资分读者看

本文全部素材来自三篇讲**海外前沿实验室**的指南(Exponent《FDE 面试 2026 指南》、Exponent《Google FDE 指南》、Sundeep Teki《FDE 面试 2026 指南》),涉及 Palantir / OpenAI / Anthropic / Google / Scale / Databricks。

- **能力模型与思维方式(decomposition、I-not-we、客户结果叙事、T 型能力、企业约束、eval 意识)= 可迁移内核,不分国别,两类读者都大胆吸收。**
- **公司 loop(轮数、take-home 形态、流程长短)**——对**海外求职者是直接相关的实战信息**,但仍是未独立核实的快照、各家仍在快速演进,**以目标公司当期招聘页为准**;对**国内用户**,对标岗流程不同,别照搬。
- **薪资数字 = 美国市场、来自这三篇、未独立核实**——对**海外求职者**是有用的量级锚点(注意重股权/vesting,见薪资段);对**国内用户不可拿来对标人民币市场**。
- 提醒:简历/口头说"大厂 FDE"可能指三种东西——(a) 海外 lab 的 FDE/Applied AI;(b) 国内大厂的 AI 落地 / 解决方案架构 / 交付岗;(c) 项目制乙方。**判路线前先问清是哪一种,别默认套海外 loop。**

## 一句话定位:大厂 FDE 面试考的就是 Echo + Delta + 一层企业约束

三篇反复出现的那句铁律,本质是把 SKILL.md 第一节内核翻译成了面试语言:

> "The FDE interview is not graded on the answer. It's graded on **how you think through a problem you have never seen before**. Clarify before you solve. Narrate continuously. Surface assumptions. Propose the thinnest possible walking skeleton, then iterate."

逐句对照,这不是外来体系:
- "graded on how you think, not the answer" + "clarify before you solve" = **Echo + 薄切片**(先摸真需求,别跳方案)。
- "thinnest possible walking skeleton, then iterate" = **薄切片**(当场可验的最小可跑切片)。
- Palantir 历史上把 FDE 内部叫 **"Deltas"** = 我们 **Delta** 这半的字面出处。

所以被判到大厂线的人,不是去学一套新东西,是去**证明他已有的 Echo+Delta**,再补一层土 FDE 很少碰的**企业约束**。完整铁律见文末"一句铁律",此处不重复展开。

## 互证映射表:面试考点 ↔ SKILL.md 内核

| 面试考点(原文要点) | 映射到 | 说明 |
|---|---|---|
| **Decomposition 轮**(最关键一轮,"考你怎么想,不是答案";头号拒因="scope 前跳方案") | **Echo + 薄切片** | 先澄清真目标、识别缺什么(数据/干系人/指标)再拆,就是"推翻表面需求"的白板版 |
| "Clarify before you solve" | **Echo** | 先摸真需求再跳方案,就是 Echo 的面试动作 |
| "Walking skeleton first / 别直接上完美生产架构" | **薄切片** | System Design 轮常见错误就是直接上完美架构,违背薄切片 |
| **"I not we"**(HM 轮陷阱:说 "we did") | **Delta 本人主导、零依赖** | 说 "we" = 没法证明 Delta,近 R10(把 build 甩出去) |
| **Ownership 原型**("2AM 挂了不开 ticket、不甩锅、不睡,你修好它") | **Delta 端到端 ownership** | radical ownership = Delta 的态度面 |
| **over-promise 破坏信任**(角色扮演头号失败) | **红旗 R7**(乱许诺) | "包在我身上/一周上线/100% 准" 面试直接判死 |
| **客户结果叙事**("查询时间降 40%,日报小时级→分钟级,处理 3x") | **现金流叙事 + 经济账** | STAR 必须把技术决策连到 customer outcome + business impact |
| "纯技术故事无客户维度会 fall flat" | **R9**(技术栈名词墙) | 通篇 QPS/框架、无一句"省几人/减多少错单"=直接 fall flat |
| **Coding 非 LeetCode**(CSV/CLI/rate limiter/RAG,边写边讲、自己抓 bug) | **Delta(端到端可跑、当场可验)** | 务实非刷题,正是"会用 Cursor/Claude Code 端到端跑起来"的入场券面 |
| AI 岗对 **eval** 含糊("怎么知道它 work")=头号拒因 | **满分尺子(当场可验)+ 价值在一线** | 见下方 Eval 专项 |
| "当普通 SWE 面、刷 LeetCode 无 case 准备" | **R8**(把 FDE 当高薪 SWE/不愿面客) | 同一类错 |
| 向非技术 VP 解释局限、客户共情 | **现场真相 ③**(价值在一线不在主管) | |
| "集成进客户生产管线"而非替换系统 | **现场真相 ①**(反平台是生死线) | Google FDE 明写"把 pilot 推到 production"=增量插件思路 |

**给读者一句话:** 你若已在 SKILL.md 被判 Echo+Delta 齐备,大厂面试对你不是新考纲,是把你做过的事用 decomposition / I-not-we / customer-outcome 三套语言重讲一遍。

## 面试流程骨架(每轮考什么)

三篇骨架一致,颗粒度不同。整体 **通常 4-8 轮、数周,但因公司差异极大、各家 loop 仍在演进,具体轮数/周期以目标公司当期为准**。

1. **Recruiter Screen(30-45min)**——动机 / role fit / 沟通 / 薪资对齐。关键问 "Why FDE specifically":强答把面客技术工作连到个人动机;弱答=说公司声望或"consulting but technical"。(这是动机真诚度,不是 Echo;别和"推翻甲方需求"混为一谈。)
2. **Hiring Manager(45-60min)**——深挖 1-2 个简历项目,考 ownership / judgment。陷阱:说 "we did" 而非 "I did"。
3. **Coding(60min)**——光谱:有的家实务非刷题(CSV 解析/CLI/rate limiter/RAG pipeline),有的家限时算法,有的 LeetCode medium 但**情境化到客户场景**(图 BFS 最常见)。共性:**逼你 clarify 模糊需求 + 讨论取舍 + 考客户特定 edge case**(恶意用户/系统故障/集成问题),不是比谁背题快。奖励:边写边讲、自己抓 bug、干净有测试。
4. **System Design(60min)**——真实部署架构,**不是 "design Twitter"**。例:12 个零散零售数据源做预测 / 私有 VPC 部署 RAG 带 HIPAA / agent 框架改路由带合规。强答覆盖 data flow / trust boundary / auth / observability / failure mode / rollback / 诚实取舍。常见错误:直接上完美生产架构而非 walking skeleton first。**必须主动覆盖企业约束层(见下)。**
5. **Decomposition / 开放式 case(45-60min)= 最关键、最具区分度的一轮**——常是**纯口头/白板分析、不写码**。考你怎么想没见过的问题,不是答案。详见下节框架。
6. **Client Simulation / 角色扮演(45min)**——考客户沟通 / judgment / ownership 语言。场景:告知 deadline 滑期 / 顶住损害治理的需求 / 向非技术 VP 解释局限 / 客户不给凭证时自我解锁。强模式:ownership 语言("我周五前搞定"非"团队在做")、先诊断再给方案、先承认客户对的再 pushback、给带取舍的选项、**绝不 over-promise**。
7. **Behavioral / Values(45-60min)**——STAR 适配 FDE。注意:**行为问题不止这一轮,而是嵌入每个技术轮**(部分公司每个技术轮都有一段行为追问)。备 6-8 个故事(见 T 型下方)。
8. **Take-home(部分公司尤其 AI lab,数小时量级)**——搭 RAG / 做 eval harness / 搭部署 POC。

## Decomposition 框架(最关键,显式 narrate)

这一轮是大厂线的胜负手,头号拒因恒为"scope 之前就跳到方案"。脑内 checklist:

1. **澄清问题真目标**(clarify before solve)——这题真正要解的是什么?成功长什么样?
2. **识别干系人 + 成功指标**——谁在用、谁拍板、用什么衡量好坏。
3. **map 输入**——数据可用性 / 形态 / 归属 / 新鲜度;识别缺什么。
4. **拆子问题 + 排序理由**——按风险/价值排序,显式说为什么先做这个。
5. **提 walking-skeleton MVP 再迭代**——先一个最薄的、能端到端跑通的切片,再加。

全程**显式列假设并回头修正**、**持续出声讲思路(沉默=卡住)**、**主动暴露 failure mode**。这就是 Echo + 薄切片在白板上的版本。下文强信号速查、准备清单都以这五步为锚,不再重复展开。

## 企业约束清单(大厂线护城河之一,土 FDE 基本不碰)

中大型企业有 IT/采购/安全,交付绕不开下面这层。System Design 轮要**张口说得出**:

- **VPC / 私有部署**(在客户自己云里跑,不出网)
- **SSO / SAML / OIDC**(企业身份)、**SCIM**(账号自动开通)
- **PrivateLink**(私网打通)
- **数据驻留与合规:HIPAA / SOC2**(医疗、企业级审计)
- **遗留企业系统集成**(对接既有 ERP/OMS——是集成不是替换,呼应反平台)
- 配套:auth / trust boundary / observability / failure mode / rollback

这是 FDE 区别于普通 SWE 面试的差异化项,也是土 FDE 苗子转大厂线时**最需要补课的盲区**。

## T 型能力(横广 + 竖深选一)

**横(广度,所有 FDE 都要):** 生产级 Python(三篇都列为第一/必备)+ 一门强类型(TS/Go/Java);SQL(窗口函数/CTE/十亿行优化);现代数据栈(Snowflake/BigQuery/dbt/Airflow);API 集成(REST/GraphQL/streaming/OAuth/SAML/rate limit/retry/幂等);云(AWS 为主,也认 GCP/Azure;VPC/IAM/私网);真实负载系统设计;现代 AI(prompt、RAG=chunking·embedding·rerank、agent 编排、evals、向量库、fine-tune 取舍)。

**竖(深度,选一条往死里打):** 分布式数据系统(Palantir/Databricks)| 生产 LLM 系统与评估(OpenAI/Anthropic/Cohere)| 带安全合规的后端平台(defense/fintech)| 前端全栈(小 startup)。

> 处方:**横上补企业约束层,竖上挑一条往深打。** 土线只要求"领域正确+端到端",大厂线额外要这条竖深。

> **护栏(重要):** 上面这些(RAG 三件套、LangChain/向量库等)是大厂线 system-design 轮要**张口说得出**的词表,**不是 FDE 的护城河**。护城河仍是领域正确 + 端到端落地(见 SKILL.md 第一节真相④)。别把"会背 RAG 三件套/会用某框架"当成 Delta——能讲清概念≠能本人零依赖把它跑到生产。

**STAR 故事清单(备 6-8 个,改造成强调客户结果 + 业务影响,而非纯技术指标):** 端到端 owning 一个方案 / 难缠干系人 / 推翻自己的坏技术决策 / 无正式职权下推动对齐 / 紧 deadline 交付 / 失败与学习 / 跨客户发现 pattern / 对客户说 no。

## Eval 专项(AI lab 的高频死穴)

OpenAI/Anthropic/Google 都把 **"how do you know it works"** 当头号筛子,AI 岗 eval 答不出=直接拒。这是 SKILL.md "满分尺子(当场可验)"的工程化升级:

- 土 FDE 的"可验"= 让一线脱口而出"能帮到我"(人当场判)。
- 大厂 AI lab 的"可验"= **建 eval harness、定质量指标、用数据证明 work**(系统量化判)。
- take-home 经常就是"搭 RAG + eval harness",必须能讲清楚你怎么度量它对不对,而不只是"它跑起来了"。

## 强信号 / 弱信号速查(对照 R 系列)

**强信号:** 一致用 "I" / 先澄清再解(即上面 decomposition 五步)/ 持续讲思路 / 先 walking skeleton / 显式假设并回头修正 / 识别 failure mode / 跨客户 pattern-match / radical ownership / 早报坏消息带选项 / 具体说 why this company(引真实客户·产品·研究)/ 能在不是自己建的环境里 ramp up / 前创始人或早期 startup 工程师(OpenAI 明列为 plus)。

**弱信号(Top 拒因,括号=对应红旗):** decomposition 不澄清就跳方案(违 Echo)/ 说 "we" 不说 "I"(违 Delta,近 R10)/ 泛泛 "why company" / 当普通 SWE 面、刷 LeetCode 无 case(R8)/ coding/design 时沉默 / AI 岗 eval 含糊 / 角色扮演 over-promise 破坏信任(**R7**)/ 轻视 client simulation / 不准备目标公司近期具体工作 / 纯技术故事无客户业务维度(**R9**)。

## 公司差异速览(海外·部分细节不确定,以当期招聘页为准)

- **Palantir(FDSE)**——open-ended 是差异化(读其 "Navigating Open-Ended Questions");按 civil liberties/defense 文化契合筛人,明确**因文化不合拒掉技术强者**;嵌入客户数周数月在非常规环境(装配线/隔离政府设施);极重用户中心 + mission;追问真实失败故事;Foundry/Ontology 心智模型;流程偏长。
- **OpenAI**——take-home(在 OpenAI API 上搭 RAG/agent/eval harness)→ walkthrough → onsite;**极重 eval "how do you know it works"** + 面客经验;生产 AI 深度(rate limit/retry/batch/cache/prompt 鲁棒/全栈延迟 debug)。交付分阶段(scoping → validation/evals → 多日现场)。
- **Anthropic**——对外多用 **"Solutions Architects" 而非 FDE**,偏售前可信技术顾问;独有 prompt-engineering 评估 + 伦理/下行风险考量轮;读 Core Views on AI Safety / RSP / Constitutional AI;后期文化契合收紧,**通常不议价**。
- **Databricks**——Spark/SQL/数据建模/RAG/MLflow/lakehouse/notebook 协作。
- **Scale AI**——defense/政府、安全许可邻近;PySpark 数据清洗;多变体 FDE。
- **ElevenLabs**——紧凑 startup loop、case study 中心、无独立 behavioral;展示速度·scrappiness·端到端,别过度准备文化契合。
- **Ramp**——fintech;SSO/会计集成/结账周期/数据迁移。
- **Sierra**——客服 agent;会话系统;客服 eval。
- (具名客户案例如 "OpenAI×John Deere 精准除草"、团队人数等为公开报道/示意,不作事实陈述。)

## 薪资(美国市场 / 来自三篇 / 未独立核实)

> 以下 TC 均为 USD、美国市场、源自这三篇文章本身、**未经独立核实**。**海外求职者**可拿来当量级锚点(只信数量级、别信精确点位,且注意前沿实验室包重股权/PPU——上市前的纸面数字要按 vesting 与流动性打折看);**国内用户**不可用来对标人民币市场。

- 通用区间(方向三篇互证,可信度较高):入门/新 grad **$140-250K**;中级 3-5 年 **$200-350K**;senior 5+ 年 **$300-450K+**;顶级公司(Palantir/OpenAI 等)可破 **$600K**。FDE 较传统 SWE 溢价约 **25-40%**(稀缺的技术+面客组合,来自单篇估计)。
- 各家精确点位(如某家 ~$215K / 某家 ~$555K 之类)散见于原文,**均为单篇未核实估算,精确度不可信,本文不列**——要查请以目标公司当期 offer 数据/Levels.fyi 为准。
- **个别传闻坚决不当基准:** "OpenAI senior 曾到 $1.5M"、"新 grad $300K/两年 retention" 为单篇孤证,强烈疑似注水。
- 地理:据其中一篇,NYC 已超 SF 成 FDE 主 hub——**纯美国地理,与国内无关**。

## 准备清单(按你的目标分两套)

**通用内核(两类读者都练,照搬不出错):**
1. 把 decomposition 五步框架练成肌肉记忆(见上方专节)——任何模糊问题先澄清→干系人/指标→map 输入→拆排序→walking skeleton。
2. 把每段经历改写成 "I" 语言 + 客户结果叙事:把"我做了个工具"换成"我把他录一张单从 8 分钟压到 90 秒,一个月少错 12 单"。
3. 备 4-8 个 STAR,每个都连到 business impact;留一个"对客户/老板说 no"的故事。
4. 横向补企业约束词表(VPC/SSO/SAML/SCIM/HIPAA/SOC2),竖向挑一条深的;AI 岗必须能讲 eval 怎么度量。记住护栏:这些是词表不是护城河。
5. 全 loop mock,练"边写码边出声讲假设"。

**海外求职者额外做:** 研究目标公司当期招聘页的具体轮次与 take-home 形态;读各家文化读物(Palantir "Navigating Open-Ended Questions"、Anthropic Core Views on AI Safety/RSP);针对性准备 "why this company"(引真实客户、产品、近期发布);英文白板/口头表达过 loop mock。

**国内迁移读者注意:** 先判清你投的"大厂"是海外 lab、国内大厂 AI 落地岗、还是乙方项目制——再决定哪些细节适用。公司具体轮次、薪资数字、PPU 结构、NYC>SF 这类**别照搬**;能拿走的是上面的通用内核。

## 对土 FDE 的反哺

土线的人不面试,但这套面试语言里有三块能直接下场用:

1. **decomposition 五步 = 进现场第一天的脑内 checklist。** 进门别急着写需求文档,先按"真目标→谁在用/谁拍板→数据在哪/归谁→按风险拆→先做最薄能跑的切片"走一遍。这就是 Echo 的操作化。
2. **客户结果叙事 = 换下一单的话术。** 交付完别说"我做了个解析工具",要说"我把他录一张单从 8 分钟压到 90 秒"——这套数字既是面试的 STAR,也是你跟下一个老板谈价、要转介绍的弹药。
3. **eval 意识 = "我凭什么说真帮到他了"。** 大厂靠 eval harness 量化,土线没那套,但要把这股劲下沉成一个自问:别只听老板说"挺好用"(那是 R6:采信主管自评),要去看一线是不是真的天天在用、错单是不是真的少了。可验的标准在一线的行为里,不在拍板人的嘴里。

## 一句铁律

面试不评你的答案,评你**怎么想一个没见过的问题**。先澄清,持续讲思路,显式列假设,提最薄的能跑通的切片,再迭代。你已有的 Echo+Delta 就是答案——大厂线只是要你用面试语言把它讲出来,并补上一层企业约束。
