#!/usr/bin/env node
'use strict';

const args = process.argv.slice(2);

function flag(name, fallback) {
  const i = args.indexOf('--' + name);
  if (i === -1) return fallback;
  const v = args[i + 1];
  return v !== undefined ? v : fallback;
}

if (args.includes('--help') || args.includes('-h')) {
  console.log(`
  maze-gen — Generate random ASCII mazes

  Usage
    $ maze-gen [options]

  Options
    --width, -w    Maze width in cells  (default: 10)
    --height, -H   Maze height in cells (default: 10)
    --seed, -s     Random seed (integer)
    --solution     Show solution path with dots
    --help, -h     Show this help

  Examples
    $ maze-gen
    $ maze-gen --width 20 --height 15
    $ maze-gen --width 8 --height 8 --solution
`);
  process.exit(0);
}

const width = parseInt(flag('width', flag('w', '10')), 10);
const height = parseInt(flag('height', flag('H', '10')), 10);
const seed = flag('seed', flag('s', null));
const showSolution = args.includes('--solution');

// Simple seeded PRNG (mulberry32)
function mulberry32(a) {
  return function() {
    a |= 0; a = a + 0x6D2B79F5 | 0;
    let t = Math.imul(a ^ a >>> 15, 1 | a);
    t = t + Math.imul(t ^ t >>> 7, 61 | t) ^ t;
    return ((t ^ t >>> 14) >>> 0) / 4294967296;
  };
}

const rand = seed !== null ? mulberry32(parseInt(seed, 10)) : Math.random;

// Generate maze using recursive backtracker (DFS)
const N = 1, S = 2, E = 4, W = 8;
const DX = { [E]: 1, [W]: -1, [N]: 0, [S]: 0 };
const DY = { [N]: -1, [S]: 1, [E]: 0, [W]: 0 };
const OPP = { [N]: S, [S]: N, [E]: W, [W]: E };

const grid = [];
for (let y = 0; y < height; y++) {
  grid[y] = new Array(width).fill(0);
}

function carve(cx, cy) {
  const dirs = [N, S, E, W];
  // Shuffle
  for (let i = dirs.length - 1; i > 0; i--) {
    const j = Math.floor(rand() * (i + 1));
    [dirs[i], dirs[j]] = [dirs[j], dirs[i]];
  }
  for (const dir of dirs) {
    const nx = cx + DX[dir];
    const ny = cy + DY[dir];
    if (ny >= 0 && ny < height && nx >= 0 && nx < width && grid[ny][nx] === 0) {
      grid[cy][cx] |= dir;
      grid[ny][nx] |= OPP[dir];
      carve(nx, ny);
    }
  }
}

carve(0, 0);

// Solve with BFS from top-left to bottom-right
let solution = null;
if (showSolution) {
  const visited = Array.from({ length: height }, () => new Array(width).fill(false));
  const parent = Array.from({ length: height }, () => new Array(width).fill(null));
  const queue = [[0, 0]];
  visited[0][0] = true;
  while (queue.length) {
    const [cx, cy] = queue.shift();
    if (cx === width - 1 && cy === height - 1) break;
    for (const dir of [N, S, E, W]) {
      if (!(grid[cy][cx] & dir)) continue;
      const nx = cx + DX[dir];
      const ny = cy + DY[dir];
      if (nx >= 0 && nx < width && ny >= 0 && ny < height && !visited[ny][nx]) {
        visited[ny][nx] = true;
        parent[ny][nx] = [cx, cy];
        queue.push([nx, ny]);
      }
    }
  }
  solution = new Set();
  let cur = [width - 1, height - 1];
  while (cur) {
    solution.add(cur[1] * width + cur[0]);
    cur = parent[cur[1]][cur[0]];
  }
}

// Render
const lines = [];
// Top border
let top = '+';
for (let x = 0; x < width; x++) top += '---+';
lines.push(top);

for (let y = 0; y < height; y++) {
  let mid = '|';
  let bot = '+';
  for (let x = 0; x < width; x++) {
    const cell = grid[y][x];
    const inPath = solution && solution.has(y * width + x);
    const body = inPath ? ' · ' : '   ';
    mid += body + ((cell & E) ? ' ' : '|');
    bot += ((cell & S) ? '   ' : '---') + '+';
  }
  lines.push(mid);
  lines.push(bot);
}

console.log(lines.join('\n'));
