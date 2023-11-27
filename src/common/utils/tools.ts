import type {TextDocument, Range} from 'vscode';
import {Position} from 'vscode';

export const isVue = (document: TextDocument) => {
    return document.languageId === 'vue';
};

export const isJs = (document: TextDocument) => {
    return document.languageId === 'javascript';
};


export const getRangeFromDocument = (document: TextDocument, lineIndex: number, startSplitor: string, endSplitor: string | undefined) => {
    const {range, text} = document.lineAt(lineIndex);
    if (text.indexOf(startSplitor) < 0) return range;

    const startPosition = new Position(lineIndex, text.indexOf(startSplitor) + 1);
    let endPosition;
    if (endSplitor) {
        endPosition = new Position(lineIndex, text.indexOf(endSplitor));
    }

    return range.with(startPosition, endPosition);
};
