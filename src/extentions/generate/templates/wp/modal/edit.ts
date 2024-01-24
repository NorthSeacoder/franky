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

import useToast from "@/components/use-toast";
import Fields, { pre } from "../constant";

interface ModalProps {
    info: any;
}

const required = true;

function Edit${name} (props: YqgModalProps<ModalProps>) {
    const { info, onDismiss, onClose } = props;

    const $t = useTranslations("");
    const $tc = useTranslations("Common");
    const { toast } = useToast();
    
    const title = $t(pre(info.id ? "modifyYard" : "createYard"));
    const disabled = useMemo(() => info.id, [info]);
    const editForm = useForm({
        values: info,
        resolver: yupResolver(yup.object({
        })),
    });

    const editMutate = useMutation({
        mutationFn: (data: Info) => Http[info.id ? "change" : "create"](data),
        onSuccess: () => {
            toast({ description: $tc("operateSuccess") });
            onClose();
        },
    })

    const handleConfirm = (values: any) => {
        editMutate.mutate(data);
    }

    const FormOptions = useMemo(
        () =>
            ({
                layout: "vertical",
                fieldDefs: [Fields.key1],
            } as any),
        [],
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