<template>
    <div class="systemAdministration-container">
        <sa-aside></sa-aside>
        <router-view></router-view>
    </div>
</template>

<script>
    import SaAside from "../SystemAdministration/sa-aside.vue"
    export default {
        name: 'SystemAdministration',
        components: {
            SaAside
        },
        data() {
            return {

            };
        },

        mounted() {
            // 机构管理
            this.toInstitutionManagement()
        },

        methods: {
            toInstitutionManagement() {
                const name = "toInstitutionManagement"
                this.$router.push({
                    name: name
                })
            }
        },
    };
</script>

<style scoped>
    .systemAdministration-container {
        display: flex;
        width: 100%;
        height: 93vh;
        box-sizing: border-box;
        /* background-color: pink; */
        border-top: 1px solid #666;
        /* background-color: black; */
    }


</style>