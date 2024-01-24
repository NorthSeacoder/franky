export default (name: string) => {
    const langId = 'typescript';
    // const fileheader = genFH(langId);
    return `import { useMemo } from "react";

import { YqgModal, createProgramModal, YqgModalProps } from "@/components/yqg-antd-modal";
import YqgStaicForm from "@/components/yqg-static-form";
import { useTranslations, useEnum } from "@/lib/hooks";
import { useWarehouseOptions } from "@/lib/hooks/index";

import Fields, { pre } from "../constant";

type ModalProps = {
    info: any;
}
function View${name}(props: YqgModalProps<ModalProps>) {
    const {
        info = {},
        onClose,
    } = props;

    const $t = useTranslations("");

    const StatusOptions = useEnum({ key: "EnabledState" });
    const { WarehouseOptions } = useWarehouseOptions();


    const FormOptions = useMemo(
        () =>
            ({
                layout: "horizontal",
                fieldDefs: [Fields.key1],
            } as any),
        [WarehouseOptions, StatusOptions],
    );

    return (
        <YqgModal
            title={$t(pre("info"))}
            onCancel={onClose}
        >
            <YqgStaicForm
                options={FormOptions}
                values={info}
            />
        </YqgModal>
    );
}

export default createProgramModal(View${name})
`
}
