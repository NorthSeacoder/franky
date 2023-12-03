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
var import_vscode8 = require("vscode");
var import_child_process2 = require("child_process");

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

// src/common/context.ts
var ctx = {
  active: false,
  login: false,
  name: "franky"
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
function camelCase(input) {
  return input.replace(/-([a-z])/g, (_, match) => match.toUpperCase());
}
function upperFirst(input) {
  return input.charAt(0).toUpperCase() + input.slice(1);
}

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

// src/extentions/generate/index.ts
var import_vscode7 = require("vscode");

// src/common/utils/file.ts
var import_vscode6 = require("vscode");
async function writeFile(path, content) {
  return import_vscode6.workspace.fs.writeFile(import_vscode6.Uri.file(path), new Uint8Array(Buffer.from(content)));
}

// src/extentions/generate/templates/fileheader.ts
var import_dayjs2 = __toESM(require("dayjs"));
var fileheader_default2 = (langId) => {
  const name = ctx.name;
  const time = (0, import_dayjs2.default)().format("YYYY-MM-DD HH:mm:ss");
  return getTemplate({ name, langId, time, LastModifiedTime: time });
};

// src/extentions/generate/templates/fields.ts
var fields_default = () => {
  const langId = "typescript";
  const fileheader = fileheader_default2(langId);
  return `${fileheader}

import {defineFields} from '@yqg/type';

export default defineFields({
    name: {field: 'name', label: '\u540D\u79F0'},
});
`;
};

// src/extentions/generate/templates/options.ts
var options_default = () => {
  const langId = "typescript";
  const fileheader = fileheader_default2(langId);
  return `${fileheader}

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
  const fileheader = fileheader_default2(langId);
  return `${fileheader}

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
var react_default = () => {
  const langId = "typescript";
  const fileheader = fileheader_default2(langId);
  return `${fileheader}

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
const AccountManagement: React.FC<Props> = ({currentUser, location}) => {
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

export default connect(state => ({currentUser: state.user}))(AccountManagement);
`;
};

// src/extentions/generate/templates/modal-vue.ts
var EditModalTpl = ({ name }) => {
  const langId = "vue";
  const fileheader = fileheader_default2(langId);
  return `${fileheader}

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
  const fileheader = fileheader_default2(langId);
  return `${fileheader}

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
  const fileheader = fileheader_default2(langId);
  return `${fileheader}

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
    const modalUri = import_vscode7.Uri.file(`${uri.path}/modal`);
    await writeFile(`${modalUri.path}/edit-modal.vue`, EditModalTpl({ name }));
    await writeFile(`${modalUri.path}/detail-modal.vue`, DetailModalTpl({ name }));
  }
};
var ReactGeneratorStrategy = class {
  async generate(uri) {
    const { path } = uri;
    await writeFile(`${path}/index.tsx`, react_default());
    await writeFile(`${path}/constant/fields.ts`, fields_default());
    await writeFile(`${path}/constant/options.ts`, options_default());
    await this.generateModal(uri);
  }
  async generateModal(uri) {
    const { path } = uri;
    await writeFile(`${path}/modal/edit-modal.tsx`, modal_react_default());
  }
};
var generatePage = async (uri, generatorStrategy) => {
  try {
    const componentName = await import_vscode7.window.showInputBox({
      prompt: "component-name in kebab-case"
    });
    if (!componentName) {
      return import_vscode7.window.showErrorMessage("No component name passed");
    }
    const regex = /^[a-z]+(-[a-z]+)*$/;
    if (!regex.test(componentName)) {
      return import_vscode7.window.showErrorMessage("component-name must be in kebab-case");
    }
    const compUri = import_vscode7.Uri.file(`${uri.path}/${componentName}`);
    await generatorStrategy.generate(compUri, componentName);
  } catch (error) {
    log.debug(error);
  }
};
var genVuePage = async (uri) => {
  if (!uri) {
    return import_vscode7.window.showErrorMessage("No file path found.");
  }
  const generatorStrategy = new VueGeneratorStrategy();
  await generatePage(uri, generatorStrategy);
};
var genReactPage = async (uri) => {
  if (!uri) {
    return import_vscode7.window.showErrorMessage("No file path found.");
  }
  const generatorStrategy = new ReactGeneratorStrategy();
  await generatePage(uri, generatorStrategy);
};

// src/index.ts
function activate({ globalState }) {
  log.debug('"franky" is now active!');
  ctx.active = true;
  const name = (0, import_child_process2.execSync)("git config --get user.name").toString().trim();
  ctx.name = name;
  import_vscode8.commands.registerCommand("franky.fileheader", fileheader_default);
  import_vscode8.commands.registerCommand("franky.jenkins", jenkins_default);
  import_vscode8.commands.registerCommand("franky.generate.vue", genVuePage);
  import_vscode8.commands.registerCommand("franky.generate.react", genReactPage);
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
