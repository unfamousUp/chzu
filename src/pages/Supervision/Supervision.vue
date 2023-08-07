<template>
    <div class="supervision-container">
        <s-aside></s-aside>
        <router-view></router-view>
    </div>
</template>

<script>
    import SAside from "../Supervision/s-aside.vue"
    export default {
        name: 'Supervision',
        components: {
            SAside
        },
        data() {
            return {

            };
        },

        mounted() {
            // 机构管理
            this.toSContent()
        },

        methods: {
            toSContent() {
                const name = "toSContent"
                this.$router.push({
                    name: name
                })
            }
        },
    };
</script>

<style scoped>
    .supervision-container {
        display: flex;
        width: 100%;
        height: 93vh;
        box-sizing: border-box;
        /* background-color: pink; */
        border-top: 1px solid #666;
        /* background-color: black; */
    }


</style>