<template>
    <div class="sContent-container">
        <!-- 页头 -->
        <div class="header">
            <div class="page-head-wrapper">
                <template>
                    <div class="text">
                        <el-breadcrumb separator-class="el-icon-arrow-right">
                            <el-breadcrumb-item>网站违规内容督办</el-breadcrumb-item>
                        </el-breadcrumb>
                    </div>
                </template>
            </div>
        </div>
        <div class="main">
            <div class="main-content">
                <div class="tab-wrapper">
                    <div @click="handleClickA()" class="tab-item">
                        待办事件
                    </div>
                    <div @click="handleClickB()" class="tab-item">
                        在办事件
                    </div>
                    <div @click="handleClickC()" class="tab-item">
                        办结事件
                    </div>
                </div>
                <router-view></router-view>
            </div>
        </div>
    </div>
</template>

<script>
    export default {
        name: 'SContent',

        data() {
            return {

            };
        },

        mounted() {
            this.toWaitTo()
        },

        methods: {
            handleClickA() {
                const name = "toWaitTo"
                this.$router.push({
                    name: name
                })
            },
            handleClickB() {
                const name = "toAtTo"
                this.$router.push({
                    name: name
                })
            },
            handleClickC() {
                const name = "toDoneTo"
                this.$router.push({
                    name: name
                })
            },
            toWaitTo() {
                const name = "toWaitTo"
                this.$router.push({
                    name: name
                })
            }
        },
    };
</script>

<style scoped>
    .sContent-container {
        position: relative;
        box-sizing: border-box;
        width: 85%;
        min-height: 93vh;
        background-color: #fff;
        overflow-y: scroll;
    }

    .header {
        height: 3vh;
        width: 100%;
        border-bottom: 1px solid rgb(220, 223, 230);
    }

    .page-head-wrapper .text {
        margin-top: 15px;
        margin-left: 10px;
        height: 30px;
        /* height: 3vh; */
        line-height: 40px;
        font-size: 16px;
        /* position: absolute; */
        /* top: 0; */
    }

    .main {
        height: 88.5vh;
        /* display: flex; */
    }

    /* 左侧机构树 */
    .main-aside {
        /* width: 200px; */
        width: 20%;
        height: 100%;
        /* background-color: pink; */
        border-right: 1px solid rgb(220, 223, 230);
    }

    .main .main-content {
        width: 100%;
        height: 100%;
        /* background-color: pink; */
    }

    .tab-wrapper {
        display: flex;
        box-sizing: border-box;
        height: 50px;
        width: 100%;
        border-bottom: 1px solid rgb(220, 223, 230);

        /* background-color: pink; */

    }

    .tab-wrapper div{
        cursor: pointer;
    }

    .tab-item {
        width: 100px;
        height: 50px;
        line-height: 50px;
        text-align: center;
    }

    .main-content .main-header {
        box-sizing: border-box;
        /* padding: 10px 0 0 280px;
        height: 180px; */
        width: 100%;
        /* background-color: pink; */
    }

    .main-header .input-wrapper {
        margin-top: 20px;
        display: flex;
    }

    .main-header .main-header-input {
        display: flex;
    }

    .main-header-input .text {
        font-size: 18px;
        height: 50px;
        line-height: 45px;
        padding: 0 20px;
    }

    .main-header-seacher {
        margin-left: 20px;
    }

    .main-main {
        width: 100%;
        height: 500px;
        /* background-color: pink; */
    }

    .main-main .btn-box {
        width: 400px;
        display: flex;
        justify-content: space-between;
        padding: 20px;
        /* background-color: pink; */
    }

    .main-main .institution-table {
        /* width: 100%; */
        height: 500px;
        padding: 0px 20px;
        /* background-color: yellow; */
    }

    .edit {
        cursor: pointer;
    }

    .main-footer {
        box-sizing: border-box;
        margin-top: 150px;
        width: 100%;
        height: 50px;
        padding-left: 50px;
        /* background-color: pink; */
    }

    .main-footer .page-box {}
</style>