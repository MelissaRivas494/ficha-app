<script setup>
import { ref } from 'vue';
import { db } from '@/firebaseConfig'; // Import Firestore if needed
import { collection, addDoc, getDocs, doc, updateDoc, Timestamp, query, where } from 'firebase/firestore'; // Import Firestore functions if needed
import { useCounterStore } from '@/stores/counter';

const userStore = useCounterStore();

const personalInfoData = ref(null);
const personalInfoDocId = ref(null); // Initialize as an empty string for personal info document ID

//Info persona
const bloodType = ref('');
const allergies = ref('');
const birthDate = ref('');

const fetchPersonalInfo = async () => {
  try {
    const q = query(collection(db, 'personalInfo'), where('userId', '==', userStore.user?.uid));
    const querySnapshot = await getDocs(q);
    if (!querySnapshot.empty) {
      const docSnap = querySnapshot.docs[0];
      personalInfoDocId.value = docSnap.id; // Store ID
      personalInfoData.value = querySnapshot.docs[0].data();
      bloodType.value = personalInfoData.value.bloodType;
      allergies.value = personalInfoData.value.allergies;
      
      if (personalInfoData.value.birthDate && typeof personalInfoData.value.birthDate.toDate === 'function') {
        birthDate.value = personalInfoData.value.birthDate.toDate().toISOString().substr(0, 10);
      } else {
        birthDate.value = personalInfoData.value.birthDate || '';
      }
    }
  } catch (error) {
    console.error('Error fetching personal info:', error);
  }
};

// Formato fechaaa
const formatDate = (dateValue) => {
  if (!dateValue) return 'No definida';

  if (typeof dateValue.toDate === 'function') {
    dateValue = dateValue.toDate();
  } else {
    dateValue = new Date(dateValue);
  }

  if (isNaN(dateValue)) return 'Fecha inválida';

  return dateValue.toLocaleDateString('es-CL', {
    year: 'numeric',
    month: 'long',
    day: 'numeric',
  });
};

//Save info
const savePersonalInfo = async () => {
  try {
    const data = {
      bloodType: bloodType.value,
      allergies: allergies.value,
      birthDate: Timestamp.fromDate(new Date(birthDate.value)),
      userId: userStore.user?.uid
    };

    if (personalInfoDocId.value) {
      //actualiza info
      const docRef = doc(db, 'personalInfo', personalInfoDocId.value);
      await updateDoc(docRef, data);
      alert('Información personal actualizada correctamente');
    } else {
      // Si no existe, crea uno nuevo
      const docRef = await addDoc(collection(db, 'personalInfo'), data);
      personalInfoDocId.value = docRef.id;
      alert('Información personal guardada correctamente');
    }

    await fetchPersonalInfo(); 
  } catch (error) {
    console.error('Error guardando la información personal:', error);
  }
};

fetchPersonalInfo();
</script>

<template>
  <div class="mt-3">
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

      <div class="mb-3">
        <label for="birthDate" class="form-label">Fecha de Nacimiento</label>
        <input type="date" id="birthDate" v-model="birthDate" class="form-control" required />
      </div>

      <button type="submit" class="btn btn-primary">Guardar Información Personal</button>
    </form>

    <div v-if="personalInfoData">
      <h4 class="mt-4">Datos Guardados:</h4>
      <p><strong>Tipo de Sangre:</strong> {{ personalInfoData.bloodType }}</p>
      <p><strong>Alergias:</strong> {{ personalInfoData.allergies }}</p>
      <p><strong>Fecha de Nacimiento:</strong> {{ formatDate(personalInfoData.birthDate) }}</p>
    </div>
  </div>
</template>
