<script setup>
import { ref } from 'vue';
import DashboardHeader from '@/components/DashboardHeader.vue';
import PersonalInfo from '@/components/PersonalInfo.vue';
import DoctorInfo from '@/components/DoctorInfo.vue';

const tab = ref('personalInfo'); // Default tab
</script>

<template>
  <DashboardHeader />

  <div class="container mt-4">
    <h2>Dashboard</h2>

    <ul class="nav nav-tabs">
      <li class="nav-item">
        <button class="nav-link" :class="{ active: tab === 'personalInfo' }" @click="tab = 'personalInfo'">
          Información Personal
        </button>
      </li>
      <li class="nav-item">
        <button class="nav-link" :class="{ active: tab === 'doctorInfo' }" @click="tab = 'doctorInfo'">
          Información del Doctor
        </button>
      </li>
    </ul>

    <div class="tab-content mt-3">
      <PersonalInfo v-if="tab === 'personalInfo'" />
      <DoctorInfo v-if="tab === 'doctorInfo'" />
    </div>
  </div>
</template>
