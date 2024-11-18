<script setup lang="ts">
import Parameters from "@/components/Parameters.vue";
import Grid from "@/components/Grid.vue";
import { ref } from "vue";

const speed = ref(0);
const cycleSpeedFromParameter = ref(0); // Déclaration de la variable pour transmettre la vitesse

const emit = defineEmits(["cycleSpeed"]);

function updateSpeed(newSpeed: number) {
  speed.value = newSpeed;
  cycleSpeedFromParameter.value = newSpeed; // Mise à jour de cycleSpeedFromChild1
  emit("cycleSpeed", newSpeed);
}

const isRunning = ref(false);

function handleRunningUpdate(newRunningState: boolean) {
  isRunning.value = newRunningState;
}
</script>

<template>
  <div class="flex flex-col items-center min-h-screen bg-gray-100 p-5">
    <h1 class="mb-6 text-4xl font-bold text-gray-900">Game of Life</h1>

    <!-- Conteneur principal pour Parameters et Grid -->
    <div class="flex w-full max-w-5xl space-x-6">
      <!-- Component Parameters élargi à 1/3 de la largeur -->
      <div class="w-1/3 bg-white p-4 rounded-lg shadow-lg">
        <Parameters
          @cycleSpeed="updateSpeed"
          @updateRunning="handleRunningUpdate"
        />
      </div>

      <!-- Component Grid à droite -->
      <div class="flex-1 bg-white p-4 rounded-lg shadow-lg">
        <Grid :cycleSpeed="cycleSpeedFromParameter" :isRunning="isRunning" />
      </div>
    </div>
  </div>
</template>
