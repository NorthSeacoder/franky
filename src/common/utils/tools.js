const {TextDocument, Position} = require('vscode');

exports.isVue = (document) => {
    return document.languageId === 'vue';
};

exports.isJs = (document) => {
    return document.languageId === 'javascript';
};

/**
 *
 * @param {TextDocument} document
 * @param {Number} lineIndex
 * @param {String} startSplitor
 * @param {String} endSplitor
 */
exports.getRangeFromDocument = (document, lineIndex, startSplitor, endSplitor) => {
    const {range, text} = document.lineAt(lineIndex);
    if (text.indexOf(startSplitor) < 0) return range;

    const startPosition = new Position(lineIndex, text.indexOf(startSplitor) + 1);
    let endPosition;
    if (endSplitor) {
        endPosition = new Position(lineIndex, text.indexOf(endSplitor));
    }

    return range.with(startPosition, endPosition);
};
