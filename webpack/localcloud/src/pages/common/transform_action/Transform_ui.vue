<template>
    <div id="transform_ui">
        <mu-float-button icon="swap_vertical_circle" mini id="trans-float-button"/>
        <mu-float-button icon="cloud_upload" mini id="upload-float-button"/>
    </div>
</template>
<script>
    import Bus from '../../../assets/EventBus'
    export default {
        data () {
            return {
            }
        },
        mounted() {
        },
        methods: {
        },
    }
</script>
<style>
    #upload-float-button {
        position: fixed;
        right: 20px;
        bottom: 80px;
    }
    #trans-float-button {
        position: fixed;
        right: 20px;
        bottom: 130px;
    }
</style>
