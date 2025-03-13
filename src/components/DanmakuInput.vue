<template>
  <div class="danmaku-input-container">
    <input 
      v-model="danmakuText" 
      class="danmaku-input" 
      placeholder="输入弹幕内容..."
      @keyup.enter="sendDanmaku"
    />
    <button class="send-button" @click="sendDanmaku">发送</button>
  </div>
</template>

<script setup>
import { ref } from 'vue';

const props = defineProps({
  // 添加弹幕的回调函数
  onAddDanmaku: {
    type: Function,
    required: true
  }
});

// 弹幕文本
const danmakuText = ref('');

// 发送弹幕
const sendDanmaku = () => {
  if (danmakuText.value.trim()) {
    // 调用父组件传入的回调函数
    props.onAddDanmaku({
      text: danmakuText.value,
      // 这里可以根据实际需求设置位置，这里使用随机城市
      location: getRandomLocation()
    });
    
    // 清空输入框
    danmakuText.value = '';
  }
};

// 获取随机位置（模拟）
const getRandomLocation = () => {
  const cities = ['北京', '上海', '广州', '深圳', '杭州', '成都', '重庆', '西安', '南京', '武汉'];
  return cities[Math.floor(Math.random() * cities.length)];
};
</script>

<style scoped>
.danmaku-input-container {
  position: fixed;
  bottom: 20px;
  left: 50%;
  transform: translateX(-50%);
  display: flex;
  width: 90%;
  max-width: 800px;
  z-index: 100;
  background-color: rgba(0, 0, 0, 0.6);
  border-radius: 30px;
  padding: 10px;
  box-shadow: 0 4px 12px rgba(0, 0, 0, 0.2);
}

.danmaku-input {
  flex: 1;
  padding: 10px 15px;
  border: 2px solid rgba(255,255,255,0.3);
  border-radius: 30px;
  background: rgba(255, 255, 255, 0.1);
  backdrop-filter: blur(5px);
  box-shadow: 0 4px 20px rgba(0, 0, 0, 0.1), inset 0 0 15px rgba(255,255,255,0.1);
  color: white;
  font-size: 16px;
  outline: none;
  margin-right: 10px;
}

.danmaku-input::placeholder {
  color: rgba(255, 255, 255, 0.7);
}

.send-button {
  background: linear-gradient(135deg, #4CAF50 0%, #45a049 100%);
  color: white;
  border: none;
  border-radius: 20px;
  padding: 10px 20px;
  cursor: pointer;
  font-weight: bold;
  transition: all 0.3s cubic-bezier(0.4, 0, 0.2, 1);
}

.send-button:hover {
  background-color: #45a049;
}
</style>