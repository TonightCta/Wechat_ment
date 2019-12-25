import Vue from 'vue'
import Router from 'vue-router'
import {Message} from 'element-ui'
Vue.use(Router)
const routerPush = Router.prototype.push
Router.prototype.push = function push(location) {
  return routerPush.call(this, location).catch(error=> error)
}
const router = new Router({
  routes: [
    {
      path: '/',
      name: 'index',
      component:resolve=>require(['@/page/login'],resolve),
      meta:{
        keep:true
      },
      // redirect:'index'
    },
    {
      name:'Admin',//临时管理员
      path:'/admin',
      component:resolve=>require(['@/page/admin_tem'],resolve),
      meta:{
        keep:false
      },
      children:[
        {
          path:'/admin/wel',
          name:'Wel',
          component:resolve=>require(['@/page/temAdmin/admin_welcome'],resolve)
        },
        {
          path:'/admin/internalEng',//工程师管理
          name:'InternalEng',
          component:resolve=>require(['@/page/internalAdmin/internalEng'],resolve)
        },
        {
          path:'/admin/certifiedCom',//企业管理,
          name:'certifiedCom',
          component:resolve=>require(['@/page/companyAdmin/certifiedCom'],resolve)
        },
        {
          path:'/admin/demandAdmin',//需求管理
          name:'DeMandAdmin',
          component:resolve=>require(['@/page/demandAdmin/demandCus'],resolve)
        },
        {
          path:'/admin/demandMent',//项目经理需求管理
          name:'AdminDemandMent',
          component:resolve=>require(['@/page/demandAdmin/demandMent'],resolve)
        }
      ],
      redirect:'/admin/wel'
    }
  ]
});

//404检测
router.beforeEach((to,from,next)=>{
  const notList=['index','Wel','AdminDemandMent','DeMandAdmin','InternalEng','certifiedCom'];
  if(notList.indexOf(to.name)<0){
    Message.warning('访问的页面不存在哦');
    window.localStorage.setItem('noUrl',true)
  }else{
    window.localStorage.removeItem('noUrl')
    next();
  }
});

//全局拦截
 router.beforeEach((to,from,next)=>{
  const adminList=['Wel','Order','InternalEng','NewEng','ExternalEng','CertifiedEng','QueryProject','GressProject','skillMent','internalCom','newCom',
                 'certifiedCom','CreatPro','CustTion','custTionManer','WorkContent','RiskRecord','riskRcordManer','ProjectFile','Channel','Role',
                 'OperMan','Place','Point','Field','DeMand','BusinessOA','StaffAdmin','DepAdmin','PlaceOA','OAList','QueryOA','RuleList','NewsAdmin',
                 'CaseAdmin','AdminProject','AdminCreat'
               ];
  if(adminList.indexOf(to.name)>-1){
    if(!window.sessionStorage.getItem('adminMes')){
      next('/');
    }
  };
  next();
})
export default router;
