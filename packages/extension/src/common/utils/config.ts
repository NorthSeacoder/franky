import {workspace} from 'vscode';

export function getConfig<T>(key: string, v: T) {
    return workspace.getConfiguration('franky').get(key, v);
}

export default {
    get root(): string {
        return workspace.workspaceFolders?.[0]?.uri?.fsPath || '';
    },

    get jenkinsUrl(): string {
        return getConfig('jenkins.url', '');
    },

    get templateRepository(): string {
        return getConfig('templates.repository', '');
    },

    get templateLocal(): string {
        return getConfig('templates.local', '');
    },
    
    get disabledFileHeader(): boolean {
        return getConfig('fileheader.disabled', false);
    }
};
