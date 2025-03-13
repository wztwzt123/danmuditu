<template>
  <div class="danmaku-container">
    <div 
      v-for="(item, index) in visibleDanmaku" 
      :key="index" 
      class="danmaku-item"
      :style="{
        top: item.top + 'px',
        color: item.color,
        animationDuration: item.duration + 's',
        animationDelay: item.delay + 's'
      }"
      @animationend="removeDanmaku(index)"
    >
      {{ item.text }}
    </div>
  </div>
</template>

<script setup>
import { ref, onMounted, onUnmounted } from 'vue';

// 定义props
const props = defineProps({
  // 弹幕数据源
  danmakuList: {
    type: Array,
    default: () => []
  },
  // 弹幕池最大容量
  maxDanmaku: {
    type: Number,
    default: 50
  }
});

// 当前可见的弹幕
const visibleDanmaku = ref([]);

// 弹幕颜色映射表（根据来源设置不同颜色）
const colorMap = {
  '北京': '#FF6B6B',
  '上海': '#4ECDC4',
  '广州': '#FFD166',
  '深圳': '#6A0572',
  '杭州': '#1A936F',
  // 可以根据需要添加更多城市颜色
  'default': '#FFFFFF'
};

// 获取随机高度
const getRandomTop = () => {
  // 容器高度为100%，留出一些边距
  const containerHeight = document.querySelector('.danmaku-container')?.clientHeight || 400;
  return Math.floor(Math.random() * (containerHeight - 40));
};

// 获取随机速度（持续时间）
const getRandomDuration = () => {
  return 8 + Math.random() * 10; // 8-18秒的随机时间
};

// 添加新弹幕到可视区域
const addDanmaku = (danmaku) => {
  // 如果弹幕池已满，移除最早的弹幕
  if (visibleDanmaku.value.length >= props.maxDanmaku) {
    visibleDanmaku.value.shift();
  }
  
  // 根据地区设置颜色
  const color = colorMap[danmaku.location] || colorMap.default;
  
  // 添加新弹幕
  visibleDanmaku.value.push({
    text: `${danmaku.text} [${danmaku.location}]`,
    top: getRandomTop(),
    color: color,
    duration: getRandomDuration(),
    delay: 0 // 立即开始动画
  });
};

// 移除已完成动画的弹幕
const removeDanmaku = (index) => {
  visibleDanmaku.value.splice(index, 1);
};

// 模拟接收新弹幕
let danmakuInterval;
onMounted(() => {
  // 初始化一些弹幕
  if (props.danmakuList.length > 0) {
    props.danmakuList.forEach((danmaku, index) => {
      setTimeout(() => {
        addDanmaku(danmaku);
      }, index * 500); // 每隔0.5秒添加一条初始弹幕
    });
  }
  
  // 监听新弹幕的添加
  danmakuInterval = setInterval(() => {
    // 这里可以通过事件总线或其他方式接收新弹幕
    // 此处仅作为示例，实际项目中应该通过props或事件接收
  }, 1000);
});

onUnmounted(() => {
  // 清除定时器
  clearInterval(danmakuInterval);
});

// 暴露添加弹幕的方法，供父组件调用
defineExpose({
  addDanmaku
});
</script>

<style scoped>
.danmaku-container {
  position: fixed;
  top: 50%;
  left: 50%;
  width: 100vw;
  height: 100vh;
  transform: translate(-50%, -50%);
  pointer-events: none;
  overflow: hidden;
  pointer-events: none;
  will-change: transform; /* 启用硬件加速 */
  z-index: 10;
}

.danmaku-item {
  position: absolute;
  white-space: nowrap;
  font-size: 20px;
  font-weight: bold;
  text-shadow: 2px 2px 4px rgba(0, 0, 0, 0.9);
    background: linear-gradient(45deg, #ff6b6b, #ffd93d);
    -webkit-background-clip: text;
    -webkit-text-fill-color: transparent;
  animation: danmaku-move linear forwards;
  will-change: transform; /* 优化动画性能 */
  opacity: 0.98; /* 减少字体渲染压力 */
  left: 100%; /* 初始位置在屏幕右侧外 */
  white-space: nowrap;
    border-radius: 30px;
    box-shadow: 0 4px 15px rgba(0, 0, 0, 0.2);
  transform: translateX(100%);
}

@keyframes danmaku-move {
  0% {
    transform: translateX(0);
  }
  100% {
    transform: translateX(calc(-100% - 100vw)); /* 完整穿越屏幕 */
  }
}
</style>