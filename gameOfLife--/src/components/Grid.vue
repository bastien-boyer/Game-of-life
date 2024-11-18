<script setup lang="ts">
import { ref, watch, onUnmounted } from "vue";
import { gosperGliderGun, glider, blinker, block } from "@/collection/patterns";

const SIZE: number = 45;

const props = defineProps<{
  cycleSpeed: number;
  isRunning: boolean;
}>();

// Variable `CYCLE_SPEED` dans l'enfant, initialisée avec la valeur de `props.cycleSpeed`
let CYCLE_SPEED = ref(props.cycleSpeed);
let cycleTimeout: number | undefined; // Stocke le timeout pour le contrôle du cycle

// Surveille les changements de la prop `cycleSpeed`
watch(
  () => props.cycleSpeed,
  (newSpeed) => {
    CYCLE_SPEED.value = newSpeed || 500;
    if (props.isRunning) {
      startCycle(); // Redémarre le cycle avec la nouvelle vitesse
    }
  },
  { immediate: true }
);

// Surveille les changements de `isRunning` pour démarrer/arrêter les cycles
watch(
  () => props.isRunning,
  (newRunningState) => {
    if (newRunningState) startCycle();
    else if (cycleTimeout) clearTimeout(cycleTimeout);
  }
);

// Fonction pour démarrer et redémarrer le cycle
const startCycle = () => {
  if (cycleTimeout) clearTimeout(cycleTimeout); // Annule le cycle précédent
  cycle();
};

// Fonction `cycle` qui utilise la vitesse pour les mises à jour de la grille
const cycle = () => {
  updateGrid();
  cycleTimeout = setTimeout(cycle, CYCLE_SPEED.value);
};

// Nettoie le timeout lorsque le composant est détruit
onUnmounted(() => {
  if (cycleTimeout) clearTimeout(cycleTimeout);
});

const grid = ref<boolean[][]>(
  Array.from({ length: SIZE }, () => Array(SIZE).fill(false))
);
// Fonction pour inverser l'état d'une cellule
function toggleCell(y: number, x: number) {
  grid.value[y][x] = !grid.value[y][x];
}

const updateGrid = () => {
  // Crée un nouveau tableau pour les mises à jour
  const newGrid = Array.from({ length: SIZE }, () => Array(SIZE).fill(false));

  for (let y = 0; y < SIZE; y++) {
    for (let x = 0; x < SIZE; x++) {
      const neighbors = getNeighbors(y, x);
      const aliveNeighbors = neighbors.filter((cell) => cell).length;

      // Applique les règles du Jeu de la Vie
      if (grid.value[y][x]) {
        // Règle 1 et 3 : Une cellule vivante meurt par solitude ou surpopulation
        newGrid[y][x] = aliveNeighbors === 2 || aliveNeighbors === 3;
      } else {
        // Règle 4 : Une cellule morte devient vivante par reproduction
        newGrid[y][x] = aliveNeighbors === 3;
      }
    }
  }

  // Remplace l'ancienne grille par la nouvelle
  grid.value = newGrid;
};

const getNeighbors = (y: number, x: number) => {
  const neighbors = [
    [-1, -1],
    [-1, 0],
    [-1, 1],
    [0, -1],
    [0, 1],
    [1, -1],
    [1, 0],
    [1, 1],
  ];

  const neighborStates: boolean[] = [];

  for (let i = 0; i < neighbors.length; i++) {
    const [dy, dx] = neighbors[i];
    const newY = y + dy;
    const newX = x + dx;

    // Vérifie si la nouvelle position est valide
    if (newY >= 0 && newY < SIZE && newX >= 0 && newX < SIZE) {
      neighborStates.push(grid.value[newY][newX]);
    } else {
      neighborStates.push(false); // Cellule hors limites considérée comme morte
    }
  }
  return neighborStates;
};

function insertPattern(
  grid: boolean[][],
  pattern: { x: number; y: number }[],
  startX: number,
  startY: number
) {
  pattern.forEach(({ x, y }) => {
    const posX = startX + x;
    const posY = startY + y;
    if (grid[posX] && grid[posX][posY] !== undefined) {
      grid[posX][posY] = true; // Active la cellule
    }
  });
}
</script>

<template>
  <p>cycle speed = {{ CYCLE_SPEED }}</p>
  <div
    class="grid gap-0.5 w-full h-full"
    :style="{ gridTemplateColumns: `repeat(${SIZE}, 1fr)` }"
  >
    <div v-for="(row, y) in grid" :key="y" class="contents">
      <div
        v-for="(cell, x) in row"
        :key="x"
        @click="toggleCell(y, x)"
        :class="cell ? 'bg-blue-500' : 'bg-white'"
        class="w-3 h-3 cursor-pointer border border-gray-300"
      ></div>
    </div>
  </div>
</template>
