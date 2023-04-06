import "mars3d-cesium/Build/Cesium/Widgets/widgets.css"
import "mars3d/dist/mars3d.css"
import { createApp } from 'vue'
import './style.css'
import App from './App.vue'
import HelloWorld from '@/components/HelloWorld.vue'

const app = createApp(App)
app.component('HelloWorld', HelloWorld).mount("#app")

console.log('app', app)

