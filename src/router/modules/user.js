import index from '@/views/index/index'
import userInfo from '@/views/user/userInfo'
import userSetting from '@/views/user/userSetting'
const User={
    path:'/user',
    name: 'user',
    component:index,
    redirect:"/user/userInfo",
    meta:{
      title:'user',
      icon:"caidan07"
    },
    children:[
      {
        path:'/user/userInfo',
        name:'userInfo',
        component:userInfo, 
        meta:{
          title:'userInfo',
          role:["admin","guest"],
          icon:"093info"

        }
      },
      {
        path:'/user/userSetting', 
        name: 'userSetting',
        component:userSetting,
        meta:{
          title:'userSetting',
          role:["admin"],
          icon:"setting"
        }
      }
    ]
    
  }
  export default User;