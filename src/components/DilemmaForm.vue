<script setup>
defineProps({
  modelValue: String,
  isSpinning: Boolean,
})
defineEmits(['update:modelValue', 'spin'])
</script>

<template>
  <div class="input-section">
    <label for="dilemma">What's on your mind?</label>
    <textarea
      id="dilemma"
      :value="modelValue"
      @input="$emit('update:modelValue', $event.target.value)"
      placeholder="Enter your dilemma..."
      :disabled="isSpinning"
    ></textarea>
    <button @click="$emit('spin')" :disabled="isSpinning">
      {{ isSpinning ? 'Consulting Fate' : 'Spin the Wheel' }}
    </button>
  </div>
</template>

<style scoped>
textarea {
  width: 100%;
  height: 100px;
  margin-top: 10px;
  padding: 10px;
  font-size: 16px;
  border-radius: 8px;
}
button {
  margin-top: 15px;
  padding: 10px 20px;
  font-size: 16px;
  border-radius: 8px;
  cursor: pointer;
  background-color: #06a77d;
}

button:disabled {
  background-color: #ccc;
  cursor: not-allowed;
}

label {
  color: #d5c67a;
}
</style>
