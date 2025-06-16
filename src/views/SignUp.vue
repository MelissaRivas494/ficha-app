<script setup>
import { ref } from 'vue';
import { useRouter } from 'vue-router';
import { auth } from '@/firebaseConfig'; // Adjust the import based on your Firebase setup
import { createUserWithEmailAndPassword, updateProfile } from 'firebase/auth';
import { useCounterStore } from '@/stores/counter'; // Adjust the import based on your store setup

const email = ref('');
const password = ref('');
const name = ref('');
const error = ref(null);
const router = useRouter();
const userStore = useCounterStore();

const register = async () => {
  try {
    const userCredential = await createUserWithEmailAndPassword(auth, email.value, password.value);
    const user = userCredential.user;

    // Save name to the user's profile
    await updateProfile(user, {
      displayName: name.value
    });
    
    // Store user data in the store
    userStore.setUser({
      uid: user.uid,
      email: user.email,
      name: name.value
    });

    // Redirect to the home page or any other page
    router.push('/dashboard');
  } catch (err) {
    error.value = err.message;
  }
};

</script>

<template>
    <div class="signup-container">
        <h1>Sign Up</h1>
        <form @submit.prevent="register">
        <div>
            <label for="name">Name:</label>
            <input type="text" id="name" v-model="name" required />
        </div>
        <div>
            <label for="email">Email:</label>
            <input type="email" id="email" v-model="email" required />
        </div>
        <div>
            <label for="password">Password:</label>
            <input type="password" id="password" v-model="password" required />
        </div>
        <button type="submit">Sign Up</button>
        </form>
        <p v-if="error">{{ error }}</p>
    </div>
</template>

