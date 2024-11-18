// patterns.ts

// Gosper Glider Gun
export const gosperGliderGun = [
  { x: 1, y: 5 },
  { x: 1, y: 6 },
  { x: 2, y: 5 },
  { x: 2, y: 6 },
  { x: 13, y: 3 },
  { x: 14, y: 3 },
  { x: 12, y: 4 },
  { x: 16, y: 4 },
  { x: 11, y: 5 },
  { x: 17, y: 5 },
  { x: 11, y: 6 },
  { x: 15, y: 6 },
  { x: 13, y: 7 },
  { x: 14, y: 7 },
  { x: 12, y: 8 },
  { x: 16, y: 8 },
  { x: 13, y: 9 },
  { x: 14, y: 9 },
  { x: 21, y: 5 },
  { x: 22, y: 5 },
  { x: 21, y: 6 },
  { x: 22, y: 6 },
  { x: 35, y: 3 },
  { x: 36, y: 3 },
  { x: 35, y: 4 },
  { x: 36, y: 4 },
  { x: 23, y: 3 },
  { x: 25, y: 4 },
  { x: 23, y: 7 },
  { x: 25, y: 6 },
  { x: 27, y: 5 },
  { x: 25, y: 5 },
];

// Glider (planeur)
export const glider = [
  { x: 0, y: 1 },
  { x: 1, y: 2 },
  { x: 2, y: 0 },
  { x: 2, y: 1 },
  { x: 2, y: 2 },
];

// Blinker (oscillateur)
export const blinker = [
  { x: 0, y: 1 },
  { x: 1, y: 1 },
  { x: 2, y: 1 },
];

// Block (structure stable)
export const block = [
  { x: 0, y: 0 },
  { x: 0, y: 1 },
  { x: 1, y: 0 },
  { x: 1, y: 1 },
];
