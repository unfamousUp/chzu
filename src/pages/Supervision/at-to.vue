<template>
    <div class="atTo-container">
        <div class="main-header">
            <div class="input-wrapper">
                <div class="input-box">
                    <el-form :label-position="labelPosition" label-width="80px" :model="formLabelAlign">
                        <el-form-item label="输入内容">
                            <template>
                                <el-select v-model="value" filterable placeholder="请选择">
                                    <el-option v-for="item in options" :key="item.value" :label="item.label"
                                        :value="item.value">
                                    </el-option>
                                </el-select>
                            </template>
                        </el-form-item>
                    </el-form>
                </div>
                <div class="main-header-seacher">w
                    <el-button style="margin-right: 20px;" type="primary" @click="getWaitToEventsInfoByOrgName()">查询
                    </el-button>
                    <el-upload action="" accept=".xls,.xlsx" :show-file-list="false" :on-success="handleSuccess"
                        :before-upload="beforeUpload" :http-request="uploadExcel" :on-change="getFile">
                        <el-button slot="trigger" type="primary">点击更新数据</el-button>
                    </el-upload>
                </div>
            </div>
        </div>
        <div class="main-main">
            <div class="institution-table">
                <template>
                    <el-table ref="filterTable" :data="atToDoEventsList" style="width: 100%">
                        <el-table-column prop="eventId" label="编号" width="100">
                        </el-table-column>
                        <el-table-column prop="emergencyDegree" label="紧急程度" width="130"
                            :filters="[{ text: '紧急', value: '紧急' }, { text: '正常', value: '正常' }]"
                            :filter-method="filterTag" filter-placement="bottom-end">
                            <template slot-scope="scope">
                                <el-tag :type="scope.row.emergencyDegree === '紧急' ? 'danger' : 'success'"
                                    disable-transitions>
                                    {{scope.row.emergencyDegree}}</el-tag>
                            </template>
                        </el-table-column>
                        <div v-if="this.$store.state.userInfo.username == 'wxb'">
                            <el-table-column prop="eventStatus" label="事件状态" width="140">
                            </el-table-column>
                        </div>
                        <div v-else>
                            <el-table-column prop="eventStatusInstitution" label="事件状态" width="140">
                            </el-table-column>
                        </div>
                        <el-table-column prop="orgName" label="通报单位" width="200">
                        </el-table-column>
                        <el-table-column prop="orgType" label="单位类型" width="170">
                        </el-table-column>
                        <el-table-column prop="origin_department" label="发起单位" width="140">
                            网信办
                        </el-table-column>
                        <el-table-column prop="datasource" label="数据来源" width="170">
                        </el-table-column>
                        <el-table-column prop="illegalContent" label="违规内容">
                        </el-table-column>
                        <el-table-column prop="date" label="日期" sortable width="150" column-key="date"
                            :filters="[{text: '2016-05-01', value: '2016-05-01'}, {text: '2016-05-02', value: '2016-05-02'}, {text: '2016-05-03', value: '2016-05-03'}, {text: '2016-05-04', value: '2016-05-04'}]"
                            :filter-method="filterHandler">
                            {{this.getNowDate()}}
                        </el-table-column>
                        <el-table-column prop="processStatus" label="处理状态" width="120">
                        </el-table-column>
                        <el-table-column prop="name" label="操作" width="100" fixd="right">
                            <template slot-scope="scope">
                                <el-button @click="toAtToDo(scope.row)">查看</el-button>
                            </template>
                        </el-table-column>
                    </el-table>
                </template>
            </div>
        </div>
        <div class="main-footer">
            <!-- 分页 -->
            <div class="page-box">
                <template>
                    <div class="block">
                        <el-pagination @size-change="handleSizeChange" @current-change="handleCurrentChange"
                            :current-page="currentPage1" :page-sizes="[5, 10]" :page-size="100"
                            layout="total, sizes, prev, pager, next, jumper" :total="20">
                        </el-pagination>
                    </div>
                </template>
            </div>
        </div>
    </div>
</template>

<script>
    export default {
        name: 'AtTo',

        data() {
            return {
                atToDoEventsList: [],
                currentPage1: 1,
                currentPage2: 2,
                currentPage3: 3,
                currentPage4: 4,
                labelPosition: 'right',
                formLabelAlign: {
                    name: '',
                    region: '',
                    type: ''
                },
                dialogVisible: false,
                value: '',
                tableData: [],
                // 单选框
                options: [{
                    value: '选项1',
                    label: '滁州学院'
                }, {
                    value: '选项2',
                    label: '滁州市科学技术局'
                }]
            };
        },

        mounted() {
            // 获取在办事件数据
            this.getAtToEventsInfo()
        },
        methods: {
            // 获取在办事件数据
            getAtToEventsInfo() {
                console.log("getAtToEventsInfo");
                const userId = this.$store.state.userInfo.userId
                this.$axios.get(this.myHttp + '/events/getAtToEventsInfo', {
                        params: {
                            userId: userId
                        }
                    })
                    .then(response => {
                        // 处理响应数据
                        console.log("获取事件信息成功");
                        this.atToDoEventsList = response.data.data;
                        console.log(this.atToDoEventsList);
                    })
                    .catch(error => {
                        // 处理请求错误
                        console.error(error);
                    });
            },
            handleSizeChange(val) {
                console.log(`每页 ${val} 条`);
            },
            handleCurrentChange(val) {
                console.log(`当前页: ${val}`);
            },
            handleClose(done) {
                this.$confirm('确认关闭？')
                    .then(_ => {
                        done();
                    })
                    .catch(_ => {});
            },
            // 待办表格
            formatter(row, column) {
                return row.address;
            },
            filterTag(value, row) {
                return row.tag === value;
            },
            filterHandler(value, row, column) {
                const property = column['property'];
                return row[property] === value;
            },
            // 获取当前时间
            getNowDate() {
                const timeOne = new Date()
                const year = timeOne.getFullYear()
                let month = timeOne.getMonth() + 1
                let day = timeOne.getDate()
                month = month < 10 ? '0' + month : month
                day = day < 10 ? '0' + day : day
                const NOW_MONTHS_AGO = `${year}-${month}-${day}`
                return NOW_MONTHS_AGO
            },
            // 查看在办事件
            toAtToDo(row) {
                this.$store.state.atToRow = row;
                // console.log(this.$store.state.atToRow); // 获取该行数据
                const name = "toAtToDo"
                this.$router.push({
                    name: name
                })
            }
        },
    };
</script>

<style scoped>
    .main-header {
        overflow: hidden;
        box-sizing: border-box;
        /* padding: 10px 0 0 280px;
        height: 180px; */
        width: 100%;
        /* background-color: pink; */
        padding-top: 20px;
    }

    .main-header .input-wrapper {
        box-sizing: border-box;
        /* padding-top: 20px; */
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
        display: flex;
    }

    .main-main {
        width: 100%;
        height: 400px;
        /* background-color: pink; */
    }

    .main-main .institution-table {
        /* width: 100%; */
        height: 350px;
        padding: 0px 20px;
        /* background-color: yellow; */
    }

    .edit {
        cursor: pointer;
    }

    .main-footer {
        position: relative;
        box-sizing: border-box;
        margin-top: 150px;
        width: 100%;
        height: 50px;
        padding-left: 50px;
        /* background-color: pink; */
    }

    .main-footer .page-box {
        position: absolute;
        /* background-color: pink; */
        right: 50px;
        top: -200px;
    }
</style>