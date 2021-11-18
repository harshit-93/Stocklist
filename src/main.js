import { createApp } from 'vue'
import VueApexCharts from "vue3-apexcharts";
import App from './App.vue'
import VueRouter from './Router'

let app = createApp(App)

app.use(VueApexCharts);
app.use(VueRouter)
app.mount('#app')
