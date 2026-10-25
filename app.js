(() => {
  "use strict";

  const $ = (sel) => document.querySelector(sel);

  const el = {
    code: $("#code"),
    fileName: $("#fileName"),
    fileStats: $("#fileStats"),
    cursorInfo: $("#cursorInfo"),
    openBtn: $("#openBtn"),
    fileInput: $("#fileInput"),
    langSel: $("#langSel"),
    sampleSel: $("#sampleSel"),
    clearBtn: $("#clearBtn"),
    undoBtn: $("#undoBtn"),
    runBtn: $("#runBtn"),
    reportCard: $("#reportCard"),
    reportMeta: $("#reportMeta"),
    scanState: $("#scanState"),
    scanText: $("#scanText"),
    mLang: $("#mLang"),
    mLangNote: $("#mLangNote"),
    mIssues: $("#mIssues"),
    mIssuesNote: $("#mIssuesNote"),
    mAi: $("#mAi"),
    mComplex: $("#mComplex"),
    mComplexNote: $("#mComplexNote"),
    aiPct: $("#aiPct"),
    aiVerdict: $("#aiVerdict"),
    aiNote: $("#aiNote"),
    aiConf: $("#aiConf"),
    aiConfFill: $("#aiConfFill"),
    gaugeArc: $("#gaugeArc"),
    tabIssues: $("#tabIssues"),
    tabSuggestions: $("#tabSuggestions"),
    tabAlgos: $("#tabAlgos"),
    tabSignals: $("#tabSignals"),
    panelIssues: $("#panel-issues"),
    panelSuggestions: $("#panel-suggestions"),
    panelAlgos: $("#panel-algos"),
    panelAi: $("#panel-ai"),
    panelOverview: $("#panel-overview"),
    toast: $("#toast"),
  };

  const LANGS = {
    javascript: "JavaScript", typescript: "TypeScript", python: "Python", java: "Java",
    go: "Go", rust: "Rust", c: "C", cpp: "C++", html: "HTML", css: "CSS",
    sql: "SQL", json: "JSON", text: "纯文本",
  };
  const EXT_LANG = {
    js: "javascript", mjs: "javascript", cjs: "javascript", jsx: "javascript",
    ts: "typescript", tsx: "typescript", mts: "typescript", cts: "typescript",
    py: "python", pyw: "python", pyi: "python",
    java: "java", go: "go", rs: "rust",
    c: "c", h: "c",
    cc: "cpp", cpp: "cpp", cxx: "cpp", hpp: "cpp", hh: "cpp", hxx: "cpp",
    html: "html", htm: "html", xhtml: "html",
    css: "css", scss: "css", sass: "css",
    sql: "sql",
    json: "json", jsonc: "json",
    txt: "text", md: "text", markdown: "text", log: "text", csv: "text",
  };

  function languageFromFileName(name) {
    const match = /\.([a-z0-9]+)\s*$/i.exec(String(name || "").trim());
    if (!match) return null;
    const ext = match[1].toLowerCase();
    const id = EXT_LANG[ext];
    return id ? { id, ext } : null;
  }

  /* ================= 示例 ================= */
  const SAMPLES = {
    "demo-js": {
      name: "demo.js",
      code: [
        "// 综合演示：可精简的 if/else + 一个冒泡排序",
        "function isAdult(age) {",
        "  if (age >= 18) {",
        "    return true;",
        "  } else {",
        "    return false;",
        "  }",
        "}",
        "",
        "function bubbleSort(arr) {",
        "  for (let i = 0; i < arr.length - 1; i++) {",
        "    for (let j = 0; j < arr.length - 1 - i; j++) {",
        "      if (arr[j] > arr[j + 1]) {",
        "        const temp = arr[j];",
        "        arr[j] = arr[j + 1];",
        "        arr[j + 1] = temp;",
        "      }",
        "    }",
        "  }",
        "  return arr;",
        "}",
        "",
        "let count = 0;",
        "count = count + 1;",
        "console.log(bubbleSort([3, 1, 2]), count);",
      ].join("\n"),
    },
    "js-buggy": {
      name: "discount.js",
      code: [
        "// 这是一个计算折扣的函数",
        "// 首先，我们定义一些变量",
        "var price = 100;",
        'var discount = "0.2";',
        "",
        "function calcTotal(price, discount) {",
        "  // 检查参数是否为空",
        "  if (price == null || discount == undefined) {",
        "    return 0;",
        "  }",
        "  try {",
        "    let total = price - price * discount;",
        '    console.log("total:", total);',
        "    return total;",
        "  } catch (e) {}",
        "}",
        "",
        "// 把结果写到页面上",
        'document.getElementById("total").innerHTML = "<b>" + calcTotal(price, discount) + "</b>";',
        "",
        'const apiKey = "sk-live-1234567890abcdef";',
        'const result = eval("1 + 1");',
        "",
        "// TODO: 这里以后要加缓存",
        "function calcTotal(price) {",
        "  return price;",
        "}",
      ].join("\n"),
    },
    "simplify-js": {
      name: "simplify.js",
      code: [
        "function isAdult(age) {",
        "  if (age >= 18) {",
        "    return true;",
        "  } else {",
        "    return false;",
        "  }",
        "}",
        "",
        "function hasItem(arr, item) {",
        "  if (arr.indexOf(item) !== -1) {",
        "    return true;",
        "  } else {",
        "    return false;",
        "  }",
        "}",
        "",
        "let count = 0;",
        "count = count + 1;",
        "console.log(count);",
      ].join("\n"),
    },
    "bubble-js": {
      name: "bubbleSort.js",
      code: [
        "function bubbleSort(arr) {",
        "  for (let i = 0; i < arr.length - 1; i++) {",
        "    for (let j = 0; j < arr.length - 1 - i; j++) {",
        "      if (arr[j] > arr[j + 1]) {",
        "        const temp = arr[j];",
        "        arr[j] = arr[j + 1];",
        "        arr[j + 1] = temp;",
        "      }",
        "    }",
        "  }",
        "  return arr;",
        "}",
        "",
        "const nums = [5, 2, 9, 1];",
        "console.log(bubbleSort(nums));",
      ].join("\n"),
    },
    "binary-py": {
      name: "binary_search.py",
      code: [
        "def binary_search(nums, target):",
        "    left, right = 0, len(nums) - 1",
        "    while left <= right:",
        "        mid = (left + right) // 2",
        "        if nums[mid] == target:",
        "            return mid",
        "        elif nums[mid] < target:",
        "            left = mid + 1",
        "        else:",
        "            right = mid - 1",
        "    return -1",
        "",
        "print(binary_search([1, 3, 5, 7, 9], 7))",
      ].join("\n"),
    },
    "py-ai": {
      name: "process_data.py",
      code: [
        "# 这是一个用于处理用户数据的函数",
        "# 首先，我们导入必要的库",
        "import json",
        "import os",
        "",
        "def process_data(data, options=[]):",
        '    """Process the data and return the result."""',
        "    # 检查数据是否为空",
        "    if data is None:",
        "        return []",
        "    result = []",
        "    for item in data:",
        "        # 遍历每一个元素",
        "        if item == None:",
        "            continue",
        "        # 将元素添加到结果列表",
        "        result.append(item)",
        "    return result",
        "",
        "def main():",
        "    # 主函数入口",
        "    data = [1, 2, 3]",
        "    print(process_data(data))",
        "",
        'if __name__ == "__main__":',
        "    main()",
      ].join("\n"),
    },
    "ts-clean": {
      name: "loadUser.ts",
      code: [
        "interface User {",
        "  id: number;",
        "  name: string;",
        "}",
        "",
        "async function loadUser(id: number): Promise<User | null> {",
        "  const res = await fetch(`/api/users/${id}`);",
        "  if (!res.ok) {",
        "    return null;",
        "  }",
        "  return (await res.json()) as User;",
        "}",
        "",
        "export { loadUser };",
      ].join("\n"),
    },
    "sql-risk": {
      name: "query.sql",
      code: [
        "SELECT * FROM users WHERE name = '\" + userName + \"';",
        "",
        "DELETE FROM logs;",
        "",
        "SELECT id, name FROM users WHERE id = 1;",
      ].join("\n"),
    },
    "rust-warn": {
      name: "main.rs",
      code: [
        "fn main() {",
        '    let value = std::env::var("PORT").unwrap();',
        '    println!("{}", value);',
        "}",
      ].join("\n"),
    },
    "html-mixed": {
      name: "index.html",
      code: [
        "<!doctype html>",
        "<html>",
        "  <body>",
        '    <button onclick="buy()">Buy</button>',
        "    <script>",
        "      function buy() {",
        '        document.write("thanks");',
        "      }",
        "    </script>",
        "  </body>",
        "</html>",
      ].join("\n"),
    },
  };

  /* ================= 状态 ================= */
  const state = {
    analysis: null,
    activeTab: "issues",
    debounce: 0,
    scan: 0,
    busy: false,
    fileLock: false,
  };

  /* ================= 编辑器 ================= */
  let cm = null;
  let suppressChange = false;
  let fallbackBound = false;
  let editorModeKey = "";

  function editorModeFor(lang) {
    switch (lang) {
      case "javascript": return "javascript";
      case "typescript": return { name: "javascript", typescript: true };
      case "json": return { name: "javascript", json: true };
      case "python": return "python";
      case "sql": return "sql";
      case "html": return "htmlmixed";
      case "css": return "css";
      case "rust": return "rust";
      case "go": return "go";
      case "java": return "text/x-java";
      case "c": return "text/x-csrc";
      case "cpp": return "text/x-c++src";
      default: return null;
    }
  }

  function setEditorMode(lang) {
    if (!cm) return;
    const mode = editorModeFor(lang);
    const key = typeof mode === "string" ? mode : JSON.stringify(mode);
    if (key === editorModeKey) return;
    editorModeKey = key;
    cm.setOption("mode", mode);
  }

  function setCode(value, opts = {}) {
    const text = String(value == null ? "" : value);
    suppressChange = true;
    if (cm) {
      cm.setValue(text);
      if (opts.resetHistory && typeof cm.clearHistory === "function") cm.clearHistory();
    } else {
      el.code.value = text;
    }
    suppressChange = false;
    el.code.value = text;
    updateStats();
    updateCursor();
  }

  function updateCursor() {
    if (!el.cursorInfo) return;
    if (cm) {
      const pos = cm.getCursor();
      const selected = cm.getSelection();
      el.cursorInfo.textContent = "行 " + (pos.line + 1) + ", 列 " + (pos.ch + 1) +
        (selected ? " · 选中 " + selected.length : "");
      return;
    }
    const pos = el.code.selectionStart || 0;
    const lines = el.code.value.slice(0, pos).split("\n");
    el.cursorInfo.textContent = "行 " + lines.length + ", 列 " + (lines[lines.length - 1].length + 1);
  }

  function scheduleAnalysis() {
    clearTimeout(state.debounce);
    const code = el.code.value;
    if (!code.trim()) { renderEmpty(); return; }
    if (code.length > 150000) {
      el.scanText.textContent = "代码过长";
      return;
    }
    state.debounce = window.setTimeout(() => analyzeNow(), 700);
  }

  function showCompletion(editor) {
    if (!editor || !editor.showHint || !window.CodeMirror || !window.CodeMirror.hint) return;
    const mode = editor.getMode();
    const name = mode && mode.name;
    const key = name === "htmlmixed" ? "html" : name;
    const helper = window.CodeMirror.hint[key] || window.CodeMirror.hint.anyword;
    if (!helper) return;
    // JS 提示会带上整个浏览器全局表（上千项），只保留最相关的一批
    const limited = (cmInstance, options) => {
      const result = helper(cmInstance, options);
      if (!result) return result;
      const list = Array.isArray(result) ? result : result.list;
      if (!list || list.length <= 60) return result;
      const trimmed = list.slice(0, 60);
      if (Array.isArray(result)) return trimmed;
      result.list = trimmed;
      return result;
    };
    editor.showHint({ hint: limited, completeSingle: false });
  }

  function bindFallbackEditor() {
    if (fallbackBound) return;
    fallbackBound = true;
    el.code.style.display = "";
    el.code.addEventListener("input", () => {
      updateStats();
      updateCursor();
      scheduleAnalysis();
    });
    el.code.addEventListener("keydown", (event) => {
      if (event.key === "Tab") {
        event.preventDefault();
        const start = el.code.selectionStart;
        const end = el.code.selectionEnd;
        el.code.value = el.code.value.slice(0, start) + "  " + el.code.value.slice(end);
        el.code.setSelectionRange(start + 2, start + 2);
        updateStats();
        updateCursor();
        return;
      }
      if ((event.ctrlKey || event.metaKey) && event.key.toLowerCase() === "enter") {
        event.preventDefault();
        analyzeNow(true);
      } else if ((event.ctrlKey || event.metaKey) && event.key.toLowerCase() === "o") {
        event.preventDefault();
        openFilePicker();
      }
    });
    ["click", "keyup", "select"].forEach((type) => el.code.addEventListener(type, updateCursor));
  }

  function initEditor() {
    if (!window.CodeMirror || /jsdom/i.test(navigator.userAgent)) {
      bindFallbackEditor();
      return;
    }
    try {
      cm = window.CodeMirror.fromTextArea(el.code, {
        mode: "javascript",
        theme: "codescope",
        lineNumbers: true,
        lineWrapping: false,
        indentUnit: 2,
        tabSize: 2,
        indentWithTabs: false,
        smartIndent: true,
        electricChars: true,
        matchBrackets: true,
        autoCloseBrackets: true,
        autoCloseTags: true,
        styleActiveLine: true,
        foldGutter: true,
        gutters: ["CodeMirror-linenumbers", "CodeMirror-foldgutter"],
        scrollbarStyle: "native",
        viewportMargin: 20,
        placeholder: "粘贴代码，或把文件拖进来…",
        extraKeys: {
          "Ctrl-Enter": () => analyzeNow(true),
          "Cmd-Enter": () => analyzeNow(true),
          "Ctrl-O": () => openFilePicker(),
          "Cmd-O": () => openFilePicker(),
          "Ctrl-/": "toggleComment",
          "Cmd-/": "toggleComment",
          "Ctrl-F": "find",
          "Cmd-F": "find",
          "Ctrl-H": "replace",
          "Shift-Ctrl-F": "replace",
          "Cmd-Alt-F": "replace",
          "Ctrl-G": "findNext",
          "Shift-Ctrl-G": "findPrev",
          "Shift-Cmd-G": "findPrev",
          "Ctrl-Space": showCompletion,
          "Alt-/": showCompletion,
          "Esc": "closeSearch",
          "Tab": (editor) => {
            if (editor.somethingSelected()) editor.indentSelection("add");
            else editor.replaceSelection("  ", "end");
          },
          "Shift-Tab": (editor) => editor.indentSelection("subtract"),
        },
      });
      editorModeKey = "javascript";
      const phrases = {
        "Search:": "查找：",
        "Replace:": "替换：",
        "Replace with:": "替换为：",
        "Replace?": "替换？",
        "Replace all:": "全部替换：",
        "With:": "替换为：",
        "All": "全部",
        "Stop": "停止",
        "Yes": "是",
        "No": "否",
        "(Use /re/ syntax for regexp search)": "支持 /正则/ 语法",
      };
      cm.phrase = (text) => phrases[text] || text;
      cm.on("change", () => {
        if (suppressChange) return;
        el.code.value = cm.getValue();
        updateStats();
        updateCursor();
        scheduleAnalysis();
      });
      cm.on("cursorActivity", updateCursor);
      cm.on("gutterClick", (editor, line) => focusLine(line + 1));
      cm.getWrapperElement().setAttribute("aria-label", "代码编辑器");
      const input = cm.getInputField();
      if (input) input.setAttribute("aria-label", "代码输入");
      updateStats();
      updateCursor();
    } catch (_) {
      cm = null;
      document.querySelectorAll(".editor-wrap > .CodeMirror").forEach((node) => node.remove());
      el.code.style.display = "";
      bindFallbackEditor();
    }
  }

  /* ================= 语言检测 ================= */
  function stripForDetection(code) {
    return code
      .replace(/\/\*[\s\S]*?\*\//g, " ")
      .replace(/(^|[^:])\/\/[^\n]*/g, "$1 ")
      .replace(/'(?:\\.|[^'\\])*'|"(?:\\.|[^"\\])*"|`(?:\\.|[^`\\])*`/g, " ");
  }

  function detectLanguage(code, opts = {}) {
    const fromName = opts.preferExtension
      ? languageFromFileName(opts.fileName)
      : null;
    if (fromName) {
      return { id: fromName.id, confidence: 100, source: "extension", ext: fromName.ext };
    }

    const scores = {
      javascript: 0, typescript: 0, python: 0, java: 0, go: 0, rust: 0,
      c: 0, cpp: 0, html: 0, css: 0, sql: 0, json: 0,
    };
    const add = (id, n) => { scores[id] += n; };
    const trimmed = code.trim();
    // HTML 判断保留标签、只去掉字符串；其他语言判断再用更彻底的去字符串/注释/正则
    const htmlMarkup = stripForDetection(code);
    const markup = stripForBalance(code, "javascript");

    if (/^[\[{]/.test(trimmed)) {
      try { JSON.parse(trimmed); add("json", 10); } catch (_) { /* 不是合法 JSON */ }
    }
    if (/<!doctype\s+html|<html[\s>]/i.test(htmlMarkup)) add("html", 10);
    if (/<\/[a-z][\w-]*\s*>/i.test(htmlMarkup) && /<[a-z][\w-]*(\s[^>]*)?>/i.test(htmlMarkup)) add("html", 4);
    if (/\b(select|insert\s+into|update\s+\w+\s+set|delete\s+from|create\s+table)\b/i.test(markup)) add("sql", 6);
    if (/^\s*(def|class)\s+\w+.*:/m.test(markup)) add("python", 7);
    if (/^\s*(from\s+[\w.]+\s+)?import\s+[\w.]+/m.test(markup) && !/;\s*$/m.test(markup)) add("python", 4);
    if (/\b(elif|self\.|print\s*\()/.test(markup)) add("python", 2);
    if (/\b(interface\s+\w+|type\s+\w+\s*=|:\s*(string|number|boolean)\b|enum\s+\w+)/.test(markup)) add("typescript", 6);
    const jsHits = (markup.match(/=>|\bconsole\.|\bdocument\.|\bwindow\.|\brequire\s*\(|\bmodule\.exports|\baddEventListener\s*\(|\bquerySelector/g) || []).length;
    if (/\b(function|const|let|var)\b/.test(markup) || /=>/.test(markup) || /console\./.test(markup) || /\brequire\s*\(/.test(markup)) add("javascript", 4);
    if (jsHits && scores.typescript < 6) add("javascript", Math.min(18, 4 + jsHits * 2));
    if (/\b(public\s+class|System\.out\.|public\s+static\s+void\s+main|import\s+java\.)/.test(markup)) add("java", 7);
    if (/\b(package\s+\w+|func\s+\w+\s*\(|:=)/.test(markup)) add("go", 7);
    if (/\b(fn\s+\w+\s*\(|let\s+mut|impl\s+\w+|use\s+std::)/.test(markup)) add("rust", 9);
    if (/#include\s*<(iostream|vector|string|map|memory)>|std::|using\s+namespace\s+std/.test(markup)) add("cpp", 8);
    if (/#include\s*<(stdio|stdlib|string)\.h>|\bprintf\s*\(|\bmalloc\s*\(/.test(markup)) add("c", 6);
    if (/[.#][\w-]+\s*\{[^}]*:[^}]*\}/.test(markup)) add("css", 5);
    if (/@media|:root\s*\{|--[\w-]+\s*:/.test(markup)) add("css", 2);

    const sorted = Object.entries(scores).sort((a, b) => b[1] - a[1]);
    const [id, top] = sorted[0];
    const second = sorted[1] ? sorted[1][1] : 0;
    if (top < 3) return { id: "text", confidence: 0, scores, source: "content" };
    const confidence = Math.min(97, Math.round(45 + top * 4 + Math.max(0, top - second) * 3));
    return { id, confidence, scores, source: "content" };
  }

  /* ================= 去字符串 / 注释 ================= */
  function stripForBalance(code, lang) {
    let out = "";
    let state = "code";
    let i = 0;
    while (i < code.length) {
      const c = code[i];
      const n = code[i + 1];
      if (state === "code") {
        if ((lang === "python" && c === "#") || (lang === "sql" && c === "-" && n === "-")) {
          state = "line"; out += " "; i += 1; continue;
        }
        if (c === "/" && n === "/") { state = "line"; out += " "; i += 2; continue; }
        if (c === "/" && n === "*") { state = "block"; out += " "; i += 2; continue; }
        if ((lang === "javascript" || lang === "typescript") && c === "/" && n !== "/" && n !== "*") {
          const before = out.replace(/\s+$/, "");
          const prev = before.slice(-1);
          const word = (before.match(/[\w$]+$/) || [""])[0];
          if (!before || /[=([{,:;!&|?+\-*%<>~^]/.test(prev) || /^(return|case|typeof|instanceof|in|of|yield|await)$/.test(word)) {
            state = "regex"; out += " "; i += 1; continue;
          }
        }
        if (c === '"' || c === "'" || c === "`") { state = c; out += " "; i += 1; continue; }
        out += c; i += 1; continue;
      }
      if (state === "regex" || state === "regexClass") {
        if (c === "\\") { out += "  "; i += 2; continue; }
        if (state === "regex" && c === "[") { state = "regexClass"; out += " "; i += 1; continue; }
        if (state === "regexClass" && c === "]") { state = "regex"; out += " "; i += 1; continue; }
        if (state === "regex" && c === "/") { state = "code"; out += " "; i += 1; continue; }
        if (c === "\n") { state = "code"; out += "\n"; i += 1; continue; }
        out += " "; i += 1; continue;
      }
      if (state === "line") {
        if (c === "\n") { out += "\n"; state = "code"; } else out += " ";
        i += 1; continue;
      }
      if (state === "block") {
        if (c === "*" && n === "/") { state = "code"; out += " "; i += 2; }
        else { out += c === "\n" ? "\n" : " "; i += 1; }
        continue;
      }
      if (c === "\\") { out += "  "; i += 2; continue; }
      if (c === state) { state = "code"; out += " "; i += 1; continue; }
      out += c === "\n" ? "\n" : " "; i += 1;
    }
    return out;
  }

  function lineAt(code, index) {
    return code.slice(0, index).split("\n").length;
  }

  function isCommentLine(line, lang) {
    if (lang === "python") return /^\s*#/.test(line);
    if (lang === "sql") return /^\s*--/.test(line);
    if (lang === "html") return /^\s*<!--/.test(line);
    if (lang === "css") return /^\s*\/\*/.test(line);
    return /^\s*(\/\/|\/\*)/.test(line);
  }

  /* ================= 规则 ================= */
  const LINE_RULES = [
    { id: "js-eq", langs: ["javascript", "typescript"], re: /(^|[^=!<>])==(?!=)/, skip: /==\s*null|!=\s*null/, severity: "warn", title: "使用了宽松相等 ==", msg: "== 会触发隐式类型转换，容易得到意外结果。", fix: "改用 === 或 !==。" },
    { id: "ts-any", langs: ["typescript"], re: /:\s*any\b|\bas\s+any\b/, severity: "warn", title: "使用了 any", msg: "any 会关闭这块代码的类型检查，错误会漏到运行时。", fix: "改用具体类型，或先用 unknown 再收窄。" },
    { id: "ts-ignore", langs: ["typescript"], re: /@ts-(ignore|nocheck)/, severity: "warn", title: "使用了 @ts-ignore", msg: "跳过类型检查会掩盖真实错误。", fix: "修复类型问题，或至少改成 @ts-expect-error 并写明原因。" },
    { id: "js-var", langs: ["javascript", "typescript"], re: /\bvar\s+/, severity: "warn", title: "使用了 var", msg: "var 是函数作用域，容易在循环和闭包里出现意外覆盖。", fix: "改用 const，需要重新赋值时用 let。" },
    { id: "js-eval", langs: ["javascript", "typescript"], re: /\beval\s*\(/, severity: "error", title: "使用了 eval", msg: "eval 会执行任意字符串，既危险又难以优化。", fix: "删除 eval，改用明确的数据结构或解析函数。" },
    { id: "js-new-function", langs: ["javascript", "typescript"], re: /new\s+Function\s*\(/, severity: "error", title: "动态构造函数", msg: "new Function 与 eval 类似，会执行不受信任的字符串。", fix: "改成静态函数或受控的表达式解析。" },
    { id: "js-innerhtml", langs: ["javascript", "typescript"], re: /\.innerHTML\s*=/, severity: "warn", title: "直接写入 innerHTML", msg: "拼接用户输入后写入 innerHTML 会带来 XSS 风险。", fix: "改用 textContent，或先做 HTML 转义 / 使用可信的 sanitizer。" },
    { id: "js-document-write", langs: ["javascript", "typescript"], re: /document\.write\s*\(/, severity: "warn", title: "使用了 document.write", msg: "document.write 会在解析后覆盖文档，且容易被注入。", fix: "改用 DOM API 创建节点。" },
    { id: "js-debugger", langs: ["javascript", "typescript"], re: /\bdebugger\b/, severity: "warn", title: "遗留 debugger", msg: "debugger 语句会让打开 DevTools 的用户停在这里。", fix: "提交前删除。" },
    { id: "js-console", langs: ["javascript", "typescript"], re: /console\.(log|debug)\s*\(/, severity: "info", title: "遗留 console.log", msg: "调试输出可能泄露内部数据，也会污染生产日志。", fix: "改成正式的日志组件，或删除。" },
    { id: "js-parseint", langs: ["javascript", "typescript"], re: /parseInt\s*\([^,)]*\)/, skip: /parseInt\s*\([^)]*,/, severity: "info", title: "parseInt 没有指定进制", msg: "缺少第二个参数时，旧环境可能把 08 当成八进制。", fix: "补上 parseInt(value, 10)。" },
    { id: "js-throw-string", langs: ["javascript", "typescript"], re: /throw\s+["']/, severity: "warn", title: "抛出字符串而不是 Error", msg: "字符串异常没有堆栈，调用方也无法按类型捕获。", fix: "改成 throw new Error(\"...\")。" },
    { id: "js-while-true", langs: ["javascript", "typescript"], re: /while\s*\(\s*true\s*\)/, severity: "warn", title: "while (true) 循环", msg: "如果没有明确的 break，循环可能永远不退出。", fix: "给循环加明确退出条件，或确认内部一定有 break / return。" },
    { id: "js-math-random", langs: ["javascript", "typescript"], re: /Math\.random\s*\(\s*\).*(token|secret|key|password|nonce)|(token|secret|key|password|nonce).*Math\.random\s*\(\s*\)/i, severity: "warn", title: "用 Math.random 生成安全值", msg: "Math.random 不是密码学安全的随机源。", fix: "改用 crypto.randomUUID() 或 crypto.getRandomValues()。" },
    { id: "py-bare-except", langs: ["python"], re: /^\s*except\s*:/, severity: "error", title: "裸 except", msg: "裸 except 会连 KeyboardInterrupt / SystemExit 一起吞掉。", fix: "捕获具体异常类型，至少改为 except Exception as e。" },
    { id: "py-except-pass", langs: ["python"], re: /^\s*except[^:]*:\s*pass\b/, severity: "warn", title: "静默吞掉异常", msg: "except 后直接 pass，出错时没有任何线索。", fix: "记录日志，或重新抛出可处理的异常。" },
    { id: "py-mutable-default", langs: ["python"], re: /def\s+\w+\s*\([^)]*=\s*(\[\]|\{\})/, severity: "error", title: "可变对象作为默认参数", msg: "默认参数只在定义时求值一次，列表 / 字典会在多次调用间共享。", fix: "默认值改成 None，在函数体内创建新的列表或字典。" },
    { id: "py-eval", langs: ["python"], re: /\b(eval|exec)\s*\(/, severity: "error", title: "使用了 eval / exec", msg: "执行任意字符串会带来代码注入风险。", fix: "改用 ast.literal_eval 或明确的数据解析。" },
    { id: "py-os-system", langs: ["python"], re: /\bos\.system\s*\(/, severity: "error", title: "使用 os.system", msg: "命令拼接容易导致 shell 注入。", fix: "改用 subprocess.run([...], shell=False)。" },
    { id: "py-shell-true", langs: ["python"], re: /shell\s*=\s*True/, severity: "error", title: "subprocess shell=True", msg: "shell=True 会把参数交给 shell 解释，存在注入风险。", fix: "传参数列表，并保持 shell=False。" },
    { id: "py-pickle", langs: ["python"], re: /pickle\.loads?\s*\(/, severity: "error", title: "反序列化 pickle 数据", msg: "pickle 可以在反序列化时执行任意代码。", fix: "只加载可信数据，或改用 json / 明确的格式。" },
    { id: "py-verify-false", langs: ["python"], re: /verify\s*=\s*False/, severity: "error", title: "关闭了 TLS 证书校验", msg: "verify=False 会让请求可被中间人攻击。", fix: "保持证书校验，必要时配置正确的 CA 证书。" },
    { id: "py-eq-none", langs: ["python"], re: /[=!]=\s*None\b/, severity: "info", title: "用 == 比较 None", msg: "None 应使用 is / is not 比较，避免重载 __eq__ 的对象干扰。", fix: "改成 is None / is not None。" },
    { id: "py-print", langs: ["python"], re: /^\s*print\s*\(/, severity: "info", title: "print 调试输出", msg: "生产代码里的 print 通常意味着遗留调试语句。", fix: "改用 logging。" },
    { id: "py-open", langs: ["python"], re: /\bopen\s*\([^)]*\)/, skip: /encoding\s*=/, severity: "info", title: "open() 未指定编码", msg: "不同平台的默认编码不同，中文内容容易乱码。", fix: "显式传入 encoding=\"utf-8\"。" },
    { id: "java-empty-catch", langs: ["java"], re: /catch\s*\([^)]*\)\s*\{\s*\}/, severity: "error", title: "空的 catch 块", msg: "异常被完全吞掉，排查问题时没有任何信息。", fix: "至少记录日志，或按业务决定重新抛出。" },
    { id: "java-print", langs: ["java"], re: /System\.out\.print/, severity: "info", title: "System.out 调试输出", msg: "生产代码应使用日志框架而不是标准输出。", fix: "改用 SLF4J / java.util.logging。" },
    { id: "java-string-eq", langs: ["java"], re: /==\s*["']/, severity: "warn", title: "用 == 比较字符串", msg: "== 比较的是引用，不是内容。", fix: "改用 \"literal\".equals(value)。" },
    { id: "rust-unwrap", langs: ["rust"], re: /\.unwrap\s*\(\s*\)/, severity: "info", title: "直接 unwrap", msg: "unwrap 在 None / Err 时会 panic，线上服务里通常应优雅处理。", fix: "改用 match、? 运算符或 unwrap_or_else。" },
    { id: "sql-select-star", langs: ["sql"], re: /\bselect\s+\*/i, severity: "info", title: "SELECT *", msg: "SELECT * 会随表结构变化，可能读取不需要的列。", fix: "显式列出需要的字段。" },
    { id: "html-inline-handler", langs: ["html"], re: /\son[a-z]+\s*=/i, severity: "warn", title: "内联事件处理器", msg: "内联 onclick 等属性难以做 CSP，也容易拼进不可信内容。", fix: "改用 addEventListener。" },
    { id: "css-important", langs: ["css"], re: /!important/, severity: "info", title: "使用 !important", msg: "!important 会破坏层叠关系，让后续维护变难。", fix: "提高选择器优先级，或调整样式结构。" },
    { id: "go-ignored-error", langs: ["go"], re: /_\s*=\s*\w+\(/, severity: "info", title: "忽略返回的 error", msg: "把 error 赋给 _ 会静默丢弃失败。", fix: "检查并处理 error，或显式记录为什么可以忽略。" },
    { id: "generic-todo", langs: ["javascript", "typescript", "python", "java", "go", "rust", "c", "cpp", "css"], re: /TODO|FIXME|XXX/, severity: "info", title: "遗留 TODO / FIXME", msg: "标记说明这里还没做完，容易跟着代码一起上线。", fix: "转成 issue，或补完再提交。" },
  ];

  function secretRule(line) {
    if (!/(api[_-]?key|apikey|secret|password|passwd|token|access[_-]?key)\s*[:=]\s*(['"])[^'"]{6,}\2/i.test(line)) return null;
    if (/example|your[_-]?|xxx|process\.env|os\.environ|dummy|placeholder|test/i.test(line)) return null;
    return { id: "generic-secret", severity: "error", title: "疑似硬编码密钥", msg: "密钥写进源码会跟着 Git 历史一起泄露。", fix: "移到环境变量或密钥管理服务，并轮换已泄露的密钥。" };
  }

  function sqlInjectionRule(line) {
    if (!/(select|insert|update|delete)[^;\n]*['"]\s*\+/i.test(line)) return null;
    return { id: "sql-injection", severity: "error", title: "SQL 字符串拼接", msg: "把变量拼进 SQL 会产生注入风险。", fix: "使用参数化查询 / prepared statement。" };
  }

  function wholeCodeIssues(code, lang) {
    const issues = [];
    const emptyCatch = /catch\s*(?:\([^)]*\))?\s*\{\s*\}/g;
    let m;
    while ((m = emptyCatch.exec(code))) {
      issues.push({
        id: "js-empty-catch", severity: "error", line: lineAt(code, m.index),
        title: "空的 catch 块", msg: "异常被吞掉，后续排查会非常困难。",
        fix: "记录日志，或把异常重新抛给上层。",
      });
    }
    if (lang === "sql") {
      const del = /^\s*delete\s+from\s+[\w."`]+\s*;?\s*$/gim;
      while ((m = del.exec(code))) {
        issues.push({
          id: "sql-delete-all", severity: "error", line: lineAt(code, m.index),
          title: "DELETE 没有 WHERE", msg: "这会删除整张表的数据。",
          fix: "补上 WHERE，并先在事务 / 备份中确认范围。",
        });
      }
    }
    if (lang === "json") {
      try { JSON.parse(code); } catch (error) {
        issues.push({
          id: "json-parse", severity: "error", line: 1,
          title: "JSON 解析失败", msg: String(error.message || error),
          fix: "检查尾逗号、引号和括号是否配对。",
        });
      }
    }
    return issues;
  }

  function bracketIssues(code, lang) {
    if (!["javascript", "typescript", "python", "java", "go", "rust", "c", "cpp", "css"].includes(lang)) return [];
    const stripped = stripForBalance(code, lang);
    const opens = { "(": ")", "[": "]", "{": "}" };
    const closes = { ")": "(", "]": "[", "}": "{" };
    const stack = [];
    let line = 1;
    for (let i = 0; i < stripped.length; i++) {
      const ch = stripped[i];
      if (ch === "\n") { line += 1; continue; }
      if (opens[ch]) { stack.push({ ch, line }); continue; }
      if (closes[ch]) {
        if (!stack.length || stack[stack.length - 1].ch !== closes[ch]) {
          return [{ id: "syntax-brackets", severity: "error", line, title: "括号不匹配", msg: `发现多余的「${ch}」，没有对应的开括号。`, fix: "检查这一行的括号配对。" }];
        }
        stack.pop();
      }
    }
    if (stack.length) {
      const last = stack[stack.length - 1];
      return [{ id: "syntax-brackets", severity: "error", line: last.line, title: "括号未闭合", msg: `「${last.ch}」一直没有闭合。`, fix: "补上对应的闭括号，或检查是否提前结束了函数。" }];
    }
    return [];
  }

  function duplicateFunctions(code, lines, lang) {
    const patterns = {
      python: /^\s*def\s+(\w+)/gm,
      go: /\bfunc\s+(\w+)/g,
      rust: /\bfn\s+(\w+)/g,
    };
    const re = patterns[lang] || /\bfunction\s+(\w+)/g;
    const seen = new Map();
    const out = [];
    let m;
    while ((m = re.exec(code))) {
      const name = m[1];
      const line = lineAt(code, m.index);
      if (seen.has(name)) {
        out.push({
          id: "duplicate-function", severity: "warn", line,
          title: `重复定义函数 ${name}`, msg: `第 ${seen.get(name)} 行已经定义过同名函数，后一个会覆盖前一个。`,
          fix: "合并成一个函数，或改名并明确各自职责。",
        });
      } else {
        seen.set(name, line);
      }
    }
    return out;
  }

  function gatherStats(code, lines, lang) {
    const commentRe = lang === "python" ? /^\s*#/ : lang === "sql" ? /^\s*--/ : lang === "html" ? /^\s*<!--/ : /^\s*(\/\/|\/\*|\*)/;
    const commentLines = lines.filter((line) => commentRe.test(line)).length;
    const fnRe = lang === "python" ? /^\s*def\s+\w+/gm : lang === "go" ? /\bfunc\s+\w+/g : lang === "rust" ? /\bfn\s+\w+/g : /\bfunction\s+\w+|\b(?:const|let|var)\s+\w+\s*=\s*(?:async\s*)?\(/g;
    const functions = (code.match(fnRe) || []).length;
    let maxNesting = 0;
    for (const line of lines) {
      const m = line.match(/^[ \t]+/);
      if (!m) continue;
      const width = m[0].replace(/\t/g, "  ").length;
      maxNesting = Math.max(maxNesting, Math.floor(width / 2));
    }
    return {
      lines: lines.length,
      chars: code.length,
      commentLines,
      commentRatio: commentLines / Math.max(1, lines.length),
      functions,
      maxNesting,
    };
  }

  /* ================= 精简建议 ================= */
  function findSuggestions(code, lang, lines) {
    const out = [];
    const seen = new Set();
    const covered = new Set();

    function add(s) {
      if (!s.before || s.before === s.after) return;
      const key = s.id + "@" + s.startLine + "-" + s.endLine;
      if (seen.has(key)) return;
      seen.add(key);
      out.push(s);
      for (let i = s.startLine; i <= s.endLine; i++) covered.add(i);
    }

    function addLine(idx, afterLine, meta) {
      if (covered.has(idx + 1)) return;
      const before = lines[idx];
      if (!before || before === afterLine) return;
      add({ ...meta, startLine: idx + 1, endLine: idx + 1, before, after: afterLine });
    }

    // 多行 if (cond) { return true; } else { return false; }
    const multi = /^([ \t]*)if\s*\(([^\n{}]+)\)\s*\{\s*\n[ \t]*return\s+true\s*;?\s*\n\1\}\s*else\s*\{\s*\n[ \t]*return\s+false\s*;?\s*\n\1\}/gm;
    let m;
    while ((m = multi.exec(code))) {
      const startLine = lineAt(code, m.index);
      const endLine = startLine + (m[0].match(/\n/g) || []).length;
      add({
        id: "bool-return", category: "简化", badge: "安全",
        title: "直接返回布尔表达式",
        detail: "if / else 两个分支只是返回 true / false，可以合并成一个 return。",
        startLine, endLine,
        before: lines.slice(startLine - 1, endLine).join("\n"),
        after: m[1] + "return Boolean(" + m[2].trim() + ");",
      });
    }

    // 两行 if (cond) return true; return false;
    const short = /^([ \t]*)if\s*\(([^\n{}]+)\)\s*return\s+true\s*;?\s*\n\1return\s+false\s*;?\s*$/gm;
    while ((m = short.exec(code))) {
      const startLine = lineAt(code, m.index);
      add({
        id: "bool-return-short", category: "简化", badge: "安全",
        title: "合并两行 return",
        detail: "先判断再返回 true / false，可以直接返回条件本身。",
        startLine, endLine: startLine + 1,
        before: lines.slice(startLine - 1, startLine + 1).join("\n"),
        after: m[1] + "return Boolean(" + m[2].trim() + ");",
      });
    }

    // Python 多行 if / else
    if (lang === "python") {
      const py = /^([ \t]*)if\s+(.+):\s*\n\1[ \t]+return\s+True\s*\n\1else:\s*\n\1[ \t]+return\s+False\s*$/gm;
      while ((m = py.exec(code))) {
        const startLine = lineAt(code, m.index);
        add({
          id: "py-bool-return", category: "简化", badge: "安全",
          title: "直接返回布尔表达式",
          detail: "两个分支只返回 True / False，可以合并成一个 return。",
          startLine, endLine: startLine + 3,
          before: lines.slice(startLine - 1, startLine + 3).join("\n"),
          after: m[1] + "return bool(" + m[2].trim() + ")",
        });
      }
    }

    // 单行 if / else
    lines.forEach((line, idx) => {
      if (covered.has(idx + 1)) return;
      const single = /if\s*\(([^()]+)\)\s*\{\s*return\s+true\s*;?\s*\}\s*else\s*\{\s*return\s+false\s*;?\s*\}/;
      const sm = single.exec(line);
      if (sm) {
        addLine(idx, line.slice(0, sm.index) + "return Boolean(" + sm[1].trim() + ");" + line.slice(sm.index + sm[0].length), {
          id: "bool-return-inline", category: "简化", badge: "安全",
          title: "合并 if / else",
          detail: "两个分支只返回 true / false，直接返回条件即可。",
        });
      }
    });

    // 逐行替换
    lines.forEach((line, idx) => {
      if (covered.has(idx + 1)) return;
      let hit;

      hit = /\b([\w$.]+)\.indexOf\(([^()]+)\)\s*!==\s*-1/.exec(line);
      if (hit) {
        const after = line.slice(0, hit.index) + hit[1] + ".includes(" + hit[2] + ")" + line.slice(hit.index + hit[0].length);
        addLine(idx, after, { id: "indexof-includes", category: "可读性", badge: "建议", title: "用 includes 代替 indexOf !== -1", detail: "includes 直接表达“是否存在”。注意两者对 NaN 的处理略有不同。" });
        return;
      }

      hit = /\b([\w$.]+)\.indexOf\(([^()]+)\)\s*===\s*-1/.exec(line);
      if (hit) {
        const after = line.slice(0, hit.index) + "!" + hit[1] + ".includes(" + hit[2] + ")" + line.slice(hit.index + hit[0].length);
        addLine(idx, after, { id: "indexof-not-includes", category: "可读性", badge: "建议", title: "用 !includes 代替 indexOf === -1", detail: "includes 直接表达“是否存在”。注意两者对 NaN 的处理略有不同。" });
        return;
      }

      hit = /(^|[^\w$])([\w$.]+)\s*=\s*\2\s*\+\s*([^;]+)(;?)/.exec(line);
      if (hit) {
        const after = line.slice(0, hit.index) + hit[1] + hit[2] + " += " + hit[3].trim() + hit[4] + line.slice(hit.index + hit[0].length);
        addLine(idx, after, { id: "compound-plus", category: "简化", badge: "安全", title: "用 += 代替 x = x + …", detail: "复合赋值更短，也少写一次变量名。" });
        return;
      }

      hit = /(^|[^\w$])([\w$.]+)\s*=\s*\2\s*-\s*([^;]+)(;?)/.exec(line);
      if (hit) {
        const after = line.slice(0, hit.index) + hit[1] + hit[2] + " -= " + hit[3].trim() + hit[4] + line.slice(hit.index + hit[0].length);
        addLine(idx, after, { id: "compound-minus", category: "简化", badge: "安全", title: "用 -= 代替 x = x - …", detail: "复合赋值更短，也少写一次变量名。" });
        return;
      }

      if (/^\s*(if|while)\s*\(/.test(line)) {
        hit = /\b([\w$.]+)\.length\s*===\s*0\b/.exec(line);
        if (hit) {
          const after = line.slice(0, hit.index) + "!" + hit[1] + ".length" + line.slice(hit.index + hit[0].length);
          addLine(idx, after, { id: "length-zero", category: "简化", badge: "安全", title: "用 !x.length 代替 length === 0", detail: "空数组 / 空字符串的判断可以更短。" });
          return;
        }
        hit = /\b([\w$.]+)\.length\s*>\s*0\b/.exec(line);
        if (hit) {
          const after = line.slice(0, hit.index) + hit[1] + ".length" + line.slice(hit.index + hit[0].length);
          addLine(idx, after, { id: "length-positive", category: "简化", badge: "安全", title: "用 x.length 代替 length > 0", detail: "非空判断可以直接使用长度本身。" });
          return;
        }
      }

      hit = /return\s+([^;?]+)\?\s*true\s*:\s*false\s*;/.exec(line);
      if (hit) {
        const after = line.slice(0, hit.index) + "return Boolean(" + hit[1].trim() + ");" + line.slice(hit.index + hit[0].length);
        addLine(idx, after, { id: "ternary-bool", category: "简化", badge: "安全", title: "用 Boolean(cond) 代替 cond ? true : false", detail: "三元表达式只返回布尔值时，可以直接转换。" });
        return;
      }

      if (lang === "python") {
        hit = /^([ \t]*)if\s+(.+?)\s*==\s*None\s*:/.exec(line);
        if (hit) {
          addLine(idx, hit[1] + "if " + hit[2].trim() + " is None:", { id: "py-none", category: "可读性", badge: "安全", title: "用 is None 代替 == None", detail: "None 是单例，应该用 is 比较。" });
          return;
        }
        hit = /^([ \t]*)if\s+len\(([^)]+)\)\s*==\s*0\s*:/.exec(line);
        if (hit) {
          addLine(idx, hit[1] + "if not " + hit[2].trim() + ":", { id: "py-len", category: "简化", badge: "安全", title: "用 if not x 代替 len(x) == 0", detail: "空容器的判断可以更短。" });
          return;
        }
        hit = /return\s+True\s+if\s+(.+?)\s+else\s+False/.exec(line);
        if (hit) {
          const after = line.slice(0, hit.index) + "return bool(" + hit[1].trim() + ")" + line.slice(hit.index + hit[0].length);
          addLine(idx, after, { id: "py-ternary", category: "简化", badge: "安全", title: "用 bool(cond) 代替 True if … else False", detail: "直接转换条件即可。" });
          return;
        }
      }
    });

    return out.slice(0, 12);
  }

  /* ================= 算法识别 ================= */
  function detectAlgorithms(code, lang, lines) {
    const list = [];
    const add = (id, name, confidence, evidence, time, space, tip, line) => {
      if (list.some((a) => a.id === id)) return;
      list.push({ id, name, confidence, time, space, tip, evidence, line });
    };
    const lineOf = (re) => {
      const m = re.exec(code);
      return m ? lineAt(code, m.index) : 1;
    };

    const forCount = (code.match(/\bfor\s*\(/g) || []).length;

    // 排序
    const bubbleName = /bubble[_\s]*sort/i;
    if (bubbleName.test(code)) {
      add("bubble", "冒泡排序", 92, "函数名里直接写着 bubbleSort。", "O(n²)", "O(1)", "两层循环 + 相邻交换。数据量大时改用内置 sort、归并或快排。", lineOf(bubbleName));
    } else if (forCount >= 2 && /j\s*\+\s*1/.test(code) && /\b(temp|tmp)\b/.test(code)) {
      add("bubble", "冒泡排序（推断）", 76, "两层循环 + 相邻元素交换，是冒泡排序的典型结构。", "O(n²)", "O(1)", "如果数据量可能超过几百，建议改用内置排序。", lineOf(/\bfor\s*\(/));
    }

    if (/selection[_\s]*sort/i.test(code)) {
      add("selection", "选择排序", 90, "函数名或注释里写着 selectionSort。", "O(n²)", "O(1)", "每轮找最小值再交换；数据量大时同样建议改用内置排序。", lineOf(/selection[_\s]*sort/i));
    } else if (/min(Index|Idx|_idx)/i.test(code) && forCount >= 2) {
      add("selection", "选择排序（推断）", 70, "外层循环 + 内层寻找最小索引，是选择排序的常见写法。", "O(n²)", "O(1)", "把最小值的查找换成内置排序，通常更快。", lineOf(/min(Index|Idx|_idx)/i));
    }

    if (/insertion[_\s]*sort/i.test(code)) {
      add("insertion", "插入排序", 90, "函数名或注释里写着 insertionSort。", "O(n²)", "O(1)", "小数组上表现不错；数据量大时改用内置排序。", lineOf(/insertion[_\s]*sort/i));
    } else if (/\bkey\b/.test(code) && /while\s*\([^)]*j\s*>=\s*0/.test(code)) {
      add("insertion", "插入排序（推断）", 72, "key + 向左回退的 while，是插入排序的典型结构。", "O(n²)", "O(1)", "已经是 O(n²) 的写法；大数据量可以改用内置排序。", lineOf(/\bkey\b/));
    }

    if (/quick[_\s]*sort/i.test(code) || /\bpartition\s*\(/i.test(code)) {
      add("quick", "快速排序", 88, "出现 quickSort / partition，通常意味着快排。", "O(n log n)", "O(log n)", "注意基准选择与最坏 O(n²) 的情况；小数组可切换插入排序。", lineOf(/quick[_\s]*sort|partition/i));
    }

    if (/merge[_\s]*sort/i.test(code)) {
      add("merge", "归并排序", 88, "出现 mergeSort，通常意味着归并排序。", "O(n log n)", "O(n)", "稳定排序，代价是需要额外空间。", lineOf(/merge[_\s]*sort/i));
    }

    // 二分查找
    const binaryName = /binary[_\s]*search|二分查找/i;
    if (binaryName.test(code)) {
      add("binary", "二分查找", 93, "函数名里直接写着 binarySearch。", "O(log n)", "O(1)", "每次把搜索区间减半；前提是数组已经有序。", lineOf(binaryName));
    } else if (/\bmid\b/.test(code) && /(low|left)\s*<=\s*(high|right)/.test(code) && /mid\s*[+-]\s*1/.test(code)) {
      add("binary", "二分查找（推断）", 80, "low/left、high/right、mid 和区间收缩同时出现。", "O(log n)", "O(1)", "确认输入数组已排序，并注意 mid 的溢出问题。", lineOf(/\bmid\b/));
    }

    // 双指针 / 滑动窗口
    if (!list.some((a) => a.id === "binary") && /\bleft\b/.test(code) && /\bright\b/.test(code) && /while\s*\(\s*left\s*<\s*right/.test(code)) {
      add("two-pointer", "双指针", 65, "left / right 从两端向中间移动。", "O(n)", "O(1)", "通常要求数组有序，或区间具有单调性。", lineOf(/while\s*\(\s*left\s*<\s*right/));
    }
    if (/\bleft\b/.test(code) && /\bright\b/.test(code) && /(window|maxLen|max_len|maxSum|max_sum)/.test(code) && /while/.test(code)) {
      add("sliding", "滑动窗口", 60, "left / right 维护一个区间，并记录窗口内的最大值或和。", "O(n)", "O(1)", "确认窗口收缩条件，避免重复计算窗口内的值。", lineOf(/(window|maxLen|max_len|maxSum|max_sum)/));
    }

    // 动态规划
    if (/\bdp\s*[\[=]/i.test(code) || /\bmemo\b/i.test(code)) {
      add("dp", "动态规划", 72, "出现 dp 数组或 memo 缓存。", "O(n²)", "O(n)", "先写清状态定义和转移方程，再处理边界；必要时做空间压缩。", lineOf(/\bdp\b|\bmemo\b/i));
    }

    // 图搜索
    if (/(queue|deque|shift\s*\(\)|popleft)/i.test(code) && /visited/i.test(code)) {
      add("bfs", "广度优先搜索（BFS）", 74, "队列 + visited 是 BFS 的典型组合。", "O(V+E)", "O(V)", "适合无权图的最短路径；注意入队时就标记 visited，避免重复入队。", lineOf(/(queue|deque|shift\s*\(\)|popleft)/i));
    }
    if (/(dfs|stack)/i.test(code) && /visited/i.test(code) && /(pop\s*\(|dfs\s*\()/i.test(code)) {
      add("dfs", "深度优先搜索（DFS）", 68, "栈或递归 + visited，是 DFS 的典型结构。", "O(V+E)", "O(V)", "递归实现要注意深度；图很大时改用显式栈。", lineOf(/(dfs|stack)/i));
    }

    // 哈希
    if (/(new\s+Map|new\s+Set|dict\s*\(|defaultdict)/.test(code) && /\b(has|get|in)\b/.test(code) && /\b(for|while)\b/.test(code)) {
      add("hash", "哈希表 / 集合", 58, "循环里使用 Map / Set / dict 做查找或去重。", "O(n)", "O(n)", "平均 O(1) 查找；注意最坏情况和额外内存。", lineOf(/(new\s+Map|new\s+Set|dict\s*\(|defaultdict)/));
    }

    // 递归
    const fn = /(?:function\s+(\w+)|def\s+(\w+))/.exec(code);
    if (fn) {
      const name = fn[1] || fn[2];
      const all = (code.match(new RegExp("\\b" + name + "\\s*\\(", "g")) || []).length;
      const calls = all - 1;
      if (calls >= 1 && new RegExp("return[^;\\n]*\\b" + name + "\\s*\\(").test(code)) {
        const double = new RegExp("return[^;\\n]*\\b" + name + "\\s*\\([^;\\n]*\\b" + name + "\\s*\\(").test(code);
        add("recursion", "递归", 70, `函数 ${name} 在自己的函数体里再次调用自己。`, double ? "O(2^n)" : "O(n)", "O(n)", "注意递归深度；有重复子问题时加 memo 或改成迭代。", lineOf(new RegExp("\\b" + name + "\\s*\\(")));
      }
    }

    // 经典算法
    if (/fib/i.test(code)) {
      add("fib", "斐波那契", 80, "出现 fib / fibonacci。", /return[^;\n]*fib/i.test(code) ? "O(2^n)" : "O(n)", "O(n)", "递归版本会重复计算；改用迭代或 memo。", lineOf(/fib/i));
    }
    if (/factorial/i.test(code)) {
      add("factorial", "阶乘", 78, "出现 factorial。", "O(n)", "O(n)", "递归深度为 n；大数阶乘注意溢出。", lineOf(/factorial/i));
    }
    if (/\bgcd\b/i.test(code)) {
      add("gcd", "最大公约数（欧几里得）", 72, "出现 gcd 与取模运算。", "O(log n)", "O(1)", "欧几里得算法；注意 0 和负数的边界。", lineOf(/\bgcd\b/i));
    }
    if (/(sieve|isPrime|is_prime)/i.test(code) && /(range\s*\(\s*2\s*,\s*int\s*\(|for\s*\([^)]*\*\s*\*)/i.test(code)) {
      add("sieve", "素数筛", 70, "出现候选数组 + 从 2 开始标记合数。", "O(n log log n)", "O(n)", "埃氏筛足够快；更大范围可以分段筛。", lineOf(/(sieve|isPrime|is_prime)/i));
    }

    // 数据结构
    if (/(heapq|PriorityQueue|heappush|heappop)/i.test(code)) {
      add("heap", "堆 / 优先队列", 72, "出现 heapq / PriorityQueue。", "O(log n) 每次操作", "O(n)", "适合动态取最值；注意 Python heapq 是最小堆。", lineOf(/(heapq|PriorityQueue|heappush|heappop)/i));
    }
    if (/\bparent\b/.test(code) && /\bfind\s*\(/.test(code) && /\bunion\s*\(/.test(code)) {
      add("union-find", "并查集", 72, "出现 parent、find、union。", "接近 O(1)", "O(n)", "加路径压缩和按秩合并，才能接近常数时间。", lineOf(/\bfind\s*\(/));
    }
    if (/dijkstra/i.test(code)) {
      add("dijkstra", "Dijkstra 最短路", 85, "出现 dijkstra。", "O((V+E) log V)", "O(V)", "适合非负权图；负权边需要 Bellman-Ford。", lineOf(/dijkstra/i));
    } else if (/\bdist\b/.test(code) && /(heapq|PriorityQueue)/i.test(code)) {
      add("dijkstra", "Dijkstra（推断）", 62, "dist + 优先队列，是 Dijkstra 的常见组合。", "O((V+E) log V)", "O(V)", "确认边权非负。", lineOf(/\bdist\b/));
    }

    // 内置排序
    if (/(\.sort\s*\(|sorted\s*\()/i.test(code)) {
      add("builtin-sort", "内置排序", 55, "调用了语言内置的排序函数。", "O(n log n)", "O(log n)", "通常已经足够快；注意比较函数的开销和稳定性。", lineOf(/(\.sort\s*\(|sorted\s*\()/i));
    }

    list.sort((a, b) => b.confidence - a.confidence);
    const loops = (code.match(/\b(for|while)\b/g) || []).length;
    const nested = /for\s*\([^)]*\)\s*\{[\s\S]{0,300}?for\s*\(/.test(code) ||
      /while\s*\([^)]*\)\s*\{[\s\S]{0,300}?for\s*\(/.test(code) ||
      /for\s*\([^)]*\):\s*\n[ \t]+for\s+/.test(code);
    const fallbackTime = nested ? "O(n²)" : loops ? "O(n)" : "O(1)";

    return { list, primary: list[0] || null, fallbackTime };
  }

  function analyze(code, lang) {
    const lines = code.split("\n");
    const issues = [];
    const counts = {};
    const seen = new Set();

    function add(issue) {
      const key = issue.id + "@" + issue.line;
      if (seen.has(key)) return;
      if ((counts[issue.id] || 0) >= (issue.max || 5)) return;
      counts[issue.id] = (counts[issue.id] || 0) + 1;
      seen.add(key);
      issues.push(issue);
    }

    bracketIssues(code, lang).forEach(add);
    wholeCodeIssues(code, lang).forEach(add);
    duplicateFunctions(code, lines, lang).forEach(add);

    lines.forEach((raw, index) => {
      const lineNo = index + 1;
      const line = raw.replace(/\r$/, "");
      const commentLine = isCommentLine(line, lang);

      if (!commentLine && line.length > 150) {
        add({ id: "long-line", severity: "info", line: lineNo, max: 3, title: "超长行", msg: `这一行有 ${line.length} 个字符，阅读和 diff 都会很痛苦。`, fix: "拆成多行，或提取中间变量。" });
      }
      if (!commentLine && line.trim() && /^\s{12,}|\t{6,}/.test(line)) {
        add({ id: "deep-nesting", severity: "info", line: lineNo, max: 2, title: "嵌套过深", msg: "缩进层级超过 6 层，逻辑很难跟踪。", fix: "提前 return，或把内层逻辑抽成函数。" });
      }
      if (!commentLine) {
        const secret = secretRule(line);
        if (secret) add({ ...secret, line: lineNo });
        const sql = sqlInjectionRule(line);
        if (sql) add({ ...sql, line: lineNo });
      }

      for (const rule of LINE_RULES) {
        if (!rule.langs.includes(lang)) continue;
        if (commentLine && rule.id !== "generic-todo" && rule.id !== "ts-ignore") continue;
        if (rule.skip && rule.skip.test(line)) continue;
        if (rule.re.test(line)) {
          add({ id: rule.id, severity: rule.severity, line: lineNo, title: rule.title, msg: rule.msg, fix: rule.fix });
        }
      }
    });

    const severityScore = { error: 0, warn: 1, info: 2 };
    issues.sort((a, b) => (severityScore[a.severity] - severityScore[b.severity]) || (a.line - b.line));

    const complexity = 1 + (code.match(/\b(if|else\s+if|elif|for|while|case|catch|switch)\b|&&|\|\||\?[^?]/g) || []).length;
    const stats = gatherStats(code, lines, lang);
    const suggestions = findSuggestions(code, lang, lines);
    const algorithms = detectAlgorithms(code, lang, lines);

    return { issues, complexity, stats, lines, suggestions, algorithms };
  }

  /* ================= AI 率 ================= */
  function analyzeAI(code, lines, lang, stats) {
    const signals = [];
    const add = (label, weight, evidence) => {
      if (weight === 0) return;
      signals.push({ label, weight, evidence });
    };

    const density = stats.commentRatio;
    if (density >= 0.36) add("注释密度过高", 2.6, `注释占 ${Math.round(density * 100)}%，几乎每两行就有一句解释。`);
    else if (density >= 0.24) add("注释密度偏高", 1.5, `注释占 ${Math.round(density * 100)}%，解释性文字比代码还密集。`);

    const phrases = code.match(/(as an ai|here'?s (a|the|an)|certainly|i hope this helps|let me know if|以下是|这是一个|当然可以|希望这(个|些)|首先，?我们|需要注意的是|总之)/gi) || [];
    if (phrases.length > 0) {
      add("模板化措辞", Math.min(3, phrases.length * 0.8), `检测到 ${phrases.length} 处模板化表达，例如「${phrases[0].trim()}」。`);
    }

    const placeholders = code.match(/(your[ _-]?(api[ _-]?)?key|your[ _-]?token|your[ _-]?password|xxx{2,}|example\.com|replace[ _-]?(this|me)|在此处|请替换)/gi) || [];
    if (placeholders.length > 0) {
      add("占位符 / 待替换内容", 1.8, `有 ${placeholders.length} 处占位符，像是一个还没填完的模板。`);
    }

    const docs = (code.match(/\/\*\*|"""|'''/g) || []).length;
    if (stats.functions >= 2 && docs >= stats.functions) {
      add("每个函数都有完整文档", 1.4, `${stats.functions} 个函数，配了 ${docs} 段文档注释，整齐得有点刻意。`);
    }

    const generic = code.match(/\b(data|result|temp|foo|bar|example|test|value|item)\d*\b/gi) || [];
    if (generic.length >= 5) {
      add("通用变量名偏多", 1.2, `出现 ${generic.length} 次 data / result / temp 这类通用命名。`);
    }

    if (/[\u{1F300}-\u{1FAFF}\u2600-\u27BF]/u.test(code)) {
      add("emoji 出现在代码里", 1.2, "注释或字符串里带 emoji，通常来自对话式生成。");
    }

    if (/if\s+__name__\s*==\s*['"]__main__['"]|def\s+main\s*\(|except\s+Exception\s+as\s+e\s*:\s*\n\s*pass/.test(code)) {
      add("典型脚手架结构", 1.1, "出现了 main() / __main__ 这类完整脚手架，像从模板直接展开。");
    }

    const human = code.match(/console\.(log|debug)|debugger|\bprint\s*\(/g) || [];
    if (human.length > 0) {
      add("人类调试痕迹", -1.2, `检测到 ${human.length} 处 console / print 之类的临时痕迹。`);
    }

    const commentedCode = (code.match(/^\s*(?:\/\/|#)\s*(?:const|let|var|function|if|for|while|return|def|print|import)\b/gm) || []).length;
    if (commentedCode > 0) {
      add("注释掉的代码", -1.3, `有 ${commentedCode} 行被注释掉的代码，像是人改到一半留下的。`);
    }

    const single = (code.match(/'/g) || []).length;
    const double = (code.match(/"/g) || []).length;
    if (single >= 3 && double >= 3) {
      add("引号风格不统一", -0.5, "单引号和双引号混用，更像手写习惯而不是统一生成。");
    }

    const longLines = lines.filter((line) => line.length > 140).length;
    if (longLines > 0) {
      add("存在超长行", -0.4, `有 ${longLines} 行超过 140 个字符，格式并不完美。`);
    }

    const indented = lines.map((line) => line.match(/^[ \t]+/)).filter(Boolean).map((m) => m[0].replace(/\t/g, "  ").length);
    if (indented.length >= 8) {
      const twos = indented.filter((n) => n % 2 === 0).length;
      const fours = indented.filter((n) => n % 4 === 0).length;
      if (twos / indented.length > 0.9 || fours / indented.length > 0.9) {
        add("缩进异常整齐", 0.7, "缩进几乎完全一致，格式过于统一。");
      }
    }

    const sum = signals.reduce((total, s) => total + s.weight, 0);
    const ai = Math.max(3, Math.min(97, Math.round(26 + sum * 10)));
    let confidence = Math.round(38 + Math.log2(lines.length + 1) * 10);
    confidence = Math.min(95, Math.max(38, confidence));
    if (lines.length < 6) confidence = Math.min(confidence, 55);

    let verdict = "高度疑似 AI 生成";
    if (ai < 25) verdict = "人类痕迹明显";
    else if (ai < 45) verdict = "不太像 AI";
    else if (ai < 65) verdict = "有点 AI 味";
    else if (ai < 82) verdict = "AI 味较重";

    let note = "信号比较中性，单看风格很难下结论。";
    if (ai < 25) note = "注释、命名和格式更像手写代码，或者经过人工整理。";
    else if (ai < 45) note = "有一些模板痕迹，但整体更像人类写的。";
    else if (ai < 65) note = "能看到 AI 常见的解释性注释和模板结构。";
    else note = "注释密度、措辞和结构都很像对话式生成的结果。";

    signals.sort((a, b) => Math.abs(b.weight) - Math.abs(a.weight));
    return { ai, confidence, verdict, note, signals };
  }

  /* ================= 渲染 ================= */
  function esc(text) {
    return String(text).replace(/[&<>"']/g, (c) => ({ "&": "&amp;", "<": "&lt;", ">": "&gt;", '"': "&quot;", "'": "&#39;" }[c]));
  }

  function renderEmpty() {
    el.mLang.textContent = "—";
    el.mLangNote.textContent = "等待分析";
    el.mIssues.textContent = "0";
    el.mIssuesNote.textContent = "错误 0 · 警告 0";
    el.mAi.textContent = "—";
    el.mAi.className = "";
    el.mComplex.textContent = "—";
    el.mComplexNote.textContent = "圈复杂度 —";
    el.aiPct.textContent = "0";
    el.aiVerdict.textContent = "等待分析";
    el.aiNote.textContent = "把代码放进来，看看它像不像 AI 写的。";
    el.aiConf.textContent = "—";
    el.aiConfFill.style.width = "0%";
    el.gaugeArc.style.strokeDashoffset = "326.73";
    el.gaugeArc.style.stroke = "#7ee787";
    el.gaugeArc.dataset.value = "0";
    el.tabIssues.textContent = "0";
    el.tabSuggestions.textContent = "0";
    el.tabAlgos.textContent = "0";
    el.tabSignals.textContent = "0";
    el.reportMeta.textContent = "等待分析";
    el.scanText.textContent = "就绪";
    el.scanState.classList.remove("live");
    el.panelIssues.innerHTML = emptyState("还没有报告", "粘贴代码，或者选一个示例，然后点“分析代码”。");
    el.panelSuggestions.innerHTML = emptyState("还没有建议", "分析之后，这里会列出可以一键替换的精简写法。");
    el.panelAlgos.innerHTML = emptyState("还没有算法", "分析之后，这里会显示识别到的算法与复杂度。");
    el.panelAi.innerHTML = emptyState("没有信号", "分析之后，这里会列出 AI 率的判断依据。");
    el.panelOverview.innerHTML = emptyState("没有数据", "分析之后，这里会显示行数、函数数、注释占比等统计。");
  }

  function emptyState(title, text) {
    return `<div class="empty"><div class="icon">{ }</div><b>${esc(title)}</b><p>${esc(text)}</p></div>`;
  }

  function renderIssues(issues) {
    el.tabIssues.textContent = String(issues.length);
    if (!issues.length) {
      el.panelIssues.innerHTML = emptyState("没有发现明显问题", "别高兴太早——静态规则只能看到它见过的模式，不能替代测试和人工审查。");
      return;
    }
    const labels = { error: "E", warn: "W", info: "I" };
    el.panelIssues.innerHTML = issues.map((issue) => `
      <button class="issue" type="button" data-line="${issue.line}">
        <span class="sev ${issue.severity}">${labels[issue.severity]}</span>
        <span class="issue-main">
          <span class="issue-top"><b>${esc(issue.title)}</b><span class="issue-line">L${issue.line}</span></span>
          <span class="issue-msg">${esc(issue.msg)}</span>
          <span class="issue-fix"><b>建议</b> ${esc(issue.fix)}</span>
        </span>
      </button>
    `).join("");
  }

  function renderSignals(ai) {
    el.tabSignals.textContent = String(ai.signals.length);
    if (!ai.signals.length) {
      el.panelAi.innerHTML = emptyState("没有明显信号", "这段代码既没有特别像 AI 的地方，也没有明显的人类痕迹。");
      return;
    }
    el.panelAi.innerHTML = ai.signals.map((signal) => {
      const weight = (signal.weight > 0 ? "+" : "") + signal.weight.toFixed(1);
      const cls = signal.weight > 0 ? "pos" : "neg";
      return `<div class="signal">
        <span class="weight ${cls}">${weight}</span>
        <div class="s-main"><b>${esc(signal.label)}</b><p>${esc(signal.evidence)}</p></div>
      </div>`;
    }).join("");
  }

  function renderSuggestions(list) {
    el.tabSuggestions.textContent = String(list.length);
    if (!list.length) {
      el.panelSuggestions.innerHTML = emptyState("没有可安全简化的地方", "这段代码暂时没命中“可以直接替换”的模式。试试顶部示例「可精简的 JS」。");
      return;
    }
    el.panelSuggestions.innerHTML = list.map((s, i) => {
      const catClass = s.category === "可读性" ? "read" : "simple";
      return `<div class="suggestion" data-key="${esc(s.id + "@" + s.startLine)}" style="animation-delay:${Math.min(i * 45, 220)}ms">
        <div class="s-head">
          <span class="cat ${catClass}">${esc(s.category)}</span>
          <b>${esc(s.title)}</b>
          <span class="issue-line">L${s.startLine}${s.endLine > s.startLine ? "–" + s.endLine : ""}</span>
        </div>
        <p class="s-detail">${esc(s.detail)}</p>
        <div class="diff">
          <div class="diff-col before"><span>修改前</span><pre>${esc(s.before)}</pre></div>
          <div class="diff-col after"><span>建议</span><pre>${esc(s.after)}</pre></div>
        </div>
        <div class="s-actions">
          <span class="soft-badge">${esc(s.badge)}</span>
          <button class="apply" type="button">一键替换</button>
        </div>
      </div>`;
    }).join("");
  }

  const ALGO_ICONS = {
    bubble: "↕", selection: "↕", insertion: "↕", quick: "⚡", merge: "⑃",
    binary: "⌕", "two-pointer": "⇄", sliding: "▭", dp: "▦", bfs: "≋",
    dfs: "↳", hash: "#", recursion: "↻", fib: "φ", factorial: "!",
    gcd: "÷", sieve: "∴", heap: "⛰", "union-find": "∪", dijkstra: "◇",
    "builtin-sort": "⇅",
  };

  function renderAlgorithms(algo) {
    el.tabAlgos.textContent = String(algo.list.length);
    if (!algo.list.length) {
      el.panelAlgos.innerHTML = emptyState("没有识别到常见算法", `看起来是业务代码，或者算法被框架封装了。按循环结构估算时间复杂度是 ${algo.fallbackTime}。试试「冒泡排序」或「二分查找」示例。`);
      return;
    }
    const primary = algo.primary;
    const summary = `<p class="algo-summary">识别到 <b>${algo.list.length}</b> 个算法 · 主要 <b>${esc(primary.name)}</b> · 估算 <b>${esc(primary.time)}</b></p>`;
    const cards = algo.list.map((a, i) => `
      <div class="algo" style="animation-delay:${Math.min(i * 50, 220)}ms">
        <div class="algo-head">
          <span class="algo-icon">${ALGO_ICONS[a.id] || "◇"}</span>
          <div class="algo-title"><b>${esc(a.name)}</b><span>置信度 ${a.confidence}%</span></div>
          <span class="algo-time">${esc(a.time)}</span>
        </div>
        <p class="algo-evidence">${esc(a.evidence)}</p>
        <div class="algo-meta"><span>L${a.line}</span><span>空间 ${esc(a.space)}</span></div>
        <p class="algo-tip">${esc(a.tip)}</p>
      </div>`).join("");
    el.panelAlgos.innerHTML = summary + cards;
  }

  function animateGauge(target) {
    const reduce = window.matchMedia && window.matchMedia("(prefers-reduced-motion: reduce)").matches;
    const from = Number(el.gaugeArc.dataset.value || 0);
    el.gaugeArc.dataset.value = String(target);
    el.gaugeArc.style.stroke = target >= 65 ? "#ff7b72" : target >= 40 ? "#e3b341" : "#7ee787";
    if (reduce) {
      el.gaugeArc.style.strokeDashoffset = String(326.73 * (1 - target / 100));
      el.aiPct.textContent = String(target);
      return;
    }
    const start = performance.now();
    const duration = 700;
    function frame(now) {
      const p = Math.min(1, (now - start) / duration);
      const eased = 1 - Math.pow(1 - p, 3);
      const value = from + (target - from) * eased;
      el.gaugeArc.style.strokeDashoffset = String(326.73 * (1 - value / 100));
      el.aiPct.textContent = String(Math.round(value));
      if (p < 1) requestAnimationFrame(frame);
    }
    requestAnimationFrame(frame);
  }

  function renderOverview(analysis, langName, detected, manual) {
    const s = analysis.stats;
    const ratio = Math.round(s.commentRatio * 100);
    el.panelOverview.innerHTML = `
      <p class="ov-intro">静态扫描完成。${
        manual
          ? "语言是手动指定的。"
          : detected.source === "extension"
            ? "语言按文件后缀 ." + detected.ext + " 识别，后缀优先于内容特征。"
            : "语言由特征自动检测，置信度 " + detected.confidence + "%。"
      }</p>
      <div class="ov-grid">
        <div class="ov-item"><span>语言</span><b>${esc(langName)}</b></div>
        <div class="ov-item"><span>行数</span><b>${s.lines}</b></div>
        <div class="ov-item"><span>字符数</span><b>${s.chars}</b></div>
        <div class="ov-item"><span>函数</span><b>${s.functions}</b></div>
        <div class="ov-item"><span>注释占比</span><b>${ratio}%</b></div>
        <div class="ov-item"><span>最大缩进</span><b>${s.maxNesting} 层</b></div>
        <div class="ov-item"><span>圈复杂度</span><b>${analysis.complexity}</b></div>
        <div class="ov-item"><span>问题密度</span><b>${(analysis.issues.length / Math.max(1, s.lines)).toFixed(2)} / 行</b></div>
      </div>
      <p class="ov-note">复杂度按 if / for / while / case / catch / && / || / ? 估算，只用于大致比较。问题密度高不代表代码差，可能只是这段代码写得比较完整。</p>
    `;
  }

  function render(analysis, langName, detected, manual) {
    state.analysis = analysis;
    const issues = analysis.issues;
    const ai = analysis.ai;
    const errors = issues.filter((i) => i.severity === "error").length;
    const warns = issues.filter((i) => i.severity === "warn").length;
    const infos = issues.filter((i) => i.severity === "info").length;

    el.reportMeta.textContent = `${langName} · ${analysis.stats.lines} 行 · ${new Date().toLocaleTimeString("zh-CN", { hour12: false })}`;
    el.mLang.textContent = langName;
    el.mLangNote.textContent = manual
      ? "手动指定 · —"
      : detected.source === "extension"
        ? `后缀 .${detected.ext} · 优先识别`
        : `自动检测 · ${detected.confidence}% 置信度`;
    el.mLangNote.title = detected.source === "extension"
      ? "按文件名后缀识别，优先于内容特征；可在语言菜单中手动覆盖"
      : "";
    el.mIssues.textContent = String(issues.length);
    el.mIssuesNote.textContent = `错误 ${errors} · 警告 ${warns} · 提示 ${infos}`;
    el.mAi.textContent = ai.ai + "%";
    el.mAi.className = ai.ai >= 65 ? "red" : ai.ai >= 40 ? "amber" : "mint";
    el.mComplex.textContent = analysis.algorithms.primary ? analysis.algorithms.primary.time : analysis.algorithms.fallbackTime;
    el.mComplexNote.textContent = "圈复杂度 " + analysis.complexity;

    el.aiVerdict.textContent = ai.verdict;
    el.aiNote.textContent = ai.note;
    el.aiConf.textContent = ai.confidence + "%";
    el.aiConfFill.style.width = ai.confidence + "%";
    animateGauge(ai.ai);

    renderIssues(issues);
    renderSuggestions(analysis.suggestions);
    renderAlgorithms(analysis.algorithms);
    renderSignals(ai);
    renderOverview(analysis, langName, detected, manual);
    el.scanText.textContent = "已分析";
    el.scanState.classList.remove("live");
  }

  /* ================= 主流程 ================= */
  function currentLang() {
    const code = el.code.value;
    const detected = detectLanguage(code, {
      preferExtension: state.fileLock,
      fileName: el.fileName.textContent,
    });
    const manual = el.langSel.value !== "auto";
    const lang = manual ? el.langSel.value : detected.id;
    return { code, detected, manual, lang };
  }

  function runAnalysis(showToast = false) {
    const code = el.code.value;
    if (!code.trim()) {
      renderEmpty();
      return;
    }
    const { detected, manual, lang } = currentLang();
    const analysis = analyze(code, lang);
    analysis.ai = analyzeAI(code, analysis.lines, lang, analysis.stats);
    setEditorMode(lang);
    render(analysis, LANGS[lang] || "纯文本", detected, manual);
    if (showToast) toast("分析完成");
  }

  function setScanning(on) {
    state.busy = on;
    el.reportCard.classList.toggle("scanning", on);
    el.runBtn.classList.toggle("loading", on);
    el.runBtn.disabled = on;
    el.scanText.textContent = on ? "扫描中…" : "已分析";
    el.scanState.classList.toggle("live", on);
  }

  function analyzeNow(showToast = false) {
    clearTimeout(state.debounce);
    state.debounce = 0;
    clearTimeout(state.scan);
    setScanning(true);
    state.scan = window.setTimeout(() => {
      try {
        runAnalysis(showToast);
      } finally {
        setScanning(false);
      }
    }, 260);
  }

  function updateStats() {
    const code = el.code.value;
    const lines = code ? code.split("\n").length : 0;
    el.fileStats.textContent = `${lines} 行 · ${code.length} 字符`;
  }

  function focusLine(line) {
    const lines = el.code.value.split("\n");
    if (line < 1 || line > lines.length) return;
    let start = 0;
    for (let i = 0; i < line - 1; i++) start += lines[i].length + 1;
    const end = start + lines[line - 1].length;
    // 同步隐藏 textarea 的选区，保证降级模式与测试行为一致
    el.code.setSelectionRange(start, end);
    if (cm) {
      cm.setSelection({ line: line - 1, ch: 0 }, { line: line - 1, ch: lines[line - 1].length });
      cm.scrollIntoView({ line: line - 1, ch: 0 }, 120);
      cm.focus();
    } else {
      el.code.focus();
      const lineHeight = parseFloat(getComputedStyle(el.code).lineHeight) || 22;
      el.code.scrollTop = Math.max(0, (line - 4) * lineHeight);
    }
  }

  function loadSample(key) {
    const sample = SAMPLES[key];
    if (!sample) return;
    state.fileLock = false;
    setCode(sample.code, { resetHistory: true });
    el.fileName.textContent = sample.name;
    el.langSel.value = "auto";
    syncMenus();
    undoStack.length = 0;
    updateUndo();
    analyzeNow();
  }

  function toast(message) {
    el.toast.textContent = message;
    el.toast.classList.add("on");
    clearTimeout(toast._t);
    toast._t = window.setTimeout(() => el.toast.classList.remove("on"), 1800);
  }

  /* ================= 一键替换 / 撤销 ================= */
  const undoStack = [];

  function updateUndo() {
    el.undoBtn.disabled = undoStack.length === 0;
  }

  function pushUndo() {
    undoStack.push(el.code.value);
    if (undoStack.length > 30) undoStack.shift();
    updateUndo();
  }

  function applySuggestion(key) {
    const analysis = state.analysis;
    if (!analysis) return;
    const s = analysis.suggestions.find((item) => item.id + "@" + item.startLine === key);
    if (!s) { toast("这条建议已经过期，请重新分析"); return; }
    const lines = el.code.value.split("\n");
    const slice = lines.slice(s.startLine - 1, s.endLine).join("\n");
    if (slice !== s.before) {
      toast("代码已变化，请重新分析后再替换");
      analyzeNow();
      return;
    }
    pushUndo();
    lines.splice(s.startLine - 1, s.endLine - s.startLine + 1, ...s.after.split("\n"));
    setCode(lines.join("\n"));
    if (cm) {
      const line = Math.min(s.startLine - 1, cm.lineCount() - 1);
      cm.setCursor({ line, ch: 0 });
      cm.scrollIntoView({ line, ch: 0 }, 120);
    }
    toast("已替换 L" + s.startLine + (s.endLine > s.startLine ? "–L" + s.endLine : "") + " · 可撤销");
    analyzeNow();
  }

  function undoLast() {
    if (!undoStack.length) return;
    setCode(undoStack.pop());
    updateUndo();
    toast("已撤销上一次替换");
    analyzeNow();
  }

  /* ================= 自定义下拉菜单 ================= */
  function closeAllMenus(except) {
    document.querySelectorAll(".menu").forEach((menu) => {
      if (menu === except) return;
      if (typeof menu._close === "function") menu._close();
    });
  }

  function buildMenu(select) {
    const menu = select.closest(".menu");
    if (!menu) return;
    const trigger = menu.querySelector(".menu-trigger");
    const panel = menu.querySelector(".menu-panel");
    const list = menu.querySelector(".menu-list");
    const valueEl = trigger.querySelector(".menu-value");
    list.innerHTML = "";

    [...select.options].forEach((opt, index) => {
      const item = document.createElement("button");
      item.type = "button";
      item.className = "menu-item";
      item.setAttribute("role", "option");
      item.dataset.value = opt.value;
      item.style.setProperty("--i", String(index));

      const main = document.createElement("span");
      main.className = "mi-main";
      const title = document.createElement("span");
      title.className = "mi-title";
      title.textContent = opt.textContent;
      const meta = document.createElement("span");
      meta.className = "mi-meta";
      meta.textContent = opt.dataset.meta || "";
      main.append(title, meta);

      const tag = document.createElement("span");
      tag.className = "mi-tag";
      tag.textContent = opt.dataset.tag || "";

      const check = document.createElement("span");
      check.className = "mi-check";
      check.textContent = "✓";

      item.append(main, tag, check);
      item.addEventListener("click", () => pick(opt.value));
      list.appendChild(item);
    });

    function syncValue() {
      const opt = select.options[select.selectedIndex];
      valueEl.textContent = opt ? opt.textContent : "";
      [...list.children].forEach((item) => {
        const selected = item.dataset.value === select.value;
        item.classList.toggle("selected", selected);
        item.setAttribute("aria-selected", selected ? "true" : "false");
      });
    }

    function open() {
      closeAllMenus(menu);
      const rect = trigger.getBoundingClientRect();
      const width = Math.min(280, window.innerWidth - 16);

      // 把浮层移到 body，避免被编辑器的 overflow 裁掉，并按视口重新定位
      document.body.appendChild(panel);
      panel.classList.add("portal", "open");
      menu.classList.add("open");
      trigger.setAttribute("aria-expanded", "true");
      panel.style.width = width + "px";
      panel.style.right = "auto";
      const height = panel.offsetHeight;

      let left = rect.left;
      if (rect.left + rect.width / 2 > window.innerWidth / 2) left = rect.right - width;
      left = Math.min(Math.max(8, left), window.innerWidth - width - 8);

      let top = rect.bottom + 7;
      if (top + height > window.innerHeight - 8) {
        const above = rect.top - 7 - height;
        top = above >= 8 ? above : Math.max(8, window.innerHeight - height - 8);
      }
      panel.style.left = left + "px";
      panel.style.top = top + "px";

      const selected = list.querySelector(".menu-item.selected") || list.firstElementChild;
      if (selected) selected.focus({ preventScroll: true });
    }

    function close() {
      if (!menu.classList.contains("open") && panel.parentElement !== document.body) return;
      menu.classList.remove("open");
      trigger.setAttribute("aria-expanded", "false");
      panel.classList.remove("open");
      if (panel.parentElement === document.body) {
        menu.appendChild(panel);
        panel.classList.remove("portal");
        panel.style.left = "";
        panel.style.top = "";
        panel.style.width = "";
        panel.style.right = "";
      }
    }

    function pick(value) {
      select.value = value;
      syncValue();
      select.dispatchEvent(new Event("change", { bubbles: true }));
      close();
      trigger.focus({ preventScroll: true });
    }

    trigger.addEventListener("click", (event) => {
      event.stopPropagation();
      if (menu.classList.contains("open")) close();
      else open();
    });

    trigger.addEventListener("keydown", (event) => {
      if (event.key === "ArrowDown" || event.key === "Enter" || event.key === " ") {
        event.preventDefault();
        open();
      } else if (event.key === "Escape") {
        close();
      }
    });

    panel.addEventListener("keydown", (event) => {
      if (!menu.classList.contains("open")) return;
      const items = [...list.querySelectorAll(".menu-item")];
      const current = items.indexOf(document.activeElement);
      if (event.key === "ArrowDown") {
        event.preventDefault();
        items[Math.min(items.length - 1, current + 1)]?.focus();
      } else if (event.key === "ArrowUp") {
        event.preventDefault();
        items[Math.max(0, current - 1)]?.focus();
      } else if (event.key === "Home") {
        event.preventDefault();
        items[0]?.focus();
      } else if (event.key === "End") {
        event.preventDefault();
        items[items.length - 1]?.focus();
      } else if (event.key === "Enter" || event.key === " ") {
        if (current >= 0) {
          event.preventDefault();
          items[current].click();
        }
      } else if (event.key === "Escape") {
        event.preventDefault();
        close();
        trigger.focus();
      } else if (event.key === "Tab") {
        close();
      }
    });

    select.addEventListener("change", syncValue);
    menu._sync = syncValue;
    menu._close = close;
    menu._panel = panel;
    syncValue();
  }

  function syncMenus() {
    document.querySelectorAll(".menu").forEach((menu) => {
      if (typeof menu._sync === "function") menu._sync();
    });
  }

  function initMenus() {
    document.querySelectorAll(".menu").forEach((menu) => {
      const select = menu.querySelector("select");
      if (select) buildMenu(select);
    });
  }

  document.addEventListener("pointerdown", (event) => {
    document.querySelectorAll(".menu.open").forEach((menu) => {
      const panel = menu._panel;
      const inside = menu.contains(event.target) || (panel && panel.contains(event.target));
      if (!inside && typeof menu._close === "function") menu._close();
    });
  }, { passive: true });

  window.addEventListener("scroll", () => closeAllMenus(null), { passive: true });
  window.addEventListener("resize", () => closeAllMenus(null));

  /* ================= 事件 ================= */
  function openFilePicker() {
    if (el.fileInput) el.fileInput.click();
  }

  function loadFile(file) {
    if (!file) return;
    if (file.size > 500 * 1024) { toast("文件太大（> 500KB）"); return; }
    const reader = new FileReader();
    reader.onload = () => {
      state.fileLock = true;
      setCode(String(reader.result || ""), { resetHistory: true });
      el.fileName.textContent = file.name;
      el.langSel.value = "auto";
      syncMenus();
      undoStack.length = 0;
      updateUndo();
      analyzeNow();
      toast("已载入 " + file.name);
    };
    reader.readAsText(file);
  }

  el.openBtn.addEventListener("click", openFilePicker);
  el.fileInput.addEventListener("change", () => {
    const file = el.fileInput.files && el.fileInput.files[0];
    if (file) loadFile(file);
    el.fileInput.value = "";
  });

  const editorWrap = document.querySelector(".editor-wrap");
  ["dragenter", "dragover"].forEach((type) => {
    editorWrap.addEventListener(type, (event) => {
      event.preventDefault();
      editorWrap.classList.add("dragging");
    }, true);
  });
  editorWrap.addEventListener("dragleave", (event) => {
    if (!editorWrap.contains(event.relatedTarget)) editorWrap.classList.remove("dragging");
  }, true);
  editorWrap.addEventListener("drop", (event) => {
    event.preventDefault();
    event.stopPropagation();
    editorWrap.classList.remove("dragging");
    const file = event.dataTransfer && event.dataTransfer.files && event.dataTransfer.files[0];
    if (file) loadFile(file);
  }, true);

  el.panelIssues.addEventListener("click", (event) => {
    const issue = event.target.closest(".issue");
    if (issue) focusLine(Number(issue.dataset.line));
  });

  el.panelSuggestions.addEventListener("click", (event) => {
    const btn = event.target.closest(".apply");
    if (!btn) return;
    const card = btn.closest(".suggestion");
    if (card) applySuggestion(card.dataset.key);
  });

  el.undoBtn.addEventListener("click", undoLast);

  // 液态玻璃的高光跟随指针
  document.addEventListener("pointermove", (event) => {
    const card = event.target.closest(".editor-card,.report-card");
    if (!card) return;
    const rect = card.getBoundingClientRect();
    if (!rect.width || !rect.height) return;
    card.style.setProperty("--mx", ((event.clientX - rect.left) / rect.width * 100).toFixed(1) + "%");
    card.style.setProperty("--my", ((event.clientY - rect.top) / rect.height * 100).toFixed(1) + "%");
  }, { passive: true });

  document.querySelectorAll(".tab").forEach((tab) => {
    tab.addEventListener("click", () => {
      document.querySelectorAll(".tab").forEach((t) => {
        t.classList.toggle("active", t === tab);
        t.setAttribute("aria-selected", t === tab ? "true" : "false");
      });
      const target = tab.dataset.tab;
      el.panelIssues.hidden = target !== "issues";
      el.panelSuggestions.hidden = target !== "suggestions";
      el.panelAlgos.hidden = target !== "algo";
      el.panelAi.hidden = target !== "ai";
      el.panelOverview.hidden = target !== "overview";
    });
  });

  el.runBtn.addEventListener("click", () => analyzeNow(true));

  el.langSel.addEventListener("change", () => {
    if (el.langSel.value !== "auto") setEditorMode(el.langSel.value);
    analyzeNow();
  });

  el.sampleSel.addEventListener("change", () => {
    loadSample(el.sampleSel.value);
  });

  el.clearBtn.addEventListener("click", () => {
    clearTimeout(state.scan);
    clearTimeout(state.debounce);
    setScanning(false);
    if (el.code.value.trim()) pushUndo();
    state.fileLock = false;
    setCode("", { resetHistory: true });
    el.fileName.textContent = "untitled.txt";
    renderEmpty();
    if (cm) cm.focus(); else el.code.focus();
    toast("已清空");
  });

  /* ================= 页脚 / 防伪 ================= */
  function initFooter() {
    const foot = $("#siteFoot");
    const codeEl = $("#verifyCode");
    const btn = $("#verifyBtn");
    const stateEl = $("#verifyState");
    const noteEl = $("#verifyNote");
    if (!foot || !codeEl || !btn || !stateEl) return;

    const OWNER = "枫";
    const BUILD = "2026.10.25";
    const base = "CodeScope|" + OWNER + "|" + BUILD + "|v1.0";

    function fnv1a(text) {
      let hash = 0x811c9dc5;
      for (let i = 0; i < text.length; i++) {
        hash ^= text.charCodeAt(i);
        hash = Math.imul(hash, 0x01000193);
      }
      return (hash >>> 0).toString(36).toUpperCase().padStart(7, "0");
    }

    const signature = "CS-" + fnv1a(base).slice(0, 4) + "-" + fnv1a(base + "|seal").slice(0, 4);
    codeEl.textContent = signature;
    codeEl.title = "构建 " + BUILD + " · 作者 " + OWNER;
    document.documentElement.dataset.signature = signature;

    const hostMeta = document.querySelector('meta[name="codescope-official-hosts"]');
    const officialHosts = (hostMeta ? hostMeta.content : "")
      .split(",")
      .map((host) => host.trim().toLowerCase()
        .replace(/^https?:\/\//, "")
        .replace(/\/.*$/, "")
        .replace(/:\d+$/, ""))
      .filter(Boolean);
    const host = location.hostname.toLowerCase();
    const officialHost = !officialHosts.length || !host ||
      officialHosts.some((item) => host === item || host.endsWith("." + item));

    function setState(kind, label, note) {
      stateEl.classList.toggle("bad", kind === "bad");
      stateEl.classList.toggle("ok", kind === "ok");
      stateEl.innerHTML = "<i></i>" + label;
      if (noteEl) noteEl.textContent = note || "";
      foot.classList.toggle("mirror", kind === "bad");
    }

    if (!officialHost) {
      setState("bad", "非官方镜像", "请访问作者原站");
      document.documentElement.dataset.mirror = "1";
    }

    btn.addEventListener("click", () => {
      const ownerOk = document.body.dataset.owner === OWNER;
      const codeOk = codeEl.textContent.trim() === signature;
      if (ownerOk && codeOk && officialHost) {
        setState("ok", "✓ 正版签名有效", "作者 枫 · " + BUILD);
        btn.textContent = "已校验";
      } else {
        const reason = !officialHost ? "请访问作者原站" : "署名或签名被修改";
        setState("bad", officialHost ? "✕ 签名异常" : "非官方镜像", reason);
      }
    });

    if (officialHost) setState("ok", "正版签名", "");
    console.info("%cCodeScope", "color:#7ee787;font-weight:700", "作者：枫 · 正版标识 " + signature);
  }

  /* ================= 启动动画 ================= */
  function runIntro() {
    const intro = $("#intro");
    if (!intro) return;
    const page = $("#page");
    const stage = $("#introStage");
    const logo = $("#introLogo");
    const word = $("#introWord");
    const veil = $("#introVeil");
    const brand = $("#brandLogo");
    const skip = $("#introSkip");
    const active = document.documentElement.classList.contains("intro-active");
    let finished = false;
    const anims = [];

    function cleanup() {
      finished = true;
      window.removeEventListener("keydown", onKey, true);
      intro.removeEventListener("click", onClick);
      document.documentElement.classList.remove("intro-active");
      if (page) {
        page.inert = false;
        page.style.opacity = "";
        page.style.transform = "";
      }
      if (intro.parentNode) intro.remove();
    }

    if (!active || !stage || !logo || !word || !veil || !brand || typeof logo.animate !== "function") {
      cleanup();
      return;
    }

    const track = (anim) => { if (anim) anims.push(anim); return anim; };

    function finish() {
      if (finished) return;
      finished = true;
      window.removeEventListener("keydown", onKey, true);
      intro.removeEventListener("click", onClick);
      anims.forEach((anim) => { try { anim.cancel(); } catch (_) { /* 忽略 */ } });
      intro.style.transition = "opacity .16s ease";
      intro.style.opacity = "0";
      window.setTimeout(cleanup, 160);
    }

    function onClick(event) {
      if (event) event.stopPropagation();
      finish();
    }
    function onKey(event) {
      if (event.key === "Escape" || event.key === "Enter" || event.key === " " || event.key === "Spacebar") {
        event.preventDefault();
        finish();
      }
    }

    window.scrollTo(0, 0);
    if (page) {
      page.inert = true;
      page.style.opacity = "0";
    }
    intro.addEventListener("click", onClick);
    if (skip) skip.addEventListener("click", (event) => { event.stopPropagation(); finish(); });
    window.addEventListener("keydown", onKey, true);

    const iconWidth = logo.offsetWidth || 64;
    const stageWidth = stage.offsetWidth || (iconWidth + 14 + 180);
    const startOffset = Math.max(0, (stageWidth - iconWidth) / 2);
    const stageStart = "translate(-50%, -50%) translateX(" + startOffset + "px)";
    stage.style.transform = stageStart;
    const wait = (ms) => new Promise((r) => setTimeout(r, ms));

    (async () => {
      try {
        // 1. 中间生成图标
        const pop = track(logo.animate([
          { opacity: 0, transform: "scale(.62) rotate(-5deg)" },
          { opacity: 1, transform: "scale(1.06) rotate(1deg)", offset: 0.7 },
          { opacity: 1, transform: "scale(1) rotate(0deg)" },
        ], { duration: 520, easing: "cubic-bezier(.2,.9,.2,1)", fill: "forwards" }));
        await pop.finished;
        if (finished) return;

        // 2. 整体左移让图标滑向左侧，名字同步淡入（完整显示，不做宽度裁切）
        const slide = track(stage.animate([
          { transform: stageStart },
          { transform: "translate(-50%, -50%)" },
        ], { duration: 620, easing: "cubic-bezier(.2,.85,.2,1)", fill: "forwards" }));
        const reveal = track(word.animate([
          { opacity: 0 },
          { opacity: 1 },
        ], { duration: 520, easing: "cubic-bezier(.2,.8,.2,1)", fill: "forwards" }));
        await Promise.all([slide.finished, reveal.finished]);
        if (finished) return;
        await wait(520);
        if (finished) return;

        // 3. 图标飞回左上角，页面内容浮现
        const iconRect = logo.getBoundingClientRect();
        const target = brand.getBoundingClientRect();
        const dx = target.left - iconRect.left;
        const dy = target.top - iconRect.top;
        const scale = target.width / iconRect.width;
        logo.style.transformOrigin = "top left";

        const flight = track(logo.animate([
          { transform: "translate(0,0) scale(1)" },
          { transform: "translate(" + dx * 0.28 + "px," + dy * 0.28 + "px) scale(1.04)", offset: 0.28 },
          { transform: "translate(" + dx + "px," + dy + "px) scale(" + scale + ")" },
        ], { duration: 760, easing: "cubic-bezier(.62,.02,.18,1)", fill: "forwards" }));

        track(word.animate([
          { opacity: 1, transform: "translateX(0)" },
          { opacity: 0, transform: "translateX(-10px)" },
        ], { duration: 260, easing: "ease-in", fill: "forwards" }));

        track(veil.animate([{ opacity: 1 }, { opacity: 0 }], {
          duration: 560, delay: 180, easing: "ease-out", fill: "forwards",
        }));

        [intro.querySelector(".intro-meta"), skip].forEach((el) => {
          if (el) track(el.animate([{ opacity: 1 }, { opacity: 0 }], { duration: 220, delay: 120, fill: "forwards" }));
        });

        if (page) {
          track(page.animate([
            { opacity: 0 },
            { opacity: 1 },
          ], { duration: 380, delay: 380, easing: "cubic-bezier(.2,.8,.2,1)", fill: "forwards" }));
        }

        await flight.finished;
        if (finished) return;
        await wait(80);
        if (finished) return;
        cleanup();
      } catch (_) {
        cleanup();
      }
    })();
  }

  /* ================= 初始化 ================= */
  initMenus();
  initEditor();
  initFooter();
  const params = new URLSearchParams(location.search);
  const requestedSample = params.get("sample");
  const sampleKey = requestedSample && SAMPLES[requestedSample] ? requestedSample : "demo-js";
  const first = SAMPLES[sampleKey];
  if (requestedSample && SAMPLES[requestedSample]) el.sampleSel.value = requestedSample;
  syncMenus();
  setCode(first.code, { resetHistory: true });
  el.fileName.textContent = first.name;
  updateUndo();
  analyzeNow();

  const hashTab = document.querySelector(`[data-tab="${location.hash.slice(1)}"]`);
  if (hashTab) window.setTimeout(() => hashTab.click(), 120);

  runIntro();
})();
