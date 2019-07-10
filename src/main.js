// The Vue build version to load with the `import` command
// (runtime-only or standalone) has been set in webpack.base.conf with an alias.
import Vue from 'vue'
import Cookies from 'js-cookie'
import App from './App'
import router from './router'
import Element from 'element-ui'
import 'element-ui/lib/theme-chalk/index.css'
import './assets/font/iconfont.css'
import request from './api/request'
//import './style/index.scss'
import store from './store'
import i18n from './localse'
import './mock' // simulation data
import './permission' // permission control
// 将API方法绑定到全局
Vue.prototype.$api = request
Vue.config.productionTip = false
//// 引入echarts
import echarts from 'echarts/lib/echarts'
///折线图
import 'echarts/lib/chart/line'
/// 饼图
import 'echarts/lib/chart/pie'
///雷达图
import 'echarts/lib/chart/radar'
import 'echarts/lib/component/tooltip'
import 'echarts/lib/component/legend'
import 'echarts/lib/component/toolbox'
import 'echarts/lib/component/title'
import 'echarts/lib/component/visualMap'
import 'echarts/lib/component/legend/ScrollableLegendModel'
import 'echarts/lib/component/legend/scrollableLegendAction'
import 'echarts/lib/component/legend/ScrollableLegendView'
import 'echarts/lib/theme/light'
Vue.prototype.$echart = echarts
Vue.use(Element, {
  size: Cookies.get('size') || 'medium', // set element-ui default size
  i18n: (key, value) => i18n.t(key, value)
})
/* eslint-disable no-new */
new Vue({
  el: '#app',
  router,
  store,
  i18n,
  components: {
    App
  },
  template: '<App/>'
})
