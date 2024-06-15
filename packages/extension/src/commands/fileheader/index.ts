import {window, Position, Range} from 'vscode';
import type {TextDocument} from 'vscode';
import {execSync} from 'child_process';
import {log} from '@utils/log';
import {getRangeFromDocument} from '@common/utils/tools';
import Config from '@utils/config';
import dayjs from 'dayjs';
interface ITemplate {
    langId: string;
    name: string;
    time: string;
    LastModifiedTime: string;
}
export const getTemplate = ({langId, name, time, LastModifiedTime}: ITemplate): string => {
    return (
        langId !== 'vue'
            ? [
                  '/**',
                  ` * @Author: ${name}`,
                  ` * @Date: ${time}`,
                  ` * @Last Modified by: ${name}`,
                  ` * @Last Modified time: ${LastModifiedTime}`,
                  ' */\n\n',
              ]
            : [
                  `<!-- @Author: ${name} -->`,
                  `<!-- @Date: ${time} -->`,
                  `<!-- @Last Modified by: ${name} -->`,
                  `<!-- @Last Modified time: ${LastModifiedTime} -->\n\n`,
              ]
    ).join('\n');
};
export default () => {
    const editor = window.activeTextEditor;
    if (!editor) return;
    if(Config.disabledFileHeader) return;
    const langId = editor.document.languageId;
    let name = execSync('git config --get user.name').toString().trim();
    editor.edit(function (editBuilder) {
        const time = dayjs().format('YYYY-MM-DD HH:mm:ss');
        const LastModifiedTime = time;
        const Targettemplate = getTemplate({name, langId, time, LastModifiedTime});
        log.debug(name, langId, time, LastModifiedTime);
        try {
            editBuilder.insert(new Position(0, 0), Targettemplate); //首行插入
        } catch (error) {
            console.error(error);
        }
    });
};
export const fileheaderUpdate = (document: TextDocument) => {
    const editor = window.activeTextEditor;
    if (!editor) return;
    if(Config.disabledFileHeader) return;
    const MAX_COMMENT_LINE = 8;
    const commentCtx = document.getText(new Range(0, 0, MAX_COMMENT_LINE, 0));
    const commentLineArray = commentCtx.split('\n');
    let timeDiff = 0;
    const commentNameLineIndex = commentLineArray.findIndex((item) => !!item.match('@Last Modified'));
    const commentTimeLineIndex = commentNameLineIndex + 1;

    const start = ':';
    const end = document.languageId === 'vue' ? '-->' : undefined;
    const nameRange = getRangeFromDocument(document, commentNameLineIndex, start, end);
    const timeRange = getRangeFromDocument(document, commentTimeLineIndex, start, end);
    const oleTime = document.getText(timeRange);
    const now = new Date();
    timeDiff = now.getTime() - new Date(oleTime).getTime();
    const LastModifiedTime = dayjs().format('YYYY-MM-DD HH:mm:ss');
    const LastModifiedName = execSync('git config --get user.name').toString().trim();
    if (!!nameRange && !!timeRange && timeDiff > 2000) {
        setTimeout(function () {
            editor.edit(function (edit) {
                edit.replace(nameRange, ` ${LastModifiedName} `);
                edit.replace(timeRange, ` ${LastModifiedTime} `);
            });
            document.save();
        }, 200);
    }
};
