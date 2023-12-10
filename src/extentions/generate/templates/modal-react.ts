// import genFH from './fileheader';
export default () => {
    const langId = 'typescript';
    // const fileheader = genFH(langId);
    return `
import {useState} from 'react';
import {useTranslation} from 'react-i18next';

import YqgSimpleForm from '@yqg/react/src/component/yqg-simple-form';

import Xxx from 'common/resource/xxx';
import YqgToast from 'common/util/yqg-toast';

import {FormOptions} from '../constant/options';

type Props = {
    record?: any,
    close: (value?: any) => void,
    dismiss: (reason?: any) => void,
    location: any
};

const EditModal: React.FC<Props> = ({record, dismiss, close, location}) => {
    const {t} = useTranslation();
    const {query: {companyId}} = location;
    const [values, setValues] = useState({companyId, ...record});

    const onConfirm = async ({record}) => {
        await Xxx.save(record);
        YqgToast.success(t('common.submitSuccess'));
        close();
    };

    const onChange = ({record: newRecord}) => {
        setValues(newRecord);
    };

    return (
        <YqgSimpleForm {...{
            title: record?.id ? t('editAccount') : t('addAccount'),
            values,
            options: FormOptions,
            onCancel: dismiss,
            onConfirm,
            onChange,
            ctx: {companyId, setValues}
        }}
        />
    );
};

export default EditModal;
`
}