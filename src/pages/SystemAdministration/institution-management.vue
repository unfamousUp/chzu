<template>
    <div class="institutionManagement-container">
        <!-- 页头 -->
        <div class="header">
            <div class="page-head-wrapper">
                <template>
                    <div class="text">
                        <el-breadcrumb separator-class="el-icon-arrow-right">
                            <el-breadcrumb-item :to="{ path: '/toContent' }">首页</el-breadcrumb-item>
                            <el-breadcrumb-item>系统管理</el-breadcrumb-item>
                            <el-breadcrumb-item>机构管理</el-breadcrumb-item>
                        </el-breadcrumb>
                    </div>
                </template>
            </div>
        </div>
        <div class="main">
            <div class="main-aside">
                <el-tree default-expand-all node-key="id" :data="data" :props="defaultProps"
                    @node-click="handleNodeClick">
                </el-tree>
            </div>
            <div class="main-content">
                <div class="main-header">
                    <div class="main-header-input">
                        <div class="text">机构代码</div>
                        <div>
                            <el-input v-model="iCode" placeholder="请输入机构代码"></el-input>
                        </div>
                    </div>
                    <div class="main-header-input">
                        <div class="text">机构名称</div>
                        <div>
                            <el-input v-model="iName" placeholder="请输入机构名称"></el-input>
                        </div>
                    </div>
                    <div class="main-header-seacher">
                        <el-button type="primary" icon="el-icon-search">搜索</el-button>
                    </div>
                </div>
                <div class="main-main">
                    <div class="btn-box">
                        <div class="addInstitution">
                            <el-button @click="toAddInstitution()" type="primary">
                                <!-- <i class="el-icon-upload el-icon--right"></i> -->
                                增加机构
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
                            <el-table :data="tableData" border style="width: 1101px">
                                <el-table-column prop="iCode" label="机构代码" width="250">
                                </el-table-column>
                                <el-table-column prop="iName" label="机构名称" width="250">
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
                                        <el-button type="text" @click="dialogVisible = true" size="small">
                                            删除
                                        </el-button>
                                        <!-- 弹出框 -->
                                        <el-dialog title="提示" :visible.sync="dialogVisible" width="30%"
                                            :before-close="handleClose">
                                            <span>您确定要删除此行吗？</span>
                                            <span slot="footer" class="dialog-footer">
                                                <el-button @click="dialogVisible = false">取 消</el-button>
                                                <el-button type="primary" @click="dialogVisible = false">确 定</el-button>
                                            </span>
                                        </el-dialog>
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
        </div>
    </div>
</template>

<script>
    export default {
        name: 'InstitutionManagement',

        data() {
            return {
                dialogVisible: false,
                dekeys: [1],
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
                        iCode: 'XXXXXXXXXX',
                        iName: 'XXXXXXXXXX',
                        upInstitution: 'XXXXXXXXXX',
                        belong: 'XXXXXXXXXX',
                    },
                    {
                        iCode: 'XXXXXXXXXX',
                        iName: 'XXXXXXXXXX',
                        upInstitution: 'XXXXXXXXXX',
                        belong: 'XXXXXXXXXX',
                    },
                    {
                        iCode: 'XXXXXXXXXX',
                        iName: 'XXXXXXXXXX',
                        upInstitution: 'XXXXXXXXXX',
                        belong: 'XXXXXXXXXX',
                    },
                    {
                        iCode: 'XXXXXXXXXX',
                        iName: 'XXXXXXXXXX',
                        upInstitution: 'XXXXXXXXXX',
                        belong: 'XXXXXXXXXX',
                    },
                    {
                        iCode: 'XXXXXXXXXX',
                        iName: 'XXXXXXXXXX',
                        upInstitution: 'XXXXXXXXXX',
                        belong: 'XXXXXXXXXX',
                    },
                    {
                        iCode: 'XXXXXXXXXX',
                        iName: 'XXXXXXXXXX',
                        upInstitution: 'XXXXXXXXXX',
                        belong: 'XXXXXXXXXX',
                    },
                    {
                        iCode: 'XXXXXXXXXX',
                        iName: 'XXXXXXXXXX',
                        upInstitution: 'XXXXXXXXXX',
                        belong: 'XXXXXXXXXX',
                    },
                    {
                        iCode: 'XXXXXXXXXX',
                        iName: 'XXXXXXXXXX',
                        upInstitution: 'XXXXXXXXXX',
                        belong: 'XXXXXXXXXX',
                    }
                ],
                currentPage1: 1,
                currentPage2: 2,
                currentPage3: 3,
                currentPage4: 4
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
    .institutionManagement-container {
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
        padding: 10px 0;
        display: flex;
        height: 50px;
        width: 100%;
        /* background-color: pink; */
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
        margin-left: 30px;
    }

    .main-main {
        width: 100%;
        height: 600px;
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

    .main-footer {
        box-sizing: border-box;
        width: 100%;
        height: 50px;
        padding-left: 50px;
        /* background-color: pink; */
    }

    .main-footer .page-box {}
</style>