# 学习存档格式（state-schema）

学校要像学校，就得记得学生学到哪。进度存成一个本地 JSON，**跨会话可续学**。

## 存哪
- 目录：`~/.ha7ch-school/`
- 文件：`~/.ha7ch-school/{handle}.json`，默认 handle = `me`（单人自用时就用它）。
- 第一次上课时若目录不存在，`Write` 时会自动创建；读不到当新生处理，别报错。

## 什么时候读 / 写
- **每次加载 skill**：先 `Read ~/.ha7ch-school/{handle}.json` 判断新生/老生。
- **每教完一块、每测一次理解、每做完一次实操**：`Write` 更新（覆盖整份即可，文件很小）。
- 写之前先在脑子里合并旧值，别把已学的课覆盖没了。

## 结构
```json
{
  "handle": "me",
  "name": "学生怎么称呼自己(可空)",
  "enrolled": "2026-07-17",
  "last_seen": "2026-07-17",
  "current_course": "ai-native | fde | null",
  "level_read": "beginner | intermediate | advanced",
  "pace": "slow | normal | fast",
  "ability_profile": {
    "strong": "他强/熟的那块(如 商务·沟通·业务 / 技术·端到端构建)——从这儿切入",
    "weak": "他最弱、要压到后面重点精讲的那块",
    "basis": "依据(摸底自述 / 某次测出来的 / fde-pro 诊断=缺Delta)"
  },
  "interests": ["学生明显更来劲的方向，用于动态排课"],
  "lessons": {
    "ai-native/01-zero-token-design": {
      "status": "todo | in-progress | done | skipped",
      "comprehension": "weak | ok | strong | null",
      "notes": "一句话：他哪懂了/哪卡了",
      "at": "2026-07-17"
    }
  },
  "questions_asked": [
    { "q": "学生岔出去问过但暂缓展开的问题", "when": "2026-07-17" }
  ],
  "next_recommended": "ai-native/03-lab-cv-pro",
  "log": [
    "2026-07-17 入学，选 AI Native，摸底=intermediate",
    "2026-07-17 上完 01 零token设计，comprehension=strong，按其快进意愿跳过 02、直接排 03 实操"
  ]
}
```

## 字段说明
- `level_read` / `pace`：摸底定初值，之后按 pedagogy 第四节的信号动态调，调了就写回。
- `ability_profile`：**排课主轴**（见 pedagogy §1 头等原则）。摸底给初判，之后每测一次就更新——从 `strong` 那块切入、把 `weak` 那块压到后面重点精讲。FDE 学生可用 fde-pro 诊断结论直接填。
- `lessons` 的 key 用 lesson 文件的相对路径（去掉 `references/lessons/` 前缀、去掉 `.md`），如 `ai-native/01-zero-token-design`、`fde/02-labs`。
- `comprehension`：只有真测过才填；没测过填 JSON `null`（是字面量 `null`，不是字符串 `"null"`），别脑补。
- `next_recommended`：动态排课的结果，回归时用它接上（但仍给学生否决权）。
- `log`：一行一条流水，回归时能一眼看懂上次到哪。日期用真实当天日期。

## 注意
- 这是**单机本地**存档：将来别人装了这个 skill，各自机器上存各自的进度，互不干扰。
- 不往里存简历、隐私长文；那些交给 cv-pro / fde-pro 自己的存储。这里只存"学到哪、懂多少"。
