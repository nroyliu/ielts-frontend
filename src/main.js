import Vue from "vue";
import ElementUI from 'element-ui';
import 'element-ui/lib/theme-chalk/index.css';
import App from "./App.vue";
import router from "./router";
import store from "./store";
import {
  markdown
} from 'markdown'


import utils from '@/utils/common'

Vue.config.productionTip = false;

Vue.prototype.$markdown = markdown
Vue.prototype.$utils = utils

Vue.use(ElementUI);

new Vue({
  router,
  store,
  render: h => h(App)
}).$mount("#app");