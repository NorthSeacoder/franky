// import genFH from './fileheader';

export const EditModalTpl = ({name}: {name: string}) => {
    const langId = 'vue';
    // const fileheader = genFH(langId);
    return `
<template>
    <yqg-simple-form
        :title="title"
        :options="EditModalFormOptions"
        :values="record"
        @confirm="onConfirm"
        @cancel="dismiss"
    />
</template>

<script type="text/babel">

import {modal} from 'src/common/mixin';
import Xxx from 'src/common/resource/xxx';

import {EditModalFormOptions} from '../constant/options';

export default {
    name: '${name}',

    mixins: [modal],

    inject: ['opSuccess'],

    props: {
        record: {
            type: Object,
            default: () => ({})
        }
    },

    data() {
        return {
            EditModalFormOptions,
        };
    },

    computed: {
        title() {
            return this.record.id ? '编辑' : '创建';
        }
    },

    methods: {
        async onConfirm({record}) {
            await Xxx.save(record);
            this.opSuccess();
            this.close();
        }
    }
};
</script>
`;
};

export const DetailModalTpl = ({name}: {name: string}) => {
    const langId = 'vue';
    // const fileheader = genFH(langId);
    return `
<template>
    <yqg-static-form
        title="详情"
        :options="DetailFormOptions"
        :values="record"
    />
</template>

<script type="text/babel">
import {modal} from 'src/common/mixin';

import {DetailFormOptions} from '../constant/options';

export default {
    name: '${name}',

    onlyClose: true,

    mixins: [modal],

    props: {
        record: {
            type: Object,
            default: () => ({})
        }
    },

    data() {
        return {
            DetailFormOptions
        };
    }
};
</script>
`;
};
