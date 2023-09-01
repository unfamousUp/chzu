<template>
    <div class="waitToDo-container">
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
                <!-- 网站违规内容基本信息 -->
                <div class="base-info-wrapper">
                    <!-- 标题 -->
                    <div class="base-info-title">
                        <span>网站违规内容基本信息</span>
                    </div>
                    <!-- 主要内容 -->
                    <div class="base-info-content">
                        <div class="base-info-item">
                            单位名称：
                            <span>{{webBaseInfo.orgName}}</span>
                        </div>
                        <div class="base-info-item">
                            网站域名：
                            <span>{{webBaseInfo.orgDomainName}}</span>
                        </div>
                        <div class="base-info-item">
                            网站备案号：
                            <span></span>
                        </div>
                        <div class="base-info-item">
                            联系负责人：
                            <span>{{userInfo.fullName}}</span>
                        </div>
                    </div>
                </div>
                <!-- 详细信息 -->
                <div class="detail-info-wrapper">
                    <!-- 标题 -->
                    <div class="detail-info-title">
                        <span>网站违规外链详细信息</span>
                    </div>
                    <!-- 主要内容 -->
                    <div class="detail-info-content">
                        <template>
                            <el-table :data="detailInfoData" style="width: 100%" height="250">
                                <el-table-column prop="id" label="id" width="50">
                                </el-table-column>
                                <el-table-column prop="domain_name" label="域名" width="150">
                                </el-table-column>
                                <el-table-column :show-overflow-tooltip="true" prop="title" label="文章标题" width="220">
                                </el-table-column>
                                <el-table-column prop="sensitive_word" label="敏感词" width="220">
                                </el-table-column>
                                <el-table-column prop="suggestion" label="修改建议" width="300">
                                </el-table-column>
                                <el-table-column :show-overflow-tooltip="true" prop="location" label="所在片段" width="300">
                                </el-table-column>
                                <el-table-column prop="original_link" label="原始链接" width="400">
                                    <template slot-scope="scope">
                                        <a style="color:orange;"
                                            :href="scope.row.original_link">{{scope.row.original_link}}</a>
                                    </template>
                                </el-table-column>
                                <el-table-column prop="date" label="快照时间" width="220">
                                </el-table-column>
                                <el-table-column fixed="right" prop="state" label="修改状态" width="120">
                                </el-table-column>
                            </el-table>
                        </template>
                    </div>
                </div>
                <!-- 当前流程 -->
                <div class="process-wrapper">
                    <div class="process-title">
                        <span>流程通报</span>
                    </div>
                    <div class="process-content">
                        <el-steps :active="currentState" finish-status="success">
                            <el-step title="待办"></el-step>
                            <el-step title="在办"></el-step>
                            <el-step title="办结"></el-step>
                        </el-steps>
                    </div>
                </div>

            </div>
        </div>
        <div class="footer">
            <!-- 处理事务 -->
            <div class="handle-wrapper">
                <div class="handle-content">
                    <div class="handle-box">
                        <div class="box-left">
                            <span>当前步骤</span>
                        </div>
                        <div class="box-right">
                            <span>待办</span>
                        </div>
                    </div>
                    <div class="handle-box">
                        <div class="box-left">
                            <span>请选择下一步</span>
                        </div>
                        <div class="box-right">
                            <span v-if="this.$store.state.userInfo.isAdmin">部门领导审核</span>
                            <span v-if="this.$store.state.userInfo.isInstitution">网信办审核</span>
                        </div>
                    </div>
                    <div class="handle-box">
                        <div class="box-left">
                            <span>下一步办理人</span>
                        </div>
                        <div class="box-right">
                            <template>
                                <el-select v-model="value" clearable placeholder="请选择">
                                    <el-option v-for="item in rolesOption" :key="item.userId" :label="item.fullName"
                                        :value="item.userId">
                                    </el-option>
                                </el-select>
                            </template>
                        </div>
                    </div>
                    <div class="handle-box">
                        <div class="box-left">
                            <span>操作</span>
                        </div>
                        <div class="box-right">
                            <span style="margin-right: 10px;">
                                <el-button @click="open">提交</el-button>
                            </span>
                            <span>
                                <!-- <el-upload class="upload-demo" action="https://jsonplaceholder.typicode.com/posts/"
                                    :on-preview="handlePreview" :on-remove="handleRemove" :before-remove="beforeRemove"
                                    multiple :limit="3" :on-exceed="handleExceed" :file-list="fileList">
                                    <el-button size="small" type="primary">点击上传附件</el-button>
                                </el-upload> -->
                                <el-upload action="/api/upload" accept=".xls,.xlsx"
                                    :on-success="handleExcelUploadSuccess">
                                    <el-button size="small" type="primary">上传附件</el-button>
                                </el-upload>
                            </span>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    </div>
</template>

<script>
    export default {
        name: 'WaitToDo',
        data() {
            return {
                webBaseInfo:{
                    
                },
                userInfo:{},
                transaction: {
                    currentProcess: '',
                    next: '',
                },
                currentState: 1, // 办理状态
                rowIndex: '', // 当前处理行的编号
                currentRow: {}, // 当前处理行的数据
                currentRowOfCopy: {}, // 备份
                fileList: [],
                rolesOption: [],
                value: '',
                updateEventsInfoDTO:{
                    userId: null,
                    eventId: null,
                    eventType: null,
                    eventStatusInstitution: '',
                    eventStatus: '',
                    processStatus: null,
                },
                detailInfoData: [{
                        id: '1',
                        domain_name: 'www.czkx.org.cn',
                        title: '市县科协领导深入基层宣讲十九大 滁州市科学技术协会',
                        sensitive_word: '新时代中国特色社会主义思想',
                        suggestion: '习近平新时代中国特色社会主义思想',
                        location: '特色社会主义进入新时代的重要论断,坚持以新时代中国特色社会主义思想为统领,牢牢把',
                        original_link: 'http://www.czkx.org.cn/xian/6/2018-05-17/3723.html',
                        date: '2022/8/10 19:07:46',
                        state: '待修改'
                    }, {
                        id: '2',
                        domain_name: 'www.czkx.org.cn',
                        title: '市县科协领导深入基层宣讲十九大 滁州市科学技术协会',
                        sensitive_word: '新时代中国特色社会主义思想',
                        suggestion: '习近平新时代中国特色社会主义思想',
                        location: '特色社会主义进入新时代的重要论断,坚持以新时代中国特色社会主义思想为统领,牢牢把',
                        original_link: 'http://www.czkx.org.cn/xian/6/2018-05-17/3723.html',
                        date: '2022/8/10 19:07:46',
                        state: '待修改'
                    }, {
                        id: '3',
                        domain_name: 'www.czkx.org.cn',
                        title: '市县科协领导深入基层宣讲十九大 滁州市科学技术协会',
                        sensitive_word: '新时代中国特色社会主义思想',
                        suggestion: '习近平新时代中国特色社会主义思想',
                        location: '特色社会主义进入新时代的重要论断,坚持以新时代中国特色社会主义思想为统领,牢牢把',
                        original_link: 'http://www.czkx.org.cn/xian/6/2018-05-17/3723.html',
                        date: '2022/8/10 19:07:46',
                        state: '待修改'
                    }, {
                        id: '4',
                        domain_name: 'www.czkx.org.cn',
                        title: '市县科协领导深入基层宣讲十九大 滁州市科学技术协会',
                        sensitive_word: '新时代中国特色社会主义思想',
                        suggestion: '习近平新时代中国特色社会主义思想',
                        location: '特色社会主义进入新时代的重要论断,坚持以新时代中国特色社会主义思想为统领,牢牢把',
                        original_link: 'http://www.czkx.org.cn/xian/6/2018-05-17/3723.html',
                        date: '2022/8/10 19:07:46',
                        state: '待修改'
                    },
                    {
                        id: '5',
                        domain_name: 'www.czkx.org.cn',
                        title: '市县科协领导深入基层宣讲十九大 滁州市科学技术协会',
                        sensitive_word: '新时代中国特色社会主义思想',
                        suggestion: '习近平新时代中国特色社会主义思想',
                        location: '特色社会主义进入新时代的重要论断,坚持以新时代中国特色社会主义思想为统领,牢牢把',
                        original_link: 'http://www.czkx.org.cn/xian/6/2018-05-17/3723.html',
                        date: '2022/8/10 19:07:46',
                        state: '待修改'
                    },
                    {
                        id: '6',
                        domain_name: 'www.czkx.org.cn',
                        title: '市县科协领导深入基层宣讲十九大 滁州市科学技术协会',
                        sensitive_word: '新时代中国特色社会主义思想',
                        suggestion: '习近平新时代中国特色社会主义思想',
                        location: '特色社会主义进入新时代的重要论断,坚持以新时代中国特色社会主义思想为统领,牢牢把',
                        original_link: 'http://www.czkx.org.cn/xian/6/2018-05-17/3723.html',
                        date: '2022/8/10 19:07:46',
                        state: '待修改'
                    }
                ]
            };
        },

        mounted() {
            // 获取机构用户信息
            this.webBaseInfo = this.$store.state.waitToRow
            // 根据orgId查询用户信息
            this.getUserInfoByOrgId(this.webBaseInfo.assignedToOrganization);
            console.log("webBaseInfo:");
            console.log(this.webBaseInfo);
            if(this.$store.state.userInfo.isAdmin) this.getUserOptionInfo(this.webBaseInfo.assignedToOrganization);
            if(this.$store.state.userInfo.isInstitution) this.getUserOptionInfo(1001);
            
        },

        methods: {
            getUserOptionInfo(orgId) {
                console.log("getUserOptionInfo:"+orgId);
                this.$axios.get(this.myHttp + '/user/getUserOptionInfo/',{
                    params:{
                        orgId:orgId
                    }
                })
                    .then(response => {
                        // 处理响应数据
                        this.rolesOption = response.data.data;
                        console.log(roles);
                    })
                    .catch(error => {
                        // 处理错误
                    });
            },
            getUserInfoByOrgId(orgId) {
                console.log("getUserInfoByOrgId:"+orgId);
                this.$axios.get(this.myHttp + '/user/getUserInfoByOrgId',{
                    params:{
                        orgId:orgId
                    }
                })
                    .then(response => {
                        // 处理响应数据
                        this.userInfo = response.data.data;
                        console.log(userInfo);
                    })
                    .catch(error => {
                        // 处理错误
                    });
            },
            handleExcelUploadSuccess() {
                console.log("upload");
            },
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
            handleRemove(file, fileList) {
                console.log(file, fileList);
            },
            handlePreview(file) {
                console.log(file);
            },
            handleExceed(files, fileList) {
                this.$message.warning(
                    `当前限制选择 3 个文件，本次选择了 ${files.length} 个文件，共选择了 ${files.length + fileList.length} 个文件`);
            },
            beforeRemove(file, fileList) {
                return this.$confirm(`确定移除 ${ file.name }？`);
            },
            handleSubmit() {
                alert("1")
            },
            open() {
                this.$confirm('请确认提交, 是否继续?', '提示', {
                    confirmButtonText: '确定',
                    cancelButtonText: '取消',
                    type: 'warning'
                }).then(() => {
                    // 操作
                    if(this.value){
                        console.log("userId:"+this.value);
                        this.$message({
                        type: 'success',
                        message: '提交成功!'
                    });
                    this.updateWaitToEventsInfo()
                    }
                    else{
                        console.log("value值为空");
                    }

            
                }).catch(() => {
                    this.$message({
                        type: 'info',
                        message: '已取消'
                    });
                });
            },
            updateWaitToEventsInfo(){
                this.updateEventsInfoDTO.userId = this.value;
                this.updateEventsInfoDTO.eventId = this.webBaseInfo.eventId
                this.updateEventsInfoDTO.eventType = this.webBaseInfo.eventType
                this.updateEventsInfoDTO.eventStatus = this.webBaseInfo.eventStatus
                this.updateEventsInfoDTO.eventStatusInstitution = this.webBaseInfo.eventStatusInstitution
                this.updateEventsInfoDTO.processStatus = this.webBaseInfo.processStatus
                console.log(this.updateEventsInfoDTO);
                this.$axios.put(this.myHttp + '/events/updateEventsInfo',this.updateEventsInfoDTO)
                    .then(response => {
                        // 处理响应数据
                        console.log(response.data);
                    })
                    .catch(error => {
                        // 处理错误
                    });
            }
        },
    };
</script>

<style scoped>
    .waitToDo-container {
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
        /* height: 88.5vh; */
        box-sizing: border-box;
        padding: 20px;
        height: 120vh;
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

    /* main区 */
    .main .main-content {
        width: 100%;
        height: 100%;
        border: 1px solid rgb(220, 223, 230);
        /* background-color: pink; */
    }

    /* 网站内容基本信息 */
    .main-content .base-info-wrapper {
        width: 100%;
        height: 450px;
        /* background-color: pink; */
    }

    /* 标题 */
    .base-info-title {
        width: 100%;
        height: 50px;
        line-height: 50px;
        font-size: 25px;
        text-align: center;
        border-bottom: 1px solid rgb(220, 223, 230);
    }

    /* 内容区 */
    .base-info-content {
        box-sizing: border-box;
        padding-left: 20px;
        width: 100%;
        height: 400px;
        border-bottom: 1px solid rgb(220, 223, 230);
        /* background-color: pink; */
    }

    .base-info-item {
        height: 100px;
        line-height: 100px;
        text-align: left;
    }

    /* 网站违规外链详细信息 */
    .main-content .detail-info-wrapper {
        width: 100%;
        height: 310px;
        /* background-color: pink; */
    }

    /* 标题 */
    .detail-info-title {
        width: 100%;
        height: 50px;
        line-height: 50px;
        font-size: 25px;
        text-align: center;
        border-bottom: 1px solid rgb(220, 223, 230);
    }

    .detail-info-content {
        width: 100%;
        /* border-bottom: 1px solid rgb(220, 223, 230); */
    }

    /* 流程通报 */
    .main-content .process-wrapper {
        width: 100%;
        height: 300px;
        /* background-color: pink; */
    }

    /* 标题 */
    .process-title {
        width: 100%;
        height: 50px;
        line-height: 50px;
        font-size: 25px;
        text-align: center;
        border-bottom: 1px solid rgb(220, 223, 230);
    }

    .process-content {
        box-sizing: border-box;
        /* margin-left: 150px; */
        width: 100%;
        /* height: 400px; */
        padding-top: 100px;
        padding-bottom: 90px;
        /* border-bottom: 1px solid rgb(215,216,218); */
        /* background-color: pink; */
    }

    .footer {
        box-sizing: border-box;
        padding: 20px;
        /* min-height: 50vh; */
    }

    /* 处理事务 */
    .handle-wrapper {
        width: 100%;
        /* height: 200px; */
        /* background-color: pink; */
    }

    .handle-wrapper .handle-content {
        /* height: 100%; */
        width: 100%;
        border: 1px solid rgb(218, 218, 242);
        border-bottom: 0;
        background-color: rgb(241, 241, 249);
        /* background-color: yellow; */
    }

    .handle-box {
        display: flex;
        height: 50px;
        line-height: 50px;
        width: 100%;
        border-bottom: 1px solid rgb(218, 218, 242);
        /* background-color: palegoldenrod; */
    }

    .box-left {
        box-sizing: border-box;
        padding-left: 20px;
        width: 20%;
        height: 50px;
        /* background-color: pink; */
        border-right: 1px solid rgb(208, 235, 254);
    }

    .box-right {
        display: flex;
        box-sizing: border-box;
        padding-left: 15px;
        width: 80%;
        height: 50px;
        /* background-color: yellow; */
    }
</style>