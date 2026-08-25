const WALL_PATH = "WALL.md";

function normalizeLogin(value) {
  return String(value || "").trim().toLowerCase();
}

export function parseClosingIssueNumbers(body = "") {
  const numbers = new Set();
  const pattern = /\b(?:close[sd]?|fix(?:e[sd])?|resolve[sd]?)\s+#(\d+)\b/gi;
  for (const match of String(body).matchAll(pattern)) {
    numbers.add(Number(match[1]));
  }
  return [...numbers];
}

export function isAdmissionIssue(issue, login, { explicit = false } = {}) {
  if (!issue || issue.pull_request || issue.state !== "open") return false;
  if (normalizeLogin(issue.user?.login) !== normalizeLogin(login)) return false;
  if (explicit) return true;

  const title = String(issue.title || "");
  const body = String(issue.body || "");
  return title.includes("入学打卡") || (body.includes("从哪来") && body.includes("想学"));
}

export function appendEntry(content, line) {
  const lines = String(content).split("\n");
  if (lines.includes(line)) return { content, added: false };
  if (!String(content).endsWith("\n")) {
    throw new Error("主干 WALL.md 末尾缺少换行，停止自动写入");
  }
  return { content: `${content}${line}\n`, added: true };
}

export function validateWallChange({ pr, files, baseContent, headContent }) {
  const errors = [];

  if (!pr || pr.state !== "open") errors.push("PR 不是 open 状态");
  if (pr?.draft) errors.push("Draft PR 不自动处理");
  if (!pr?.user?.login) errors.push("无法确认 PR 作者");

  if (!Array.isArray(files) || files.length !== 1) {
    errors.push("必须且只能修改一个文件");
  } else {
    const [file] = files;
    if (file.filename !== WALL_PATH) errors.push(`只能修改 ${WALL_PATH}`);
    if (file.status !== "modified") errors.push(`${WALL_PATH} 必须是追加修改`);
    if (file.additions !== 1 || file.deletions !== 0 || file.changes !== 1) {
      errors.push(`${WALL_PATH} 必须只新增一行，不能删除或改写旧内容`);
    }
  }

  if (typeof baseContent !== "string" || typeof headContent !== "string") {
    errors.push("无法读取 PR 两端的 WALL.md");
    return { ok: false, errors };
  }

  if (!baseContent.endsWith("\n")) errors.push("基线 WALL.md 末尾缺少换行");
  if (!headContent.startsWith(baseContent)) {
    errors.push("PR 改写了 WALL.md 的既有内容，不是纯末尾追加");
    return { ok: false, errors };
  }

  const suffix = headContent.slice(baseContent.length);
  const suffixLines = suffix.split("\n");
  if (suffixLines.length !== 2 || suffixLines[1] !== "" || !suffixLines[0]) {
    errors.push("必须在 WALL.md 末尾恰好追加一行，并保留文件末尾换行");
    return { ok: false, errors };
  }

  const line = suffixLines[0];
  const match = line.match(
    /^- (\d{4}-\d{2}-\d{2}) · @([A-Za-z0-9](?:[A-Za-z0-9-]{0,37}[A-Za-z0-9])?) · (\S.*)$/,
  );
  if (!match) {
    errors.push("新增行不符合 `- YYYY-MM-DD · @GitHub用户名 · 一句话` 格式");
    return { ok: false, errors, line };
  }

  const [, date, handle, message] = match;
  const parsedDate = new Date(`${date}T00:00:00Z`);
  if (Number.isNaN(parsedDate.getTime()) || parsedDate.toISOString().slice(0, 10) !== date) {
    errors.push("日期不是有效的 YYYY-MM-DD");
  }
  if (normalizeLogin(handle) !== normalizeLogin(pr.user.login)) {
    errors.push(`墙上用户名 @${handle} 必须与 PR 作者 @${pr.user.login} 一致`);
  }
  if (message.length > 500) errors.push("一句话超过 500 个字符，请先人工 review");
  if (/[\u0000-\u001f\u007f]/.test(message)) errors.push("一句话包含不可见控制字符");

  return { ok: errors.length === 0, errors, line, date, handle, message };
}
