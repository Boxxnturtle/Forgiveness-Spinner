<script setup>
const emit = defineEmits(['update:modelValue', 'save-complete', 'spin-again'])
const props = defineProps({
  outcome: {
    type: String,
    required: true,
  },
  modelValue: {
    type: String,
    default: '',
  },
  isSaving: { type: Boolean, default: false },
  saveError: { type: Boolean, default: false },
})

const saveReflection = () => {
  // Emit the save event to the parent component
  console.log('Reflection saved:', props.modelValue)
  emit('save-complete')
}
</script>

<template>
  <div class="reflection-card">
    <div v-if="saveError" class="alert-banner" role="alert" aria-live="assertive">
      <strong> Connection Error:</strong> Unable to save your reflection. Please try again.
    </div>
    <h2 class="outcome-text">How does seeing "{{ outcome }}" make you feel?</h2>
    <p>
      Take a moment to reflect on your feelings and thoughts. Are you angry, sad, or something else?
      Jot it down below!
    </p>
    <textarea
      id="reflection-text"
      :value="modelValue"
      @input="$emit('update:modelValue', $event.target.value)"
      placeholder="Reflect on your feelings here..."
      rows="4"
    ></textarea>
    <div class="action-buttons">
      <button @click="saveReflection" class="save-btn" :disabled="isSaving">
        {{ isSaving ? 'Saving...' : saveError ? 'Retry Save' : 'Save Reflection' }}
      </button>
      <button @click="$emit('spin-again')" class="reset-btn" :disabled="isSaving">
        Spin Again
      </button>
    </div>
  </div>
</template>

<style scoped>
.alert-banner {
  background-color: #d9534f;
  color: white;
  padding: 12px;
  border-radius: 6px;
  margin-bottom: 15px;
  text-align: center;
  border: 2px solid #c9302c;
}

.action-buttons {
  display: flex;
  gap: 10px;
  margin-top: 1rem;
  justify-content: center;
}

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
  margin-top: 1rem;
  padding: 10px;
  font-size: 16px;
  border-radius: 8px;
}

.reflection-text:focus {
  outline: none;
  box-shadow: 0 0 5px #d5c67a;
  border-color: #d5c67a;
}

#reflection-text {
  padding: 20px;
  width: 100%;
  max-width: 400px;
  border-radius: 6px;
  border: 4px solid #06a77d;
  background-color: white;
  word-wrap: break-word;
  white-space: pre-wrap;
  resize: vertical;
  font-size: 16px;
  font-family: inherit;
}
.save-btn {
  padding: 10px 20px;
  background-color: #06a77d;
  border: none;
  border-radius: 6px;
  cursor: pointer;
  transition: background-color 0.2;
  margin-top: 1rem;
  font-weight: bold;
  font-size: 1rem;
}
.save-btn:hover {
  background-color: #058c69;
  color: white;
}

.reset-btn {
  padding: 10px 20px;
  background-color: #06a77d;
  border: none;
  border-radius: 6px;
  cursor: pointer;
  transition: background-color 0.2;
  margin-top: 1rem;
  font-weight: bold;
  font-size: 1rem;
}
.reset-btn:hover {
  background-color: #058c69;
  color: white;
}
</style>
