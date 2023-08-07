<template>
    <div class="addInstitution-container">
        <!-- addInstitution -->
        <!-- 页头 -->
        <div class="header">
            <div class="page-head-wrapper">
                <template>
                    <div class="text">
                        <el-breadcrumb separator-class="el-icon-arrow-right">
                            <!-- <el-breadcrumb-item :to="{ path: '/' }">首页</el-breadcrumb-item> -->
                            <!-- <el-breadcrumb-item>系统管理</el-breadcrumb-item> -->
                            <el-breadcrumb-item>添加机构</el-breadcrumb-item>
                        </el-breadcrumb>
                    </div>
                </template>
            </div>
        </div>
        <div class="main">
            <div class="table-wrapper">
                <el-form :label-position="labelPosition" label-width="180px" :model="formLabelAlign">
                    <el-form-item label="上级机构">
                        <el-col :span="15">
                            <el-input v-model="formLabelAlign.name" style="width: 100%;">

                            </el-input>
                        </el-col>
                    </el-form-item>
                    <el-form-item label="机构编码">
                        <el-col :span="15">
                            <el-input v-model="formLabelAlign.name" style="width: 100%;">

                            </el-input>
                        </el-col>
                    </el-form-item>
                    <el-form-item label="机构名称">
                        <el-col :span="15">
                            <el-input v-model="formLabelAlign.name" style="width: 100%;">

                            </el-input>
                        </el-col>
                    </el-form-item>
                    <el-form-item label="所属行政划分">
                        <el-col :span="15">
                            <el-input v-model="formLabelAlign.name" style="width: 100%;">

                            </el-input>
                        </el-col>
                    </el-form-item>
                    <el-form-item label="机构顺序">
                        <el-col :span="15">
                            <el-input v-model="formLabelAlign.name" style="width: 100%;">

                            </el-input>
                        </el-col>
                    </el-form-item>
                </el-form>
            </div>
        </div>
        <div class="footer">
            <div class="btn-box">
                <div class="btn">
                    <el-button type="primary">提交</el-button>
                </div>
                <div class="btn">
                    <el-button type="primary">取消</el-button>
                </div>
            </div>
        </div>
    </div>
</template>

<script>
    export default {
        name: 'AddInstitution',

        data() {
            return {
                labelPosition: 'right',
                formLabelAlign: {
                    name: '',
                    region: '',
                    type: ''
                }
            };
        },

        mounted() {

        },

        methods: {

        },
    };
</script>

<style scoped>
    .addInstitution-container {
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
        box-sizing: border-box;
        padding: 50px 0px 0 200px;
    }

    .footer {
        box-sizing: border-box;
        padding: 30px;
        width: 100%;
        height: 100px;
        /* background-color: pink; */
    }

    .footer .btn-box {
        display: flex;
        margin-left: 600px;
        /* width: 30%; */
        height: 40px;
        /* line-height: 20px; */
        /* background-color: aqua; */
        /* background-color: #fff; */
    }

    .btn{
        margin-right: 80px;
    }
</style>