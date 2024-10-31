import { create } from 'zustand';
import { Cell, CellColor, Position } from '../types/game';

interface GameState {
  grid: Cell[][];
  score: number;
  selectedCell: Position | null;
  initializeGame: () => void;
  selectCell: (row: number, col: number) => void;
  checkMatch: () => void;
}

const COLORS: CellColor[] = ['red', 'blue', 'green', 'yellow', 'purple'];
const GRID_SIZE = 6;

const createInitialGrid = (): Cell[][] => {
  const grid: Cell[][] = [];
  for (let i = 0; i < GRID_SIZE; i++) {
    grid[i] = [];
    for (let j = 0; j < GRID_SIZE; j++) {
      grid[i][j] = {
        id: `${i}-${j}`,
        color: COLORS[Math.floor(Math.random() * COLORS.length)],
        isSelected: false,
        isMatched: false,
      };
    }
  }
  return grid;
};

export const useGameStore = create<GameState>()((set, get) => ({
  grid: createInitialGrid(), // Initialize grid when store is created
  score: 0,
  selectedCell: null,

  initializeGame: () => {
    const newGrid = createInitialGrid();
    set({ grid: newGrid, score: 0, selectedCell: null });
  },

  selectCell: (row: number, col: number) => {
    const { grid, selectedCell } = get();
    const newGrid = JSON.parse(JSON.stringify(grid)); // Deep clone to ensure state updates

    if (selectedCell) {
      // Deselect if clicking the same cell
      if (selectedCell.row === row && selectedCell.col === col) {
        newGrid[row][col].isSelected = false;
        set({ grid: newGrid, selectedCell: null });
        return;
      }

      // Check if cells are adjacent
      const isAdjacent = Math.abs(selectedCell.row - row) + Math.abs(selectedCell.col - col) === 1;
      if (isAdjacent) {
        newGrid[row][col].isSelected = true;
        set({ grid: newGrid, selectedCell: { row, col } }, false);
        get().checkMatch();
        return;
      }
    }

    // Clear previous selections
    newGrid.forEach(row => row.forEach(cell => cell.isSelected = false));
    newGrid[row][col].isSelected = true;
    set({ grid: newGrid, selectedCell: { row, col } });
  },

  checkMatch: () => {
    const { grid, selectedCell } = get();
    if (!selectedCell) return;

    const selected = grid[selectedCell.row][selectedCell.col];
    let matches = 0;

    // Check adjacent cells for matches
    const directions = [[-1, 0], [1, 0], [0, -1], [0, 1]];
    for (const [dx, dy] of directions) {
      const newRow = selectedCell.row + dx;
      const newCol = selectedCell.col + dy;

      if (
        newRow >= 0 && newRow < GRID_SIZE &&
        newCol >= 0 && newCol < GRID_SIZE &&
        grid[newRow][newCol].color === selected.color &&
        grid[newRow][newCol].isSelected
      ) {
        matches++;
      }
    }

    if (matches > 0) {
      const newGrid = JSON.parse(JSON.stringify(grid)); // Deep clone to ensure state updates
      const newScore = get().score + (matches * 10);

      // Mark matched cells
      newGrid[selectedCell.row][selectedCell.col].isMatched = true;
      directions.forEach(([dx, dy]) => {
        const newRow = selectedCell.row + dx;
        const newCol = selectedCell.col + dy;
        if (
          newRow >= 0 && newRow < GRID_SIZE &&
          newCol >= 0 && newCol < GRID_SIZE &&
          newGrid[newRow][newCol].color === selected.color
        ) {
          newGrid[newRow][newCol].isMatched = true;
        }
      });

      set({ grid: newGrid, score: newScore, selectedCell: null });
    }
  },
}));