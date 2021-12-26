import Vue from 'vue'
import Router from 'vue-router'
import Layout from '@/components/Layout'
import SystemManage from "../components/SystemManage"
import branch from '../components/branch'
import mergeInfo from '../components/mergeInfo'
import changeInfo from '../components/changeInfo'
Vue.use(Router)


export default new Router({
  mode:'history',
  routes: [
    {
      path: '/',
      component: Layout,
      props:true,
      children : [
        {
          path:'systemManage',
          name:"systemManage",
          components:{table : SystemManage}
        },
        {
          path:'branch',
          name:'branch',
          components:{table:branch},
          props:true
        },
        { path:'mergeInfo/:bId/:pId',
          name:'mergeInfo',
          components:{table:mergeInfo},
          props:true
        },
        { path:'changeInfo/:bId',
          name:'changeInfo',
          components:{table:changeInfo},
          props:true
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

