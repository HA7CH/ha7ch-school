# AI Native · 第 3 课（实验课）：把你的简历变活

> 实操产品：`cv-pro` skill + https://cv.ha7ch.com ｜ 类型：实验课 ｜ 前置：`01`、`02`（理念）
> 这是把前两课的"零 token / AI native"从道理变成学生手上一个真东西。

## 这节课要干什么（一句话）
让学生**亲手用一句话**，让 Claude 调 `cv-pro` 把自己的简历发布成 `cv.ha7ch.com/{handle}` 活页面——全程不被要一个 API key、不扣一份 AI 额度，亲身体会"一个零 token / AI native 产品长什么样"。

## 开场（把实操钉在理念上）
> "前两节我们讲了零 token 设计——推理让给用户的 agent、产品只接住结果。光听不算数。这节课你自己做一个出来：你不会碰任何后台表单，你只对我说一句话，我（Claude）就通过 cv-pro 这个 skill 去跑真实命令，把你的简历变成一个在线活页面。你出一句话和一份简历，其它我包了。这就是 AI native 产品的样子。"

## 导师怎么带（用 Skill 工具把 cv-pro 拉起来）
**触发方式**：在对话里调用 `Skill(skill="cv-pro")`，或对学生说"我现在帮你把简历发布上去"再据 cv-pro 的 SKILL.md 驱动真实 `npx @ha7ch/cv-pro@latest ...` 命令。学生不用手敲 npx，只用自然语言指挥你。
> ⚠️ 环境注意：cv-pro 认账要连 cv.ha7ch.com，某些托管沙箱会 403 `host_not_allowed`。这节课在**本机 Claude Code CLI** 跑最稳。

## 学生上手步骤（你带着走，一步一确认）
1. **网页认领 handle 拿 token**：让学生浏览器打开 https://cv.ha7ch.com ，在 Step 1「Create your online CV」的 `cv.ha7ch.com/` 处选一个自己的 username（就是 `{handle}`），点「Get token →」；Step 2 会显示他的真实 token（`cv_pat_` 开头），复制保存。**跟学生点破：这个 token 是"认账凭证"，不是 AI 额度**——正好印证零 token。
2. **让 cv-pro 记住 token**：你去跑 `npx @ha7ch/cv-pro@latest login <cv_pat_...>`（会先 whoami 校验），再 `npx @ha7ch/cv-pro@latest whoami` 确认回显的 handle 就是他刚认领的。
3. **把简历整理成 resume.json**：先跑 `npx @ha7ch/cv-pro@latest schema` 看字段结构（top-level：header / personalInfo / experience / education / projectsRecent / projectsDetailed / skills / contact）。把学生的 PDF/文本丢给你，你按 schema 解析成 JSON，存 `resume.json`。
   - **踩坑对照**（照抄会被拒）：教育用 `school`（不是 institution）；经历条目用 `bullets` 数组（不是 description）；职位用 `role`（不是 title/jobTitle）；`username`/`meta` 由服务端管，别发。
4. **发布**：跑 `npx @ha7ch/cv-pro@latest update resume.json` 整份写回。schema 严格、未知键会被拒；报错时 CLI 会逐条列 issues/allowed 值，照着改再发。成功回显 `View at cv.ha7ch.com/{handle}`——**把这个真实链接给学生，别自己拼**。
5. **打开看**：跑 `npx @ha7ch/cv-pro@latest open` 在浏览器打开 `cv.ha7ch.com/{handle}`，确认渲染成在线页面。
   - （延伸钩子）dashboard 在 `cv.ha7ch.com/{handle}/dashboard`，能看定向变体与分享链接（如 `?company=openai`）——留作以后"给不同公司各存一版"的引子。

## 成功信号
学生在浏览器里打开了自己的 `cv.ha7ch.com/{handle}`，看到简历渲染成一个真实可分享的在线活页面（`open` 成功、`update` 回显了 `View at ...`）。

## 做完必回扣（这才是实验课的理解检验）
问学生：
1. **"你刚才这一路，被要过 API key 吗？扣过 AI 额度吗？那唯一那个 `cv_pat_` 是什么？"**
   - 好答案信号：没被要过算力；`cv_pat_` 只是认账 PAT，不是 token 货币——这就是"零 token"。
2. **"传统简历托管站你要怎么用？和你刚才这套比，差在哪？"**
   - 好答案信号：传统站是打开后台一个个填表单字段；这套是"说人话 + Claude 帮你把 PDF 变成活页面"，界面退到自然语言背后，数据与能力在 CLI/服务端，人只负责表达意图。
3. **"CV PRO 这个产品，是自己烧 token 跑推理，还是让你的 agent 干活它接结果？"**
   - 好答案信号：能对上第 1 课——解析/改写这些推理由 Claude（用户的 agent）跑，产品只管 schema/数据库/渲染/分发。

## 收尾 & 排下一课
- `Write` 进度：标 `03-lab-cv-pro` done + 回扣答得如何。
- 下一课默认：`ai-native/04-ha7ch-picks`（顺兴趣再读几篇，把内核连成面）；或若学生 FDE 意向冒头，引导他去 FDE 课。
