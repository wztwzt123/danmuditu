<script setup>
import DanmakuMap from './components/DanmakuMap.vue'
</script>

<template>
  <div class="app-container">
    <h1 class="app-title">弹幕地图</h1>
    <DanmakuMap />
  </div>
</template>

<style scoped>
.app-container {
  width: 100%;
  height: 100vh;
  display: flex;
  flex-direction: column;
  overflow: hidden;
}

.app-title {
  position: absolute;
  top: 20px;
  left: 50%;
  transform: translateX(-50%);
  z-index: 1000;
  margin: 0;
  padding: 12px 24px;
  color: rgba(255,255,255,0.9);
  background: rgba(26, 42, 64, 0.8);
  border-radius: 30px;
  backdrop-filter: blur(5px);
  border: 1px solid rgba(255,255,255,0.1);
  box-shadow: 0 8px 32px rgba(0,0,0,0.3);
  font-size: 1.8em;
  transition: all 0.3s ease;
}
</style>
