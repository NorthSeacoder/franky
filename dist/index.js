"use strict";
var __create = Object.create;
var __defProp = Object.defineProperty;
var __getOwnPropDesc = Object.getOwnPropertyDescriptor;
var __getOwnPropNames = Object.getOwnPropertyNames;
var __getProtoOf = Object.getPrototypeOf;
var __hasOwnProp = Object.prototype.hasOwnProperty;
var __commonJS = (cb, mod) => function __require() {
  return mod || (0, cb[__getOwnPropNames(cb)[0]])((mod = { exports: {} }).exports, mod), mod.exports;
};
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

// node_modules/dayjs/dayjs.min.js
var require_dayjs_min = __commonJS({
  "node_modules/dayjs/dayjs.min.js"(exports, module2) {
    "use strict";
    !function(t, e) {
      "object" == typeof exports && "undefined" != typeof module2 ? module2.exports = e() : "function" == typeof define && define.amd ? define(e) : (t = "undefined" != typeof globalThis ? globalThis : t || self).dayjs = e();
    }(exports, function() {
      "use strict";
      var t = 1e3, e = 6e4, n = 36e5, r = "millisecond", i = "second", s = "minute", u = "hour", a = "day", o = "week", c = "month", f = "quarter", h = "year", d = "date", l = "Invalid Date", $ = /^(\d{4})[-/]?(\d{1,2})?[-/]?(\d{0,2})[Tt\s]*(\d{1,2})?:?(\d{1,2})?:?(\d{1,2})?[.:]?(\d+)?$/, y = /\[([^\]]+)]|Y{1,4}|M{1,4}|D{1,2}|d{1,4}|H{1,2}|h{1,2}|a|A|m{1,2}|s{1,2}|Z{1,2}|SSS/g, M = { name: "en", weekdays: "Sunday_Monday_Tuesday_Wednesday_Thursday_Friday_Saturday".split("_"), months: "January_February_March_April_May_June_July_August_September_October_November_December".split("_"), ordinal: function(t2) {
        var e2 = ["th", "st", "nd", "rd"], n2 = t2 % 100;
        return "[" + t2 + (e2[(n2 - 20) % 10] || e2[n2] || e2[0]) + "]";
      } }, m = function(t2, e2, n2) {
        var r2 = String(t2);
        return !r2 || r2.length >= e2 ? t2 : "" + Array(e2 + 1 - r2.length).join(n2) + t2;
      }, v = { s: m, z: function(t2) {
        var e2 = -t2.utcOffset(), n2 = Math.abs(e2), r2 = Math.floor(n2 / 60), i2 = n2 % 60;
        return (e2 <= 0 ? "+" : "-") + m(r2, 2, "0") + ":" + m(i2, 2, "0");
      }, m: function t2(e2, n2) {
        if (e2.date() < n2.date())
          return -t2(n2, e2);
        var r2 = 12 * (n2.year() - e2.year()) + (n2.month() - e2.month()), i2 = e2.clone().add(r2, c), s2 = n2 - i2 < 0, u2 = e2.clone().add(r2 + (s2 ? -1 : 1), c);
        return +(-(r2 + (n2 - i2) / (s2 ? i2 - u2 : u2 - i2)) || 0);
      }, a: function(t2) {
        return t2 < 0 ? Math.ceil(t2) || 0 : Math.floor(t2);
      }, p: function(t2) {
        return { M: c, y: h, w: o, d: a, D: d, h: u, m: s, s: i, ms: r, Q: f }[t2] || String(t2 || "").toLowerCase().replace(/s$/, "");
      }, u: function(t2) {
        return void 0 === t2;
      } }, g = "en", D = {};
      D[g] = M;
      var p = "$isDayjsObject", S = function(t2) {
        return t2 instanceof _ || !(!t2 || !t2[p]);
      }, w = function t2(e2, n2, r2) {
        var i2;
        if (!e2)
          return g;
        if ("string" == typeof e2) {
          var s2 = e2.toLowerCase();
          D[s2] && (i2 = s2), n2 && (D[s2] = n2, i2 = s2);
          var u2 = e2.split("-");
          if (!i2 && u2.length > 1)
            return t2(u2[0]);
        } else {
          var a2 = e2.name;
          D[a2] = e2, i2 = a2;
        }
        return !r2 && i2 && (g = i2), i2 || !r2 && g;
      }, O = function(t2, e2) {
        if (S(t2))
          return t2.clone();
        var n2 = "object" == typeof e2 ? e2 : {};
        return n2.date = t2, n2.args = arguments, new _(n2);
      }, b = v;
      b.l = w, b.i = S, b.w = function(t2, e2) {
        return O(t2, { locale: e2.$L, utc: e2.$u, x: e2.$x, $offset: e2.$offset });
      };
      var _ = function() {
        function M2(t2) {
          this.$L = w(t2.locale, null, true), this.parse(t2), this.$x = this.$x || t2.x || {}, this[p] = true;
        }
        var m2 = M2.prototype;
        return m2.parse = function(t2) {
          this.$d = function(t3) {
            var e2 = t3.date, n2 = t3.utc;
            if (null === e2)
              return /* @__PURE__ */ new Date(NaN);
            if (b.u(e2))
              return /* @__PURE__ */ new Date();
            if (e2 instanceof Date)
              return new Date(e2);
            if ("string" == typeof e2 && !/Z$/i.test(e2)) {
              var r2 = e2.match($);
              if (r2) {
                var i2 = r2[2] - 1 || 0, s2 = (r2[7] || "0").substring(0, 3);
                return n2 ? new Date(Date.UTC(r2[1], i2, r2[3] || 1, r2[4] || 0, r2[5] || 0, r2[6] || 0, s2)) : new Date(r2[1], i2, r2[3] || 1, r2[4] || 0, r2[5] || 0, r2[6] || 0, s2);
              }
            }
            return new Date(e2);
          }(t2), this.init();
        }, m2.init = function() {
          var t2 = this.$d;
          this.$y = t2.getFullYear(), this.$M = t2.getMonth(), this.$D = t2.getDate(), this.$W = t2.getDay(), this.$H = t2.getHours(), this.$m = t2.getMinutes(), this.$s = t2.getSeconds(), this.$ms = t2.getMilliseconds();
        }, m2.$utils = function() {
          return b;
        }, m2.isValid = function() {
          return !(this.$d.toString() === l);
        }, m2.isSame = function(t2, e2) {
          var n2 = O(t2);
          return this.startOf(e2) <= n2 && n2 <= this.endOf(e2);
        }, m2.isAfter = function(t2, e2) {
          return O(t2) < this.startOf(e2);
        }, m2.isBefore = function(t2, e2) {
          return this.endOf(e2) < O(t2);
        }, m2.$g = function(t2, e2, n2) {
          return b.u(t2) ? this[e2] : this.set(n2, t2);
        }, m2.unix = function() {
          return Math.floor(this.valueOf() / 1e3);
        }, m2.valueOf = function() {
          return this.$d.getTime();
        }, m2.startOf = function(t2, e2) {
          var n2 = this, r2 = !!b.u(e2) || e2, f2 = b.p(t2), l2 = function(t3, e3) {
            var i2 = b.w(n2.$u ? Date.UTC(n2.$y, e3, t3) : new Date(n2.$y, e3, t3), n2);
            return r2 ? i2 : i2.endOf(a);
          }, $2 = function(t3, e3) {
            return b.w(n2.toDate()[t3].apply(n2.toDate("s"), (r2 ? [0, 0, 0, 0] : [23, 59, 59, 999]).slice(e3)), n2);
          }, y2 = this.$W, M3 = this.$M, m3 = this.$D, v2 = "set" + (this.$u ? "UTC" : "");
          switch (f2) {
            case h:
              return r2 ? l2(1, 0) : l2(31, 11);
            case c:
              return r2 ? l2(1, M3) : l2(0, M3 + 1);
            case o:
              var g2 = this.$locale().weekStart || 0, D2 = (y2 < g2 ? y2 + 7 : y2) - g2;
              return l2(r2 ? m3 - D2 : m3 + (6 - D2), M3);
            case a:
            case d:
              return $2(v2 + "Hours", 0);
            case u:
              return $2(v2 + "Minutes", 1);
            case s:
              return $2(v2 + "Seconds", 2);
            case i:
              return $2(v2 + "Milliseconds", 3);
            default:
              return this.clone();
          }
        }, m2.endOf = function(t2) {
          return this.startOf(t2, false);
        }, m2.$set = function(t2, e2) {
          var n2, o2 = b.p(t2), f2 = "set" + (this.$u ? "UTC" : ""), l2 = (n2 = {}, n2[a] = f2 + "Date", n2[d] = f2 + "Date", n2[c] = f2 + "Month", n2[h] = f2 + "FullYear", n2[u] = f2 + "Hours", n2[s] = f2 + "Minutes", n2[i] = f2 + "Seconds", n2[r] = f2 + "Milliseconds", n2)[o2], $2 = o2 === a ? this.$D + (e2 - this.$W) : e2;
          if (o2 === c || o2 === h) {
            var y2 = this.clone().set(d, 1);
            y2.$d[l2]($2), y2.init(), this.$d = y2.set(d, Math.min(this.$D, y2.daysInMonth())).$d;
          } else
            l2 && this.$d[l2]($2);
          return this.init(), this;
        }, m2.set = function(t2, e2) {
          return this.clone().$set(t2, e2);
        }, m2.get = function(t2) {
          return this[b.p(t2)]();
        }, m2.add = function(r2, f2) {
          var d2, l2 = this;
          r2 = Number(r2);
          var $2 = b.p(f2), y2 = function(t2) {
            var e2 = O(l2);
            return b.w(e2.date(e2.date() + Math.round(t2 * r2)), l2);
          };
          if ($2 === c)
            return this.set(c, this.$M + r2);
          if ($2 === h)
            return this.set(h, this.$y + r2);
          if ($2 === a)
            return y2(1);
          if ($2 === o)
            return y2(7);
          var M3 = (d2 = {}, d2[s] = e, d2[u] = n, d2[i] = t, d2)[$2] || 1, m3 = this.$d.getTime() + r2 * M3;
          return b.w(m3, this);
        }, m2.subtract = function(t2, e2) {
          return this.add(-1 * t2, e2);
        }, m2.format = function(t2) {
          var e2 = this, n2 = this.$locale();
          if (!this.isValid())
            return n2.invalidDate || l;
          var r2 = t2 || "YYYY-MM-DDTHH:mm:ssZ", i2 = b.z(this), s2 = this.$H, u2 = this.$m, a2 = this.$M, o2 = n2.weekdays, c2 = n2.months, f2 = n2.meridiem, h2 = function(t3, n3, i3, s3) {
            return t3 && (t3[n3] || t3(e2, r2)) || i3[n3].slice(0, s3);
          }, d2 = function(t3) {
            return b.s(s2 % 12 || 12, t3, "0");
          }, $2 = f2 || function(t3, e3, n3) {
            var r3 = t3 < 12 ? "AM" : "PM";
            return n3 ? r3.toLowerCase() : r3;
          };
          return r2.replace(y, function(t3, r3) {
            return r3 || function(t4) {
              switch (t4) {
                case "YY":
                  return String(e2.$y).slice(-2);
                case "YYYY":
                  return b.s(e2.$y, 4, "0");
                case "M":
                  return a2 + 1;
                case "MM":
                  return b.s(a2 + 1, 2, "0");
                case "MMM":
                  return h2(n2.monthsShort, a2, c2, 3);
                case "MMMM":
                  return h2(c2, a2);
                case "D":
                  return e2.$D;
                case "DD":
                  return b.s(e2.$D, 2, "0");
                case "d":
                  return String(e2.$W);
                case "dd":
                  return h2(n2.weekdaysMin, e2.$W, o2, 2);
                case "ddd":
                  return h2(n2.weekdaysShort, e2.$W, o2, 3);
                case "dddd":
                  return o2[e2.$W];
                case "H":
                  return String(s2);
                case "HH":
                  return b.s(s2, 2, "0");
                case "h":
                  return d2(1);
                case "hh":
                  return d2(2);
                case "a":
                  return $2(s2, u2, true);
                case "A":
                  return $2(s2, u2, false);
                case "m":
                  return String(u2);
                case "mm":
                  return b.s(u2, 2, "0");
                case "s":
                  return String(e2.$s);
                case "ss":
                  return b.s(e2.$s, 2, "0");
                case "SSS":
                  return b.s(e2.$ms, 3, "0");
                case "Z":
                  return i2;
              }
              return null;
            }(t3) || i2.replace(":", "");
          });
        }, m2.utcOffset = function() {
          return 15 * -Math.round(this.$d.getTimezoneOffset() / 15);
        }, m2.diff = function(r2, d2, l2) {
          var $2, y2 = this, M3 = b.p(d2), m3 = O(r2), v2 = (m3.utcOffset() - this.utcOffset()) * e, g2 = this - m3, D2 = function() {
            return b.m(y2, m3);
          };
          switch (M3) {
            case h:
              $2 = D2() / 12;
              break;
            case c:
              $2 = D2();
              break;
            case f:
              $2 = D2() / 3;
              break;
            case o:
              $2 = (g2 - v2) / 6048e5;
              break;
            case a:
              $2 = (g2 - v2) / 864e5;
              break;
            case u:
              $2 = g2 / n;
              break;
            case s:
              $2 = g2 / e;
              break;
            case i:
              $2 = g2 / t;
              break;
            default:
              $2 = g2;
          }
          return l2 ? $2 : b.a($2);
        }, m2.daysInMonth = function() {
          return this.endOf(c).$D;
        }, m2.$locale = function() {
          return D[this.$L];
        }, m2.locale = function(t2, e2) {
          if (!t2)
            return this.$L;
          var n2 = this.clone(), r2 = w(t2, e2, true);
          return r2 && (n2.$L = r2), n2;
        }, m2.clone = function() {
          return b.w(this.$d, this);
        }, m2.toDate = function() {
          return new Date(this.valueOf());
        }, m2.toJSON = function() {
          return this.isValid() ? this.toISOString() : null;
        }, m2.toISOString = function() {
          return this.$d.toISOString();
        }, m2.toString = function() {
          return this.$d.toUTCString();
        }, M2;
      }(), k = _.prototype;
      return O.prototype = k, [["$ms", r], ["$s", i], ["$m", s], ["$H", u], ["$W", a], ["$M", c], ["$y", h], ["$D", d]].forEach(function(t2) {
        k[t2[1]] = function(e2) {
          return this.$g(e2, t2[0], t2[1]);
        };
      }), O.extend = function(t2, e2) {
        return t2.$i || (t2(e2, _, O), t2.$i = true), O;
      }, O.locale = w, O.isDayjs = S, O.unix = function(t2) {
        return O(1e3 * t2);
      }, O.en = D[g], O.Ls = D, O.p = {}, O;
    });
  }
});

// src/index.ts
var src_exports = {};
__export(src_exports, {
  activate: () => activate,
  deactivate: () => deactivate
});
module.exports = __toCommonJS(src_exports);
var import_child_process2 = require("child_process");
var import_vscode8 = require("vscode");

// src/common/context.ts
var ctx = {
  active: false,
  login: false,
  name: "franky"
};

// src/extentions/fileheader/index.ts
var import_vscode3 = require("vscode");
var import_child_process = require("child_process");

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
function camelCase(input) {
  return input.replace(/-([a-z])/g, (_, match) => match.toUpperCase());
}
function upperFirst(input) {
  return input.charAt(0).toUpperCase() + input.slice(1);
}

// src/extentions/fileheader/index.ts
var import_dayjs = __toESM(require_dayjs_min());
var getTemplate = ({ langId, name, time, LastModifiedTime }) => {
  return (langId !== "vue" ? [
    "/**",
    ` * @Author: ${name}`,
    ` * @Date: ${time}`,
    ` * @Last Modified by: ${name}`,
    ` * @Last Modified time: ${LastModifiedTime}`,
    " */\n\n"
  ] : [
    `<!-- @Author: ${name} -->`,
    `<!-- @Date: ${time} -->`,
    `<!-- @Last Modified by: ${name} -->`,
    `<!-- @Last Modified time: ${LastModifiedTime} -->

`
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

// src/extentions/generate/index.ts
var import_vscode5 = require("vscode");

// src/common/utils/file.ts
var import_vscode4 = require("vscode");
async function writeFile(path, content) {
  return import_vscode4.workspace.fs.writeFile(import_vscode4.Uri.file(path), new Uint8Array(Buffer.from(content)));
}

// src/extentions/generate/templates/fields.ts
var fields_default = () => {
  const langId = "typescript";
  return `
import {defineFields} from '@yqg/type';

export default defineFields({
    name: {field: 'name', label: '\u540D\u79F0'},
});
`;
};

// src/extentions/generate/templates/options.ts
var options_default = () => {
  const langId = "typescript";
  return `
import {defineForm, defineTable} from '@yqg/type';

import {fixedRight,op} from 'src/common/constant/fields';

import Fields from './fields';

export const FormOptions = Object.freeze(defineForm({
    fieldDefs: [
        Fields.name,
    ]
}));

export const EditModalFormOptions = Object.freeze(defineForm({
    fieldDefs: [
        Fields.name,
    ]
}));

export const DetailFormOptions = Object.freeze(defineForm({
    fieldDefs: [
        Fields.name,
    ]
}));

export const TableOptions = Object.freeze(defineTable({
    colDefs: [
        Fields.name,
        fixedRight(op)
    ]
}));
`;
};

// src/extentions/generate/templates/vue.ts
var vue_default = ({ name, componentName }) => {
  const langId = "vue";
  return `
<template>
    <div class="${componentName}">
        <yqg-simple-form
            auto-search
            :options="FormOptions"
            confirm-label="common.query"
            @confirm="onSearch"
            @reset="onSearch"
        >
            <template #extraBtns>
                <a-button
                    v-show="isAuthorized(Permissions.CONFIG_CREATE)"
                    @click="openEditModal()"
                    v-text="'\u65B0\u5EFA'"
                />
            </template>
        </yqg-simple-form>
        <yqg-simple-table
            :options="TableOptions"
            :records="records"
            :pagination="pagination"
            @change="onTableChange"
        >
            <template #op="{ record }">
                <a-button
                    size="small"
                    @click="openDetailModal(record)"
                >
                    \u67E5\u770B
                </a-button>
                <a-button
                    size="small"
                    :disabled="record.distributed"
                    @click="openEditModal(record)"
                >
                    \u7F16\u8F91
                </a-button>
                <a-popconfirm
                    title="\u662F\u5426\u786E\u8BA4\u5220\u9664"
                    @confirm="deleteRecord(record)"
                >
                    <a-button
                        size="small"
                        type="danger"
                    >
                        \u5220\u9664
                    </a-button>
                </a-popconfirm>
            </template>
        </yqg-simple-table>
    </div>
</template>

<script type="text/babel">
import {table} from 'src/common/mixin';
import Xxx from 'src/common/resource/xxx';

import {FormOptions, TableOptions} from './constant/options';
import DetailModal from './modal/detail-modal';
import EditModal from './modal/edit-modal';

export default {
    name: '${name}',

    mixins: [table],

    inject: ['isAuthorized', 'Permissions'],

    data() {
        return {
            records: [],
            FormOptions,
            TableOptions
        };
    },

    methods: {
        async onRefresh() {
            const {params} = this;
            const {
                data: {body}
            } = await Xxx.get({params});
            this.pagination.total = body.length;
            this.records = body;
        },

        openEditModal(record) {
            this.$modal.open(EditModal, {record}).then(this.onRefresh);
        },

        openDetailModal(record) {
            this.$modal.open(DetailModal, {record}).then(this.onRefresh);
        },

        deleteRecord(record) {
            Xxx.delete(record).then(() => {
                this.onRefresh();
            });
        }
    }
};

</script>

<style lang="scss" scoped>

</style>

`;
};

// src/extentions/generate/templates/react.ts
var react_default = (name) => {
  const langId = "typescript";
  return `
import {Button} from 'antd';
import {useState} from 'react';
import {useTranslation} from 'react-i18next';
import {connect} from 'react-redux';

import {useModal} from '@yqg/react';
import YqgSimpleForm from '@yqg/react/src/component/yqg-simple-form';
import YqgSimpleTable from '@yqg/react/src/component/yqg-simple-table';

import saveFileFromResponse from 'yqg-common/utils/save-file';

import Xxx from 'common/resource/xxx';
import YqgPrivilege from 'common/component/yqg-privilege';
import {PRIVILEGE_DEMO} from 'common/constant/basic/privilege';
import {ApiParams, usePagination} from 'common/hook';
import {isAuthorized} from 'common/util/privilege';

import {FormOptions, TableOptions} from './constant/options';
import EditModal from './modal/edit';

type Props = {location: any, currentUser: object};
const ${name}: React.FC<Props> = ({currentUser, location}) => {
    const {t} = useTranslation();
    const {query: {companyId}} = location;

    const [records, setRecords] = useState<any[]>(null);

    const {
        onSearchNext,
        onRefresh
    } = usePagination(fetchList);
    const {open} = useModal();

    async function fetchList({params}: ApiParams) {
        const {data: {body}} = await Xxx.list({params: {
            companyId, ...params
        }});
        setRecords(body);
    }

    const onExport = async ({form}) => {
        const params = form.getFieldsValue();
        const res = await Xxx.export({params: {
            companyId, ...params
        }, responseType: 'blob'});
        saveFileFromResponse(res);
    };

    const onEdit = (record?: any) => {
        open(EditModal, {record, location}).then(onRefresh, x => x);
    };

    const extraBtns = formCtx => (
        <YqgPrivilege
            hasAny={[PRIVILEGE_DEMO]}
        >
            <Button
                type="primary"
                onClick={() => onEdit()}
            >
                {t('common.submit')}
            </Button>
            <Button onClick={() => onExport(formCtx)}>
                {t('common.export')}
            </Button>
        </YqgPrivilege>
    );

    return (
        <>
            <YqgSimpleForm
                {...{
                    autoSearch: true,
                    tagVisible: true,
                    options: FormOptions,
                    onConfirm: onSearchNext,
                    onReset: onSearchNext,
                    extraBtns,
                    confirmLabel: 'common.query',
                    ctx: {companyId}
                }}
            />
            <YqgSimpleTable
                {...{
                    options: TableOptions,
                    records,
                    ctx: {onEdit, companyId, currentUser, isAuthorized}
                }}
            />
        </>
    );
};

export default connect(state => ({currentUser: state.user}))(${name});
`;
};

// src/extentions/generate/templates/modal-vue.ts
var EditModalTpl = ({ name }) => {
  const langId = "vue";
  return `
<template>
    <yqg-simple-form
        :title="title"
        :options="EditModalFormOptions"
        :values="record"
        @confirm="onConfirm"
        @cancel="dismiss"
    />
</template>

<script type="text/babel">

import {modal} from 'src/common/mixin';
import Xxx from 'src/common/resource/xxx';

import {EditModalFormOptions} from '../constant/options';

export default {
    name: '${name}',

    mixins: [modal],

    inject: ['opSuccess'],

    props: {
        record: {
            type: Object,
            default: () => ({})
        }
    },

    data() {
        return {
            EditModalFormOptions,
        };
    },

    computed: {
        title() {
            return this.record.id ? '\u7F16\u8F91' : '\u521B\u5EFA';
        }
    },

    methods: {
        async onConfirm({record}) {
            await Xxx.save(record);
            this.opSuccess();
            this.close();
        }
    }
};
</script>
`;
};
var DetailModalTpl = ({ name }) => {
  const langId = "vue";
  return `
<template>
    <yqg-static-form
        title="\u8BE6\u60C5"
        :options="DetailFormOptions"
        :values="record"
    />
</template>

<script type="text/babel">
import {modal} from 'src/common/mixin';

import {DetailFormOptions} from '../constant/options';

export default {
    name: '${name}',

    onlyClose: true,

    mixins: [modal],

    props: {
        record: {
            type: Object,
            default: () => ({})
        }
    },

    data() {
        return {
            DetailFormOptions
        };
    }
};
</script>
`;
};

// src/extentions/generate/templates/modal-react.ts
var modal_react_default = () => {
  const langId = "typescript";
  return `
import {useState} from 'react';
import {useTranslation} from 'react-i18next';

import YqgSimpleForm from '@yqg/react/src/component/yqg-simple-form';

import Xxx from 'common/resource/xxx';
import YqgToast from 'common/util/yqg-toast';

import {FormOptions} from '../constant/options';

type Props = {
    record?: any,
    close: (value?: any) => void,
    dismiss: (reason?: any) => void,
    location: any
};

const EditModal: React.FC<Props> = ({record, dismiss, close, location}) => {
    const {t} = useTranslation();
    const {query: {companyId}} = location;
    const [values, setValues] = useState({companyId, ...record});

    const onConfirm = async ({record}) => {
        await Xxx.save(record);
        YqgToast.success(t('common.submitSuccess'));
        close();
    };

    const onChange = ({record: newRecord}) => {
        setValues(newRecord);
    };

    return (
        <YqgSimpleForm {...{
            title: record?.id ? t('editAccount') : t('addAccount'),
            values,
            options: FormOptions,
            onCancel: dismiss,
            onConfirm,
            onChange,
            ctx: {companyId, setValues}
        }}
        />
    );
};

export default EditModal;
`;
};

// src/extentions/generate/templates/wp/constant/index.ts
var constant_default = () => {
  const langId = "typescript";
  return `
export const pre = (key: string) => \`Yard.info.\${key}\`;

const Fields = {
    key1: {
        label: "key",
        value: "value"
    }
}

export default Fields;
`;
};

// src/extentions/generate/templates/wp/index.ts
var wp_default = (name) => {
  const langId = "typescript";
  return `import { useMemo } from "react";
import { useForm } from "react-hook-form";
import { Button } from "@/components/ui/button";
import YqgTable from "@/components/yqg-table";
import OpPopover, { IconNode } from "@/components/yqg-table/op-popover";
import { EditIcon } from "@/components/icon";
import Http, { Info } from "@/http/api/http";//TODO: \u6539\u6210\u81EA\u5DF1\u7684resource

import { useSimpleTableWithQuery } from "@/components/yqg-table/useSimpleTable";
import { useEnum, useTranslations } from "@/lib/hooks";
import { Fields as CommonFields } from "@/constant";

import YqgFormLayout from "@/components/yqg-form-layout";
import EditModal from "./modal/edit";

import Fields, { pre } from "./constant";

function StatusComp({ record }: { record: any }) {
    const queryClient = useQueryClient();
    const editMutate = useMutation({
        mutationFn: (data: Info) => Http.change(data),
        onSuccess: () => {
            queryClient.invalidateQueries({ queryKey: ["get${name}List"] });
        },
    });
    return (
        <StatusSwitch
            record={record}
            mutate={editMutate.mutate}
            key="status"
            checkedValues={["ENABLE", "DISABLE"]}
        />
    );
}

export default function ${name}List() {
    
    const $t = useTranslations("");

    const StatusOptions = useEnum({
        key: "EnabledState",
    });

    const form: any = useForm();

    const { data, pagination, onTableChange, onRefresh } = useSimpleTableWithQuery({
        fetchApi: Http.getList,
        queryKey: ["get${name}List"],
    });


    const FormOptions = useMemo(
        () =>
            ({
                fieldDefs: [
                    Fields.key1
                ],
            } as any),
        [],
    );

    const TableOptions = useMemo(
        () => ({
            colDefs: [
                Fields.key,
                {
                    ...CommonFields.status,
                    options: StatusOptions,
                    staticComp: StatusComp,
                },
                {
                    field: "op",
                    column: { fixed: "right" },
                    staticComp: ({ ctx, record }: any) => (
                        <OpPopover>
                            <IconNode
                                onClick={async () => {
                                    await EditModal.open({
                                        info: record
                                    })
                                    onRefresh()
                                }}
                                text={ctx.t(pre("modify"))}
                                icon={<EditIcon />}
                            />
                        </OpPopover>   
                    ),
                },
            ],
        }),
        [onRefresh,StatusOptions],
    );

    const extraBtn = (
        <>
            <Button
                onClick={async () => {
                    await EditModal.open({
                        info: {}
                    })
                    onRefresh()
                }}
            >{$t("Common.create")}</Button>
        </>
    );

    return (
        <>
            <YqgFormLayout
                form={form}
                options={FormOptions}
                onSubmit={onRefresh}
                onReset={onRefresh}
                confirmLabel="Common.search"
                extraBtn={extraBtn}
            >
                <YqgTable
                    ctx={{ t: $t }}
                    options={TableOptions as any}
                    records={data?.body?.list || []}
                    pagination={{
                        ...pagination,
                        total: data?.body?.total,
                    }}
                    onChange={onTableChange}
                />
            </YqgFormLayout>
        </>
    );
}
`;
};

// src/extentions/generate/templates/wp/modal/edit.ts
var edit_default = (name) => {
  const langId = "typescript";
  return `import { useMemo } from "react";
import { useForm } from "react-hook-form";
import * as yup from "yup";

import { YqgFormModal, createProgramModal, YqgModalProps } from "@/components/yqg-antd-modal";
import { useTranslations  } from "@/lib/hooks";
import { useMutation } from "@tanstack/react-query";
import { yupResolver } from "@hookform/resolvers/yup";

import useToast from "@/components/use-toast";
import Fields, { pre } from "../constant";

interface ModalProps {
    info: any;
}

const required = true;

function Edit${name} (props: YqgModalProps<ModalProps>) {
    const { info, onDismiss, onClose } = props;

    const $t = useTranslations("");
    const $tc = useTranslations("Common");
    const { toast } = useToast();
    
    const title = $t(pre(info.id ? "modifyYard" : "createYard"));
    const disabled = useMemo(() => Http.id, [info]);
    const editForm = useForm({
        values: info,
        resolver: yupResolver(yup.object({
        })),
    });

    const editMutate = useMutation({
        mutationFn: (data: Info) => Http[info.id ? "change" : "create"](data),
        onSuccess: () => {
            toast({ description: $tc("operateSuccess") });
            onClose();
        },
    })

    const handleConfirm = (values: any) => {
        editMutate.mutate(data);
    }


    const FormOptions = useMemo(() => ({
        layout: "vertical",
        fieldDefs: [
            Fields.key
        ]
    }), []);

    return (
        <YqgFormModal
            title={title}
            form={editForm}
            options={FormOptions}
            onCancel={onDismiss}
            onSubmit={handleConfirm}
        />
    )
}

export default createProgramModal(EditYard);
`;
};

// src/extentions/generate/templates/wp/modal/view.ts
var view_default = (name) => {
  const langId = "typescript";
  return `import { useMemo } from "react";

import { YqgModal, createProgramModal, YqgModalProps } from "@/components/yqg-antd-modal";
import YqgStaicForm from "@/components/yqg-static-form";
import { useTranslations, useEnum } from "@/lib/hooks";
import { useWarehouseOptions } from "@/lib/hooks/index";

import Fields, { pre } from "../constant";

type ModalProps = {
    info: any;
}
function View${name}(props: YqgModalProps<ModalProps>) {
    const {
        info = {},
        onClose,
    } = props;

    const $t = useTranslations("");

    const StatusOptions = useEnum({ key: "EnabledState" });
    const { WarehouseOptions } = useWarehouseOptions();


    const FormOptions = useMemo(() => ({
        layout: "horizontal",
        fieldDefs: [
            Fields.key1
        ]
    }), [WarehouseOptions, StatusOptions]);

    return (
        <YqgModal
            title={$t(pre("info"))}
            onCancel={onClose}
        >
            <YqgStaicForm
                options={FormOptions}
                values={info}
            />
        </YqgModal>
    );
}

export default createProgramModal(CompanyDetailModal)
`;
};

// src/extentions/generate/index.ts
var VueGeneratorStrategy = class {
  async generate(uri, componentName) {
    const { path } = uri;
    const name = upperFirst(camelCase(componentName));
    await writeFile(`${path}/index.vue`, vue_default({ name, componentName }));
    await writeFile(`${path}/constant/fields.ts`, fields_default());
    await writeFile(`${path}/constant/options.ts`, options_default());
    await this.generateModal(uri, name);
  }
  async generateModal(uri, name) {
    const modalUri = import_vscode5.Uri.file(`${uri.path}/modal`);
    await writeFile(`${modalUri.path}/edit-modal.vue`, EditModalTpl({ name }));
    await writeFile(`${modalUri.path}/detail-modal.vue`, DetailModalTpl({ name }));
  }
};
var ReactGeneratorStrategy = class {
  async generate(uri, componentName) {
    const { path } = uri;
    const name = upperFirst(camelCase(componentName));
    await writeFile(`${path}/index.tsx`, react_default(name));
    await writeFile(`${path}/constant/fields.ts`, fields_default());
    await writeFile(`${path}/constant/options.ts`, options_default());
    await this.generateModal(uri);
  }
  async generateModal(uri) {
    const { path } = uri;
    await writeFile(`${path}/modal/edit-modal.tsx`, modal_react_default());
  }
};
var WpGeneratorStrategy = class {
  async generate(uri, componentName) {
    const { path } = uri;
    const name = upperFirst(camelCase(componentName));
    await writeFile(`${path}/index.tsx`, wp_default(name));
    await writeFile(`${path}/constant/index.tsx`, constant_default());
    await this.generateModal(uri, name);
  }
  async generateModal(uri, name) {
    const { path } = uri;
    await writeFile(`${path}/modal/edit.tsx`, edit_default(name));
    await writeFile(`${path}/modal/view.tsx`, view_default(name));
  }
};
var generatePage = async (uri, generatorStrategy) => {
  try {
    const componentName = await import_vscode5.window.showInputBox({
      prompt: "component-name in kebab-case"
    });
    if (!componentName) {
      return import_vscode5.window.showErrorMessage("No component name passed");
    }
    const regex = /^[a-z]+(-[a-z]+)*$/;
    if (!regex.test(componentName)) {
      return import_vscode5.window.showErrorMessage("component-name must be in kebab-case");
    }
    const compUri = import_vscode5.Uri.file(`${uri.path}/${componentName}`);
    await generatorStrategy.generate(compUri, componentName);
  } catch (error) {
    log.debug(error);
  }
};
var genVuePage = async (uri) => {
  if (!uri) {
    return import_vscode5.window.showErrorMessage("No file path found.");
  }
  const generatorStrategy = new VueGeneratorStrategy();
  await generatePage(uri, generatorStrategy);
};
var genReactPage = async (uri) => {
  if (!uri) {
    return import_vscode5.window.showErrorMessage("No file path found.");
  }
  const generatorStrategy = new ReactGeneratorStrategy();
  await generatePage(uri, generatorStrategy);
};
var genWpPage = async (uri) => {
  if (!uri) {
    return import_vscode5.window.showErrorMessage("No file path found.");
  }
  const generatorStrategy = new WpGeneratorStrategy();
  await generatePage(uri, generatorStrategy);
};
function parseStringToObject(str) {
  const lines = str.split("\n");
  const result = {};
  for (const line of lines) {
    let key, value;
    if (line.includes(":")) {
      [key, value] = line.split(":");
    }
    if (line.includes("\uFF1A")) {
      [key, value] = line.split("\uFF1A");
    }
    if (!key || !value)
      continue;
    const field = key.replace(/[^a-zA-Z]|"/g, "");
    const label = value.replace(/[^\u4e00-\u9fa5a-zA-Z]/g, "");
    result[field] = { field, label };
  }
  return JSON.stringify(result, null, 4);
}
var genDefs = async () => {
  let editor = import_vscode5.window.activeTextEditor;
  if (!editor) {
    return;
  }
  let selection = editor.selection;
  let selectedText = editor.document.getText(selection);
  await import_vscode5.env.clipboard.writeText(parseStringToObject(selectedText));
  import_vscode5.window.showInformationMessage("\u5DF2\u5C06\u7ED3\u679C\u8BBE\u7F6E\u5230\u526A\u8D34\u677F");
};
var strTpl = (key) => `${key}: { field: "${key}", label: pre("${key}") },`;
var genFields = async () => {
  let editor = import_vscode5.window.activeTextEditor;
  if (!editor) {
    return;
  }
  const text = await import_vscode5.env.clipboard.readText();
  console.log(text);
  const obj = JSON.parse(text);
  const result = [];
  for (const key in obj) {
    result.push(strTpl(key));
  }
  console.log(editor.document.languageId);
  editor.edit((editBuilder) => {
    var _a;
    editBuilder.replace((_a = editor == null ? void 0 : editor.selection.active) != null ? _a : new import_vscode5.Position(0, 0), result.join("\n"));
  });
};

// src/extentions/jenkins/index.ts
var import_vscode7 = require("vscode");

// src/common/utils/config.ts
var import_vscode6 = require("vscode");
function getConfig(key, v) {
  return import_vscode6.workspace.getConfiguration().get(`franky.${key}`, v);
}
var config_default = {
  get root() {
    var _a, _b, _c;
    return ((_c = (_b = (_a = import_vscode6.workspace.workspaceFolders) == null ? void 0 : _a[0]) == null ? void 0 : _b.uri) == null ? void 0 : _c.fsPath) || "";
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
  import_vscode7.env.openExternal(import_vscode7.Uri.parse(url));
};

// src/index.ts
function activate({ subscriptions }) {
  log.debug('"franky" is now active!');
  ctx.active = true;
  const name = (0, import_child_process2.execSync)("git config --get user.name").toString().trim();
  ctx.name = name;
  subscriptions.push(
    import_vscode8.commands.registerCommand("franky.fileheader", fileheader_default),
    import_vscode8.commands.registerCommand("franky.jenkins", jenkins_default),
    import_vscode8.commands.registerCommand("franky.generate.vue", genVuePage),
    import_vscode8.commands.registerCommand("franky.generate.react", genReactPage),
    import_vscode8.commands.registerCommand("franky.generate.wp", genWpPage),
    import_vscode8.commands.registerCommand("franky.generate.defs", genDefs),
    import_vscode8.commands.registerCommand("franky.generate.fields", genFields)
  );
  import_vscode8.workspace.onDidSaveTextDocument((file) => {
    setTimeout(() => {
      fileheaderUpdate(file);
    }, 200);
  });
  const statusBar = import_vscode8.window.createStatusBarItem(import_vscode8.StatusBarAlignment.Left, 0);
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
//# sourceMappingURL=index.js.map