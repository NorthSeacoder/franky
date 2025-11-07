import { workspace, window } from 'vscode';
import simpleGit, { SimpleGit, SimpleGitOptions } from 'simple-git';
import { log } from './log';

export const logOption = {
  format: {
    summary: '%Cblue%ci %Cred%h %Creset%s %Cgreen%an %Creset%<(8,ltrunc)%b',
    date: '%ci',
    hash: '%h',
    msg: '%s',
    author: '%an',
    diff: '%<(8,ltrunc)%b',
    body: '%b',
  },
  '--cherry-pick': null,
  '--right-only': null,
  '--no-merges': null,
};

let gitInstance: SimpleGit | null = null;

export function getGit(): SimpleGit | null {
  const editor = window.activeTextEditor;
  if (!editor) {
    return null;
  }

  const folder = workspace.getWorkspaceFolder(editor.document.uri);
  const options: Partial<SimpleGitOptions> = {
    baseDir: folder?.uri?.fsPath ?? workspace.workspaceFolders?.[0]?.uri.fsPath,
    binary: 'git',
    maxConcurrentProcesses: 6,
  };

  if (!options.baseDir) {
    log.debug('No workspace folder found');
    return null;
  }

  gitInstance = simpleGit(options);
  return gitInstance;
}

export interface GitInfo {
  username: string;
  email: string;
}

/**
 * Get git user configuration asynchronously
 */
export async function getGitInfo(): Promise<GitInfo | null> {
  try {
    const git = simpleGit();
    const [username, email] = await Promise.all([
      git.getConfig('user.name').catch(() => ({ value: '' })),
      git.getConfig('user.email').catch(() => ({ value: '' })),
    ]);

    return {
      username: username.value || 'Unknown',
      email: email.value || 'Unknown',
    };
  } catch (error) {
    log.debug('Failed to get git info:', error);
    return null;
  }
}

/**
 * Get git username synchronously (for backwards compatibility)
 * @deprecated Use getGitInfo() instead for async operations
 */
export async function getGitUsernameSafe(): Promise<string> {
  const info = await getGitInfo();
  return info?.username || 'Unknown';
}

export default getGit;
