import {workspace, window} from 'vscode';
import simpleGit from 'simple-git';
import {execSync} from 'child_process';

export const logOption = {
    format: {
        summary: '%Cblue%ci %Cred%h %Creset%s %Cgreen%an %Creset%<(8,ltrunc)%b',
        date: '%ci',
        hash: '%h',
        msg: '%s',
        author: '%an',
        diff: '%<(8,ltrunc)%b',
        body: '%b'
    },
    '--cherry-pick': null,
    '--right-only': null,
    '--no-merges': null
};

export default () => {
    const editor = window.activeTextEditor;
    if (!editor) return;
    const folder = workspace.getWorkspaceFolder(editor.document.uri);
    const options = {
        baseDir: folder?.uri?.path ?? workspace.rootPath,
        binary: 'git',
        maxConcurrentProcesses: 6
    };
    return simpleGit(options);
};
const getGitConfig = (itemName: string) => execSync(`git config --get ${itemName}`).toString().trim();

export const getGitInfo = () => {
    return {
        username: getGitConfig('user.name'),
        email: getGitConfig('user.email')
    };
};
