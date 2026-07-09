import { createRouter, createWebHistory } from 'vue-router'
import OracleView from '../views/OracleView.vue'
import FatesJournalView from '../views/FatesJournalView.vue'

const router = createRouter({
  history: createWebHistory(import.meta.env.BASE_URL),
  routes: [
    {
      path: '/',
      redirect: '/oracle',
    },

    {
      path: '/oracle/:id?',
      name: 'oracle',
      component: OracleView,
    },
    {
      path: '/journal',
      name: 'journal',
      component: FatesJournalView,
    },
  ],
})

export default router
