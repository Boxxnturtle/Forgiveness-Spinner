import { defineStore } from 'pinia'
import { ref } from 'vue'

export const useReflectionStore = defineStore('reflections', () => {
  const reflections = ref([])
  function addEntry(dilemma, outcome, reflection) {
    const newEntry = {
      id: Date.now().toString(),
      dilemma: dilemma,
      outcome: outcome,
      reflection: reflection,
      date: new Date().toLocaleDateString(),
    }
    reflections.value.unshift(newEntry)
  }

  //Updating Entry

  function updateEntry(id, updatedReflection) {
    const entry = reflections.value.find((e) => e.id === id)
    if (entry) {
      entry.reflection = updatedReflection
    }
  }

  return { reflections, addEntry, updateEntry }
})
