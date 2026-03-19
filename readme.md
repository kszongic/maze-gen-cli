# maze-gen-cli

[![npm version](https://img.shields.io/npm/v/@kszongic/maze-gen-cli)](https://www.npmjs.com/package/@kszongic/maze-gen-cli)
[![license](https://img.shields.io/npm/l/@kszongic/maze-gen-cli)](./LICENSE)

Generate random ASCII mazes from the command line. Zero dependencies.

## Install

```bash
npm install -g @kszongic/maze-gen-cli
```

## Usage

```bash
# Default 10×10 maze
maze-gen

# Custom size
maze-gen --width 20 --height 15

# With solution path
maze-gen --width 8 --height 8 --solution

# Reproducible with seed
maze-gen --seed 42
```

## Example Output

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

## Options

| Flag | Description | Default |
|------|-------------|---------|
| `--width`, `-w` | Maze width in cells | `10` |
| `--height`, `-H` | Maze height in cells | `10` |
| `--seed`, `-s` | Random seed (integer) | random |
| `--solution` | Show solution path with dots | off |
| `--help`, `-h` | Show help | |

## Algorithm

Uses recursive backtracker (randomized DFS) for maze generation and BFS for solution finding.

## License

MIT © 2026 kszongic
