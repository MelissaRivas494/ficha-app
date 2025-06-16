import './assets/main.css'

import { createApp } from 'vue'
import { createPinia } from 'pinia'

import App from './App.vue'
import router from './router'

import {auth} from './firebaseConfig.js'   
import { onAuthStateChanged } from 'firebase/auth'
import { useCounterStore } from './stores/counter.js'

const app = createApp(App)

app.use(createPinia())
app.use(router)

onAuthStateChanged(auth, (user) => {
  const counterStore = useCounterStore()
  if (user) {
    // User is signed in, set the user in the store
    counterStore.setUser(user)
  } else {
    // User is signed out, clear the user in the store
    counterStore.clearUser()
  }
})


app.mount('#app')
