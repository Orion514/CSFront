import { createApp } from 'vue'
import ElementPlus from 'element-plus'
import { baidu } from './utils/system/statistics'
import 'element-plus/lib/theme-chalk/index.css'
import 'element-plus/lib/theme-chalk/display.css' // 引入基于断点的隐藏类
import 'normalize.css' // css初始化
import './assets/style/common.scss' // 公共css
import App from './App.vue'
import store from './store'
import router from './router'
import md5 from 'js-md5';

import vue3TreeOrg from 'vue3-tree-org';
import "vue3-tree-org/lib/vue3-tree-org.css";

// if (import.meta.env.MODE !== 'development') { // 非开发环境调用百度统计
//   baidu()
// }
const app = createApp(App)
app.use(ElementPlus, { size: store.state.app.elementSize })
app.use(store)
app.use(router)
app.use(vue3TreeOrg)
// app.config.performance = true
app.mount('#app')
