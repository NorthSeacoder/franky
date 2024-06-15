import os from 'os';
import path from 'path';
import Config from '@utils/config';
import { log } from '@utils/log';

export const getLoaclPath = (suff = '') => {
    const templateLocal = Config.templateLocal;
    const localPath = path.join(os.homedir(), templateLocal, suff);
    return localPath;
};
