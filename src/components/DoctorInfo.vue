<script setup>
import { ref } from 'vue';
import { db } from '@/firebaseConfig';
import { collection, addDoc, getDocs, query, where } from 'firebase/firestore';
import { useCounterStore } from '@/stores/counter';

const userStore = useCounterStore();
const doctorName = ref('');
const doctorSpecialty = ref('');
const doctorInfoData = ref([]); // Initialize as an array to hold multiple doctor entries

const fetchDoctorInfo = async () => {
  try {
    const q = query(collection(db, 'doctorInfo'), where('userId', '==', userStore.user?.uid));
    const querySnapshot = await getDocs(q);
    doctorInfoData.value = querySnapshot.docs.map(doc => doc.data());
  } catch (error) {
    console.error('Error fetching doctor info:', error);
  }
};

//Save docs info
const saveDoctorInfo = async () => {
  try {
    await addDoc(collection(db, 'doctorInfo'), {
      name: doctorName.value,
      specialty: doctorSpecialty.value,
      userId: userStore.user?.uid // Assuming you have user ID in the store
    });
    alert('Información del doctor guardada correctamente');
    doctorName.value = '';
    doctorSpecialty.value = '';
    await fetchDoctorInfo();
  } catch (error) {
    console.error('Error guardando la información del doctor:', error);
  }
};

fetchDoctorInfo();
</script>

<template>
  <div class="tab-pane active">
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

    <div v-if="doctorInfoData.length">
      <h4 class="mt-4">Doctores Guardados:</h4>
      <ul>
        <li v-for="(doc, index) in doctorInfoData" :key="index">
          <strong>Nombre:</strong> {{ doc.name }} – <strong>Especialidad:</strong> {{ doc.specialty }}
        </li>
      </ul>
    </div>
  </div>
</template>
