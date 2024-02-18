import { window, Uri, env, Position, workspace, RelativePattern } from 'vscode';
import { log } from '@utils/log';
import { camelCase, upperFirst } from '@utils/tools';
import { writeFile } from '@utils/file';

import {
    FieldTpl,
    OptionsTpl,
    VueIndexTpl,
    ReactIndexTpl,
    DetailModalTpl,
    EditModalTpl,
    ReactEditModalTpl,
    WpFieldTpl,
    WpIndexTpl,
    WpEditModalTpl,
    WpDetailModalTpl
} from './templates';

interface GeneratorStrategy {
    generate: (uri: Uri, componentName: string) => Promise<void>;
}
class VueGeneratorStrategy implements GeneratorStrategy {
    async generate(uri: Uri, componentName: string): Promise<void> {
        const { path } = uri;
        const name = upperFirst(camelCase(componentName));
        await writeFile(`${path}/index.vue`, VueIndexTpl({ name, componentName }));
        await writeFile(`${path}/constant/fields.ts`, FieldTpl());
        await writeFile(`${path}/constant/options.ts`, OptionsTpl());
        await this.generateModal(uri, name);
    }

    private async generateModal(uri: Uri, name: string): Promise<void> {
        const modalUri = Uri.file(`${uri.path}/modal`);
        await writeFile(`${modalUri.path}/edit-modal.vue`, EditModalTpl({ name }));
        await writeFile(`${modalUri.path}/detail-modal.vue`, DetailModalTpl({ name }));
    }
}
class ReactGeneratorStrategy implements GeneratorStrategy {
    async generate(uri: Uri, componentName: string): Promise<void> {
        const { path } = uri;
        const name = upperFirst(camelCase(componentName));
        await writeFile(`${path}/index.tsx`, ReactIndexTpl(name));
        await writeFile(`${path}/constant/fields.ts`, FieldTpl());
        await writeFile(`${path}/constant/options.ts`, OptionsTpl());
        await this.generateModal(uri);
    }

    private async generateModal(uri: Uri): Promise<void> {
        const { path } = uri;
        await writeFile(`${path}/modal/edit-modal.tsx`, ReactEditModalTpl());
    }
}

class WpGeneratorStrategy implements GeneratorStrategy {
    async generate(uri: Uri, componentName: string): Promise<void> {
        const { path } = uri;
        const name = upperFirst(camelCase(componentName));
        await writeFile(`${path}/index.tsx`, WpIndexTpl(name));
        await writeFile(`${path}/constant/index.tsx`, WpFieldTpl());
        await this.generateModal(uri, name);
    }

    private async generateModal(uri: Uri, name: string): Promise<void> {
        const { path } = uri;
        await writeFile(`${path}/modal/edit.tsx`, WpEditModalTpl(name));
        await writeFile(`${path}/modal/view.tsx`, WpDetailModalTpl(name));
    }
}

export const generatePage = async (uri: Uri, generatorStrategy: GeneratorStrategy) => {
    try {
        const componentName = await window.showInputBox({
            prompt: 'component-name in kebab-case'
        });

        if (!componentName) {
            return window.showErrorMessage('No component name passed');
        }

        const regex = /^[a-z]+(-[a-z]+)*$/;
        if (!regex.test(componentName)) {
            return window.showErrorMessage('component-name must be in kebab-case');
        }

        const compUri = Uri.file(`${uri.path}/${componentName}`);
        await generatorStrategy.generate(compUri, componentName);
    } catch (error) {
        log.debug(error);
    }
};

export const genVuePage = async (uri?: Uri) => {
    if (!uri) {
        return window.showErrorMessage('No file path found.');
    }

    const generatorStrategy = new VueGeneratorStrategy();
    await generatePage(uri, generatorStrategy);
};

export const genReactPage = async (uri?: Uri) => {
    if (!uri) {
        return window.showErrorMessage('No file path found.');
    }

    const generatorStrategy = new ReactGeneratorStrategy();
    await generatePage(uri, generatorStrategy);
};

export const genWpPage = async (uri?: Uri) => {
    if (!uri) {
        return window.showErrorMessage('No file path found.');
    }

    const generatorStrategy = new WpGeneratorStrategy();
    await generatePage(uri, generatorStrategy);
};

function parseStringToObject(str: string): string {
    const lines = str.split('\n');
    const result: { [key: string]: { field: string; label: string } } = {};

    for (const line of lines) {
        let key, value;
        if (line.includes(':')) {
            [key, value] = line.split(':');
        }
        if (line.includes('：')) {
            [key, value] = line.split('：');
        }
        if (!key || !value) continue;
        // 只保留字母部分,去除双引号
        const field = key.replace(/[^a-zA-Z]|"/g, '');

        // 保留中文或字符部分,去除双引号,去除空格,逗号等
        const label = value.replace(/[^\u4e00-\u9fa5a-zA-Z]/g, '')

        result[field] = { field, label };
    }

    return JSON.stringify(result, null, 4);
}

function pre(key: string): string {
    // 这里是你对 label 进行处理的逻辑，你可以根据需要进行修改
    return `pre('${key}')`;
}
//TODO: 第一步生成中文,后续添加i18n命令,替换中文改成 pre('xxx'),先隐藏,暂时跟genFields重复了
export const genDefs = async () => {
    // 获取当前活动的文本编辑器
    let editor = window.activeTextEditor;
    if (!editor) {
        return; // 如果没有打开的文本编辑器，则返回
    }

    // 获取用户的选中范围
    let selection = editor.selection;

    // 获取选中范围内的文本内容
    let selectedText = editor.document.getText(selection);
    await env.clipboard.writeText(parseStringToObject(selectedText));
    window.showInformationMessage('已将结果设置到剪贴板');
    // 获取剪贴板中内容
    // const text =  await env.clipboard.readText();
    // console.log(text);
};
const strTpl = (key: string) => `${key}: { field: "${key}", label: pre("${key}") },`
// 去 mock 复制req/res的一个基础对象,将对象内部的 key 转成key:{field:'key',label:pre('key')}的形式,直接插入光标所在位置
export const genFields = async () => {
    // 获取当前活动的文本编辑器
    let editor = window.activeTextEditor;
    if (!editor) {
        return; // 如果没有打开的文本编辑器，则返回
    }
    // 获取剪贴板中内容
    const text = await env.clipboard.readText();
    console.log(text);
    const obj = JSON.parse(text);
    const result: string[] = [];
    for (const key in obj) {
        result.push(strTpl(key));
    }
    //直接插入光标所在位置
    editor.edit((editBuilder) => {
        editBuilder.replace(editor?.selection.active ?? new Position(0, 0), result.join('\n'));
    })
}

const CONFIG_FILE_GLOB = "{tailwind,tailwind.config,tailwind.*.config,tailwind.config.*}.{js,cjs,mjs}";
const DEFAULT_TAILWIND_CONFIG_FILE_PATTERN = `**/${CONFIG_FILE_GLOB}`;

import { TailwindConverter } from "css-to-tailwindcss";

import loadConfig from 'tailwindcss/loadConfig';
export const genTailwindCSS = async (uri: Uri) => {
    try {
        // 获取当前活动的文本编辑器
        let editor = window.activeTextEditor;
        if (!editor) {
            log.debug('No active editor.');
            return; // 如果没有打开的文本编辑器，则返回
        }

        const workspaceFolder = workspace.getWorkspaceFolder(uri);
        if (!workspaceFolder) {
            log.debug('The file is not in a workspace folder.');
            return;
        }
        const tailwindConfigFilePattern = new RelativePattern(workspaceFolder.uri.fsPath, DEFAULT_TAILWIND_CONFIG_FILE_PATTERN)
        const [foundFile] = await workspace.findFiles(tailwindConfigFilePattern);
        if (!foundFile) {
            log.debug('No tailwind config file found.');
            return;
        }

        const config = loadConfig(foundFile.fsPath);
        const converter = new TailwindConverter({
            remInPx: 16,
            postCSSPlugins: [require("postcss-nested")],
            tailwindConfig: config
        });

        // 获取剪贴板中内容
        const text = await env.clipboard.readText();
        const inputCSS = `
            .container {
                ${text}
            }
        `
        log.debug(inputCSS)
        converter.convertCSS(inputCSS).then(({ nodes }) => {
            log.debug(nodes);
            const [{ tailwindClasses }] = nodes
            //直接插入光标所在位置
            editor?.edit((editBuilder) => {
                editBuilder.replace(editor?.selection.active ?? new Position(0, 0), tailwindClasses.join(' '));
            })
        });
    } catch (error) {
        log.debug(error);
    }

}