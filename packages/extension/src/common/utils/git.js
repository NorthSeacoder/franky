import {workspace, window} from 'vscode';
import simpleGit from 'simple-git';

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
    const folder = workspace.getWorkspaceFolder(editor.document.uri);
    const options = {
        baseDir: folder?.uri?.path ?? workspace.rootPath,
        binary: 'git',
        maxConcurrentProcesses: 6
    };
    return simpleGit(options);
};
