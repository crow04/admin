// 引用axios
import axios from 'axios'
import {
  getToken
} from '../utils/cookies'
import store from '../store/index'
import {
  Message,
  MessageBox
} from 'element-ui'
/***
 *    !!!!!! 使用Mock 时候一定要保证mock 接口和 axios 请求路径一致 不能有一点差距  比如后面是:login/in  
 *     前面请求路径必须也是login/in 不需要加任何baseURL 会导致当初本地路由来解析,
 *      (自作孽不可活)  ---- 2019/06/03
 */
axios.defaults.headers["Content-Type"] = "application/json"
var service = axios.create({
  timeout: "5000", //timeout
  baseURL: "" //基础接口
})
service.interceptors.request.use((config) => {
  if (store.getters.token) {
    config.headers["X-Token"] = getToken()
  } 
  return config
}, (err) => {
  Message({
    showClose: "true",
    duration: 5 * 1000,
    type: 'error',
    message: "err.message || 'Error',"
  })
  return Promise.reject(new Error(res.message || 'Error'))

})
service.interceptors.response.use((res) => {
  
  if(res.status==200)
  {
    return res;
  }else{
    Message({
      showClose:"true",
      duration: 5 * 1000,
      type: 'error',
      message:"res.message || 'Error',"
    })
      return Promise.reject(new Error(res.message || 'Error'))
  }
}, (err) => function () {
  Message({
    showClose: "true",
    duration: 5000,
    type: "error",
    message: err
  })
  console.log(err)
  return Promise.reject(error)
})

// 封装axios的post请求


export default service
