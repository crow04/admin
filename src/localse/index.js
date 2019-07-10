import Vue from 'vue'
import VueI18n from 'vue-i18n'
import zh from './language/zh-chs'
import en from './language/en'
Vue.use(VueI18n)
const i18n = new VueI18n({
  locale:"zhCHS",//当前语言环境
  messages:{//语言文件对应语言环境的map集合，value值代表着语言文件的相对地址
    zhCHS:zh,
    en:en
  }
})
export default i18n;