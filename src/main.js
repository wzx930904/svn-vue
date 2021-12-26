// The Vue build version to load with the `import` command
// (runtime-only or standalone) has been set in webpack.base.conf with an alias.
import Vue from 'vue'
import App from './App'
import router from './router'
import ElementUI from 'element-ui'
import axios from 'axios'
import VueAxios from 'vue-axios'
import global from './assets/global'
import 'element-ui/lib/theme-chalk/index.css'


Vue.use(ElementUI);
Vue.use(VueAxios,axios);

Vue.config.productionTip = false
/* eslint-disable no-new */
Vue.prototype.global = global

new Vue({
  el: '#app',
  router,
  components: {App},
  template: '<App/>'
});

