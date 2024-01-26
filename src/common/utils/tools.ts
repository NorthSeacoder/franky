import type {TextDocument, Range} from 'vscode';
import {Position} from 'vscode';

export const isVue = (document: TextDocument) => {
    return document.languageId === 'vue';
};

export const isJs = (document: TextDocument) => {
    return document.languageId === 'javascript';
};

export const getRangeFromDocument = (
    document: TextDocument,
    lineIndex: number,
    startSplitor: string,
    endSplitor: string | undefined
) => {
    const {range, text} = document.lineAt(lineIndex);
    if (text.indexOf(startSplitor) < 0) return range;

    const startPosition = new Position(lineIndex, text.indexOf(startSplitor) + 1);
    let endPosition;
    if (endSplitor) {
        endPosition = new Position(lineIndex, text.indexOf(endSplitor));
    }

    return range.with(startPosition, endPosition);
};

export function kebabCase(input: string): string {
    return input.replace(/([a-z])([A-Z])/g, '$1-$2').toLowerCase();
}
export function camelCase(input: string): string {
    return input.replace(/-([a-z])/g, (_, match) => match.toUpperCase());
}

export function upperFirst(input: string): string {
    return input.charAt(0).toUpperCase() + input.slice(1);
}

export function lowerFirst(input: string): string {
    return input.charAt(0).toLowerCase() + input.slice(1);
}
