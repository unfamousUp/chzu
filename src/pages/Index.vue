<template>
    <div class="index-container">
        <Header></Header>
        <Main></Main>
    </div>
</template>

<script>
    import Header from "../components/Header.vue"
    import Main from "../components/Main.vue"
    export default {
        name: 'Index',
        components:{
            Header,
            Main
        },
        data() {
            return {

            };
        },

        mounted() {
            console.log(this.$store.state.role);
        },

        methods: {

        },
    };
</script>

<style scoped>
    .index-container{
        min-height: 100vh;
        /* background-color: pink; */
    }
</style>