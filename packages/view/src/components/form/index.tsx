import {
    VSCodeButton,
    VSCodeCheckbox,
    VSCodeDropdown,
    VSCodeOption,
    VSCodeTextField
} from '@vscode/webview-ui-toolkit/react';
import React, {useState} from 'react';
import {useMount} from 'react-use';
import {vscode} from '../../utils/vscode';
import css from './index.module.css';
interface BaseConfig {
    field: string;
    label: string;
    default?: string | boolean;
}

interface SelectConfig extends BaseConfig {
    type: 'select';
    options: {
        label: string;
        field: string;
    }[];
}

interface CheckboxConfig extends BaseConfig {
    type: 'checkbox';
}

interface InputConfig extends BaseConfig {
    type: 'input';
}

type Conifg = SelectConfig | CheckboxConfig | InputConfig;

interface FrankyFormProps {
    configs: Conifg[];
}
interface FormsValues extends Record<string, unknown> {
    location: string;
    name: string;
    template: string;
}
function TextField(props: {label: string; field: string; children: React.ReactNode}) {
    return (
        <div key={props.field} className={css.TextField}>
            <label htmlFor={props.field}>{props.label}：</label>
            {props.children}
        </div>
    );
}

function FilePathSelect(props: {value: string; onChange(value: string): void}) {
    async function onSelectPath() {
        const res = await vscode.invoke({command: 'selectPath'});
        if (res) {
            props.onChange(res);
        }
    }
    return (
        <VSCodeTextField
            value={props.value ?? ''}
            onChange={(e) => props.onChange((e as React.ChangeEvent<HTMLInputElement>).target.value)}>
            <i slot='end' className={'codicon codicon-folder'} onClick={onSelectPath} />
        </VSCodeTextField>
    );
}

export default function FrankyForm(props: FrankyFormProps) {
    const [form, setForm] = useState<FormsValues>({} as FormsValues);
    useMount(async () => {
        const store = (await vscode.getState('FrankyForm')) as {location: string};
        const currentPath = await vscode.invoke({command: 'getCurrentPath'});
        const init = {
            ...props.configs.reduce((res, item) => {
                if (item.default !== undefined) {
                    res[item.field] = item.default;
                }
                return res;
            }, {} as FormsValues),
            location: currentPath
        } as FormsValues;
        if (store) {
            const other = {...store, location: currentPath};
            Object.assign(init, other);
        }
        setForm(init);
    });
    async function onChange(field: string, value: unknown) {
        const val = {...form, [field]: value};
        setForm(val);
        await vscode.setState('FrankyForm', val);
    }

    async function onCreate(e: React.FormEvent<HTMLFormElement>) {
        e.preventDefault();

        const data = {
            location: form.location,
            flags: props.configs
                .filter((item) => form[item.field] !== undefined)
                .map((item) => '--' + item.field + '=' + form[item.field])
                .filter((item) => item !== undefined)
        };
        console.log('onCreate: ', form, data);
        await vscode.invoke({
            command: 'createProject',
            args: [data]
        });
    }
    return (
        <form className={css.FrankyForm} onSubmit={onCreate}>
            <TextField label={'选择模板'} field={'template'}>
                <VSCodeTextField
                    value={form.template}
                    onChange={(e) => onChange('template', (e as React.ChangeEvent<HTMLInputElement>).target.value)}
                />
            </TextField>
            <TextField label={'Name'} field={'name'}>
                <VSCodeTextField
                    value={form.name}
                    onChange={(e) => onChange('name', (e as React.ChangeEvent<HTMLInputElement>).target.value)}
                />
            </TextField>
            <TextField label={'Location'} field={'location'}>
                <FilePathSelect value={form.location} onChange={(value) => onChange('location', value)} />
            </TextField>
            {props.configs.map((item) => (
                <TextField key={item.field} label={item.label} field={item.field}>
                    {item.type === 'select' ? (
                        <VSCodeDropdown
                            key={item.field}
                            value={form[item.field] as string}
                            onChange={(e) =>
                                onChange(item.field, (e as React.ChangeEvent<HTMLSelectElement>).target.value)
                            }>
                            {item.options.map((item) => (
                                <VSCodeOption key={item.field}>{item.label}</VSCodeOption>
                            ))}
                        </VSCodeDropdown>
                    ) : item.type === 'checkbox' ? (
                        <VSCodeCheckbox
                            id={item.field}
                            checked={form[item.field] as boolean}
                            onChange={(e) =>
                                onChange(item.field, (e as React.ChangeEvent<HTMLInputElement>).target.checked)
                            }>
                            {item.label}
                        </VSCodeCheckbox>
                    ) : item.type === 'input' ? (
                        <VSCodeTextField
                            value={(form[item.field] as string) ?? ''}
                            onChange={(e) =>
                                onChange(item.field, (e as React.ChangeEvent<HTMLInputElement>).target.value)
                            }
                        />
                    ) : null}
                </TextField>
            ))}
            <div>
                <VSCodeButton type={'submit'}>Create</VSCodeButton>
            </div>
        </form>
    );
}
