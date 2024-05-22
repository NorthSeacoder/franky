import {workspace, env, Uri} from 'vscode';
import {log} from '@utils/log';
import Config from '@utils/config';
export default () => {

    const url = Config.jenkinsUrl
    log.debug(url)
    env.openExternal(Uri.parse(url));

};
