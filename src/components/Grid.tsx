import React from 'react';
import { Cell } from './Cell';
import { useGameStore } from '../store/gameStore';

export const Grid: React.FC = () => {
  const { grid, selectCell } = useGameStore();

  return (
    <div className="grid gap-2 p-4">
      {grid.map((row, rowIndex) => (
        <div key={rowIndex} className="flex gap-2">
          {row.map((cell, colIndex) => (
            <Cell
              key={cell.id}
              cell={cell}
              onClick={() => selectCell(rowIndex, colIndex)}
            />
          ))}
        </div>
      ))}
    </div>
  );
};