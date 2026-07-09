<script setup>
import { ref } from 'vue'

const props = defineProps({
  options: {
    type: Array,
    default: () => ['Forgive', 'Do Not Forgive'],
  },
  dilemma: {
    type: String,
    default: '',
  },
})

const emit = defineEmits(['spin-complete'])
const isSpinning = ref(false)
const currentRotation = ref(0)
const resultText = ref('')

const spinTheWheel = () => {
  if (!props.dilemma || props.dilemma.trim() === '') {
    alert('Please enter your dilemma first!')
    return
  }
  if (isSpinning.value) return
  isSpinning.value = true
  resultText.value = ''

  const outcomeIndex = Math.floor(Math.random() * props.options.length)
  const fullRotations = 5 // Number of extra spins for visual effect
  const baseDegree = outcomeIndex === 0 ? 90 : 270 // 90 degrees for "Forgive", 270 degrees for "Do Not Forgive"
  const randomOffset = Math.floor(Math.random() * 60) - 30 // Random offset between -30 and +30 degrees
  currentRotation.value += fullRotations * 360 + baseDegree + randomOffset

  setTimeout(() => {
    isSpinning.value = false
    resultText.value = props.options[outcomeIndex]
    emit('spin-complete', resultText.value)
  }, 3000) // Match the CSS transition duration
}
</script>

<template>
  <div class="wheel-stage">
    <div class="wheel-pointer">▼</div>
    <div class="fated-wheel" :style="{ transform: `rotate(${currentRotation}deg)` }">
      <div class="slice slice-left">
        <span>{{ options[0] }}</span>
      </div>
      <div class="slice slice-right">
        <span>{{ options[1] }}</span>
      </div>
      <div class="center-peg"></div>
    </div>
    <button
      @click="spinTheWheel"
      :disabled="isSpinning"
      class="spin-button"
      :aria-label="isSpinning ? 'The wheel is spinning' : 'Spin the wheel'"
    >
      {{ isSpinning ? 'Spinning...' : 'Spin the Wheel' }}
    </button>
    <p v-if="resultText" aria-live="polite" class="sr-only">The wheel says {{ resultText }}</p>
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
  border: 4px solid #06a77d;
  position: relative;
  box-shadow: 0 4px 8px rgba(0, 0, 0, 0.1);
  overflow: hidden;
  transition: transform 3s cubic-bezier(0.17, 0.67, 0.12, 0.99);
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
  background-color: #005377;
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
  background-color: #052f5f;
  border-radius: 50%;
  transform: translate(-50%, -50%);
}

.spin-button {
  margin-top: 20px;
  padding: 12px 24px;
  font-size: 1.2rem;
  background-color: #06a77d;
  font-weight: bold;
  border: none;
  border-radius: 8px;
  cursor: pointer;
  transition:
    background-color 0.2s,
    opacity 0.2s;
}
.spin-button:disabled {
  background-color: #005377;
  cursor: not-allowed;
  opacity: 0.8;
}

.spin-button:hover:not(:disabled) {
  background-color: #058c69;
  color: white;
}

.sr-only {
  position: absolute;
  width: 1px;
  height: 1px;
  padding: 0;
  margin: -1px;
  overflow: hidden;
  clip: rect(0, 0, 0, 0);
  white-space: nowrap;
  border: 0;
}
</style>
