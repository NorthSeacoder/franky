import {workspace} from 'vscode';

export function getConfig<T>(key: string, v?: T) {
    return workspace.getConfiguration().get(`franky.${key}`, v);
}

export default {
    get root(): string {
        return workspace.workspaceFolders?.[0]?.uri?.fsPath || '';
    },

    get jenkinsUrl(): string {
        return getConfig('jenkins.url') ?? '';
    }
};
