<script setup>
defineProps({
  outcome: String,
  modelValue: String,
})
defineEmits(['update:modelValue'])
</script>

<template>
  <div class="reflection-card">
    <h2>How does seeing "{{ outcome }}" make you feel?</h2>
    <p>
      Take a moment to reflect on your feelings and thoughts. Are you angry, sad, or something else?
      Jot it down below!
    </p>
    <textarea
      :value="modelValue"
      @input="$emit('update:modelValue', $event.target.value)"
      placeholder="Reflect on your feelings here..."
    ></textarea>
  </div>
</template>

<style scoped>
.reflection-card {
  background-color: #005377;
  padding: 20px;
  border-radius: 8px;
  margin-top: 20px;
  box-shadow: 0 4px 8px rgba(0, 0, 0, 0.1);
}
h2,
p {
  color: #d5c67a;
}
p {
  margin-bottom: 10px;
  padding-left: 15px;
  padding-right: 15px;
}
textarea {
  width: 100%;
  height: 100px;
  margin-top: 10px;
  padding: 10px;
  font-size: 16px;
  border-radius: 8px;
}
</style>
