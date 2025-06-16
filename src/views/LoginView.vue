<script setup>
import { ref } from 'vue';
import { useRouter } from 'vue-router';
import { signInWithEmailAndPassword } from 'firebase/auth';
import { auth } from '@/firebaseConfig'; // Adjust the import based on your Firebase setup
import { useCounterStore } from '@/stores/counter'; // Adjust the import based on your store setup

const email = ref('');
const password = ref('');
const error = ref(null);
const router = useRouter();
const userStore = useCounterStore();
const login = async () => {
  try {
    const userCredential = await signInWithEmailAndPassword(auth, email.value, password.value);
    const user = userCredential.user;

    // Store user data in the store
    userStore.setUser({
      uid: user.uid,
      email: user.email,
      name: user.displayName || 'Anonymous'
    });

    // Redirect to the home page or any other page
    router.push({ name: 'Dashboard' });
  } catch (err) {
    error.value = err.message;
  }
};
</script>

<template>
    <div class="login-container">
        <h1>Login</h1>
        <form @submit.prevent="login">
            <div>
                <label for="email">Email:</label>
                <input type="email" id="email" v-model="email" required />
            </div>
            <div>
                <label for="password">Password:</label>
                <input type="password" id="password" v-model="password" required />
            </div>
            <button type="submit">Login</button>
        </form>
        <p v-if="error">{{ error }}</p>
    </div>
</template>