<template>
    <div id="dir">
        <TransformUi></TransformUi>
    </div>
</template>
<script>
    import Bus from '../../assets/EventBus'
    import * as Const from '../../constants/Const'
    import TransformUi from '../common/transform_action/Transform_ui.vue'
    export default {
        data () {
            return {
            }
        },
        mounted() {
        },
        methods: {
        },
        components: {
            TransformUi,
        }
    }
</script>
<style>
    #dir {
        width: 100%;
        height: 100%;
    }
</style>
