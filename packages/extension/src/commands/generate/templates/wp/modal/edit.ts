import { lowerFirst } from '@utils/tools';

export default (name: string) => {
    const langId = 'typescript';
    // const fileheader = genFH(langId);
    return `import { useMemo } from "react";
import { useForm } from "react-hook-form";
import * as yup from "yup";

import { YqgFormModal, createProgramModal, YqgModalProps } from "@/components/yqg-antd-modal";
import { useTranslations  } from "@/lib/hooks";
import { useMutation } from "@tanstack/react-query";
import { yupResolver } from "@hookform/resolvers/yup";
import ${name}Http, { SearchParams } from "@/http/api/${lowerFirst(name)}";

import useToast from "@/components/use-toast";
import Fields, { pre } from "../constant";

interface ModalProps {
    ${lowerFirst(name)}Info: any;
}

const required = true;

function Edit${name} (props: YqgModalProps<ModalProps>) {
    const { ${lowerFirst(name)}Info, onDismiss, onClose } = props;

    const $t = useTranslations("");
    const $tc = useTranslations("Common");
    const { toast } = useToast();
    
    const title = $t(pre(${lowerFirst(name)}Info.id ? "modify" : "create"));//TODO: i18n key
    const disabled = useMemo(() => ${lowerFirst(name)}Info.id, [${lowerFirst(name)}Info]);
    const editForm = useForm({
        values: ${lowerFirst(name)}Info,
        resolver: yupResolver(yup.object({
        })),
    });

    const editMutate = useMutation({
        mutationFn: (data: SearchParams) => 
            ${name}Http[${lowerFirst(name)}Info.id ? "update${name}" : "create${name}"](data),
        onSuccess: () => {
            toast({ description: $tc("operateSuccess") });
            onClose();
        },
    })

    const handleConfirm = (values: SearchParams) => {
        editMutate.mutate(values);
    }

    const FormOptions = useMemo(
        () =>
            ({
                layout: "vertical",
                fieldDefs: [
                    {
                        ...Fields.key1,
                        required,
                        props: {
                            disabled,
                        },
                    },
                ],
            } as any),
        [disabled],
    );

    return (
        <YqgFormModal
            title={title}
            form={editForm}
            options={FormOptions}
            onCancel={onDismiss}
            onSubmit={handleConfirm}
        />
    )
}

export default createProgramModal(Edit${name});
`
}