import {getTemplate} from '@commands/fileheader';
import {ctx} from '@common/context';
import dayjs from 'dayjs';

export default (langId:string) => {
    const name = ctx.name;
    const time = dayjs().format('YYYY-MM-DD HH:mm:ss');

    return getTemplate({name, langId, time, LastModifiedTime: time});
};
