// 该文件用于创建Vuex中核心的store

// 引入Vuex
import Vue from 'vue'
import Vuex from 'vuex'
Vue.use(Vuex)
// 用于响应组件中的动作
const actions = {
    // jiaOdd(context, value) {
    //     context.commit('JIAODD', value)
    // },
    // jiaWait(context, value) {
    //     context.commit('JIAWAIT', value)
    // }
}

// 用于操作数据（state）
const mutations = {
    // JIA(state, value) {
    //     state.sum += value
    // },
    // JIAN(state, value) {
    //     state.sum -= value
    // },
    // JIAODD(state, value) {
    //     if (state.sum % 2) {
    //         state.sum += value
    //     }
    // },
    // JIAWAIT(state, value) {
    //     setTimeout(() => {
    //         state.sum += value
    //     }, 500)
    // }
}

// 用于存储数据
const state = {
    userInfo:{},
    roles:{}, // 用户角色信息
    role: 'admin', // 用户权限
    waitToRow: {}, // 待办事件选中行
    atToRow: {},
    adminTableData:
        [
            {
                unique_id: '1',
                date: '2016-05-02',
                process: '待办',
                origin_department: '滁州市网信办',
                notification_department: '滁州学院',
                irregularity: '违规外链',
                dataSource: '互联网纠错系统',
                tag: '紧急',
                isRecall: false,
                isSubmit: false,
                currentState: 1,
            }, {
                unique_id: '2',
                date: '2016-05-04',
                process: '待办',
                origin_department: '滁州市网信办',
                notification_department: '滁州市科学技术局',
                irregularity: '违规外链',
                dataSource: '互联网纠错系统',
                tag: '正常',
                isRecall: false,
                isSubmit: false,
                currentState: 1,
            }, {
                unique_id: '3',
                date: '2016-05-01',
                process: '待办',
                origin_department: '滁州市网信办',
                notification_department: 'xx',
                irregularity: '违规外链',
                dataSource: '互联网纠错系统',
                tag: '正常',
                isRecall: false,
                isSubmit: false,
                currentState: 1,
            }, {
                unique_id: '4',
                date: '2016-05-03',
                process: '待办',
                origin_department: '滁州市网信办',
                notification_department: 'xx',
                irregularity: '违规外链',
                dataSource: '互联网纠错系统',
                tag: '正常',
                isRecall: false,
                isSubmit: false,
                currentState: 1,
            }
        ],
    userTableData:
        [

        ],
    chzuTableData:
        [

        ]
}

// 创建并暴露store
export default new Vuex.Store({
    actions,
    mutations,
    state
})