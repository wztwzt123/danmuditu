<template>
  <div class="map-container">
    <v-chart class="chart" :option="option" autoresize />
  </div>
</template>

<script setup>
import { ref, onMounted } from 'vue';
import { use } from 'echarts/core';
import { CanvasRenderer } from 'echarts/renderers';
import { GeoComponent, VisualMapComponent, TooltipComponent } from 'echarts/components';
import VChart from 'vue-echarts';
import * as echarts from 'echarts/core';
import axios from 'axios';

// 注册必要的组件
use([
  CanvasRenderer,
  GeoComponent,
  VisualMapComponent,
  TooltipComponent
]);

// 地图配置选项
const option = ref({
  backgroundColor: 'rgba(12, 20, 36, 0.9)',
        // 中国区域样式
        areaStyle: {
          color: {
            type: 'linear',
            x: 0,
            y: 0,
            x2: 1,
            y2: 1,
            colorStops: [
              { offset: 0, color: '#1a4377' },
              { offset: 1, color: '#00a8ff' }
            ]
          },
          shadowColor: 'rgba(0, 168, 255, 0.5)',
          shadowBlur: 20
        },
  tooltip: {
    trigger: 'item',
    formatter: '{b}'
  },
  visualMap: {
    min: 0,
    max: 100,
    text: ['高', '低'],
    realtime: false,
    calculable: true,
    inRange: {
      color: ['#1abc9c', '#f1c40f', '#e74c3c']
    },
    textStyle: {
      color: '#fff'
    }
  },
  geo: {
    map: 'china',
    roam: true, // 开启缩放和拖动
    label: {
      emphasis: {
        show: true
      }
    },
    itemStyle: {
      normal: {
        areaColor: 'rgba(127, 140, 141, 0.3)',
        borderColor: '#111'
      },
      emphasis: {
        areaColor: '#2a333d'
      }
    }
  },
  series: []
});

// 加载中国地图数据
onMounted(async () => {
  try {
    const response = await axios.get('https://geo.datav.aliyun.com/areas_v3/bound/100000_full.json');
    const chinaData = response.data;
    echarts.registerMap('china', chinaData);
    option.value.geo.map = 'china';
    option.value.series.push({
      type: 'map',
      map: 'china',
      roam: true,
      label: {
        show: true
      },
      emphasis: {
        label: {
          color: '#fff'
        }
      }
    });
  } catch (error) {
    console.error('加载地图数据失败:', error);
  }
});
</script>

<style scoped>
.map-container {
  position: absolute;
  top: 0;
  left: 0;
  width: 100%;
  height: 100%;
  z-index: 1;
}

.chart {
  width: 100%;
  height: 100%;
}
</style>