import { createApp } from 'vue'
import App from './App.vue'
import 'normalize.css'
import router from '@/router/index.js';
import md5 from 'js-md5';
import VueAMap, {initAMapApiLoader} from '@vuemap/vue-amap';
import '@vuemap/vue-amap/dist/style.css';
import 'vant/lib/index.css';

initAMapApiLoader({
    key: "41e566f0f2cb735c8d485a14e02d7ba8"
})

const app = createApp(App);

app.config.globalProperties.$md5 = md5;
app.use(router);
app.use(VueAMap);
app.mount('#app');