export default (name: string) => {
    const langId = 'typescript';
    // const fileheader = genFH(langId);
    return `import { useMemo } from "react";
import { useForm } from "react-hook-form";
import { Button } from "@/components/ui/button";
import YqgTable from "@/components/yqg-table";
import OpPopover, { IconNode } from "@/components/yqg-table/op-popover";
import { EditIcon } from "@/components/icon";
import Http, { Info } from "@/http/api/http";//TODO: 改成自己的resource

import { useSimpleTableWithQuery } from "@/components/yqg-table/useSimpleTable";
import { useEnum, useTranslations } from "@/lib/hooks";
import { Fields as CommonFields } from "@/constant";

import YqgFormLayout from "@/components/yqg-form-layout";
import EditModal from "./modal/edit";

import Fields, { pre } from "./constant";

function StatusComp({ record }: { record: any }) {
    const queryClient = useQueryClient();
    const editMutate = useMutation({
        mutationFn: (data: Info) => Http.change(data),
        onSuccess: () => {
            queryClient.invalidateQueries({ queryKey: ["get${name}List"] });
        },
    });
    return (
        <StatusSwitch
            record={record}
            mutate={editMutate.mutate}
            key="status"
            checkedValues={["ENABLE", "DISABLE"]}
        />
    );
}

export default function ${name}List() {
    
    const $t = useTranslations("");

    const StatusOptions = useEnum({
        key: "EnabledState",
    });

    const form: any = useForm();

    const { data, pagination, onTableChange, onRefresh } = useSimpleTableWithQuery({
        fetchApi: Http.getList,
        queryKey: ["get${name}List"],
    });


    const FormOptions = useMemo(
        () =>
            ({
                fieldDefs: [
                    Fields.key1
                ],
            } as any),
        [],
    );

    const TableOptions = useMemo(
        () => ({
            colDefs: [
                Fields.key,
                {
                    ...CommonFields.status,
                    options: StatusOptions,
                    staticComp: StatusComp,
                },
                {
                    field: "op",
                    column: { fixed: "right" },
                    staticComp: ({ ctx, record }: any) => (
                        <OpPopover>
                            <IconNode
                                onClick={async () => {
                                    await EditModal.open({
                                        info: record
                                    })
                                    onRefresh()
                                }}
                                text={ctx.t(pre("modify"))}
                                icon={<EditIcon />}
                            />
                        </OpPopover>   
                    ),
                },
            ],
        }),
        [onRefresh,StatusOptions],
    );

    const extraBtn = (
        <>
            <Button
                onClick={async () => {
                    await EditModal.open({
                        info: {}
                    })
                    onRefresh()
                }}
            >{$t("Common.create")}</Button>
        </>
    );

    return (
        <>
            <YqgFormLayout
                form={form}
                options={FormOptions}
                onSubmit={onRefresh}
                onReset={onRefresh}
                confirmLabel="Common.search"
                extraBtn={extraBtn}
            >
                <YqgTable
                    ctx={{ t: $t }}
                    options={TableOptions as any}
                    records={data?.body?.list || []}
                    pagination={{
                        ...pagination,
                        total: data?.body?.total,
                    }}
                    onChange={onTableChange}
                />
            </YqgFormLayout>
        </>
    );
}
`
}