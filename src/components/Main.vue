<template>
    <div class="main-container">
        <router-view></router-view>
    </div>
</template>

<script>
    export default {
        name: 'Main',
        components: {},
        data() {
            return {

            };
        },

        mounted() {
            this.toContent() // 默认跳转到 Main-content主页内容区
        },
        methods: {
            toContent() {
                const name = "toContent"
                this.$router.push({
                    name: name
                })
            }
        },
    };
</script>

<style scoped>
    .main-container {
        min-height: 93vh;
        /* background-color: pink; */
        background-color: #f0f2f5;
        box-sizing: border-box;
    }
</style>