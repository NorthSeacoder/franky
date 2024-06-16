import {Uri, workspace, window} from 'vscode';
import fs from 'fs';
import {emptyDir, mkdirp, pathExists, readdir, remove} from 'fs-extra';
import path from 'path';
import {log} from '@utils/log';
import Handlebars from 'handlebars';

export async function writeFile(path: string, content: string) {
    return workspace.fs.writeFile(Uri.file(path), new Uint8Array(Buffer.from(content)));
}
export async function readDirectory(path: string) {
    try {
        const directory = await workspace.fs.readDirectory(Uri.file(path));
        return directory;
    } catch {
        return null;
    }
}
export async function directoryToAdd(uri: Uri, directory: string) {
    const {path} = uri;
    if (path.endsWith(directory)) {
        return path;
    }
    return path.concat(`/${directory}`);
}
interface IOption {
    label?: string;
    field: string;
}
interface BaseConfig {
    field: string;
    label: string;
    default?: string | boolean | string[];
}
interface SelectConfig extends BaseConfig {
    type: 'select';
    options: IOption[];
}

interface CheckboxConfig extends BaseConfig {
    type: 'checkbox';
}

interface InputConfig extends BaseConfig {
    type: 'input';
}

type IExtraOptions = SelectConfig | CheckboxConfig | InputConfig;
const extraOptions: IExtraOptions[] = [
    {
        type: 'select',
        label: 'Select ',
        field: 'select',
        default: 'b',
        options: [
            {field: 'a', label: 'packageA'},
            {field: 'b', label: 'packageB'}
        ]
    },
    {
        type: 'checkbox',
        label: '是否 xxx',
        field: 'checkbox',
        default: true
    },
    {
        type: 'input',
        label: 'input',
        field: 'input',
        default: 'default'
    }
];
export async function readPackageDetails(folderPath: string) {
    const tploptions: IOption[] = [];
    const PackageDataMap: Record<string, any> = {};
    try {
        const subFolders = await fs.promises.readdir(folderPath, {withFileTypes: true});
        for (const folder of subFolders) {
            if (folder.isDirectory()) {
                const packageJsonPath = path.join(folderPath, folder.name, 'tpl.json');
                try {
                    const packageJson = await fs.promises.readFile(packageJsonPath, 'utf-8');
                    const packageData = JSON.parse(packageJson);
                    tploptions.push({
                        field: packageData.name,
                        label: packageData.name + '@' + packageData.version
                    });
                    PackageDataMap[packageData.name] = packageData;
                } catch (err: any) {
                    if (err.code === 'ENOENT') {
                        // package.json does not exist in this folder
                        tploptions.push({field: folder.name});
                        PackageDataMap[folder.name] = {};
                        log.info(`No tpl.json found in ${folder.name}.`);
                    } else {
                        log.info(`Error reading tpl.json in ${folder.name}:`, err);
                    }
                }
            }
        }
    } catch (err) {
        log.info('Error reading root directory:', err);
    }
    return {tploptions, PackageDataMap};
}

export async function copyFolder(src: string, dest: string, templateProps: any, justFiles = false) {
    try {
        if(!justFiles){
            //正常写入逻辑,判断是否有同名文件夹,并提示是否覆盖
            if ((await pathExists(dest))) {
                if ((await readdir(dest)).length > 0) {
                    const answer = await window.showInformationMessage('同名文件夹已存在, 是否覆盖?', '是');
                    log.info('answer', answer);
                    if (!answer) {
                        return Promise.reject();
                    }
                    await emptyDir(dest);
                }
            } else {
                await mkdirp(dest);
            }
        }
        // 读取源文件夹内容
        const items = await fs.promises.readdir(src, {withFileTypes: true});

        for (const item of items) {
            const nameTemplate = Handlebars.compile(item.name);
            const itemName = nameTemplate({...templateProps});
            const srcPath = path.join(src,item.name);
            const destPath = path.join(dest, itemName);

            if (item.isDirectory()) {
                // 递归复制子文件夹
                await copyFolder(srcPath, destPath, templateProps);
            } else if (item.isFile()) {
                if (itemName === 'tpl.json') {
                    // 跳过 tpl.json 文件
                    continue;
                } else if (path.extname(itemName) === '.hbs') {
                    // 编译 .hbs 文件并写入目标文件夹
                    const templateContent = await fs.promises.readFile(srcPath, 'utf-8');
                    const template = Handlebars.compile(templateContent);
                    const compiledContent = template({...templateProps});
                    await fs.promises.writeFile(destPath.replace('.hbs', ''), compiledContent, 'utf-8');
                } else {
                    // 复制其他文件
                    await fs.promises.copyFile(srcPath, destPath);
                }
            }
        }
    } catch (err) {
        console.error('Error copying folder:', err);
    }
}
