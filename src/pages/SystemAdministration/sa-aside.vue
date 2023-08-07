<template>
    <div class="saAside-container">
        <el-aside width="100%" style="background-color: rgb(238, 241, 246)">
            <el-menu @open="handleOpen" @close="handleOpen" :default-openeds="[]">
                <el-submenu index="toInstitutionManagement">
                    <template slot="title">
                        <i class="el-icon-message"></i>
                        机构管理
                    </template>
                </el-submenu>
                <el-submenu index="toUserManagement">
                    <template slot="title">
                        <i class="el-icon-menu"></i>
                        用户管理
                    </template>
                </el-submenu>
                <el-submenu index="toRoleManagement">
                    <template slot="title">
                        <i class="el-icon-setting"></i>
                        角色管理
                    </template>
                </el-submenu>
            </el-menu>
        </el-aside>
    </div>
</template>

<script>
    export default {
        name: 'SaAside',

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
    .saAside-container {
        /* float: left; */
        box-sizing: border-box;
        width: 15%;
        height: 93vh;
        background-color: rgb(238, 241, 246);
    }
</style>