<script setup>
import { useCounterStore } from '@/stores/counter';
import { useRouter } from 'vue-router';
import { auth } from '@/firebaseConfig'; // Adjust the import based on your Firebase setup
import { signOut } from 'firebase/auth';
import { db } from '@/firebaseConfig'; // Import Firestore if needed
import { collection, addDoc } from 'firebase/firestore'; // Import Firestore functions if needed
import { ref } from 'vue';

const router = useRouter();
const userStore = useCounterStore();
const tab = ref('personalInfo'); // Default tab

//Info persona
const bloodType = ref('');
const allergies = ref('');

// Info Doctores
const doctorName = ref('');
const doctorSpecialty = ref('');

//Save info
const savePersonalInfo = async () => {
  try {
    await addDoc(collection(db, 'personalInfo'), {
      bloodType: bloodType.value,
      allergies: allergies.value,
      userId: userStore.user?.uid // Assuming you have user ID in the store
    })
    alert('Información personal guardada correctamente');
  } catch (error) {
    console.error('Error guardando la información personal:', error);
  }
}

//Save docs info
const saveDoctorInfo = async () => {
  try {
    await addDoc(collection(db, 'doctorInfo'), {
      name: doctorName.value,
      specialty: doctorSpecialty.value,
      userId: userStore.user?.uid // Assuming you have user ID in the store
    })
    alert('Información del doctor guardada correctamente');
  } catch (error) {
    console.error('Error guardando la información del doctor:', error);
  }
}
// Logout
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

  <div class="container mt-4">
    <h2>Dashboard</h2>

    <ul class="nav nav-tabs">
      <li class="nav-item">
        <button class="nav-link" :class="{ active: tab === 'personalInfo' }" @click="tab = 'personalInfo'">Información
          Personal</button>
      </li>
      <li class="nav-item">
        <button class="nav-link" :class="{ active: tab === 'doctorInfo' }" @click="tab = 'doctorInfo'">Información del
          Doctor</button>
      </li>
    </ul>

    <div class="tab-content mt-3">
      <div v-if="tab === 'personalInfo'" class="mt-3">
        <h3>Información Personal</h3>
        <form @submit.prevent="savePersonalInfo">
          <div class="mb-3">
            <label for="bloodType" class="form-label">Tipo de Sangre</label>
            <select id="bloodType" v-model="bloodType" class="form-select" required>
              <option value="" disabled selected>Selecciona tu tipo de sangre</option>
              <option value="A+">A+</option>
              <option value="A-">A-</option>
              <option value="B+">B+</option>
              <option value="B-">B-</option>
              <option value="AB+">AB+</option>
              <option value="AB-">AB-</option>
              <option value="O+">O+</option>
              <option value="O-">O-</option>
            </select>
          </div>

          <div class="mb-3">
            <label for="allergies" class="form-label">Alergias</label>
            <input type="text" id="allergies" v-model="allergies" class="form-control" required>
          </div>
          <button type="submit" class="btn btn-primary">Guardar Información Personal</button>
        </form>
      </div>

      <div v-if="tab === 'doctorInfo'" class="tab-pane active">
        <h3>Información del Doctor</h3>
        <form @submit.prevent="saveDoctorInfo">
          <div class="mb-3">
            <label for="doctorName" class="form-label">Nombre del Doctor</label>
            <input type="text" id="doctorName" v-model="doctorName" class="form-control" required>
          </div>
          <div class="mb-3">
            <label for="doctorSpecialty" class="form-label">Especialidad del Doctor</label>
            <input type="text" id="doctorSpecialty" v-model="doctorSpecialty" class="form-control" required>
          </div>
          <button type="submit" class="btn btn-primary">Guardar Información del Doctor</button>
        </form>
      </div>
    </div>
  </div>

</template>
