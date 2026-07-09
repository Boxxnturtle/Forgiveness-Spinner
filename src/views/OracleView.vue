<script setup>
import { ref } from 'vue'
import FatedWheel from '@/components/FatedWheel.vue'
import ReflectionCard from '@/components/ReflectionCard.vue'
import { useReflectionStore } from '@/stores/journal'

const store = useReflectionStore()
const userDilemma = ref('')
const randomOutcome = ref('')
const UserReflection = ref('')
const showToast = ref(false)

const handleSpinCompleted = (result) => {
  randomOutcome.value = result
}

const handleSaveReflection = () => {
  store.addEntry(userDilemma.value, randomOutcome.value, UserReflection.value)
  console.log('Current Store data:', store.reflections)
  showToast.value = true
  setTimeout(() => {
    showToast.value = false
  }, 3000)
}
</script>

<template>
  <div class="oracle-view">
    <div class="dilemma-section">
      <label for="dilemma-input">What's your dilemma?</label>
      <p class="subtitle">Uncover your true feelings...</p>
      <textarea
        id="dilemma-input"
        v-model="userDilemma"
        placeholder="Enter your dilemma here..."
        aria-label="Enter your dilemma"
        rows="3"
      ></textarea>
    </div>

    <!--The Wheel-->
    <FatedWheel
      :dilemma="userDilemma"
      :options="['Forgive', 'Do Not Forgive']"
      @spin-complete="handleSpinCompleted"
    />

    <!--The Reflection Card-->
    <ReflectionCard
      v-if="randomOutcome"
      :outcome="randomOutcome"
      v-model="UserReflection"
      @save-complete="handleSaveReflection"
    />
    <div v-if="showToast" class="toast-notification" role="alert" aria-live="assertive">
      Reflection saved successfully!
    </div>
  </div>
</template>

<style scoped>
.oracle-view {
  display: flex;
  flex-direction: column;
  align-items: center;
}

.subtitle {
  font-style: italic;
  margin: 1rem 0 1rem 0;
  color: white;
}

.dilemma-section {
  display: flex;
  flex-direction: column;
  align-items: center;
  width: 100%;
}

.dilemma-section textarea {
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
  margin-bottom: 0;
}

#dilemma-input:focus {
  outline: none;
  box-shadow: 0 0 5px #d5c67a;
  border-color: #d5c67a;
}

.dilemma-section label {
  font-weight: bold;
  font-size: 1.5rem;
  margin: 2rem 0 0 0;
  color: #d5c67a;
}

.toast-notification {
  position: fixed;
  bottom: 20px;
  left: 50%;
  transform: translateX(-50%);
  background-color: #06a77d;
  color: white;
  padding: 10px 20px;
  border-radius: 5px;
  box-shadow: 0 4px 8px rgba(0, 0, 0, 0.1);
}

@keyframes fadeInOut {
  0% {
    opacity: 0;
  }
  10% {
    opacity: 1;
  }
  90% {
    opacity: 1;
  }
  100% {
    opacity: 0;
  }
}
</style>
