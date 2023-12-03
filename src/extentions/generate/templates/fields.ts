import genFH from './fileheader';
export default ():string => {
    const langId = 'typescript';
    const fileheader = genFH(langId);
    return `${fileheader}

import {defineFields} from '@yqg/type';

export default defineFields({
    name: {field: 'name', label: '名称'},
});
`;
};
