import {Button, Checkbox, Form, Input, Select} from 'antd';

import {FolderOpen} from 'lucide-react';
import {useState, useEffect} from 'react';
import {useMount, useUpdateEffect} from 'react-use';
import {vscode} from '../../utils/vscode';

interface IOption {
    label?: string;
    field: string;
}
interface BaseConfig {
    field: string;
    label: string;
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
    const [optionsMap, setOptionsMap] = useState<Record<string, IExtraOptions[]>>({});

    useMount(async () => {
        //select options
        const {tploptions, ExtraOptionsMap} = await vscode.invoke({command: 'getTemplateOptions'});
        setTemplateOptions(tploptions);
        setOptionsMap(ExtraOptionsMap);
    });

    async function onSelectPath() {
        const loc = form.getFieldValue('location');
        console.log(loc);
        const res = await vscode.invoke({command: 'selectPath', args: [loc]});
        if (res) {
            form.setFieldValue('location', res);
        }
    }

    const [options, setOptions] = useState<IExtraOptions[]>([]);
    const templateValue = Form.useWatch('template', form);
    useUpdateEffect(() => {
        const newOptions = optionsMap[templateValue] || [];
        setOptions(newOptions);
    }, [templateValue, JSON.stringify(optionsMap)]);

    async function onCreate() {
        await vscode.invoke({
            command: 'generateCode',
            args: [form.getFieldsValue()]
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
            <Form form={form} layout='vertical' autoComplete='off'>
                <Form.Item name='name' label='Name'>
                    <Input />
                </Form.Item>
                <Form.Item name='location' label='Location'>
                    <Input addonAfter={<FolderOpen style={{cursor: 'pointer'}} size={20} onClick={onSelectPath} />} />
                </Form.Item>
                <Form.Item name='template' label='选择模板'>
                    <Select fieldNames={{value: 'field'}} options={TemplateOptions} />
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
                            <Form.Item key={item.field} name={item.field} label={item.label}>
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
