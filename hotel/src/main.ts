
import { createApp } from 'vue'
import App from './App.vue'
import router from './bootstrap/router'
import './index.css'
import useFirebase from './composables/useFirebase'

const app = createApp(App)
const { restoreUser } = useFirebase()

;(async () => {
    await restoreUser()
  
    app.use(router)
    app.mount('#app')
  })()
