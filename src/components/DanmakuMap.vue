<template>
  <div class="danmaku-map-container">
    <china-map ref="mapRef" />
    <danmaku ref="danmakuRef" :danmakuList="initialDanmaku" :maxDanmaku="50" />
    <danmaku-input :onAddDanmaku="handleAddDanmaku" />
  </div>
</template>

<script setup>
import { ref, onMounted } from 'vue';
import ChinaMap from './ChinaMap.vue';
import Danmaku from './Danmaku.vue';
import DanmakuInput from './DanmakuInput.vue';
import axios from 'axios';

// 地图和弹幕组件引用
const mapRef = ref(null);
const danmakuRef = ref(null);

// 初始弹幕数据
const initialDanmaku = [
  { text: '欢迎来到弹幕地图！', location: '北京' },
  { text: '这是一个展示实时弹幕的地图应用', location: '上海' },
  { text: '弹幕将根据IP地址显示在地图上', location: '广州' },
  { text: '不同城市的弹幕有不同的颜色', location: '深圳' },
  { text: '您可以缩放和拖动地图', location: '杭州' }
];

// 模拟IP地址到地理位置的转换
const getLocationFromIP = (ip) => {
  // 实际项目中，这里应该使用geoip-lite或其他IP库进行查询
  // 这里仅作为示例，返回一些固定的城市
  const cities = ['北京', '上海', '广州', '深圳', '杭州', '成都', '重庆', '西安', '南京', '武汉'];
  return cities[Math.floor(Math.random() * cities.length)];
};

// 处理用户添加的弹幕
const handleAddDanmaku = (danmaku) => {
  if (danmakuRef.value) {
    danmakuRef.value.addDanmaku(danmaku);
  }
};

// 模拟接收新弹幕
const simulateNewDanmaku = () => {
  // 模拟弹幕内容
  const messages = [
    '这个地图真酷！',
    '我来自这个城市~',
    '大家好啊！',
    '这个功能太棒了',
    '我正在测试弹幕',
    '弹幕地图好玩',
    '这里风景真美',
    '有人在吗？',
    '技术很不错',
    '前端开发真有趣'
  ];
  
  // 模拟IP地址
  const randomIP = `${Math.floor(Math.random() * 255)}.${Math.floor(Math.random() * 255)}.${Math.floor(Math.random() * 255)}.${Math.floor(Math.random() * 255)}`;
  
  // 获取地理位置
  const location = getLocationFromIP(randomIP);
  
  // 随机选择一条消息
  const text = messages[Math.floor(Math.random() * messages.length)];
  
  // 添加到弹幕组件
  if (danmakuRef.value) {
    danmakuRef.value.addDanmaku({ text, location });
  }
};

// 在实际项目中，这里应该连接到WebSocket或其他实时数据源
// 这里仅作为示例，使用定时器模拟新弹幕的到来
onMounted(() => {
  // 每2-5秒随机生成一条新弹幕
  setInterval(() => {
    simulateNewDanmaku();
  }, 2000 + Math.random() * 3000);
});
</script>

<style scoped>
.danmaku-map-container {
  position: relative;
  width: 100%;
  height: 100vh;
  overflow: hidden;
}
</style>