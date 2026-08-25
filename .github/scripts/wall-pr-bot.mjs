import {
  appendEntry,
  isAdmissionIssue,
  parseClosingIssueNumbers,
  validateWallChange,
} from "./wall-pr-policy.mjs";

const API_ROOT = process.env.GITHUB_API_URL || "https://api.github.com";
const token = process.env.GITHUB_TOKEN;
const repository = process.env.GITHUB_REPOSITORY;
const prNumber = Number(process.env.PR_NUMBER);
const marker = "<!-- wall-pr-bot -->";

if (!token) throw new Error("缺少 GITHUB_TOKEN");
if (!repository || !repository.includes("/")) throw new Error("缺少有效的 GITHUB_REPOSITORY");
if (!Number.isInteger(prNumber) || prNumber <= 0) throw new Error("缺少有效的 PR_NUMBER");

const [owner, repo] = repository.split("/");

function delay(ms) {
  return new Promise((resolve) => setTimeout(resolve, ms));
}

async function api(path, { method = "GET", body, allow = [] } = {}) {
  const response = await fetch(`${API_ROOT}${path}`, {
    method,
    headers: {
      Accept: "application/vnd.github+json",
      Authorization: `Bearer ${token}`,
      "X-GitHub-Api-Version": "2022-11-28",
      "User-Agent": "ha7ch-school-wall-pr-bot",
    },
    body: body === undefined ? undefined : JSON.stringify(body),
  });

  const text = await response.text();
  let payload = null;
  if (text) {
    try {
      payload = JSON.parse(text);
    } catch {
      payload = text;
    }
  }

  if (!response.ok && !allow.includes(response.status)) {
    const detail = typeof payload === "string" ? payload : payload?.message || JSON.stringify(payload);
    const error = new Error(`${method} ${path} -> ${response.status}: ${detail}`);
    error.status = response.status;
    error.payload = payload;
    throw error;
  }
  return { status: response.status, data: payload };
}

async function getFile(repoFullName, path, ref) {
  const encodedPath = path.split("/").map(encodeURIComponent).join("/");
  const result = await api(`/repos/${repoFullName}/contents/${encodedPath}?ref=${encodeURIComponent(ref)}`);
  const data = result.data;
  if (!data || data.type !== "file" || data.encoding !== "base64") {
    throw new Error(`无法读取 ${repoFullName}/${path}@${ref}`);
  }
  return {
    content: Buffer.from(String(data.content).replace(/\n/g, ""), "base64").toString("utf8"),
    sha: data.sha,
  };
}

async function getPullRequest() {
  return (await api(`/repos/${owner}/${repo}/pulls/${prNumber}`)).data;
}

async function getPullFiles() {
  return (await api(`/repos/${owner}/${repo}/pulls/${prNumber}/files?per_page=100`)).data;
}

async function upsertComment(message) {
  const body = `${marker}\n${message}`;
  const comments = (await api(`/repos/${owner}/${repo}/issues/${prNumber}/comments?per_page=100`)).data;
  const existing = comments.find(
    (comment) => comment.user?.type === "Bot" && String(comment.body || "").includes(marker),
  );
  if (existing) {
    await api(`/repos/${owner}/${repo}/issues/comments/${existing.id}`, {
      method: "PATCH",
      body: { body },
    });
  } else {
    await api(`/repos/${owner}/${repo}/issues/${prNumber}/comments`, {
      method: "POST",
      body: { body },
    });
  }
}

async function closePullRequest() {
  await api(`/repos/${owner}/${repo}/pulls/${prNumber}`, {
    method: "PATCH",
    body: { state: "closed" },
  });
}

async function closeAdmissionIssues(pr) {
  const explicitNumbers = parseClosingIssueNumbers(pr.body || "");
  const candidates = [];

  for (const issueNumber of explicitNumbers) {
    const issueResult = await api(`/repos/${owner}/${repo}/issues/${issueNumber}`, { allow: [404] });
    if (issueResult.status === 200 && isAdmissionIssue(issueResult.data, pr.user.login, { explicit: true })) {
      candidates.push(issueResult.data);
    }
  }

  if (candidates.length === 0 && explicitNumbers.length === 0) {
    const authored = (
      await api(
        `/repos/${owner}/${repo}/issues?state=open&creator=${encodeURIComponent(pr.user.login)}&per_page=100`,
      )
    ).data.filter((issue) => isAdmissionIssue(issue, pr.user.login));
    if (authored.length === 1) candidates.push(authored[0]);
  }

  const unique = [...new Map(candidates.map((issue) => [issue.number, issue])).values()];
  for (const issue of unique) {
    await api(`/repos/${owner}/${repo}/issues/${issue.number}`, {
      method: "PATCH",
      body: { state: "closed", state_reason: "completed" },
    });
  }
  return unique.map((issue) => issue.number);
}

async function waitForMergeability(initialPr) {
  let current = initialPr;
  for (let attempt = 0; attempt < 6 && current.mergeable === null; attempt += 1) {
    await delay(1500);
    current = await getPullRequest();
  }
  return current;
}

async function mergeCleanPullRequest(pr) {
  const result = await api(`/repos/${owner}/${repo}/pulls/${prNumber}/merge`, {
    method: "PUT",
    allow: [405, 409, 422],
    body: {
      merge_method: "squash",
      sha: pr.head.sha,
      commit_title: `${pr.title} (#${prNumber})`,
    },
  });
  return result.status === 200 && result.data?.merged === true;
}

async function appendConflictEntry(defaultBranch, line) {
  for (let attempt = 1; attempt <= 4; attempt += 1) {
    const current = await getFile(repository, "WALL.md", defaultBranch);
    const next = appendEntry(current.content, line);
    if (!next.added) return { added: false };

    const result = await api(`/repos/${owner}/${repo}/contents/WALL.md`, {
      method: "PUT",
      allow: [409, 422],
      body: {
        branch: defaultBranch,
        message: `wall: 汇总 @${line.match(/ · @([^ ]+) · /)?.[1] || "student"} 的上墙记录 (#${prNumber})`,
        content: Buffer.from(next.content, "utf8").toString("base64"),
        sha: current.sha,
      },
    });
    if (result.status === 200 || result.status === 201) return { added: true };
    await delay(500 * attempt);
  }
  throw new Error("主干在多次重试中持续变化，停止自动汇总");
}

async function main() {
  const repoInfo = (await api(`/repos/${owner}/${repo}`)).data;
  let pr = await getPullRequest();

  if (pr.state !== "open") {
    console.log(`PR #${prNumber} 已不是 open，跳过。`);
    return;
  }
  if (pr.base.ref !== repoInfo.default_branch) {
    await upsertComment(
      `⚠️ 校友墙自动验收未通过：PR 必须以默认分支 \`${repoInfo.default_branch}\` 为目标。机器人没有修改任何内容。`,
    );
    return;
  }

  const [files, base, head] = await Promise.all([
    getPullFiles(),
    getFile(repository, "WALL.md", pr.base.sha),
    getFile(pr.head.repo.full_name, "WALL.md", pr.head.sha),
  ]);
  const policy = validateWallChange({
    pr,
    files,
    baseContent: base.content,
    headContent: head.content,
  });

  if (!policy.ok) {
    const reasons = policy.errors.map((error) => `- ${error}`).join("\n");
    await upsertComment(
      `⚠️ 校友墙自动验收未通过，本 PR 保留给人工 review。机器人没有修改任何内容。\n\n${reasons}`,
    );
    process.exitCode = 1;
    return;
  }

  const currentWall = await getFile(repository, "WALL.md", repoInfo.default_branch);
  if (currentWall.content.split("\n").includes(policy.line)) {
    const closedIssues = await closeAdmissionIssues(pr);
    await upsertComment(
      `✅ 这条记录已经存在于 \`${repoInfo.default_branch}\`；本 PR 按已完成关闭。${
        closedIssues.length ? `\n\n已完成 Issue：${closedIssues.map((n) => `#${n}`).join("、")}` : ""
      }`,
    );
    await closePullRequest();
    return;
  }

  pr = await waitForMergeability(pr);
  if (pr.mergeable === true) {
    const merged = await mergeCleanPullRequest(pr);
    if (merged) {
      const closedIssues = await closeAdmissionIssues(pr);
      await upsertComment(
        `✅ 校友墙自动验收通过，已 squash merge。${
          closedIssues.length ? `\n\n已完成 Issue：${closedIssues.map((n) => `#${n}`).join("、")}` : ""
        }`,
      );
      return;
    }
    pr = await waitForMergeability(await getPullRequest());
  }

  if (pr.mergeable === false || pr.mergeable_state === "dirty") {
    await appendConflictEntry(repoInfo.default_branch, policy.line);
    const closedIssues = await closeAdmissionIssues(pr);
    await upsertComment(
      `✅ 新增行已通过验收。因为多人同时在 \`WALL.md\` 末尾追加产生并发冲突，机器人已把你的原文安全汇总进 \`${repoInfo.default_branch}\`，本 PR 按已完成关闭。${
        closedIssues.length ? `\n\n已完成 Issue：${closedIssues.map((n) => `#${n}`).join("、")}` : ""
      }`,
    );
    await closePullRequest();
    return;
  }

  await upsertComment(
    "✅ 校友墙内容验收通过，但 GitHub 当前不允许自动合并。机器人没有绕过保护规则，本 PR 保留给人工处理。",
  );
  process.exitCode = 1;
}

main().catch(async (error) => {
  console.error(error);
  try {
    await upsertComment(
      `⚠️ 校友墙机器人运行失败，已停止自动操作并保留本 PR。\n\n\`${String(error.message).slice(0, 600)}\``,
    );
  } catch (commentError) {
    console.error("同时无法写入失败回执：", commentError);
  }
  process.exitCode = 1;
});
