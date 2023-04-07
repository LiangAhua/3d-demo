import "mars3d-cesium/Build/Cesium/Widgets/widgets.css"
import "mars3d/dist/mars3d.css"
import 'font-awesome/css/font-awesome.min.css';
import { createApp } from 'vue'
import './style.css'
import App from './App.vue'
import HelloWorld from '@/components/HelloWorld.vue'
import Antd from 'ant-design-vue';
import 'ant-design-vue/dist/antd.css';
import '@/components/ui/base.less'
import '@/components/ui/function.less'
import '@/components/ui/index.less'


const app = createApp(App)
app.use(Antd);
app.component('HelloWorld', HelloWorld).mount("#app")

console.log('app', app)

