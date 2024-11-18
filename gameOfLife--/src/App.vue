<script setup lang="ts">
import GameOfLife from "@/views/GameOfLife.vue";
import Parameter from "@/components/Parameters.vue";
</script>

<template>
  <div class="flex items-center justify-center h-screen bg-gray-100">
    <GameOfLife />
    <Parameters />
  </div>
</template>
