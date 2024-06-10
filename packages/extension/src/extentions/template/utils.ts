import os from 'os';
import path from 'path';
import Config from '@utils/config';

export const getLoaclPath = (suff = '') => {
    const templateLocal = Config.templateLocal;
    const localPath = path.join(os.homedir(), templateLocal, suff);
    return localPath;
};
