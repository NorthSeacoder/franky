import {Button, Checkbox, Form, Input, Select, Typography, Flex} from 'antd';

import {FolderOpen} from 'lucide-react';
import {useState, useEffect} from 'react';
import {useMount, useUpdateEffect} from 'react-use';
import {vscode} from '../../utils/vscode';
import type {FormItemProps} from 'antd';
interface IOption {
    label?: string;
    field: string;
}
interface BaseConfig {
    field: string;
    label: string;
    itemProps?: FormItemProps;
    default?: string | boolean;
}
interface SelectConfig extends BaseConfig {
    type: 'select';
    options: IOption[];
}

interface CheckboxConfig extends BaseConfig {
    type: 'checkbox';
}

interface InputConfig extends BaseConfig {
    type: 'input';
}

type IExtraOptions = SelectConfig | CheckboxConfig | InputConfig;

interface FormsValues extends Record<string, unknown> {
    location: string;
    name: string;
    template: string;
}

interface IPackageJson {
    name: string;
    version: string;
    description: string;
    extraOptions: IExtraOptions[];
}
export default function FrankyForm() {
    const [form] = Form.useForm<FormsValues>();

    useMount(async () => {
        //获取缓存数据
        const store = (await vscode.getState('FrankyForm')) as FormsValues;

        //获取当前路径
        const currentPath = await vscode.invoke({command: 'getCurrentPath'});
        const init = {
            location: currentPath,
            name: '',
            template: ''
        };
        if (store) {
            const other = {...store, location: currentPath};
            Object.assign(init, other);
        }
        form.setFieldsValue(init);
    });

    //template
    const [TemplateOptions, setTemplateOptions] = useState<IOption[]>([]);
    const [pkgMap, setPkgMap] = useState<Record<string, IPackageJson>>({});

    useMount(async () => {
        //select options
        const {tploptions, PackageDataMap} = await vscode.invoke({command: 'getTemplateOptions'});
        setTemplateOptions(tploptions);
        setPkgMap(PackageDataMap);
    });

    async function onSelectPath() {
        const loc = form.getFieldValue('location');
        const res = await vscode.invoke({command: 'selectPath', args: [loc]});
        if (res) {
            form.setFieldValue('location', res);
        }
    }

    const [options, setOptions] = useState<IExtraOptions[]>([]);
    const [details, setDeatils] = useState<string>('');
    const templateValue = Form.useWatch('template', form);
    useUpdateEffect(() => {
        const curPkg = pkgMap?.[templateValue] ?? {};
        setDeatils(curPkg.description ?? '');
        setOptions(curPkg.extraOptions ?? []);
    }, [templateValue, JSON.stringify(pkgMap)]);

    async function onCreate() {
        await form.validateFields();
        const values = form.getFieldsValue();
        await vscode.setState('FrankyForm', values);
        await vscode.invoke({
            command: 'generateCode',
            args: [values]
        });
    }
    function currentPathWatcher(event: MessageEvent) {
        const {
            data: {command, cwd}
        } = event;
        if (command === 'currentPathWatcher') {
            form.setFieldValue('location', cwd);
        }
    }
    useEffect(() => {
        window.addEventListener('message', currentPathWatcher);
        return () => {
            window.removeEventListener('message', currentPathWatcher);
        };
    }, []);
    return (
        <>
            <Typography.Paragraph
                ellipsis={{
                    rows: 3,
                    expandable: 'collapsible'
                }}>
                {details}
            </Typography.Paragraph>
            <Form form={form} layout='vertical' autoComplete='off'>
                <Form.Item name='template' label='选择模板'>
                    <Select fieldNames={{value: 'field'}} options={TemplateOptions} />
                </Form.Item>
                <Flex>
                    <Form.Item name='justFiles' valuePropName='checked'>
                        <Checkbox>在当前文件夹下生成</Checkbox>
                    </Form.Item>
                    <Form.Item
                        name='name'
                        label='Name'
                        layout='horizontal'
                        style={{flex: 'auto'}}
                        rules={[
                            {required: true, message: '请输入项目名称'},
                            {pattern: /^[a-z]+(-[a-z]+)*$/, message: '项目名称必须为kebab-case'}
                        ]}>
                        <Input />
                    </Form.Item>
                </Flex>
                <Form.Item name='location' label='Location' rules={[{required: true, message: '请选择生成路径'}]}>
                    <Input addonAfter={<FolderOpen style={{cursor: 'pointer'}} size={20} onClick={onSelectPath} />} />
                </Form.Item>
                {/* extra-form */}
                {options.map((item) => {
                    if (item.type === 'select') {
                        return (
                            <Form.Item key={item.field} name={item.field} label={item.label}>
                                <Select fieldNames={{value: 'field'}} options={item.options} />
                            </Form.Item>
                        );
                    }
                    if (item.type === 'checkbox') {
                        return (
                            <Form.Item key={item.field} name={item.field} valuePropName='checked'>
                                <Checkbox>{item.label}</Checkbox>
                            </Form.Item>
                        );
                    }
                    if (item.type === 'input') {
                        return (
                            <Form.Item {...item.itemProps} key={item.field} name={item.field} label={item.label}>
                                <Input />
                            </Form.Item>
                        );
                    }
                    return null;
                })}
            </Form>
            <Button type='primary' onClick={onCreate}>
                确认
            </Button>
        </>
    );
}
