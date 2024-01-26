import { lowerFirst } from '@utils/tools';

export default (name: string) => {
    const langId = 'typescript';
    // const fileheader = genFH(langId);
    return `import { useMemo } from "react";
import { EditIcon, SearchIcon } from "@/components/icon";
import { Button } from "@/components/ui/button";
import YqgTable from "@/components/yqg-table";
import OpPopover, { IconNode } from "@/components/yqg-table/op-popover";
import ${name}Http, { SearchParams } from "@/http/api/${lowerFirst(name)}";
import { useForm } from "react-hook-form";

import StatusSwitch from "@/components/yqg-table/status-switch";
import { useSimpleTableWithQuery } from "@/components/yqg-table/useSimpleTable";
import { Fields as CommonFields } from "@/constant";
import { useEnum, useTranslations } from "@/lib/hooks";
import { useMutation, useQueryClient } from "@tanstack/react-query";

import YqgFormLayout from "@/components/yqg-form-layout";
import EditModal from "./modal/edit";
import ViewModal from "./modal/view";

import Fields, { pre } from "./constant";

function StatusComp({ record }: { record: any }) {
    const queryClient = useQueryClient();
    const editMutate = useMutation({
        mutationFn: (data: SearchParams) => ${name}Http.update${name}(data),
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

    const { data, pagination, onTableChange, onRefresh, refetch } = useSimpleTableWithQuery({
        fetchApi: ${name}Http.list,
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
                Fields.key1,
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
                                        ${name}Info: record
                                    })
                                    refetch()
                                }}
                                text={ctx.t(pre("modify"))}
                                icon={<EditIcon />}
                            />
                            <IconNode
                                onClick={() =>
                                    ViewModal.open({
                                        ${name}Info: record,
                                    })
                                }
                                text={ctx.t("view")}
                                icon={<SearchIcon />}
                            />
                        </OpPopover>   
                    ),
                },
            ],
        }),
        [refetch,StatusOptions],
    );

    const extraBtn = (
        <>
            <Button
                onClick={async () => {
                    await EditModal.open({
                        ${name}Info: {}
                    })
                    refetch()
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