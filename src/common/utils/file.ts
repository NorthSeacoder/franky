import {Uri, workspace, QuickPickItem} from 'vscode';
import fs from 'fs';
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

export async function readPackageDetails(folderPath: string) {
    const subFolderDetail: QuickPickItem[] = [];
    try {
        const subFolders = await fs.promises.readdir(folderPath, {withFileTypes: true});
        for (const folder of subFolders) {
            if (folder.isDirectory()) {
                const packageJsonPath = path.join(folderPath, folder.name, 'package.json');
                try {
                    const packageJson = await fs.promises.readFile(packageJsonPath, 'utf-8');
                    const packageData = JSON.parse(packageJson);
                    subFolderDetail.push({
                        label: packageData.name,
                        description: packageData.name + '@' + packageData.version
                    });
                } catch (err: any) {
                    if (err.code === 'ENOENT') {
                        // package.json does not exist in this folder
                        subFolderDetail.push({label: folder.name});
                        log.info(`No package.json found in ${folder.name}.`);
                    } else {
                        log.info(`Error reading package.json in ${folder.name}:`, err);
                    }
                }
            }
        }
    } catch (err) {
        log.info('Error reading root directory:', err);
    }
    return subFolderDetail;
}

export async function copyFolder(src: string, dest: string, templateProps: any) {
    try {
        // 创建目标文件夹（如果不存在）
        await fs.promises.mkdir(dest, {recursive: true});

        // 读取源文件夹内容
        const items = await fs.promises.readdir(src, {withFileTypes: true});

        for (const item of items) {
            const srcPath = path.join(src, item.name);
            const destPath = path.join(dest, item.name);

            if (item.isDirectory()) {
                // 递归复制子文件夹
                await copyFolder(srcPath, destPath, templateProps);
            } else if (item.isFile()) {
                if (item.name === 'package.json') {
                    // 跳过 package.json 文件
                    continue;
                } else if (path.extname(item.name) === '.hbs') {
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
