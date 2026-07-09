<script setup>
import { ref } from 'vue'
import { useReflectionStore } from '@/stores/journal'

const store = useReflectionStore()

//Local state for editing
const editingId = ref(null)
const editText = ref('')

//Edit for a card
const startEdit = (entry) => {
  editingId.value = entry.id
  editText.value = entry.reflection
}

//Save the edited reflection
const saveEdit = (id) => {
  store.updateEntry(id, editText.value)
  editingId.value = null
}

//Cancel Edit
const cancelEdit = () => {
  editingId.value = null
}
</script>

<template>
  <div class="journal-view">
    <h2 class="PF">Previous Fates</h2>

    <div v-if="store.reflections.length === 0" class="empty-state">
      <p>No previous fates recorded yet.</p>
      <p>Return here once you've faced a dilemma and spun the wheel.</p>
      <router-link to="/oracle" class="return-btn">Back to the Wheel</router-link>
    </div>
    <div v-else class="journal-entries">
      <div v-for="entry in store.reflections" :key="entry.id" class="journal-entry">
        <div class="entry-header">
          <h2 class="entry-date">{{ entry.date }}</h2>
        </div>
        <div class="entry-body">
          <p><strong>Dilemma:</strong> {{ entry.dilemma }}</p>
          <p>
            <strong>Fate:</strong> <span class="entry-outcome"> {{ entry.outcome }}</span>
          </p>

          <!-- Edit Mode -->
          <div v-if="editingId === entry.id" class="edit-section">
            <textarea v-model="editText" class="edit-textarea" rows="3"></textarea>
            <div class="edit-buttons">
              <button @click="saveEdit(entry.id)" class="save-btn">Save</button>
              <button @click="cancelEdit" class="cancel-btn">Cancel</button>
            </div>
          </div>
          <!-- Display Mode -->
          <div v-else>
            <p class="reflection-text"><strong>Your Reflection:</strong> {{ entry.reflection }}</p>
            <button @click="startEdit(entry)" class="edit-btn">Edit Reflection</button>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<style scoped>
.journal-view {
  color: white;
  text-align: center;
  margin-top: 20px;
}

.empty-state {
  margin-top: 40px;
  padding: 30px;
  border: 2px dashed #5267ad;
  border-radius: 8px;
  background-color: rgba(82, 103, 173, 0.1);
}

.return-btn {
  display: inline-block;
  margin-top: 20px;
  padding: 10px 20px;
  background-color: #06a77d;
  color: white;
  text-decoration: none;
  border-radius: 6px;
  transition: background-color 0.2s;
}
.return-btn:hover {
  background-color: #058c69;
}

strong {
  color: #d5c67a;
}
.PF {
  color: #d5c67a;
}

.edit-section {
  margin-top: 10px;
}
.edit-textarea {
  width: 100%;
  max-width: 400px;
  padding: 10px;
  border-radius: 6px;
  border: 2px solid #06a77d;
  background-color: white;
}

.edit-buttons {
  margin-top: 10px;
}
.save-btn,
.cancel-btn,
.edit-btn {
  margin: 10px 5px 10px 5px;
  padding: 8px 16px;
  font-size: 1rem;
  background-color: #06a77d;
  color: black;
  font-weight: bold;
  border: none;
  border-radius: 8px;
  cursor: pointer;
  transition:
    background-color 0.2s,
    opacity 0.2s;
}

.edit-btn:hover {
  background-color: #058c69;
  color: white;
}
.save-btn:hover {
  background-color: #058c69;
  color: white;
}
.cancel-btn:hover {
  background-color: #058c69;
  color: white;
}

.refelction-text {
  white-space: pre-wrap;
  overflow-wrap: break-word;
  word-wrap: break-word;
}

.journal-entry {
  background-color: #005377;
  padding: 20px;
  border-radius: 8px;
  margin-top: 20px;
  box-shadow: 0 4px 8px rgba(0, 0, 0, 0.1);
  text-align: left;
}
</style>
