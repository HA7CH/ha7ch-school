# 共修节点 · GitHub 实验课：第一个 issue 和第一个 PR，就提在这所学校

> 实操对象：https://github.com/HA7CH/ha7ch-school （公开仓库，**你正在上的这所学校本身**）＋ 校友墙 `WALL.md`（合并后见 https://school.ha7ch.com/WALL.md ）｜ 类型：实验课(共修节点) ｜ 依赖：六个词的理解——通常来自概念课 `shared/github-concepts`；真懂 Git 的现场 30 秒补齐即可（见「导师怎么带」）
> 这不是模拟、不是沙盒。学生今天真实地：开出人生第一个 issue（入学打卡）→ 提出人生第一个 PR（把自己的名字写上校友墙）→ 被 Lawted 真实 review、合并后名字自动上线 school.ha7ch.com/WALL.md。六个词里前五个（repo/commit/branch+PR/issue/fork）当堂在真仓库上走完；第六个 merge 是道真实的异步关——**开出 PR 即成功**。

## 这节课要干什么（一句话）
让学生用"我表达意图、agent 执行、我验收"的 AI native 姿势，在 `HA7CH/ha7ch-school` 上完成：①第一个 issue（入学打卡）；②第一个 PR（往 `WALL.md` 末尾加上自己那一行）。**干活的命令全程零行**——学生唯一亲手做的是注册和登录授权，那是认证，不是干活。

## 开场（把实操钉在理念上）
> "概念课里说过（刚补过的也算）：命令是 agent 的事，词汇和判断是你的事。光听不算数。这节课你亲手走一遍——你只对我说话，我来跑命令；每一步我都会告诉你现在发生的事对应哪个词。做完之后，'开 issue''提 PR''fork''merge'这几个词对你就不再是名词解释，而是你干过的事。而且对象是真的：你的 PR 会被 Lawted 本人 review，合并那一刻起，school.ha7ch.com/WALL.md 上就有你的名字。"

可以顺手把 Lawted 自己的工作方式亮出来（一手原话，出处《我愿称之为🚽开发法》）：他修自己产品的 bug，流程就是——"我只管定位问题和建 issue，代码肯定不动"，然后让 Claude Code 去干，最后 agent 汇报"全部打包在 PR #102 中，等待你在 iPhone 上验证后合并"。**你今天做的，就是他每天做的。**

## 导师怎么带（谁干什么，先说清）
- **学生只做三件事**：注册/登录 GitHub（唯一要他亲手做的）、用自然语言说他想留什么话、在关键节点点头验收。
- **你（导师）负责**：跑全部命令（`gh` CLI）、每一步用六个词解说"刚才发生了什么"、把每个真实 URL 丢给学生自己点开看。
- **节奏**：一步一确认，别一口气跑完——这课的价值一半在动作、一半在解说。
- **没上过概念课直接进本课的学生**（真懂 Git 的彩蛋路径）：开场用 30 秒把六个词过一遍（别提"概念课里说过"），其余照走。

## 学生上手步骤（一步一确认）

### 第 0 步 · 检查装备
- **GitHub 账号**：没有 → 引导他浏览器打开 https://github.com 注册。**提醒一句：username 选个以后不脸红的——这就是你在这个世界的行业名片**（Lawted 简历上印的就是 github.com/lawted 这类地址）。
- **`gh` CLI**（`gh --version`）：没有 → macOS `brew install gh`；装不上直接走下面的**网页流**（见"降级路径"）。
- **登录**：跑 `gh auth status`，**核对回显的账号就是学生自己的 username**（公司电脑/借用机器常残留别人的登录，不是他就重新登录切换）。要登录时推荐 `gh auth login --web -h github.com`，并陪跑着说清流程：终端会给一个 8 位一次性码 → 回车自动开浏览器 → 把码贴进去 → 页面上点 Authorize。提示里问到 "Authenticate Git with your GitHub credentials?" **选 Yes**（否则待会儿 push 还会另外要密码；已经跳过的话事后补一句 `gh auth setup-git`）。交互卡住就换系统自带终端（Terminal / iTerm）跑同一条命令。
- **git 身份**：跑 `git config --global user.name` 和 `git config --global user.email`，为空就用学生的名字和 GitHub 注册邮箱设上——不设的话待会儿 commit 会直接报 "Please tell me who you are"。
- **点破一句**（顺带回扣）：刚才这些都是**认账凭证**，不是 AI 额度——GitHub 全程不收你一个 token。学生若已上过 cv-pro 实验课，就多问一句"想起 `cv_pat_` 没有？同一个道理"；还没上过就说"以后上 cv-pro 实验课你会再拿到一个类似的凭证，到时想起今天这一步"。

### 第 1 步 · 第一个 issue：入学打卡
1. 问学生想留什么话（从哪来、想学什么、想对学校说一句什么——三行以内，别写作文）。
2. 你来跑（内容用学生的话，别替他编），并立刻保存返回的 Issue URL 和编号——后面开 PR 时必须引用：
   ```
   ISSUE_URL=$(gh issue create --repo HA7CH/ha7ch-school \
     --title "[入学打卡] {学生的名字或handle}" \
     --body "从哪来：…
   想学什么：…
   想说的：…")
   ISSUE_NUMBER=${ISSUE_URL##*/}
   echo "$ISSUE_URL"
   ```
   （正文三行都用学生的原话；引号里用真实换行，别写 `\n`——bash 不会把它变成换行。确认 `ISSUE_NUMBER` 是纯数字再继续；如果会话中断，重新从 Issue URL 取编号，不能猜。）
3. 把返回的 issue URL 给学生**自己点开看**，然后解说："你刚在一个公开项目里，发出了你的第一条正式协作记录。它有编号、有你的名字、全网可见、永久可查——这就是'公开台账'。"
4. **FDE 课学生加一句**：你刚干的事，缩小一万倍就是 FDE 的日常——把嘴里的话变成一条可追踪的 issue。Lawted 的原话："……把这种极其模糊的需求逐渐梳理成明确的工作流，再变成 GitHub Issue，最后才变成生产级别的代码。"

### 第 2 步 · 第一个 PR：上校友墙
逐步跑、逐步解说（每步先说"现在我要做 X，对应的词是 Y"再动手）：
1. **fork（复印）**：`gh repo fork HA7CH/ha7ch-school --clone` → "刚才两件事一起发生了：把整所学校**复印了一份到你名下**（fork）——没人批准，也不需要批准；再把你名下这份**下载到了电脑上**（clone），生成了 `ha7ch-school/` 这个目录。"
   **接着 `cd ha7ch-school`——后面每一条命令都必须在这个目录里跑**，别在学生自己的项目目录里动 git。
2. **branch（平行草稿）**：`git checkout -b wall/{学生handle}` → "现在开了一份**平行草稿**，名字叫 `wall/{handle}`。接下来怎么改都动不到正本——这就是 branch 存在的意义。"
3. **改**：打开 `WALL.md`，照文件里写明的格式，在**末尾追加一行**（日期用今天、@学生的 username、一句话用他自己的话）。改完把这一行念给学生确认——**这是他的名字，一个字都要他点头**。
4. **commit（存档点）**：`git add WALL.md && git commit -m "wall: 新同学 @{handle} 上墙"` → "存档打好了：谁、何时、改了哪一行、为什么，写进历史了。"
5. **push + 开 PR（请过目）**：`git push -u origin wall/{学生handle}` → "push = 把你电脑上打好的存档**送回你 GitHub 名下的那份复印件**，这样全世界才看得到。" 然后开 PR，正文末尾必须带上 `Closes #Issue编号`，这样合并时入学打卡 Issue 才会自动关闭：
   ```
   gh pr create --repo HA7CH/ha7ch-school \
     --title "wall: 新同学 @{handle} 上墙" \
     --body "共修 GitHub 实验课实操。来自 {学生一句话自介}。

   Closes #${ISSUE_NUMBER}"
   ```
   → "申请单递出去了——从你的复印件，提回学校正本。" **验收 PR 正文确实出现了可点击的 `Closes #N`；只写 `#N` 不会自动关闭 Issue。**
6. **看 diff（验收界面）**：把 PR URL 给学生自己点开 → 点 **Files changed** → "绿色那一行就是你加的。以后你让任何 agent 改任何东西，验收看的就是这个界面。今天你在墙的这一侧（提交方），以后你多数时候在另一侧（把关方）。"

### 第 3 步 · 等 merge（真实世界的自动验收也是课）
- 如实告诉学生：校友墙机器人会先做一轮**硬边界 review**——只改 `WALL.md`、只在末尾加本人一行、格式正确，就自动合并；任何越界修改都不会自动动手，仍由 Lawted 人工 review。**PR 开出来，这节课就已经成功**。
- 再预告一件可能发生的事：如果有同学排在他前面先合并了，他的 PR 可能显示 conflict（两个人都改了文件末尾同一处）——**这不是他做错了**。机器人会验收新增行后安全汇总进主干，并在原 PR 留下回执；这本身就是真实协作的一课。
- PR 合并或被安全汇总后，机器人只在 `Closes #N` 明确指向同一作者的 Issue，或同一作者恰好只有一条入学 Issue 时，把它标记为 completed；证据不唯一就保留给人工判断。
- 讲完最后一环：merge 之后，Vercel 会自动重新部署，**不用任何人"发版"**，几分钟内刷新 https://school.ha7ch.com/WALL.md 就能看到他的名字——这就是"merge 即上线"。让他把这个网址存下来，明后天自己来看。

## 降级路径（按序尝试，别假装）
- **`gh` CLI 装不上 / 学生环境跑不了命令** → 走**网页流**，全程点鼠标：浏览器打开 https://github.com/HA7CH/ha7ch-school/blob/master/WALL.md → 点右上角铅笔 ✏️（Edit）→ GitHub 会提示需要 fork，**点一下 "Fork this repository" 即进入编辑器**（别以为卡住了）→ 末尾加一行 → 点 "Commit changes…"（GitHub 会自动把改动放进你 fork 的一个新分支）→ 照引导点到 "Create pull request"。顺势点破：GitHub 已经把 fork→branch→PR 整条流程做成了点鼠标的路径，网页流和命令流殊途同归。issue 同理可在仓库的 Issues 页点 "New issue" 手写。
- **网络到不了 github.com**（部分网络环境常见）→ 如实说明，换网络重试；实在不通，就把两步流程按上面的解说完整讲一遍、留成作业，进度记 `in-progress` 别记 `done`。
- **学生不想公开留名** → 尊重。username 本来就可以不是真名；再不行就只开 issue 不上墙、或干脆只围观你演示一遍（你可以现场对着仓库讲一个真实 PR 的 diff）。上墙永远是邀请，不是要求。

## 成功信号
- issue URL 和 PR URL 都真实存在、学生亲眼点开过自己那条；
- 学生能指着 PR 的 Files changed 说出"这行是我加的"。
- （不要求 merge 完成——那是道真实的异步关。）

## 做完必回扣（这才是实验课的理解检验）
1. **"除了登录授权那一下，你亲手敲过一行干活的命令吗？那你干的是什么？"**
   - 好答案信号：没有；我干的是表达意图（issue 内容、墙上那行话）和验收（确认 diff）——正好是 Lawted 说的"判断问题、澄清需求、定义边界"那半，命令那半归 agent。
2. **"用你自己的话说：issue 和 PR 各是干嘛的？"**
   - 好答案信号：issue = 把事挂到台面上（需求/问题的公开台账）；PR = 把改动正式提请过目（带 diff 的申请单）。
3. **FDE 课学生**："你和客户之间，issue 和 PR 分别对应 Echo/Delta 的哪半？"（issue 是 Echo 的落点——摸清的需求落成台账；PR 是 Delta 的交付单元——做出来的东西提请验收。）
   **AI Native 课学生**："这套流程里哪一步印证了'零 token'那套生态逻辑？"（好答案信号：整条协作链公开、免费、不烧一个 token；产品和课程都长在这条公开基础设施上。）

## 收尾 & 排下一步
- `Write` 进度：`shared/github-lab-first-pr` done（网络不通留作业则 `in-progress`）；notes 记 issue/PR 的 URL，方便他回来查 merge 状态。
- 提醒学生：merge 后记得回 https://school.ha7ch.com/WALL.md 看自己名字上线——那一眼，比这节课讲的任何话都记得牢。
- 回到学生原本所在课程的图谱接着排（从哪门课接进来的回哪门课）：FDE 课学生常接 `fde/03-labs`（刚练的"把话变成 issue"马上要在擂台用）；AI Native 课学生常接 `ai-native/03-lab-cv-pro` 或继续原进度——都不是规定，按他此刻的状态定。
