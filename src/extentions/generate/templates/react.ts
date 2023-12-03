import genFH from './fileheader';
export default () => {
    const langId = 'typescript';
    const fileheader = genFH(langId);
    return `${fileheader}

import {Button} from 'antd';
import {useState} from 'react';
import {useTranslation} from 'react-i18next';
import {connect} from 'react-redux';

import {useModal} from '@yqg/react';
import YqgSimpleForm from '@yqg/react/src/component/yqg-simple-form';
import YqgSimpleTable from '@yqg/react/src/component/yqg-simple-table';

import saveFileFromResponse from 'yqg-common/utils/save-file';

import Xxx from 'common/resource/xxx';
import YqgPrivilege from 'common/component/yqg-privilege';
import {PRIVILEGE_DEMO} from 'common/constant/basic/privilege';
import {ApiParams, usePagination} from 'common/hook';
import {isAuthorized} from 'common/util/privilege';

import {FormOptions, TableOptions} from './constant/options';
import EditModal from './modal/edit';

type Props = {location: any, currentUser: object};
const AccountManagement: React.FC<Props> = ({currentUser, location}) => {
    const {t} = useTranslation();
    const {query: {companyId}} = location;

    const [records, setRecords] = useState<any[]>(null);

    const {
        onSearchNext,
        onRefresh
    } = usePagination(fetchList);
    const {open} = useModal();

    async function fetchList({params}: ApiParams) {
        const {data: {body}} = await Xxx.list({params: {
            companyId, ...params
        }});
        setRecords(body);
    }

    const onExport = async ({form}) => {
        const params = form.getFieldsValue();
        const res = await Xxx.export({params: {
            companyId, ...params
        }, responseType: 'blob'});
        saveFileFromResponse(res);
    };

    const onEdit = (record?: any) => {
        open(EditModal, {record, location}).then(onRefresh, x => x);
    };

    const extraBtns = formCtx => (
        <YqgPrivilege
            hasAny={[PRIVILEGE_DEMO]}
        >
            <Button
                type="primary"
                onClick={() => onEdit()}
            >
                {t('common.submit')}
            </Button>
            <Button onClick={() => onExport(formCtx)}>
                {t('common.export')}
            </Button>
        </YqgPrivilege>
    );

    return (
        <>
            <YqgSimpleForm
                {...{
                    autoSearch: true,
                    tagVisible: true,
                    options: FormOptions,
                    onConfirm: onSearchNext,
                    onReset: onSearchNext,
                    extraBtns,
                    confirmLabel: 'common.query',
                    ctx: {companyId}
                }}
            />
            <YqgSimpleTable
                {...{
                    options: TableOptions,
                    records,
                    ctx: {onEdit, companyId, currentUser, isAuthorized}
                }}
            />
        </>
    );
};

export default connect(state => ({currentUser: state.user}))(AccountManagement);
`}