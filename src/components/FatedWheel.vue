<script setup>
defineProps({
  wheelRotation: Number,
})
</script>

<template>
  <div class="wheel-stage">
    <div class="wheel-pointer">▼</div>
    <div class="fated-wheel" :style="{ transform: `rotate(${wheelRotation}deg)` }">
      <div class="slice slice-left"><span>Forgive</span></div>
      <div class="slice slice-right"><span>Do Not Forgive</span></div>
      <div class="center-peg"></div>
    </div>
  </div>
</template>

<style scoped>
.wheel-stage {
  position: relative;
  width: 300px;

  margin: 40px auto;
  flex-direction: column;
  display: flex;
  align-items: center;
}

.wheel-pointer {
  font-size: 2rem;
  margin-bottom: 10px;
  color: #d5c67a;
  z-index: 3;
}

.fated-wheel {
  width: 300px;
  height: 300px;
  border-radius: 50%;
  border: 5px solid #5267ad;
  position: relative;
  box-shadow: 0 4px 8px rgba(0, 0, 0, 0.1);
  overflow: hidden;

  transition: transform 3s cubic-bezier(0.25, 0.1, 0.25, 1);
}

.slice {
  position: absolute;
  width: 50%;
  height: 100%;
  top: 0;
  overflow: hidden;
  display: flex;
  align-items: center;
  justify-content: center;
}
.slice-left {
  background-color: #d5c67a;
  left: 0;
}
.slice-right {
  background-color: #06a77d;
  right: 0;
}
.slice span {
  position: absolute;
  transform: rotate(-90deg);
  font-size: 1.4rem;
  color: white;
  white-space: nowrap;
  z-index: 2;
}
.center-peg {
  position: absolute;
  top: 50%;
  left: 50%;
  width: 20px;
  height: 20px;
  background-color: #5267ad;
  border-radius: 50%;
  transform: translate(-50%, -50%);
}
</style>
