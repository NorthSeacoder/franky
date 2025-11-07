import { window } from 'vscode';

import getGit from '@common/utils/git';
import { log } from '@utils/log';
import { getLogsInRange, getRevertCommit } from './hander';

export default async () => {
  try {
    const git = getGit();
    if (!git) {
      log.info('diff-log: git client unavailable');
      return;
    }

    let targetBranch = 'master';
    const sourceBranch = 'master';
    // TODO:从配置中读取
    const project = await window.showInputBox({
      prompt: '请输入项目名称,用于查询 remote 分支，不区分大小写',
    });
    const tags = await window.showInputBox({
      prompt: '请输入commit,tag名称,多个 tag 以","分隔,(iay,zay,ga)',
    });

    if (!project || !tags) return;

    const branchReg = new RegExp(project, 'i');
    const branches = await git.branch(['--list', '-r', 'origin/release/*', '--sort=-committerdate']);
    const projectBranches = branches.all.filter((name) => branchReg.test(name)).slice(0, 10);
    targetBranch =
      (await window.showQuickPick(projectBranches, { placeHolder: '请选择对比分支' })) || targetBranch;

    const commits = await getLogsInRange({ tags, from: targetBranch, to: sourceBranch });
    const reverts = await getLogsInRange({ tags, from: sourceBranch, to: targetBranch });
    const revertCommits = await getRevertCommit(reverts);

    const channel = window.createOutputChannel('Franky');
    channel.appendLine(`对比分支:${targetBranch};  筛选 tag :${tags}`);

    const outType = await window.showQuickPick(
      [
        {
          label: '全commits',
          description: '(default)',
          detail: '全部未上线commit,包括 revert 的 original commit,且按提交时间排序',
          value: 'commit',
        },
        {
          label: 'commits+reverts',
          description: '',
          detail: 'commit 和 revert 分别展示',
          value: 'revert',
        },
      ],
      { placeHolder: '请选择输出方式' }
    );

    if (!outType) {
      return;
    }

    if (outType.value === 'commit') {
      const commitMsg = [...commits, ...revertCommits]
        .sort((a, b) => new Date(b.date).getTime() - new Date(a.date).getTime())
        .map(({ summary }) => summary)
        .join('');
      channel.append(commitMsg);
      channel.show();
    }

    if (outType.value === 'revert') {
      channel.appendLine('Commits: ');
      const commitMsg = commits.map(({ summary }) => summary).join('');
      channel.append(commitMsg);
      channel.appendLine('Reverts: ');
      const revertMsg = revertCommits.map(({ revertSummary }) => revertSummary).join('');
      channel.append(revertMsg);
      channel.show();
    }
  } catch (error) {
    log.debug('diff-log error', error);
  }
};
