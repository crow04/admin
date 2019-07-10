import Vue from 'vue'
import Vuex from 'vuex'
import user from './moudles/user'
import  getters from './getters'
import  permission from './moudles/permission'
import  sidebar from './moudles/sidebar'
import charts from  './moudles/charts'
Vue.use(Vuex)


export default new Vuex.Store({
  modules:{
    user,
    permission ,
    sidebar ,
    charts
  },
  getters
})
