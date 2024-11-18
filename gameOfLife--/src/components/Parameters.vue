<script setup lang="ts">
import { ref, computed, watch } from "vue";

const emit = defineEmits(["cycleSpeed", "updateRunning"]);
const isRunning = ref(false);

const speedSlider = ref(50);

const cycleSpeed = computed(() => {
  let speed = 1000 - speedSlider.value * 10;
  return speed < 100 ? 100 : speed;
});

watch(cycleSpeed, (newSpeed) => {
  emit("cycleSpeed", newSpeed);
});

function toggleRunning() {
  isRunning.value = !isRunning.value;
  emit("updateRunning", isRunning.value);
}
</script>

<template>
  <div>
    <h2 class="text-xl font-semibold mb-4 text-gray-700">Parameters</h2>
    <div class="flex flex-col space-y-4">
      <div class="flex space-x-4">
        <button
          v-if="!isRunning"
          class="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded"
          @click="toggleRunning"
        >
          START
        </button>
        <button
          v-else
          class="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded"
          @click="toggleRunning"
        >
          STOP
        </button>
      </div>
      <div></div>
      <label class="flex flex-col">
        <span class="text-gray-600">Nombre minimal de voisins vivants :</span>
        <input type="number" class="border rounded p-2 mt-1" min="0" max="8" />
      </label>

      <label
        for="default-range"
        class="block mb-2 text-sm font-medium text-gray-900 dark:text-white"
        >Default range</label
      >
      <p>Cycle speed : {{ speedSlider }}</p>
      <input
        id="default-range"
        v-model="speedSlider"
        type="range"
        value="50"
        class="w-full h-2 bg-gray-200 rounded-lg appearance-none cursor-pointer dark:bg-gray-700"
      />
    </div>
  </div>
</template>
