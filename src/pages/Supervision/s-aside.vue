<template>
    <div class="sAside-container">
        <el-aside width="100%" style="background-color: rgb(238, 241, 246)">
            <el-menu @open="handleOpen" @close="handleOpen" :default-openeds="[]">
                <el-submenu index="toWaitTo">
                    <template slot="title">
                        <i class="el-icon-message"></i>
                        网站违规内容督办
                    </template>
                </el-submenu>
            </el-menu>
        </el-aside>
    </div>
</template>
<script>
    export default {
        name: 'SAside',

        data() {
            return {

            };
        },

        mounted() {
            
        },

        methods: {
            toInstitutionManagement() {
                const name = "toInstitutionManagement"
                this.$router.push({
                    name: name
                })
            },
            toUserManagement() {
                const name = "toInstitutionManagement"
                this.$router.push({
                    name: name
                })
            },
            toRoleManagement() {
                const name = "toRoleManagement"
                this.$router.push({
                    name: name
                })
            },
            handleOpen(key, keyPath) {
                console.log(key);
                const name = key
                this.$router.push({
                    name: name
                })
            },
        },
    };
</script>

<style scoped>
    .sAside-container {
        /* float: left; */
        box-sizing: border-box;
        width: 15%;
        height: 93vh;
        background-color: rgb(238, 241, 246);
    }
</style>