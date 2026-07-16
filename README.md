# HA7CH AI Native School 🎓

> 把 HA7CH 变成一所学校。加载即入学——一个懂行的 Agent 导师，带着你学。

这不是一堆文档让你自己啃，是一个 **Claude Code skill**：你的 Agent 加载它，就变成 HA7CH 这所 AI Native 学校的导师本人，坐在你旁边、按你的能力和节奏，一节一节把 HA7CH 的真东西讲进你脑子里。

## 它跟别的"教程 skill"不一样在哪

- **加载即入学**：一加载就主动开口问你——想先上哪门课？不用你去翻。
- **skill 里面套 skill（渐进式加载）**：入口只是"教务处"，每门课、每一节课都是独立文件，**走到哪节才加载哪节**，上下文永远精简。
- **主线程带学，随时能打断**：教学全程在主对话里，你随时提问、随时让导师去查资料，但主线永远是"这堂课"——不会把你甩进一个看不见的后台。
- **按能力画像动态排课**：课程顺序不是死的 01→02→03。导师先摸清你强在哪、虚在哪，**从你熟的那块切入，把你最弱的那块压到后面、重点精讲**。商务背景想做 FDE？先过商务，技术压轴补。技术背景？先讲技术，再逼你去现场摸需求。
- **真上手，不是模拟**：实验课直接把 HA7CH 的真产品拉起来让你用一次（把简历变成 `cv.ha7ch.com` 活页面、被 `fde-pro` 诚实诊断一次）。
- **跨会话记进度**：像真学校一样记得你学到哪、懂多少，下次接着上。

## 目前开两门课

### ① AI Native
搞懂这个时代到底怎么工作。
1. **零 Token 设计** —— AI 产品不必自己烧 token，让用户的 agent 干活、产品接住结果。
2. **ChatGPT Work 之后** —— 这套架构怎么从"开发者的设计"变成"所有人的设计"。
3. **实操：把简历变活** —— 亲手用 `cv.ha7ch.com` 做一个零 token / AI native 产品出来。
4. **HA7CH 精选** —— 按兴趣延伸，把内核连成面。

### ② FDE（Forward Deployed Engineer）
搞懂 FDE 是什么、你适不适合、怎么入局。
1. **FDE 到底是什么** —— 起点终点四条硬指标 + Echo/Delta，分清它和外包。
2. **实操：被诊断 & 货代擂台** —— 被 `fde-pro` 诚实照一次（缺 Echo 还是 Delta），再亲手练一次摸真需求。
3. **一线四城调查** —— 北上深杭 129 位 builder，"有生意没行业"的真实市场坐标。

## 安装

把这个仓库放到你的 Claude Code 个人 skill 目录：

```bash
git clone <this-repo> ~/.claude/skills/ha7ch-school
# 或把仓库内容复制到 ~/.claude/skills/ha7ch-school/
```

然后在 Claude Code 里 `/ha7ch-school`（或对它说"带我学 AI Native / 想学 FDE / ha7ch school"）即可入学。

**配套 skill（实验课会用到，按需装）**：`cv-pro`、`fde-pro`（都在小红书 SkillHub 可装）。没装也能上，导师会把实操降级成带你走一遍。

## 结构

```
SKILL.md                       入学处：加载即问学哪门课、维护学习存档、按能力画像排课
references/
  pedagogy.md                  教学法内核：动态排课引擎（先强后弱、弱项压轴精讲）
  state-schema.md              学习存档格式（跨会话续学）
  course-ai-native.md          AI Native 课程大纲 + 自适应分支
  course-fde.md                FDE 课程大纲 + 自适应分支
  sources.md                   全部 source 清单（文章 URL / 本地素材 / 实操产品）
  lessons/
    ai-native/                 4 节讲义
    fde/                       3 节讲义
```

每节讲义都锚定真实素材：HA7CH 的原文文章、Lawted 本人的口播稿、以及真产品。

## 学习进度存哪

`~/.ha7ch-school/{handle}.json`（单机本地，各自机器存各自的，互不干扰）。

---

Made by HA7CH · 让每个人都能跟着懂行的人，学会在 AI 时代真正地工作。
