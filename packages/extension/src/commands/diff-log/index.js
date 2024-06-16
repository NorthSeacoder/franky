import {Position, Range, window, workspace} from 'vscode';

import getGit from '@common/utils/git';
import {getLogsInRange, getRevertCommit} from './hander';

export default async () => {
    try {
        const git = getGit();
        const editor = window.activeTextEditor;
        let targetBranch = 'master';
        let sourceBranch = 'master';
        //TODO:从配置中读取
        const project = await window.showInputBox({prompt: '请输入项目名称,用于查询 remote 分支，不区分大小写'});
        const tags = await window.showInputBox({prompt: '请输入commit,tag名称,多个 tag 以","分隔,(iay,zay,ga)'});

        if (!project || !tags) return;
        //获取远程分支
        const branchReg = new RegExp(project, 'i');
        const branchs = await git.branch(['--list', '-r', 'origin/release/*', '--sort=-committerdate']);
        const projectBranches = branchs.all.filter((name) => branchReg.test(name)).slice(0, 10);
        targetBranch = await window.showQuickPick(projectBranches, {placeHolder: '请选择对比分支'});
        const configs = await git.listConfig();
        console.log({targetBranch}, configs);
        const commits = await getLogsInRange({tags, from: targetBranch, to: sourceBranch});

        const reverts = await getLogsInRange({tags, from: sourceBranch, to: targetBranch});
        const revertCommits = await getRevertCommit(reverts);
        const channel = window.createOutputChannel('Franky');
        channel.appendLine(`对比分支:${targetBranch};  筛选 tag :${tags}`);

        const outType = await window.showQuickPick(
            [
                {
                    label: '全commits',
                    description: '(default)',
                    detail: '全部未上线commit,包括 revert 的 original commit,且按提交时间排序',
                    value: 'commit'
                },
                {
                    label: 'commits+reverts',
                    description: '',
                    detail: 'commit 和 revert 分别展示',
                    value: 'revert'
                }
            ],
            {placeHolder: '请选择输出方式'}
        );
        if (outType.value === 'commit') {
            const comitMsg = [...commits, ...revertCommits]
                .sort((a, b) => {
                    let t1 = new Date(a.date);
                    let t2 = new Date(b.date);
                    return t2.getTime() - t1.getTime();
                })
                .reduce((res, {summary}) => (res += summary), '');
            channel.append(comitMsg);
            channel.show();
        }
        if (outType.value === 'revert') {
            channel.appendLine('Commits: ');
            const commitMsg = commits.reduce((res, {summary}) => (res += summary), '');
            channel.append(commitMsg);
            channel.appendLine('Reverts: ');
            const revertMsg = revertCommits.reduce((res, {revertSummary}) => (res += revertSummary), '');
            channel.append(revertMsg);
            channel.show();
        }
    } catch (error) {
        console.log(error);
    }
};
