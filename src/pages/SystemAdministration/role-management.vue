<template>
    <div class="roleManagement-container">
        <!-- 页头 -->
        <div class="header">
            <div class="page-head-wrapper">
                <template>
                    <div class="text">
                        <el-breadcrumb separator-class="el-icon-arrow-right">
                            <el-breadcrumb-item :to="{ path: '/' }">首页</el-breadcrumb-item>
                            <el-breadcrumb-item>系统管理</el-breadcrumb-item>
                            <el-breadcrumb-item>角色管理</el-breadcrumb-item>
                        </el-breadcrumb>
                    </div>
                </template>
            </div>
        </div>
        <div class="main">
            <!-- <div class="main-aside">
                <el-tree default-expand-all :data="data" :props="defaultProps" @node-click="handleNodeClick"></el-tree>
            </div> -->
            <div class="main-content">
                <div class="main-header">
                    <!-- <div class="input-wrapper">
                        <div class="input-box">
                            <el-form :label-position="labelPosition" label-width="80px" :model="formLabelAlign">
                                <el-form-item label="登录账号">
                                    <el-input v-model="formLabelAlign.name"></el-input>
                                </el-form-item>
                                <el-form-item label="手机号码">
                                    <el-input v-model="formLabelAlign.region"></el-input>
                                </el-form-item>
                            </el-form>
                        </div>
                        <div class="iput-box">
                            <el-form :label-position="labelPosition" label-width="80px" :model="formLabelAlign">
                                <el-form-item label="姓名">
                                    <el-input v-model="formLabelAlign.name"></el-input>
                                </el-form-item>
                                <el-form-item label="">
                                    <el-input v-model="formLabelAlign.region"></el-input>
                                </el-form-item>
                            </el-form>
                        </div>
                    </div>
                    <div class="main-header-seacher">
                        <el-button type="primary">查询  </el-button>
                        <el-button>重置</el-button>
                    </div> -->
                </div>
                <div class="main-main">
                    <div class="btn-box">
                        <div class="addInstitution">
                            <el-button @click="toAddInstitution()" type="primary">
                                <i class="el-icon-upload el-icon--right"></i>
                                增加角色
                            </el-button>
                        </div>
                        <div class="update">
                            <el-button @click="toUpdateInstitution()" type="primary" icon="el-icon-edit">
                                修改
                            </el-button>
                        </div>
                        <div class="delete">
                            <el-button type="primary" icon="el-icon-delete">
                                删除
                            </el-button>
                        </div>
                    </div>
                    <div class="institution-table">
                        <template>
                            <el-table ref="multipleTable" :data="tableData" tooltip-effect="dark" style="width: 100%"
                                @selection-change="handleSelectionChange">
                                <el-table-column type="selection" width="55">
                                </el-table-column>
                                <!-- <el-table-column label="日期" width="120">
                                    <template slot-scope="scope">{{ scope.row.date }}</template>
                                </el-table-column> -->
                                <el-table-column prop="name" label="角色" width="120">
                                </el-table-column>
                                <el-table-column prop="address" label="超级管理员权限设置" show-overflow-tooltip>
                                    <el-button type="text" @click="dialogVisible = true">点击设置权限</el-button>
                                    <el-dialog title="提示" :visible.sync="dialogVisible" width="30%"
                                        :before-close="handleClose">
                                        <!-- <span>这是一段信息</span> -->
                                        <el-table ref="multipleTable" :data="limitTableData" tooltip-effect="dark"
                                            style="width: 100%" @selection-change="handleSelectionChange">
                                            <el-table-column type="selection" width="55">
                                            </el-table-column>
                                            <el-table-column prop="limit" label="权限" width="120">
                                            </el-table-column>
                                        </el-table>
                                        <span slot="footer" class="dialog-footer">
                                            <el-button @click="dialogVisible = false">取 消</el-button>
                                            <el-button type="primary" @click="dialogVisible = false">确 定</el-button>
                                        </span>
                                    </el-dialog>
                                </el-table-column>
                            </el-table>
                            <!-- <el-table :data="tableData" border style="width: 1101px">
                                <el-table-column prop="iCode" label="角色" width="250">
                                </el-table-column>
                                <el-table-column prop="iName" label="设置权限" width="250">
                                </el-table-column>
                                <el-table-column prop="upInstitution" label="上级部门" width="250">
                                </el-table-column>
                                <el-table-column prop="belong" label="所属行政划分" width="250">
                                </el-table-column>
                                <el-table-column label="操作" width="100">
                                    <template slot-scope="scope">
                                        <el-button @click="handleClick(scope.row)" type="text" size="small">
                                            修改
                                        </el-button>
                                        <el-button type="text" size="small">
                                            删除
                                        </el-button>
                                    </template>
                                </el-table-column>
                            </el-table> -->
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
        </div>
    </div>
</template>

<script>
    export default {
        name: 'RoleManagement',

        data() {
            return {
                iCode: "",
                iName: "",
                data: [{
                    label: '全部机构',
                    children: [{
                        label: '网信办'
                    }, {
                        label: '数据资源局'
                    }, {
                        label: '滁州学院'
                    }, {
                        label: '......'
                    }, {
                        label: '......'
                    }]
                }],
                defaultProps: {
                    children: 'children',
                    label: 'label'
                },
                tableData: [{
                    date: '2016-05-03',
                    name: '超级管理员',
                    address: '点击设置权限'
                }, {
                    date: '2016-05-02',
                    name: '系统管理员',
                    address: '点击设置权限'
                }, {
                    date: '2016-05-04',
                    name: '普通用户',
                    address: 'xxxxxxxxxx'
                }, {
                    date: '2016-05-01',
                    name: '......',
                    address: 'xxxxxxxxxx'
                }, {
                    date: '2016-05-01',
                    name: '......',
                    address: 'xxxxxxxxxx'
                }, {
                    date: '2016-05-01',
                    name: '......',
                    address: 'xxxxxxxxxx'
                }, {
                    date: '2016-05-01',
                    name: '......',
                    address: 'xxxxxxxxxx'
                }],
                multipleSelection: [],
                limitTableData: [{
                        limit: "所有权限"
                    },
                    {
                        limit: "网站违规内容督办"
                    },
                    {
                        limit: "区块链存证"
                    },
                    {
                        limit: "内容管理"
                    }
                ],
                // tableData: [{
                //         iCode: '超级管理员',
                //         iName: '点击设置权限',
                //         upInstitution: 'XXXXXXXXXX',
                //         belong: 'XXXXXXXXXX',
                //     },
                //     {
                //         iCode: '系统管理员',
                //         iName: '点击设置权限',
                //         upInstitution: 'XXXXXXXXXX',
                //         belong: 'XXXXXXXXXX',
                //     },
                //     {
                //         iCode: '普通用户',
                //         iName: '点击设置权限',
                //         upInstitution: 'XXXXXXXXXX',
                //         belong: 'XXXXXXXXXX',
                //     },
                //     {
                //         iCode: '......',
                //         iName: 'XXXXXXXXXX',
                //         upInstitution: 'XXXXXXXXXX',
                //         belong: 'XXXXXXXXXX',
                //     },
                //     {
                //         iCode: 'XXXXXXXXXX',
                //         iName: 'XXXXXXXXXX',
                //         upInstitution: 'XXXXXXXXXX',
                //         belong: 'XXXXXXXXXX',
                //     },
                //     {
                //         iCode: 'XXXXXXXXXX',
                //         iName: 'XXXXXXXXXX',
                //         upInstitution: 'XXXXXXXXXX',
                //         belong: 'XXXXXXXXXX',
                //     }
                // ],
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
                dialogVisible: false
            };
        },

        mounted() {

        },

        methods: {
            handleNodeClick(data) {
                console.log(data);
            },
            // 获取表格单行数据
            handleClick(row) {
                console.log(row);
                this.toUpdateInstitution()
            },
            handleSizeChange(val) {
                console.log(`每页 ${val} 条`);
            },
            handleCurrentChange(val) {
                console.log(`当前页: ${val}`);
            },
            toAddInstitution() {
                const name = "toAddInstitution"
                this.$router.push({
                    name: name
                })
            },
            toUpdateInstitution() {
                const name = "toUpdateInstitution"
                this.$router.push({
                    name: name
                })
            },
            handleEdit() {
                // const name = "toAddInstitution"
                // this.$router.push({
                //     name: name
                // })
            },
            toggleSelection(rows) {
                if (rows) {
                    rows.forEach(row => {
                        this.$refs.multipleTable.toggleRowSelection(row);
                    });
                } else {
                    this.$refs.multipleTable.clearSelection();
                }
            },
            handleSelectionChange(val) {
                this.multipleSelection = val;
            },
            handleClose(done) {
                this.$confirm('确认关闭？')
                    .then(_ => {
                        done();
                    })
                    .catch(_ => {});
            }
        },
    };
</script>

<style scoped>
    .roleManagement-container {
        position: relative;
        box-sizing: border-box;
        width: 85%;
        min-height: 93vh;
        background-color: #fff;
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
        display: flex;
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
        width: 80%;
        height: 100%;
        /* background-color: pink; */
    }

    .main-content .main-header {
        box-sizing: border-box;
        /* padding: 10px 0 0 280px;
        height: 180px; */
        width: 100%;
        /* background-color: pink; */
    }

    .main-header .input-wrapper {
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
        margin-left: 200px;
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