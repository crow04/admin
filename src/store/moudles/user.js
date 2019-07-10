import { getToken, setToken, removeToken} from '@/utils/cookies'
import api from '../../api/request'
import { Message} from 'element-ui'
const user = {
  state: {
    user: '',
    // status: '',
    // code: '',
    token: getToken(),
    name: '',
    roles: [],
    avatar: ''
  },
  mutations: {
    // SET_CODE: (state, code) => {
    //   state.code = code
    // },
    SET_TOKEN: (state, token) => {
      state.token = token
    },
    // SET_STATUS: (state, status) => {
    //   state.status = status
    // },
    SET_NAME: (state, name) => {
      state.name = name
    },
    SET_AVATAR: (state, avatar) => {
      state.avatar = avatar
    },
    SET_ROLES: (state, roles) => {
      state.roles = roles
    }
  },
  actions: {
    loginIn({commit}, user) {
      return new Promise((resolve, reject) => {
        api({
          url: '/login/in',
          method: 'post',
          data: JSON.stringify(user)
        })
          .then((response) => {
            commit('SET_TOKEN', response.data.token)
            setToken(response.data.token)

            resolve(response.data)
          })
          .catch((error) => {
            Message({
              showClose: 'true',
              duration: 5000,
              type: 'error',
              message: err
            })
            return reject(error)
          })
      })
    },
    loginOut({commit}) {
      return new Promise((resolve, reject) => {
        removeToken()
        commit('SET_TOKEN', '')
        commit('SET_ROLES', [])
        resolve(getToken())
      })
    },
    getUserInfo({commit}) {
      return new Promise((resolve, reject) => {
        api({
          'url': '/login/info',
          'method': 'post',
          'data': {
            'token': getToken()
          }
        }).then(res => {
          if (res.data) {
            commit('SET_NAME', res.data.name)
            commit('SET_AVATAR', res.data.avatar)
          } else {
            reject('error:' + data)
          }
          if (res.data.roles && res.data.roles.length > 0) { // 验证返回的roles是否是一个非空数组
            commit('SET_ROLES', res.data.roles)
            resolve(res.data)
          } else {
            reject('getInfo: roles must be a non-null array!')
          }
        }).catch(err => {
          Message({
            showClose: 'true',
            duration: 5000,
            type: 'error',
            message: err
          })
        })
      })
    }
  }
}
export default user
