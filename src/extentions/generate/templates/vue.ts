import genFH from './fileheader';
export default ({name, componentName}: {name: string; componentName: string}) => {
    const langId = 'vue';
    const fileheader = genFH(langId);

    return `${fileheader}

<template>
    <div class="${componentName}">
        <yqg-simple-form
            auto-search
            :options="FormOptions"
            confirm-label="common.query"
            @confirm="onSearch"
            @reset="onSearch"
        >
            <template #extraBtns>
                <a-button
                    v-show="isAuthorized(Permissions.CONFIG_CREATE)"
                    @click="openEditModal()"
                    v-text="'新建'"
                />
            </template>
        </yqg-simple-form>
        <yqg-simple-table
            :options="TableOptions"
            :records="records"
            :pagination="pagination"
            @change="onTableChange"
        >
            <template #op="{ record }">
                <a-button
                    size="small"
                    @click="openDetailModal(record)"
                >
                    查看
                </a-button>
                <a-button
                    size="small"
                    :disabled="record.distributed"
                    @click="openEditModal(record)"
                >
                    编辑
                </a-button>
                <a-popconfirm
                    title="是否确认删除"
                    @confirm="deleteRecord(record)"
                >
                    <a-button
                        size="small"
                        type="danger"
                    >
                        删除
                    </a-button>
                </a-popconfirm>
            </template>
        </yqg-simple-table>
    </div>
</template>

<script type="text/babel">
import {table} from 'src/common/mixin';
import Xxx from 'src/common/resource/xxx';

import {FormOptions, TableOptions} from './constant/options';
import DetailModal from './modal/detail-modal';
import EditModal from './modal/edit-modal';

export default {
    name: '${name}',

    mixins: [table],

    inject: ['isAuthorized', 'Permissions'],

    data() {
        return {
            records: [],
            FormOptions,
            TableOptions
        };
    },

    methods: {
        async onRefresh() {
            const {params} = this;
            const {
                data: {body}
            } = await Xxx.get({params});
            this.pagination.total = body.length;
            this.records = body;
        },

        openEditModal(record) {
            this.$modal.open(EditModal, {record}).then(this.onRefresh);
        },

        openDetailModal(record) {
            this.$modal.open(DetailModal, {record}).then(this.onRefresh);
        },

        deleteRecord(record) {
            Xxx.delete(record).then(() => {
                this.onRefresh();
            });
        }
    }
};

</script>

<style lang="scss" scoped>

</style>

`;
};
