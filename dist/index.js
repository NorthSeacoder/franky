"use strict";
var __create = Object.create;
var __defProp = Object.defineProperty;
var __getOwnPropDesc = Object.getOwnPropertyDescriptor;
var __getOwnPropNames = Object.getOwnPropertyNames;
var __getProtoOf = Object.getPrototypeOf;
var __hasOwnProp = Object.prototype.hasOwnProperty;
var __export = (target, all) => {
  for (var name in all)
    __defProp(target, name, { get: all[name], enumerable: true });
};
var __copyProps = (to, from, except, desc) => {
  if (from && typeof from === "object" || typeof from === "function") {
    for (let key of __getOwnPropNames(from))
      if (!__hasOwnProp.call(to, key) && key !== except)
        __defProp(to, key, { get: () => from[key], enumerable: !(desc = __getOwnPropDesc(from, key)) || desc.enumerable });
  }
  return to;
};
var __toESM = (mod, isNodeMode, target) => (target = mod != null ? __create(__getProtoOf(mod)) : {}, __copyProps(
  // If the importer is in node compatibility mode or this is not an ESM
  // file that has been converted to a CommonJS file using a Babel-
  // compatible transform (i.e. "__esModule" has not been set), then set
  // "default" to the CommonJS "module.exports" for node compatibility.
  isNodeMode || !mod || !mod.__esModule ? __defProp(target, "default", { value: mod, enumerable: true }) : target,
  mod
));
var __toCommonJS = (mod) => __copyProps(__defProp({}, "__esModule", { value: true }), mod);

// src/index.ts
var src_exports = {};
__export(src_exports, {
  activate: () => activate,
  deactivate: () => deactivate
});
module.exports = __toCommonJS(src_exports);
var import_vscode6 = require("vscode");

// src/common/utils/log.ts
var import_vscode = require("vscode");
var channel = import_vscode.window.createOutputChannel("Franky");
var log = {
  debug(...args) {
    console.log(...args);
    this.log(...args);
  },
  log(...args) {
    channel.appendLine(args.map((i) => String(i)).join(" "));
  }
};

// src/extentions/fileheader/index.ts
var import_vscode3 = require("vscode");
var import_child_process = require("child_process");

// src/common/utils/tools.ts
var import_vscode2 = require("vscode");
var getRangeFromDocument = (document, lineIndex, startSplitor, endSplitor) => {
  const { range, text } = document.lineAt(lineIndex);
  if (text.indexOf(startSplitor) < 0)
    return range;
  const startPosition = new import_vscode2.Position(lineIndex, text.indexOf(startSplitor) + 1);
  let endPosition;
  if (endSplitor) {
    endPosition = new import_vscode2.Position(lineIndex, text.indexOf(endSplitor));
  }
  return range.with(startPosition, endPosition);
};

// src/extentions/fileheader/index.ts
var import_dayjs = __toESM(require("dayjs"));
var getTemplate = ({ langId, name, time, LastModifiedTime }) => {
  return (langId !== "vue" ? [
    "/**",
    ` * @Author: ${name}`,
    ` * @Date: ${time}`,
    ` * @Last Modified by: ${name}`,
    ` * @Last Modified time: ${LastModifiedTime}`,
    " */"
  ] : [
    `<!-- @Author: ${name} -->`,
    `<!-- @Date: ${time} -->`,
    `<!-- @Last Modified by: ${name} -->`,
    `<!-- @Last Modified time: ${LastModifiedTime} -->`
  ]).join("\n");
};
var fileheader_default = () => {
  const editor = import_vscode3.window.activeTextEditor;
  if (!editor)
    return;
  const langId = editor.document.languageId;
  let name = (0, import_child_process.execSync)("git config --get user.name").toString().trim();
  editor.edit(function(editBuilder) {
    const time = (0, import_dayjs.default)().format("YYYY-MM-DD HH:mm:ss");
    const LastModifiedTime = time;
    const Targettemplate = getTemplate({ name, langId, time, LastModifiedTime });
    log.debug(name, langId, time, LastModifiedTime);
    try {
      editBuilder.insert(new import_vscode3.Position(0, 0), Targettemplate);
    } catch (error) {
      console.error(error);
    }
  });
};
var fileheaderUpdate = (document) => {
  const editor = import_vscode3.window.activeTextEditor;
  if (!editor)
    return;
  const MAX_COMMENT_LINE = 8;
  const commentCtx = document.getText(new import_vscode3.Range(0, 0, MAX_COMMENT_LINE, 0));
  const commentLineArray = commentCtx.split("\n");
  let timeDiff = 0;
  const commentNameLineIndex = commentLineArray.findIndex((item) => !!item.match("@Last Modified"));
  const commentTimeLineIndex = commentNameLineIndex + 1;
  const start = ":";
  const end = document.languageId === "vue" ? "-->" : void 0;
  const nameRange = getRangeFromDocument(document, commentNameLineIndex, start, end);
  const timeRange = getRangeFromDocument(document, commentTimeLineIndex, start, end);
  const oleTime = document.getText(timeRange);
  const now = /* @__PURE__ */ new Date();
  timeDiff = now.getTime() - new Date(oleTime).getTime();
  const LastModifiedTime = (0, import_dayjs.default)().format("YYYY-MM-DD HH:mm:ss");
  const LastModifiedName = (0, import_child_process.execSync)("git config --get user.name").toString().trim();
  if (!!nameRange && !!timeRange && timeDiff > 2e3) {
    setTimeout(function() {
      editor.edit(function(edit) {
        edit.replace(nameRange, ` ${LastModifiedName} `);
        edit.replace(timeRange, ` ${LastModifiedTime} `);
      });
      document.save();
    }, 200);
  }
};

// src/extentions/jenkins/index.ts
var import_vscode5 = require("vscode");

// src/common/utils/config.ts
var import_vscode4 = require("vscode");
function getConfig(key, v) {
  return import_vscode4.workspace.getConfiguration().get(`franky.${key}`, v);
}
var config_default = {
  get root() {
    var _a, _b, _c;
    return ((_c = (_b = (_a = import_vscode4.workspace.workspaceFolders) == null ? void 0 : _a[0]) == null ? void 0 : _b.uri) == null ? void 0 : _c.fsPath) || "";
  },
  get jenkinsUrl() {
    var _a;
    return (_a = getConfig("jenkins.url")) != null ? _a : "";
  }
};

// src/extentions/jenkins/index.ts
var jenkins_default = () => {
  const url = config_default.jenkinsUrl;
  log.debug(url);
  import_vscode5.env.openExternal(import_vscode5.Uri.parse(url));
};

// src/index.ts
function activate({ subscriptions }) {
  log.debug('"franky" is now active!');
  import_vscode6.commands.registerCommand("franky.fileheader", fileheader_default);
  import_vscode6.commands.registerCommand("franky.jenkins", jenkins_default);
  import_vscode6.workspace.onDidSaveTextDocument((file) => {
    setTimeout(() => {
      fileheaderUpdate(file);
    }, 200);
  });
  const statusBar = import_vscode6.window.createStatusBarItem(import_vscode6.StatusBarAlignment.Left, 0);
  statusBar.command = "franky.jenkins";
  statusBar.text = "Jenkins";
  statusBar.tooltip = "Jump to Jenkins";
  statusBar.show();
}
function deactivate() {
}
// Annotate the CommonJS export names for ESM import in node:
0 && (module.exports = {
  activate,
  deactivate
});
