<template>
    <div>
        <export-excel
            class="btn btn-outline-success"
            :data="data"
            :name="name">
            <b-icon icon="file-excel" aria-hidden="true"></b-icon>
            
            EXPORTAR EXCEL
        </export-excel>
    </div>
</template>

<script>

    import { BButton } from 'bootstrap-vue';
    import excel from 'vue-excel-export';
    import Vue from 'vue';

    Vue.use(excel);

    export default {
        components: {
            BButton
        },
        props: ['data', 'name']
    }

</script>

<style scoped>

    .btn {
        /* display: block; */
        /* width: 100%; */
        margin-bottom: 1rem !important;
        border-radius: 0.25rem !important;
        font-weight: bold;
    }

    .btn.btn-outline-success {
        cursor: pointer;
    }

    .btn i {
        margin-right: .5rem !important;
    }

</style>
