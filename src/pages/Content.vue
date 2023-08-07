<template>
    <div class="content-container-a">
        <!-- top-bar -->
        <div class="top-bar">
            <div class="top-bar-content">
                <ul class="top-bar-content-list" style="color:#fff;">
                    <li class="top-bar-content-item" @click="testToken">首页</li>
                    <li class="top-bar-content-item">内容管理</li>
                    <li @click="toSupervision()" class="top-bar-content-item">网站违规内容督办</li>
                    <li class="top-bar-content-item">区块链存证</li>
                    <li class="top-bar-content-item">法律法规</li>
                    <li class="top-bar-content-item">统计分析</li>
                    <li @click="toSystemAdministration()" class="top-bar-content-item">系统管理</li>
                </ul>
            </div>
        </div>
        <div class="content-container">
            <!-- 重要通知 -->
            <!-- <div class="head-notice-wrapper">
                <div class="head-notice">
                    <div class="content-bar">
                        <div class="new-notice">
                            <img src="../assets/img/new-notice.jpg" alt="">
                        </div>
                    </div>
                </div>
            </div> -->

            <!-- 轮播图模块 -->
            <div class="slider-notice">
                <div class="slider-wrapper">
                    <template>
                        <el-carousel height="400px" :interval="5000" arrow="always">
                            <!-- <el-carousel-item v-for="item in 4" :key="item">
                                <h3>{{ item }}</h3>
                            </el-carousel-item> -->
                            <el-carousel-item>
                                <img src="../assets/img/hero.png" alt="">
                            </el-carousel-item>
                            <el-carousel-item>
                                <h3>2</h3>
                            </el-carousel-item>
                            <el-carousel-item>
                                <h3>3</h3>
                            </el-carousel-item>
                            <el-carousel-item>
                                <h3>4</h3>
                            </el-carousel-item>
                        </el-carousel>
                    </template>
                </div>
                <div class="notice-wrapper">
                    <div class="more">
                        <span>更多</span>
                        <span class="el-icon-arrow-right"></span>
                    </div>
                    <template>
                        <el-tabs v-model="activeName" type="card">
                            <el-tab-pane label="通知一" name="first">
                                <div class="pane-wrapper">
                                    <ul class="list">
                                        <li class="item">
                                            <span class="my-icon el-icon-arrow-right"></span>
                                            <span class="first">【人民网】新征程·江淮行丨滁州来安：“科技副总”激活引擎 产业人才“双向奔赴”</span>
                                            <span class="second">[2023-4-10]</span>
                                        </li>
                                        <li class="item">
                                            <span class="my-icon el-icon-arrow-right"></span>
                                            <span class="first">【人民网】新征程·江淮行丨滁州来安：“科技副总”激活引擎 产业人才“双向奔赴”</span>
                                            <span class="second">[2023-4-10]</span>
                                        </li>
                                        <li class="item">
                                            <span class="my-icon el-icon-arrow-right"></span>
                                            <span class="first">【人民网】新征程·江淮行丨滁州来安：“科技副总”激活引擎 产业人才“双向奔赴”</span>
                                            <span class="second">[2023-4-10]</span>
                                        </li>
                                        <li class="item">
                                            <span class="my-icon el-icon-arrow-right"></span>
                                            <span class="first">【人民网】新征程·江淮行丨滁州来安：“科技副总”激活引擎 产业人才“双向奔赴”</span>
                                            <span class="second">[2023-4-10]</span>
                                        </li>
                                        <li class="item">
                                            <span class="my-icon el-icon-arrow-right"></span>
                                            <span class="first">【人民网】新征程·江淮行丨滁州来安：“科技副总”激活引擎 产业人才“双向奔赴”</span>
                                            <span class="second">[2023-4-10]</span>
                                        </li>
                                        <li class="item">
                                            <span class="my-icon el-icon-arrow-right"></span>
                                            <span class="first">【人民网】新征程·江淮行丨滁州来安：“科技副总”激活引擎 产业人才“双向奔赴”</span>
                                            <span class="second">[2023-4-10]</span>
                                        </li>
                                        <li class="item">
                                            <span class="my-icon el-icon-arrow-right"></span>
                                            <span class="first">【人民网】新征程·江淮行丨滁州来安：“科技副总”激活引擎 产业人才“双向奔赴”</span>
                                            <span class="second">[2023-4-10]</span>
                                        </li>
                                        <li class="item">
                                            <span class="my-icon el-icon-arrow-right"></span>
                                            <span class="first">【人民网】新征程·江淮行丨滁州来安：“科技副总”激活引擎 产业人才“双向奔赴”</span>
                                            <span class="second">[2023-4-10]</span>
                                        </li>
                                        <li class="item">
                                            <span class="my-icon el-icon-arrow-right"></span>
                                            <span class="first">【人民网】新征程·江淮行丨滁州来安：“科技副总”激活引擎 产业人才“双向奔赴”</span>
                                            <span class="second">[2023-4-10]</span>
                                        </li>
                                        <li class="item">
                                            <span class="my-icon el-icon-arrow-right"></span>
                                            <span class="first">【人民网】新征程·江淮行丨滁州来安：“科技副总”激活引擎 产业人才“双向奔赴”</span>
                                            <span class="second">[2023-4-10]</span>
                                        </li>
                                    </ul>
                                </div>
                            </el-tab-pane>
                            <el-tab-pane label="通知二" name="second">通知二</el-tab-pane>
                            <el-tab-pane label="通知三" name="third">通知三</el-tab-pane>
                            <el-tab-pane label="通知四" name="fourth">通知四</el-tab-pane>
                        </el-tabs>
                    </template>
                </div>
            </div>
            <!-- 快捷入口 -->
            <div class="express-entrance-wrapper">
                <el-card class="box-card">
                    <div slot="header" class="clearfix">
                        <span>快捷入口</span>
                        <!-- <el-button style="float: right; padding: 3px 0" type="text">操作按钮</el-button> -->
                    </div>
                    <div class="card-item-wrapper">
                        <div class="group">
                            <div class="card-item">
                                我的工作台
                            </div>
                            <div class="card-item">
                                网站违规内容督办
                            </div>
                            <div class="card-item">
                                内容管理
                            </div>
                        </div>
                        <div class="group">
                            <div class="card-item">
                                系统管理
                            </div>
                            <div class="card-item">
                                统计分析
                            </div>
                            <div class="card-item">
                                区块链存证
                            </div>
                        </div>
                    </div>
                </el-card>
                <div class="notice-to-do">
                    <div>
                        <span>待办事项</span>
                    </div>
                    <template>
                        <el-table fit :data="tableData" border style="width: 100%">
                            <el-table-column fixed prop="id" label="序号" width="100">
                            </el-table-column>
                            <el-table-column prop="name" label="名称" width="120">
                            </el-table-column>
                            <el-table-column prop="institution" label="督办单位" width="120">
                            </el-table-column>
                            <el-table-column prop="lawEnforcer" label="执法人员" width="120">
                            </el-table-column>
                            <el-table-column prop="tel" label="联系方式" width="120">
                            </el-table-column>
                            <el-table-column prop="time" label="时间" width="150">
                            </el-table-column>
                            <el-table-column fixed="right" label="操作" width="100">
                                <template slot-scope="scope">
                                    <el-button @click="handleClick(scope.row)" type="text" size="small">查看</el-button>
                                    <!-- <el-button type="text" size="small">编辑</el-button> -->
                                </template>
                            </el-table-column>
                        </el-table>
                    </template>
                </div>
            </div>
            <!-- 侧边公告 -->
            <div class="aside-right">
                <div class="aside-right-item">
                    <span>上线公告</span>
                </div>
                <div class="aside-right-item">
                    <span>下载客户端</span>
                </div>
                <div class="aside-right-item">
                    <span>使用手册</span>
                </div>
                <div class="aside-right-item">
                    <span>联系我们</span>
                </div>
                <div class="aside-right-item">
                    <span>学习资料</span>
                </div>
            </div>
        </div>
    </div>
</template>

<script>
    import '../assets/css/top-bar.css'
    export default {
        name: 'Content',
        components: {},
        data() {
            return {
                activeName: 'first',
                tableData: [{
                        id: '1',
                        name: '违规外链',
                        institution: '滁州市网信办',
                        lawEnforcer: '张三',
                        tel: '18175013340',
                        time: "2023-4-17 12:00:00"
                    },
                    {
                        id: '2',
                        name: '出现敏感词',
                        institution: '滁州市网信办',
                        lawEnforcer: '张三',
                        tel: '18175013340',
                        time: "2023-4-17 12:00:00"
                    },
                    {
                        id: '3',
                        name: '违规外链',
                        institution: '滁州市网信办',
                        lawEnforcer: '张三',
                        tel: '18175013340',
                        time: "2023-4-17 12:00:00"
                    },
                ]
            };
        },

        mounted() {
            // this.testToken()
        },

        methods: {
            testToken() {
                this.$axios.get(this.myHttp + '/user/testGetToken')
                    .then(response => {
                        // 处理响应数据
                        const data = response.data.data
                        console.log(data);
                    })
                    .catch(error => {
                        // 处理错误
                    });
            },
            handleClick(row) {
                console.log(row);
            },
            toSystemAdministration() {
                const name = "toSystemAdministration"
                this.$router.push({
                    name: name
                })
            },
            // 违规内容督办
            toSupervision() {
                const name = "toSupervision"
                this.$router.push({
                    name: name
                })
            }
        },
    };
</script>

<style scoped>
    /* 主容器 */
    .content-container {
        box-sizing: border-box;
        position: relative;
        width: 100%;
        height: 86vh;
        overflow: hidden;
        padding: 0px 200px;
        /* padding-top: 20px; */
        /* 解决高度塌陷 */
        /* overflow: hidden; */
    }

    .head-notice-wrapper {
        overflow: hidden;
    }

    /* 顶部通知栏 */
    .head-notice {
        box-sizing: border-box;
        width: 100%;
        height: 100px;
        background-color: #fff;
        margin: 30px 0;
        padding: 10px;
        border: 1px solid #555555;
        border-radius: 5px;
    }

    .head-notice .content-bar {
        width: 100%;
        height: 78px;
    }

    .new-notice {
        float: left;
        height: 78px;
        width: 110px;
    }

    .new-notice img {
        height: 100%;
    }

    /* 轮播图-通知模块 */
    .slider-notice {
        border: 1px solid #666;
        padding: 20px;
        box-sizing: border-box;
        border-radius: 0.5%;
        display: flex;
        width: 100%;
        height: 440px;
        background-color: #fff;
        margin-top: 20px;
    }

    .slider-notice .slider-wrapper {
        width: 50%;
        height: 400px;
    }

    .slider-notice .notice-wrapper {
        position: relative;
        width: 50%;
        height: 400px;
        margin-left: 20px;
        border: 1px solid rgb(228, 231, 237);
        border-radius: 6px;
    }

    .more {
        position: absolute;
        z-index: 9;
        width: 100px;
        height: 40px;
        line-height: 40px;
        right: 0;
        align-items: center;
    }

    .more span:first-child {
        cursor: pointer;
        margin-left: 30px;
        margin-right: 5px;
    }

    /* 轮播-通知模块 */
    .el-carousel__item h3 {
        color: #475669;
        font-size: 18px;
        opacity: 0.75;
        line-height: 400px;
        margin: 0;
        text-align: center;
    }

    .el-carousel__item:nth-child(2n) {
        background-color: #99a9bf;
    }

    .el-carousel__item:nth-child(2n+1) {
        background-color: #d3dce6;
    }

    .pane-wrapper {
        width: 100%;
        height: 345px;
        /* background-color: pink; */
    }

    .pane-wrapper .list {
        height: 100%;

    }

    .list .item {
        height: 32px;
        line-height: 32px;
        padding: 0 20px;
        color: #555555;
    }

    .item .first {
        display: inline-block;
        width: 500px;
        overflow: hidden;
        white-space: nowrap;
        text-overflow: ellipsis;
    }

    .item .first:hover {
        cursor: pointer;
        color: #409EFF;
    }

    .item .second {
        float: right;
        color: #999999;
    }

    .my-icon {
        float: left;
        margin-right: 10px;
        padding: 8px;
    }

    /* 快捷入口 */
    .express-entrance-wrapper {
        display: flex;
        justify-content: left;
        margin-top: 20px;
        /* width: 600px; */
        /* height: 150px; */
        /* background-color: pink; */
    }

    .box-card {
        margin-right: 50px;
    }

    .text {
        font-size: 14px;
    }

    /* 
    .item {
        margin-bottom: 18px;
    } */

    .clearfix:before,
    .clearfix:after {
        display: table;
        content: "";
    }

    .clearfix:after {
        clear: both
    }

    .box-card {
        width: 580px;
    }

    .card-item-wrapper {
        /* display: flex; */
        /* margin-bottom: 20px; */
        /* justify-content: space-around; */
    }

    .group {
        display: flex;
        margin: 40px 0;
    }

    .card-item {
        width: 130px;
        margin-left: 40px;
    }

    /* 右边悬浮窗 */
    .aside-right {
        margin-top: 20px;
        position: absolute;
        z-index: 99;
        top: 0;
        right: 0px;
        /* margin-right: -200px; */
        width: 120px;
        height: 390px;
        border: 1px solid #475669;
        background-color: #fff;
        background-image: url('../assets/img/official-top-bg.png');
        background-position-y: -20px;
    }

    .aside-right .aside-right-item {
        width: 100%;
        height: 55px;
        line-height: 55px;
        text-align: center;
        margin-top: 15px;
    }
</style>