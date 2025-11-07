import { window, Position, Range, TextDocument } from 'vscode';
import dayjs from 'dayjs';
import { log } from '@utils/log';
import { getRangeFromDocument } from '@common/utils/tools';
import Config from '@utils/config';
import { getGitUsernameSafe } from '@utils/git';

interface TemplateData {
  langId: string;
  name: string;
  time: string;
  LastModifiedTime: string;
}

const MAX_COMMENT_LINE = 8;
const MIN_TIME_DIFF_MS = 2000;

function getTemplate({ langId, name, time, LastModifiedTime }: TemplateData): string {
  const lines =
    langId !== 'vue'
      ? [
          '/**',
          ` * @Author: ${name}`,
          ` * @Date: ${time}`,
          ` * @Last Modified by: ${name}`,
          ` * @Last Modified time: ${LastModifiedTime}`,
          ' */',
          '',
        ]
      : [
          `<!-- @Author: ${name} -->`,
          `<!-- @Date: ${time} -->`,
          `<!-- @Last Modified by: ${name} -->`,
          `<!-- @Last Modified time: ${LastModifiedTime} -->`,
          '',
        ];

  return lines.join('\n');
}

/**
 * Insert file header comment at the beginning of the file
 */
export default async function insertFileHeader(): Promise<void> {
  const editor = window.activeTextEditor;
  if (!editor) {
    return;
  }

  if (Config.disabledFileHeader) {
    return;
  }

  const langId = editor.document.languageId;
  const username = await getGitUsernameSafe();

  // Check if header already exists
  const commentCtx = editor.document.getText(new Range(0, 0, 2, 0));
  if (commentCtx.includes('@Author')) {
    log.debug('File header already exists');
    return;
  }

  const time = dayjs().format('YYYY-MM-DD HH:mm:ss');
  const template = getTemplate({
    name: username,
    langId,
    time,
    LastModifiedTime: time,
  });

  log.debug('Inserting file header for language:', langId);

  try {
    await editor.edit((editBuilder) => {
      editBuilder.insert(new Position(0, 0), template);
    });
  } catch (error) {
    log.debug('Failed to insert file header:', error);
    window.showErrorMessage('Failed to insert file header');
  }
}

/**
 * Update file header modification time on save
 */
export async function fileheaderUpdate(document: TextDocument): Promise<void> {
  if (Config.disabledFileHeader) {
    return;
  }

  const editor = window.visibleTextEditors.find(
    (item) => item.document.uri.toString() === document.uri.toString()
  );

  if (!editor) {
    return;
  }

  try {
    const commentCtx = document.getText(new Range(0, 0, MAX_COMMENT_LINE, 0));
    const commentLineArray = commentCtx.split('\n');

    const commentNameLineIndex = commentLineArray.findIndex((item) =>
      item.includes('@Last Modified')
    );

    if (commentNameLineIndex === -1) {
      return;
    }

    const commentTimeLineIndex = commentNameLineIndex + 1;
    const start = ':';
    const end = document.languageId === 'vue' ? '-->' : undefined;

    const nameRange = getRangeFromDocument(document, commentNameLineIndex, start, end);
    const timeRange = getRangeFromDocument(document, commentTimeLineIndex, start, end);

    if (!nameRange || !timeRange) {
      return;
    }

    const oldTime = document.getText(timeRange);
    const now = new Date();
    const timeDiff = now.getTime() - new Date(oldTime).getTime();

    // Only update if sufficient time has passed
    if (timeDiff < MIN_TIME_DIFF_MS) {
      return;
    }

    const LastModifiedTime = dayjs().format('YYYY-MM-DD HH:mm:ss');
    const LastModifiedName = await getGitUsernameSafe();

    setTimeout(() => {
      void (async () => {
        try {
          await editor.edit((edit) => {
            edit.replace(nameRange, ` ${LastModifiedName} `);
            edit.replace(timeRange, ` ${LastModifiedTime} `);
          });

          if (!document.isClosed && document.isDirty) {
            await document.save();
          }
        } catch (error) {
          log.debug('Failed to update file header:', error);
        }
      })();
    }, 200);
  } catch (error) {
    log.debug('Error in fileheaderUpdate:', error);
  }
}
