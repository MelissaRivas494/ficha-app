import { ref, computed } from 'vue'
import { defineStore } from 'pinia'

export const useCounterStore = defineStore('user', () => {
  const user = ref(null)

  const isAuthenticated = computed(() => user.value !== null)
  const setUser = (newUser) => {
    user.value = newUser
  }
  const clearUser = () => {
    user.value = null
  }
  return { user, isAuthenticated, setUser, clearUser }
})
