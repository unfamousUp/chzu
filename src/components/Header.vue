<template>
    <div class="header-container">
        <div class="header">
            <div class="logo">
                logo
            </div>
            <div @click="toContent()" class="header-title">
                互联网+执法系统
            </div>
            <!-- 输入框 -->
            <div class="search">
                <el-input placeholder="请输入关键词搜索" v-model="search">
                </el-input>
                <el-button type="primary" icon="el-icon-search">搜索</el-button>
            </div>
            <!-- 右侧 -->
            <div class="right">
                <div class="head">
                    <img src="../assets/img/teacherHead.gif" alt="">
                </div>
                <!-- 欢迎词 -->
                <div class="welcome">
                    <span>hi，{{roleName}}!</span>
                </div>
                <!-- 注销 -->
                <div class="logout">
                    <span @click="logout()" class="el-icon-user-solid">注销</span>
                </div>
                <!-- 设置 -->
                <div class="setting">
                    <el-dropdown>

                        <span class="el-dropdown-link">
                            <span class="el-icon-s-tools"></span>
                            设置<i class="el-icon-arrow-down el-icon--right"></i>
                        </span>
                        <el-dropdown-menu slot="dropdown">
                            <el-dropdown-item>修改个人信息</el-dropdown-item>
                            <el-dropdown-item>修改密码</el-dropdown-item>
                        </el-dropdown-menu>
                    </el-dropdown>
                </div>
            </div>
        </div>
        <!-- <div class="top-bar">
            <div class="top-bar-content">
                <ul class="top-bar-content-list">
                    <li class="item">首页</li>
                    <li class="item">内容管理</li>
                    <li class="item">网站违规内容督办</li>
                    <li class="item">区块链存证</li>
                    <li class="item">法律法规</li>
                    <li class="item">统计分析</li>
                    <li class="item">系统管理</li>
                </ul>
            </div>
        </div> -->
    </div>
</template>

<script>
    export default {
        name: 'Header',

        data() {
            return {
                search: '',
                roleName:''
            };
        },

        mounted() {
            this.roleName = this.$store.state.userInfo.fullName
        },

        methods: {
            toContent() {
                const name = "toContent"
                this.$router.push({
                    name: name
                })
            },
            logout(){
                const name = "toLogin"
                this.$router.push({
                    name: name
                })
            }
        },
    };
</script>

<style scoped>
    .header-container {
        /* min-height: 14vh */
        min-height: 7vh;
    }

    /* 顶部 */
    .header {
        /* height: 70px; */
        min-height: 7vh;
        background: #FFFFFF;
        /* box-shadow: 0px 2px 10px 0px rgba(0, 0, 0, 0.15); */
        position: relative;
        background-color: #f0f2f5;
    }

    /* 顶部logo */
    .header .logo {
        float: left;
        height: 100%;
        line-height: 70px;
        font-size: 22px;
        margin-left: 40px;
    }

    /* 顶部标题 */
    .header .header-title {
        cursor: pointer;
        float: left;
        margin-left: 30px;
        height: 70px;
        line-height: 70px;
        font-size: 22px;
        font-weight: 500;
        font-family: AlibabaPuHuiTi_2_105_Heavy;
        color: #005BA5;
        letter-spacing: 3px;
    }

    /* 搜索框 */
    .header .search {
        display: flex;
        position: absolute;
        box-sizing: border-box;
        padding: 15px 0;
        /* height: 70px; */
        width: 300px;
        /* background-color: pink; */
        left: 60%;
    }

    /deep/ .el-input__inner,
    .el-button--primary {
        border-radius: 0;
    }

    /* 右侧模块 */
    .header .right {
        float: right;
        display: flex;
        position: relative;
        margin-right: 20px;
        justify-content: space-between;
        height: 70px;
        line-height: 70px;
        font-size: 20px;
        width: 300px;
        color: #666;
    }

    /* 头像 */
    .right .head {
        position: absolute;
        width: 40px;
        height: 40px;
        cursor: pointer;
        left: -50px;
        top: 12px;
    }

    .head img {
        border-radius: 10px;
        width: 100%;
    }

    .right div {
        cursor: pointer;
    }

    .right .setting {
        font-size: 22px;
    }

    .right .logout:hover {
        color: rgba(107, 72, 8, 0.345);
    }

    .el-dropdown-link {
        font-size: 20px;
    }

    /* .top-bar */
    .top-bar {
        position: relative;
        width: 100%;
        /* height: 70px; */
        height: 7vh;
        background-color: #005BA5;
    }

    .top-bar-content {
        position: absolute;
        width: 80%;
        height: 100%;
        margin: auto;
        left: 0;
        right: 0;
        top: 0;
        bottom: 0;

    }

    .top-bar-content .top-bar-content-list {
        cursor: pointer;
        width: 100%;
        height: 100%;
        line-height: 70px;
        display: flex;
        justify-content: space-around;
        color: #fff;
        font-size: 20px;
    }

    .top-bar-content-list .item {
        font-weight: bold;
    }

    .top-bar-content-list .item:hover {
        /* background-color: orange; */
    }
</style>