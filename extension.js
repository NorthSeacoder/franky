/*
 * @Author: pengmeng
 * @Date: 2021-01-05 19:32:16
 * @Last Modified by: pengmeng
 * @Last Modified time: 2021-01-26 17:20:29
 */
/*
 * @Author: pengmeng
 * @Date: 2021-01-05 19:11:50
 * @Last Modified by: pengmeng
 * @Last Modified time: 2021-01-05 19:31:34
 */
const vscode = require('vscode');

const {fileheader, fileheaderUpdate} = require('./src/fileheader/command');

/**
 * @param {vscode.ExtensionContext} context
 */
function activate(context) {
    let disposable = vscode.commands.registerCommand('franky.fileheader', fileheader);
    console.log('"franky" is now active!');
    context.subscriptions.push(disposable);
    vscode.workspace.onDidSaveTextDocument((file) => {
        setTimeout(() => {
            fileheaderUpdate(file);
        }, 200);
    });
}
// exports.activate = activate;

// this method is called when your extension is deactivated
function deactivate() {}

module.exports = {
    activate,
    deactivate,
};
