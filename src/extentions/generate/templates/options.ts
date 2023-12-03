import genFH from './fileheader';
export default () => {
    const langId = 'typescript';
    const fileheader = genFH(langId);
    return `${fileheader}

import {defineForm, defineTable} from '@yqg/type';

import {fixedRight,op} from 'src/common/constant/fields';

import Fields from './fields';

export const FormOptions = Object.freeze(defineForm({
    fieldDefs: [
        Fields.name,
    ]
}));

export const EditModalFormOptions = Object.freeze(defineForm({
    fieldDefs: [
        Fields.name,
    ]
}));

export const DetailFormOptions = Object.freeze(defineForm({
    fieldDefs: [
        Fields.name,
    ]
}));

export const TableOptions = Object.freeze(defineTable({
    colDefs: [
        Fields.name,
        fixedRight(op)
    ]
}));
`;
};
