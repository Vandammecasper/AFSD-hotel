
import { createApp } from 'vue'
import App from './App.vue'
import router from './bootstrap/router'
import './index.css'
import useFirebase from './composables/useFirebase'
import { i18n } from './bootstrap/i18n'
import VueDatePicker from '@vuepic/vue-datepicker';
import '@vuepic/vue-datepicker/dist/main.css'

const app = createApp(App)
const { restoreUser } = useFirebase()

app.use(i18n)
app.component('VueDatePicker', VueDatePicker);
;(async () => {
    await restoreUser()
  
    app.use(router)
    app.mount('#app')
  })()
