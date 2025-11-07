import { StatusBarAlignment, window, ExtensionContext } from 'vscode';
import { ctx } from '@common/context';
import { CommandManager } from '@commands/index';
import { log, channel } from '@utils/log';
import { getGitUsernameSafe } from '@utils/git';

/**
 * Extension activation entry point
 */
export async function activate(context: ExtensionContext): Promise<void> {
  try {
    log.info('"franky" is now being activated');
    ctx.active = true;

    // Get git user information asynchronously
    try {
      const username = await getGitUsernameSafe();
      ctx.name = username;
      log.info(`Git user: ${username}`);
    } catch (error) {
      log.debug('Failed to get git user name, using default:', error);
      ctx.name = 'franky';
    }

    const { subscriptions } = context;

    // Register output channel
    subscriptions.push(channel);

    // Initialize command manager
    new CommandManager(context);

    // Create CI/CD status bar item
    const statusBar = window.createStatusBarItem(StatusBarAlignment.Left, 0);
    statusBar.command = 'franky.jumpCicd';
    statusBar.text = '$(rocket) CI/CD';
    statusBar.tooltip = 'Jump to CI/CD';
    statusBar.show();
    subscriptions.push(statusBar);

    log.info('"franky" activation completed successfully');
  } catch (error) {
    log.debug('Activation error:', error);
    window.showErrorMessage(`Failed to activate Franky: ${error}`);
  }
}

/**
 * Extension deactivation cleanup
 */
export function deactivate(): void {
  log.info('"franky" is being deactivated');
  ctx.active = false;
}
