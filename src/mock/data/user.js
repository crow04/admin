import Mock from 'mockjs'

var info = Mock.mock(({
  'data|50-100': [{
      'account':"@email",
      'name': "@cname",
      'gender':"男",
      'birthDay':'@date("yyyy-MM-dd")',
      "password|100000-999999":0
    }
  ]
}))

export default {
    getUserList:(params)=>{
      let query=params.body
      let size=query.pagesize
      let index=query.currentPage
      return info
    } 
}
