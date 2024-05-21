import {workspace, env, Uri} from 'vscode';
import {log} from '@utils/log';
import Config from '@utils/config';
export default () => {

    const url = Config.templateRepository
    const templateLocal = Config.templateLocal
    log.debug({url, templateLocal})

};
