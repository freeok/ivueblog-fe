import Vue from 'vue'
import App from './App.vue'

import router from './router'
import store from './store'

import '@/plugins/axios'
import '@/plugins/element.js'
import '@/plugins/mavon-editor'


// 导入http拦截器，不加不会应用到全局
import '@/assets/js/interceptor'
// 导入路由拦截器，不加不会应用到全局
import '@/assets/js/permission'

Vue.config.productionTip = false

new Vue({
    router,
    store,
    render: h => h(App)
}).$mount('#app')


