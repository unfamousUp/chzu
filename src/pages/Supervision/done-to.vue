<template>
    <div class="doneTo-container">
        <div class="main-header">
            <div class="input-wrapper">
                <div class="input-box">
                    <el-input
                        placeholder="请输入机构名称"
                        v-model="orgName_input"
                        style="width: 130px"
                    >
                    </el-input>
                </div>
                <div class="main-header-seacher">
                    <el-button
                        style="margin-right: 20px"
                        type="primary"
                        @click="getWaitToEventsInfoByOrgName()"
                        >查询
                    </el-button>
                    <el-upload
                        action=""
                        accept=".xls,.xlsx"
                        :show-file-list="false"
                        :on-success="handleSuccess"
                        :before-upload="beforeUpload"
                        :http-request="uploadExcel"
                        :on-change="getFile"
                    >
                        <!-- <el-button slot="trigger" type="primary"
                            >点击更新数据</el-button
                        > -->
                    </el-upload>
                </div>
                <div class="main-header-add">
                    <!-- <el-button type="primary" @click="showAddDialog()"
                        >添加</el-button
                    > -->
                    <!-- 添加弹窗 -->
                    <el-dialog
                        title="添加事件信息"
                        :visible.sync="addDialogVisible"
                        width="40%"
                        center
                        @close="clearAddForm"
                    >
                        <el-form
                            :model="newRow"
                            ref="addForm"
                            label-width="80px"
                            :rules="addFormRules"
                        >
                            <el-form-item label="通报单位" prop="orgId">
                                <el-select
                                    v-model="newRow.orgId"
                                    filterable
                                    placeholder="请选择通报单位"
                                >
                                    <el-option
                                        v-for="org in selectOptions.orgInfo"
                                        :key="org.orgId"
                                        :label="org.orgName"
                                        :value="org.orgId"
                                    >
                                    </el-option>
                                </el-select>
                            </el-form-item>
                            <el-form-item
                                label="紧急程度"
                                prop="emergencyDegree"
                            >
                                <el-select
                                    v-model="newRow.emergencyDegree"
                                    placeholder="请选择紧急程度"
                                >
                                    <el-option
                                        v-for="emergencyDegree in selectOptions.emergencyDegree"
                                        :key="emergencyDegree"
                                        :label="emergencyDegree"
                                        :value="emergencyDegree"
                                    >
                                    </el-option>
                                </el-select>
                            </el-form-item>
                            <el-form-item
                                label="发起单位"
                                prop="origin_department"
                            >
                                <el-select
                                    v-model="newRow.originDepartment"
                                    placeholder="请选择发起单位"
                                >
                                    <el-option
                                        v-for="origin_department in selectOptions.origin_department"
                                        :key="origin_department"
                                        :label="origin_department"
                                        :value="origin_department"
                                    >
                                    </el-option>
                                </el-select>
                            </el-form-item>
                            <el-form-item label="数据来源" prop="datasource">
                                <el-select
                                    v-model="newRow.datasource"
                                    placeholder="请选择数据来源"
                                >
                                    <el-option
                                        v-for="datasource in selectOptions.datasource"
                                        :key="datasource"
                                        :label="datasource"
                                        :value="datasource"
                                    >
                                    </el-option>
                                </el-select>
                            </el-form-item>
                            <el-form-item
                                label="违规内容"
                                prop="illegalContent"
                            >
                                <el-select
                                    v-model="newRow.illegalContent"
                                    placeholder="请选择违规内容"
                                >
                                    <el-option
                                        v-for="illegalContent in selectOptions.illegalContent"
                                        :key="illegalContent"
                                        :label="illegalContent"
                                        :value="illegalContent"
                                    >
                                    </el-option>
                                </el-select>
                            </el-form-item>
                        </el-form>
                        <div slot="footer" class="dialog-footer">
                            <el-button @click="addRow" type="primary"
                                >确认添加</el-button
                            >
                            <el-button @click="clearAddForm">取消</el-button>
                        </div>
                    </el-dialog>
                </div>
            </div>
        </div>
        <div class="main-main">
            <div class="institution-table">
                <template>
                    <el-table
                        ref="filterTable"
                        :data="doneToEventsList"
                        style="width: 100%"
                    >
                        <el-table-column
                            prop="eventId"
                            label="编号"
                            width="100"
                        >
                        </el-table-column>
                        <el-table-column
                            prop="emergencyDegree"
                            label="紧急程度"
                            width="130"
                            :filters="[
                                { text: '紧急', value: '紧急' },
                                { text: '正常', value: '正常' },
                            ]"
                            :filter-method="filterTag"
                            filter-placement="bottom-end"
                        >
                            <template slot-scope="scope">
                                <el-tag
                                    :type="
                                        scope.row.emergencyDegree === '紧急'
                                            ? 'danger'
                                            : 'success'
                                    "
                                    disable-transitions
                                >
                                    {{ scope.row.emergencyDegree }}</el-tag
                                >
                            </template>
                        </el-table-column>
                        <div
                            v-if="this.$store.state.userInfo.username == 'wxb'"
                        >
                            <el-table-column
                                prop="eventStatus"
                                label="事件状态"
                                width="140"
                            >
                            </el-table-column>
                        </div>
                        <div v-else>
                            <el-table-column
                                prop="eventStatusInstitution"
                                label="事件状态"
                                width="140"
                            >
                            </el-table-column>
                        </div>
                        <el-table-column
                            prop="orgName"
                            label="通报单位"
                            width="200"
                        >
                        </el-table-column>
                        <el-table-column
                            prop="orgType"
                            label="单位类型"
                            width="170"
                        >
                        </el-table-column>
                        <el-table-column
                            prop="origin_department"
                            label="发起单位"
                            width="140"
                        >
                            网信办
                        </el-table-column>
                        <el-table-column
                            prop="datasource"
                            label="数据来源"
                            width="170"
                        >
                        </el-table-column>
                        <el-table-column prop="illegalContent" label="违规内容">
                        </el-table-column>
                        <el-table-column
                            prop="date"
                            label="日期"
                            sortable
                            width="150"
                            column-key="date"
                            :filters="[
                                { text: '2016-05-01', value: '2016-05-01' },
                                { text: '2016-05-02', value: '2016-05-02' },
                                { text: '2016-05-03', value: '2016-05-03' },
                                { text: '2016-05-04', value: '2016-05-04' },
                            ]"
                            :filter-method="filterHandler"
                        >
                            {{ this.getNowDate() }}
                        </el-table-column>
                        <el-table-column
                            prop="processStatus"
                            label="处理状态"
                            width="120"
                        >
                        </el-table-column>
                        <!-- <el-table-column
                            prop="name"
                            label="操作"
                            width="100"
                            fixd="right"
                        >
                            <template slot-scope="scope">
                                <el-button
                                    v-if="
                                        scope.row.processStatus == '待通告' ||
                                        scope.row.processStatus == '待处理'
                                    "
                                    @click="toWaitToDo(scope.row)"
                                    type="primary"
                                    >处理</el-button
                                >
                                <el-button
                                    v-if="scope.row.processStatus == '审核中'"
                                    @click="check(scope.row)"
                                    type="warning"
                                    >审核</el-button
                                >
                            </template>
                        </el-table-column> -->
                    </el-table>
                </template>
            </div>
            <!-- 添加弹窗 -->
            <el-dialog
                title="审核事件信息"
                :visible.sync="checkDialogVisible"
                width="40%"
                center
                @close="clearAddForm"
            >
                <el-form
                    :model="auditFormData"
                    ref="auditForm"
                    :rules="textareaRules"
                >
                    <el-form-item label="机构用户提交信息" prop="textarea">
                        <el-input
                            type="textarea"
                            :rows="2"
                            placeholder="请输入内容"
                            v-model="auditFormData.textarea"
                        ></el-input>
                    </el-form-item>
                    <el-form-item label="修改建议" prop="suggestion">
                        <el-input
                            type="textarea"
                            placeholder="请输入内容"
                            v-model="auditFormData.suggestion"
                            maxlength="30"
                            show-word-limit
                        ></el-input>
                    </el-form-item>
                </el-form>
                <div slot="footer" class="dialog-footer">
                    <el-button type="primary" @click="viewAttachment"
                        >查看附件</el-button
                    >
                    <el-button type="primary" @click="audit"
                        >审核通过</el-button
                    >
                    <el-button type="primary" @click="rejectAudit"
                        >审核不通过</el-button
                    >
                    <el-button @click="clearAuditForm">取消</el-button>
                </div>
            </el-dialog>
        </div>
    </div>
</template>

<script>
    export default {
        name: 'DoneTo',

        data() {
            return {
                currentPage1: 1,
                currentPage2: 2,
                currentPage3: 3,
                currentPage4: 4,
                labelPosition: 'right',
                formLabelAlign: {
                    name: '',
                    region: '',
                    type: '',
                },
                dialogVisible: false,
                value: '',
                auditFormData: {
                    textarea: '',
                    suggestion: '',
                },
                tableData: [],
                // 单选框
                options: [
                    {
                        value: '选项1',
                        label: '滁州学院',
                    },
                    {
                        value: '选项2',
                        label: '滁州市科学技术局',
                    },
                ],
                file: null,
                myHeaders: {
                    'Access-Control-Allow-Origin': '*',
                },
                // 待办事件
                doneToEventsList: [],
                // 机构名称查询
                orgName_input: '',
                addDialogVisible: false,
                checkDialogVisible: false,
                newRow: {
                    orgId: '',
                    originDepartment: '',
                    emergencyDegree: '',
                    datasource: '',
                    illegalContent: '',
                },
                addFormRules: {
                    orgId: [
                        {
                            required: true,
                            message: '通报单位不能为空',
                            trigger: 'blur',
                        },
                    ],
                    emergencyDegree: [
                        {
                            required: true,
                            message: '事件紧急程度不能为空',
                            trigger: 'blur',
                        },
                    ],
                    datasource: [
                        {
                            required: true,
                            message: '数据来源不能为空',
                            trigger: 'blur',
                        },
                    ],
                    originDepartment: [
                        {
                            required: true,
                            message: '发起单位不能为空',
                            trigger: 'blur',
                        },
                    ],
                    illegalContent: [
                        {
                            required: true,
                            message: '违规内容不能为空',
                            trigger: 'blur',
                        },
                    ],
                },
                selectOptions: {
                    emergencyDegree: ['正常', '紧急'],
                    orgInfo: [],
                    datasource: ['互联网纠错系统'],
                    illegalContent: ['非法外链', '违规外链'],
                    origin_department: ['网信办'],
                },
                textarea: '',
                suggestion: '',
                textareaRules: {
                    textarea: [
                        {
                            required: true,
                            message: '内容不能为空',
                            trigger: 'blur',
                        },
                    ],
                    suggestion: [
                        {
                            required: true,
                            max: 30,
                            message: '请输入修改建议~',
                            trigger: 'blur',
                        },
                    ],
                },
                row: {},
            };
        },

        mounted() {
            // 获取办结事件数据
            this.getDoneToEventsInfo();
        },
        methods: {
            cjjtest() {},
            // 获取待办事件数据
            getDoneToEventsInfo() {
                console.log('getDoneToEventsInfo():');
                const userId = this.$store.state.userInfo.userId;
                this.$axios
                    .get(this.myHttp + '/events/getDoneToEventsInfo', {
                        params: {
                            userId: userId,
                        },
                    })
                    .then(response => {
                        // 处理响应数据
                        console.log('获取事件信息成功');
                        this.doneToEventsList = response.data.data;
                        console.log('doneToEventsList:');
                        console.log(this.doneToEventsList);
                    })
                    .catch(error => {
                        // 处理请求错误
                        console.error(error);
                    });
            },
            getWaitToEventsInfoByOrgName() {
                console.log(this.orgName_input);
                const userId = this.$store.state.userInfo.userId;
                const orgName = this.orgName_input;
                this.$axios
                    .get(this.myHttp + '/events/getWaitToEventsInfoByOrgName', {
                        params: {
                            userId: userId,
                            orgName: orgName,
                        },
                    })
                    .then(response => {
                        // 处理响应数据
                        console.log('根据机构名称获取事件信息成功');
                        this.toDoEventsList = response.data.data;
                        // console.log(this.toDoEventsList);
                    })
                    .catch(error => {
                        // 处理请求错误
                        console.error(error);
                    });
            },
            getAdminEvents() {
                console.log('test');

                this.$axios
                    .post(this.myHttp + '/user/testDeletePermission', {
                        roleName: 'test',
                    })
                    .then(response => {
                        // 处理响应数据
                        // console.log("上传成功");
                        const result = response.data;
                        this.$store.state.userInfo = result.data;
                        console.log(result.data);
                    })
                    .catch(error => {
                        // 处理请求错误
                        console.error(error);
                    });
            },
            getOrgInfo() {
                this.$axios
                    .get(this.myHttp + '/org/getOrgInfo')
                    .then(response => {
                        // 处理响应数据
                        const orgInfo = response.data.data;
                        this.selectOptions.orgInfo = orgInfo;
                        // this.$store.state.userInfo = result.data
                        console.log('getOrgInfo():获取机构信息成功');
                        console.log(orgInfo);
                    })
                    .catch(error => {
                        // 处理请求错误
                        console.error(error);
                    });
            },
            addEventsInfo() {
                this.$axios
                    .post(this.myHttp + '/events/addEventsInfo', this.newRow)
                    .then(response => {
                        // 处理响应数据
                        console.log('addEventsInfo:添加事件信息成功');
                        const result = response.data.data;
                        if (result) {
                            this.$message({
                                message: '添加成功',
                                type: 'success',
                            });
                            this.getWaitToEventsInfo();
                        }
                    })
                    .catch(error => {
                        // 处理请求错误
                        console.error(error);
                    });
            },
            getTextareaByUserId(row) {
                const userId = row.processByUser;
                console.log('getTextareaByUserId:userId');
                console.log(userId);
                this.$axios
                    .get(this.myHttp + '/redis/getTextareaByUserId', {
                        params: {
                            userId: userId,
                        },
                    })
                    .then(response => {
                        // 处理响应数据
                        console.log('getTextareaByUserId:获取用户文本内容成功');
                        console.log(response.data.data);
                        this.auditFormData.textarea = response.data.data;
                        this.showCheckDialog();
                    })
                    .catch(error => {
                        // 处理请求错误
                        console.error(error);
                    });
            },
            uploadExcel(content) {
                console.log('this.file:', this.file);

                // 获取原始File对象
                const file = this.file.raw;
                console.log('file:', file);

                let fileFormData = new FormData();
                fileFormData.append('file', file);

                this.$axios
                    .post(this.myHttp + '/api/uploadEvents', fileFormData)
                    .then(response => {
                        console.log('上传成功');
                    })
                    .catch(error => {
                        console.error('上传失败:', error);
                    });
            },
            getFile(file, fileList) {
                this.file = file;
            },
            handleSuccess(response) {
                // 处理上传成功的响应
                console.log(response);
            },
            beforeUpload(file) {
                // 在上传之前对文件进行验证或处理
                console.log(file);
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
                const timeOne = new Date();
                const year = timeOne.getFullYear();
                let month = timeOne.getMonth() + 1;
                let day = timeOne.getDate();
                month = month < 10 ? '0' + month : month;
                day = day < 10 ? '0' + day : day;
                const NOW_MONTHS_AGO = `${year}-${month}-${day}`;
                return NOW_MONTHS_AGO;
            },
            // 处理待办事件
            toWaitToDo(row) {
                this.$store.state.waitToRow = row;
                console.log(this.$store.state.waitToRow); // 获取该行数据
                const name = 'toWaitToDo';
                this.$router.push({
                    name: name,
                });
            },
            check(row) {
                this.row = row;
                console.log('审核所在的row：');
                console.log(row);
                this.getTextareaByUserId(row);
            },
            // 添加表格行数据
            showAddDialog() {
                this.getOrgInfo();
                this.addDialogVisible = true;
            },
            showCheckDialog() {
                this.checkDialogVisible = true;
            },
            addRow() {
                // 验证表单
                this.$refs.addForm.validate(valid => {
                    if (valid) {
                        // 表单验证通过，将新行数据添加到表格数据中
                        this.tableData.push({
                            ...this.newRow,
                        });
                        console.log('newRow:');
                        console.log(this.newRow);
                        this.addEventsInfo();
                        // console.log(this.tableData);
                        // 关闭弹窗
                        this.addDialogVisible = false;
                        // 清空表单
                        this.clearAddForm();
                    } else {
                        // 表单验证失败，不执行添加操作
                        return false;
                    }
                });
            },
            clearAddForm() {
                this.newRow = {
                    orgName: '',
                    emergencyDegree: '',
                    name: '',
                    age: '',
                    email: '',
                };
                this.$refs.addForm.resetFields();
                this.addDialogVisible = false;
                // this.$refs.addForm.clearValidate();
            },
            viewAttachment() {
                // 查看附件的操作
                // 在这里添加查看附件的逻辑
            },
            audit() {
                this.$axios
                    .put(this.myHttp + '/events/auditEventsInfo', this.row)
                    .then(response => {
                        // 处理响应数据
                        console.log('audit():response.data');
                        console.log(response.data);
                        this.$message({
                            message: '审核通过',
                            type: 'success',
                        });
                        // this.toWaitTo();
                    })
                    .catch(error => {
                        // 处理错误
                    });
            },
            rejectAudit() {
                // 验证表单
                this.$refs.auditForm.validate(valid => {
                    if (valid) {
                        // 表单验证通过，将新行数据添加到表格数据中
                        // console.log(this.tableData);
                        this.$message({
                            message: '审核不通过',
                            type: 'warning',
                        });
                        console.log('rejectAudit');
                        // 关闭弹窗
                        this.checkDialogVisible = false;
                        // 清空表单
                        this.clearAuditForm();
                    } else {
                        // 表单验证失败，不执行添加操作
                        return false;
                    }
                });
            },
            clearAuditForm() {
                // 清空表单数据
                this.auditFormData.textarea = '';
                this.auditFormData.suggestion = '';
                this.$refs.auditForm.resetFields();
                this.checkDialogVisible = false;
                // this.$refs.auditForm.clearValidate();
            },
        },
        // beforeRouteEnter(to, from, next) {
        //     // 使用 beforeRouteEnter 钩子，在进入路由前执行逻辑
        //     next(vm => {
        //         // 调用组件内的方法来重新加载数据
        //         vm.getWaitToEventsInfo();
        //         // vm.textarea = vm.$store.state.institutionTextarea;
        //     });
        // },
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
        position: relative;
        display: flex;
    }

    .input-wrapper .input-box {
        padding-left: 20px;
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

    .main-header-add {
        position: absolute;
        right: 2.5%;
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