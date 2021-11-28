import { createApp } from 'vue'
import VueApexCharts from "vue3-apexcharts";
import App from './App.vue'
import VueRouter from './router'

import Bootstrap from 'bootstrap';
import 'bootstrap/dist/css/bootstrap.min.css'
import store  from './store';
let app=createApp(App)
app.use(VueApexCharts);
app.use(VueRouter)

app.use(Bootstrap);
app.use(store)
app.mount('#app')