<script setup>
import { ref } from 'vue'
import DilemmaForm from './components/DilemmaForm.vue'
import FatedWheel from './components/FatedWheel.vue'
import ReflectionCard from './components/ReflectionCard.vue'
//Links to the components that are being used in the main App.vue file.

const userDilemma = ref('')
const randomOutcome = ref('')
const userReflection = ref('')
const isSpinning = ref(false)
const wheelRotation = ref(0) //Tracks the degrees
const outcomeOptions = ['Forgive Them', 'Do not Forgive Them']

//-- Logic for wheel spin --

function spinTheWheel() {
  if (!userDilemma.value.trim()) {
    alert('Please enter your dilemma before spinning the wheel.')
    return
  }

  isSpinning.value = true
  randomOutcome.value = ''

  //Make Wheel
  const randomIndex = Math.floor(Math.random() * outcomeOptions.length)
  const snapDegrees = randomIndex === 0 ? 90 : 270
  const fullSpins = 5 * 360 // 5 full spins for dramatic effect
  wheelRotation.value += fullSpins + snapDegrees

  // Simulate spinning the wheel
  setTimeout(() => {
    randomOutcome.value = outcomeOptions[randomIndex]
    isSpinning.value = false
  }, 3000) // Simulate a spinning delay
}
</script>

<template>
  <main class="app-container">
    <h1><b>Forgiveness Dilemma Spinner</b></h1>
    <p>Uncover your true feelings...</p>

    <!-- Dilemma Form Section -->
    <DilemmaForm v-model="userDilemma" :isSpinning="isSpinning" @spin="spinTheWheel" />

    <!-- Wheel Section -->
    <FatedWheel :wheelRotation="wheelRotation" />

    <!-- Screen reader announcement -->
    <div aria-live="polite" class="sr-only">
      <h2 v-if="randomOutcome">The wheel has landed on: {{ randomOutcome }}</h2>
    </div>
    <!--Reflection Card Section -->
    <ReflectionCard v-if="randomOutcome" :outcome="randomOutcome" v-model="userReflection" />
  </main>
</template>

<style scoped>
.app-container {
  max-width: 600px;
  margin: 40px auto;
  font-family: Arial, sans-serif;
  text-align: center;
  padding: 20px;
  background-color: #052f5f;
}

h1,
h2,
p {
  color: #d5c67a;
}
/*Making the button focus different from the rest to make it clear that the tab key is hovered over. */
:deep(button:focus-visible) {
  outline: 2px solid #d5c67a;
  outline-offset: 2px;
}

:deep(textarea:focus-visible),
:deep(input:focus-visible) {
  outline: 2px solid #06a77d;
  outline-offset: 2px;
}
</style>
