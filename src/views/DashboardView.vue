<script setup>
import { useCounterStore } from '@/stores/counter';
import { useRouter } from 'vue-router';
import { auth } from '@/firebaseConfig'; // Adjust the import based on your Firebase setup
import { signOut } from 'firebase/auth';

const router = useRouter();
const userStore = useCounterStore();

const logout = async () => {
  try {
    await signOut(auth);
    userStore.setUser(null); // Clear user data in the store
    router.push('/login'); // Redirect to login page
  } catch (error) {
    console.error('Logout failed:', error);
  }
};
</script>

<template>
    <div class="dashboard-container">
        <h1>Bienvenido {{ userStore.user?.displayName || userStore.user?.email }}</h1>
        <p>Aqui puedes gestionar tu informacion</p>
        <button @click="logout">Cerrar sesión</button>
    </div>
</template>


