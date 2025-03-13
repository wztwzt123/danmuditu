import { createApp } from 'vue'
import './style.css'
import App from './App.vue'

// 导入ECharts核心模块
import * as echarts from 'echarts/core'

// 导入ECharts组件
import {
  TitleComponent,
  TooltipComponent,
  LegendComponent,
  GeoComponent,
  VisualMapComponent
} from 'echarts/components'

// 导入渲染器
import { CanvasRenderer } from 'echarts/renderers'

// 导入地图
import { MapChart } from 'echarts/charts'

// 注册全局ECharts
echarts.use([
  TitleComponent,
  TooltipComponent,
  LegendComponent,
  GeoComponent,
  VisualMapComponent,
  MapChart,
  CanvasRenderer
])

// 异步加载中国地图数据
fetch('/china.json')
  .then(response => response.json())
  .then(data => {
    echarts.registerMap('china', data);
    // 创建Vue应用并挂载
    const app = createApp(App);
    app.mount('#app');
  })
  .catch(error => {
    console.error('加载中国地图数据失败:', error);
    // 即使地图加载失败，也创建Vue应用
    const app = createApp(App);
    app.mount('#app');
  });

// 将echarts挂载到window对象上，方便全局访问
window.echarts = echarts

const app = createApp(App)

app.mount('#app')
