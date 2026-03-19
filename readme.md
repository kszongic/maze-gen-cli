# 🏗️ maze-gen-cli

> Generate beautiful random ASCII mazes from the command line. Zero dependencies. Pure fun.

[![npm version](https://img.shields.io/npm/v/@kszongic/maze-gen-cli)](https://www.npmjs.com/package/@kszongic/maze-gen-cli)
[![npm downloads](https://img.shields.io/npm/dm/@kszongic/maze-gen-cli)](https://www.npmjs.com/package/@kszongic/maze-gen-cli)
[![license](https://img.shields.io/npm/l/@kszongic/maze-gen-cli)](./LICENSE)
[![node](https://img.shields.io/node/v/@kszongic/maze-gen-cli)](https://nodejs.org)
![zero dependencies](https://img.shields.io/badge/dependencies-0-brightgreen)
![platform](https://img.shields.io/badge/platform-win%20%7C%20mac%20%7C%20linux-blue)

```
+---+---+---+---+---+
|       |           |
+   +---+   +---+   +
|   |       |       |
+   +   +---+   +---+
|   |   |       |   |
+   +   +   +---+   +
|       |       |   |
+---+   +---+   +   +
|               |   |
+---+---+---+---+---+
```

## Why?

- 🎲 **Random mazes** with optional seed for reproducibility
- 🧩 **Solution overlay** to see the path from start to exit
- 📐 **Custom dimensions** — tiny 5×5 puzzles or sprawling 50×50 labyrinths
- ⚡ **Zero dependencies** — just Node.js, nothing else
- 🖥️ **Cross-platform** — Windows, macOS, Linux

## Install

```bash
npm install -g @kszongic/maze-gen-cli
```

Or run instantly without installing:

```bash
npx @kszongic/maze-gen-cli
```

## Quick Start

```bash
# Generate a default 10×10 maze
maze-gen

# Small 5×5 puzzle
maze-gen -w 5 -H 5

# Large labyrinth
maze-gen --width 30 --height 20

# Show the solution path
maze-gen --width 8 --height 8 --solution

# Reproducible maze (same seed = same maze)
maze-gen --seed 42
```

## Example Output

### Default maze

```
+---+---+---+---+---+---+---+---+---+---+
|                   |       |           |
+   +---+---+---+   +   +   +   +---+   +
|   |               |   |       |       |
+   +   +---+---+---+   +---+---+   +---+
|   |       |           |           |   |
+   +---+   +   +---+---+   +---+---+   +
|       |   |   |           |           |
+---+   +   +   +   +---+---+   +---+   +
|       |       |       |       |       |
+   +---+---+---+---+   +   +---+   +---+
|                       |               |
+---+---+---+---+---+---+---+---+---+---+
```

### With solution (`--solution`)

```
+---+---+---+---+---+
| . . . |           |
+   +---+   +---+   +
| . |   . . |       |
+ . + . +---+   +---+
| . | . |   . . |   |
+ . + . + . +---+   +
| . . . | . . . |   |
+---+   +---+ . +   +
|           | . . . |
+---+---+---+---+---+
```

The `.` markers trace the shortest path from top-left to bottom-right.

## Options

| Flag | Short | Description | Default |
|------|-------|-------------|---------|
| `--width` | `-w` | Maze width in cells | `10` |
| `--height` | `-H` | Maze height in cells | `10` |
| `--seed` | `-s` | Random seed (integer) for reproducible mazes | random |
| `--solution` | | Show solution path with dots | off |
| `--help` | `-h` | Show help | |

## Use Cases

### 🎓 Teaching algorithms

Maze generation and solving are classic CS topics. Use `maze-gen` to quickly generate examples for:
- **Recursive backtracker** (DFS) — the generation algorithm
- **BFS** — the solution-finding algorithm
- Graph traversal visualization

```bash
# Generate a small maze, show solution, discuss the algorithms
maze-gen -w 6 -H 6 --solution --seed 123
```

### 🧩 Puzzle games

Print mazes for kids, puzzle books, or party games:

```bash
# Generate a tricky maze
maze-gen --width 15 --height 15 --seed 7

# Generate the answer key
maze-gen --width 15 --height 15 --seed 7 --solution
```

### 🎨 ASCII art & terminal decoration

Pipe mazes into other tools, embed in READMEs, or use as terminal screensaver filler:

```bash
# Generate and save to file
maze-gen --width 20 --height 10 > maze.txt

# Use in scripts
while true; do maze-gen -w 40 -H 20; sleep 2; clear; done
```

### 🧪 Testing & benchmarking

Use deterministic mazes (with `--seed`) as test fixtures:

```bash
# Always produces the same maze — great for snapshot tests
maze-gen --width 5 --height 5 --seed 42
```

## Algorithm

**Generation:** [Recursive backtracker](https://en.wikipedia.org/wiki/Maze_generation_algorithm#Randomized_depth-first_search) (randomized depth-first search). Starts from a random cell, carves passages by randomly choosing unvisited neighbors, and backtracks when stuck. Produces mazes with long, winding corridors and no loops.

**Solution:** [Breadth-first search](https://en.wikipedia.org/wiki/Breadth-first_search) (BFS) from the top-left corner to the bottom-right corner. Guarantees the shortest path.

## Comparison

| Tool | Zero deps | CLI | Custom size | Solution | Seed | Cross-platform |
|------|-----------|-----|-------------|----------|------|----------------|
| **maze-gen-cli** | ✅ | ✅ | ✅ | ✅ | ✅ | ✅ |
| [amazejs](https://npmjs.com/package/amazejs) | ❌ | ❌ (library) | ✅ | ✅ | ❌ | ✅ |
| [maze-generator](https://npmjs.com/package/maze-generator) | ❌ | ❌ (library) | ✅ | ❌ | ❌ | ✅ |
| Online maze generators | N/A | ❌ (web) | ✅ | Varies | Varies | N/A |

## Related Tools

Other zero-dependency CLI tools by [kszongic](https://github.com/kszongic):

- [kill-port-cli](https://github.com/kszongic/kill-port-cli) — Find and kill processes using a port
- [dep-size](https://github.com/kszongic/dep-size) — Check npm package size before installing
- [env-lint-cli](https://github.com/kszongic/env-lint-cli) — Lint .env files against .env.example
- [license-maker](https://github.com/kszongic/license-maker) — Generate LICENSE files from the CLI
- [npm-name-check](https://github.com/kszongic/npm-name-check) — Check npm package name availability

## License

MIT © 2026 [kszongic](https://github.com/kszongic)

---

*Made with 🏗️ and zero dependencies.*
