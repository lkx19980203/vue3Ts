import { createApp } from 'vue'
import 'normalize.css'
import './assets/css/index.less'
import router from './router'
import store from './store'
import App from './App.vue'
import registerIcons from './global/register-icons'
import useLoginStore from './store/login'
// import 'element-plus/theme-chalk/el-message.css'

const app = createApp(App)

app.use(registerIcons)
app.use(store)
app.use(router)

app.mount('#app')
