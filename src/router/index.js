import Vue from 'vue'
import Router from 'vue-router'
import Layout from '@/components/Layout'
import SystemManage from "../components/SystemManage"
import addSystem from "../components/addSystem"
import branch from '../components/branch'
import addBranch from '../components/addbranch'
import mergeInfo from '../components/mergeInfo'
import changeInfo from '../components/changeInfo'
Vue.use(Router)


export default new Router({
  routes: [
    {
      path: '/',
      component: Layout,
      children : [
        {
          path:'systemManage',
          name:"systemManage",
          components:{table : SystemManage}
        },
        {
          path:'systemManage/addsystemManage',
          name:'addsystemManage',
          components:{table:addSystem}
        },
        {
          path:'branch',
          name:'branch',
          components:{table:branch}
        },
        { path:'systemManage/branch/addBranch',
          name:'addBranch',
          components:{table:addBranch}
        },
        { path:'systemManage/branch/mergeInfo',
          name:'mergeInfo',
          components:{table:mergeInfo}
        },
        { path:'systemManage/branch/changeInfo',
          name:'changeInfo',
          components:{table:changeInfo}
        }
        ]
    }
  ]
})


/*import Vue from 'vue'
import Router from 'vue-router'
import ProjectIndex from '@/components/record/IndexProject'
import Home from '@/components/Home'
import System from '@/components/system/System'
import SystemSettings from '@/components/system/SystemSettings'
import addChangeLog from '@/components/record/addChangeLog'
import mergeinfo from '../components/record/mergeInfo'
import  addmergeInfo from '../components/record/addMergeInfo'
Vue.use(Router)

export default new Router({
  routes: [
    {
      path: '/home',
      name: 'Home',
      component: Home,
      redirect: '/system',
      children: [
        {
          path: '/system',
          name: 'System',
          component: System,
          propes:true
        },
        {
          path: '/branch/:branchId',
          name: 'ProjectIndex',
          component: ProjectIndex,
          props:true
        },
        {
          path: '/settings/:systemName/:parentPlatformId',
          name: 'SystemSettings',
          component: SystemSettings,
          props:true
        },
        {
          path:'/addChangeLog/:bId',
          name:'addChangeLog',
          component:addChangeLog,
          props:true
        },
        {
          path:'/mergeInfo/:branchId/:platformId',
          name:'mergeInfo',
          component:mergeinfo,
          props:true
        },
        {
          path:'/addMergeInfo/:bId/:platformId',
          name:'addMergeInfo',
          component:addmergeInfo,
          props:true
        }
      ]
    }
  ]
})*/

