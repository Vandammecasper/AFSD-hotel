
import { createApp } from 'vue'
import App from './App.vue'
import router from './bootstrap/router'
import './index.css'
import useFirebase from './composables/useFirebase'

import VueDatePicker from '@vuepic/vue-datepicker';
import '@vuepic/vue-datepicker/dist/main.css'

const app = createApp(App)
const { restoreUser } = useFirebase()

app.component('VueDatePicker', VueDatePicker);

;(async () => {
    await restoreUser()
  
    app.use(router)
    app.mount('#app')
  })()
