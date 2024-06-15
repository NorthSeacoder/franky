import {window, env, Uri} from 'vscode';
import {log} from '@utils/log';
import {readPackageDetails, copyFolder} from '@utils/file';
import Config from '@utils/config';
import path from 'path';
import os from 'os';

export default async (uri: Uri) => {
    const url = Config.templateRepository;
    const templateLocal = Config.templateLocal;
    const localPath = path.join(os.tmpdir(), templateLocal, 'tpls');
    const templatesDeatil = await readPackageDetails(localPath);

    const template = await window.showQuickPick(templatesDeatil, {placeHolder: '请选择模板'});

    if (!template) {
        return window.showErrorMessage('No template name passed');
    }
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

    //copy
    const src = path.join(localPath, template.label);
    const target = path.join(uri.path, componentName);

    copyFolder(src, target, {name: componentName});
    log.debug(src, target);
};
