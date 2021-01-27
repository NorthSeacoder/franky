const vscode = require('vscode');
const {Position, Range} = vscode;
const execSync = require('child_process').execSync;

const {getTemplate} = require('../../constant/template');
const {getCommentSplitor} = require('../../constant/splitor');

const {format} = require('../utils/date');
const {getRangeFromDocument} = require('../utils/tools');

exports.fileheader = () => {
    const editor = vscode.window.activeTextEditor;
    const langId = editor.document.languageId;
    let name = execSync('git config --get user.name').toString().trim();
    editor.edit(function (editBuilder) {
        const time = format(new Date(), 'yyyy-MM-dd hh:mm:ss');
        const LastModifiedTime = time;
        const Targettemplate = getTemplate({name, langId, time, LastModifiedTime});
        try {
            editBuilder.insert(new Position(0, 0), Targettemplate); //首行插入
        } catch (error) {
            console.error(error);
        }
    });
};
exports.fileheaderUpdate = (document) => {
    const editor = vscode.window.activeTextEditor;
    const MAX_COMMENT_LINE = 8;
    const commentCtx = document.getText(new Range(0, 0, MAX_COMMENT_LINE, 0));
    const commentLineArray = commentCtx.split('\n');
    let timeDiff = 0;
    const commentNameLineIndex = commentLineArray.findIndex((item) => !!item.match('@Last Modified'));
    const commentTimeLineIndex = commentNameLineIndex + 1;

    const {start, end} = getCommentSplitor(document.languageId);
    const nameRange = getRangeFromDocument(document, commentNameLineIndex, start, end);
    const timeRange = getRangeFromDocument(document, commentTimeLineIndex, start, end);

    const oleTime = document.getText(timeRange);
    const now = new Date();
    timeDiff = now.getTime() - new Date(oleTime).getTime();
    const LastModifiedTime = format(now, 'yyyy-MM-dd hh:mm:ss');
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
