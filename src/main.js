// The Vue build version to load with the `import` command
// (runtime-only or standalone) has been set in webpack.base.conf with an alias.
import Vue from 'vue'
import App from './App'
import router from './router'
import ElementUI from 'element-ui'
import axios from 'axios'
import VueAxios from 'vue-axios'
import 'element-ui/lib/theme-chalk/index.css'

Vue.use(ElementUI);
Vue.use(VueAxios,axios);

Vue.config.productionTip = false

axios.defaults.baseURl='http://localhost:8081/svnrecord'
/* eslint-disable no-new */
var axiosInstace = axios.create({
  baseURL:'http://localhost:8081/svnrecord'
})
new Vue({
  el: '#app',
  router,
  components: {App},
  template: '<App/>'
});

