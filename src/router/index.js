//该文件专门用于创建整个应用的路由器
import VueRouter from "vue-router";
import Login from "../pages/Login.vue" // login登录页面
import Index from "../pages/Index.vue" // index主页面
import Content from "../pages/Content.vue" // Main-content主内容区
import Test from "../pages/Test.vue" // Main-content主内容区
import SystemAdministration from "../pages/SystemAdministration/SystemAdministration.vue" // 系统管理
import SaAside from "../pages/SystemAdministration/sa-aside.vue" // Main-content主内容区
import InstitutionManagement from "../pages/SystemAdministration/institution-management.vue" // 机构管理
import AddInstitution from "../pages/SystemAdministration/add-institution.vue" // 添加机构
import UpdateInstitution from "../pages/SystemAdministration/update-institution.vue" // 修改机构
import UserManagement from "../pages/SystemAdministration/user-management.vue"
import RoleManagement from "../pages/SystemAdministration/role-management.vue"
// 督办模块
import Supervision from "../pages/Supervision/Supervision.vue"
import SAside from "../pages/Supervision/s-aside.vue"
import SContent from "../pages/Supervision/s-content.vue"
const VueRouterPush = VueRouter.prototype.push
// 督办模块
import WaitTo from "../pages/Supervision/wait-to.vue"
import AtTo from "../pages/Supervision/at-to.vue"
import DoneTo from "../pages/Supervision/done-to.vue"
import BaseInfo from "../pages/Supervision/base-info.vue"
import WaitToDo from "../pages/Supervision/wait-to-do.vue"
import AtToDo from "../pages/Supervision/at-to-do.vue"
VueRouter.prototype.push = function push(to) {
   return VueRouterPush.call(this, to).catch(err => err)
}

//创建并默认暴露一个路由器
export default new VueRouter({
   routes: [
      // login登录
      {
         name: 'toLogin',
         path: '/toLogin',
         component: Login,
      },
      // index主页面
      {
         name: 'toIndex',
         path: '/toIndex',
         component: Index,
         children: [
            {
               name: 'toContent',
               path: '/toContent',
               component: Content,
            },
            // 系统管理模块
            {
               name: 'toSystemAdministration',
               path: '/toSystemAdministration',
               component: SystemAdministration,
               children: [
                  {
                     name: 'toInstitutionManagement',
                     path: '/toInstitutionManagement',
                     component: InstitutionManagement,
                     UserManagement
                  },
                  {
                     name: 'toUserManagement',
                     path: '/toUserManagement',
                     component: UserManagement,

                  },
                  {
                     name: 'toRoleManagement',
                     path: '/toRoleManagement',
                     component: RoleManagement,

                  },
                  {
                     name: 'toAddInstitution',
                     path: '/toAddInstitution',
                     component: AddInstitution,
                  },
                  {
                     name: 'toUpdateInstitution',
                     path: '/toUpdateInstitution',
                     component: UpdateInstitution,

                  }
               ]
            },
            // 督办模块
            {
               name: 'toSupervision',
               path: '/toSupervision',
               component: Supervision,
               children: [
                  {
                     name: 'toSContent',
                     path: '/toSContent',
                     component: SContent,
                     children: [
                        {
                           name: 'toWaitTo',
                           path: '/toWaitTo',
                           component: WaitTo, // 待办事件
                        },
                        {
                           name: 'toAtTo',
                           path: '/toAtTo',
                           component: AtTo, // 在办事件
                        },
                        {
                           name: 'toDoneTo',
                           path: '/toDoneTo',
                           component: DoneTo, // 办结事件
                        },
                        {
                           name: 'toBaseInfo',
                           path: '/toBaseInfo',
                           component: BaseInfo, // 办结事件
                        }
                     ]
                  },
                  {
                     name: 'toWaitToDo',
                     path: '/toWaitToDo',
                     component: WaitToDo, // 处理待办事件
                  },
                  {
                     name: 'toAtToDo',
                     path: '/toAtToDo',
                     component: AtToDo, // 处理待办事件
                  }
               ]
            }
         ]
      }
   ]
});

