import React from 'react';
import { Cell as CellType } from '../types/game';

interface CellProps {
  cell: CellType;
  onClick: () => void;
}

export const Cell: React.FC<CellProps> = ({ cell, onClick }) => {
  const baseClasses = "w-16 h-16 rounded-lg transition-all duration-300 cursor-pointer transform hover:scale-105";
  const colorClasses = {
    red: "bg-red-500",
    blue: "bg-blue-500",
    green: "bg-green-500",
    yellow: "bg-yellow-500",
    purple: "bg-purple-500"
  };

  const classes = `
    ${baseClasses}
    ${colorClasses[cell.color]}
    ${cell.isSelected ? 'ring-4 ring-white' : ''}
    ${cell.isMatched ? 'opacity-50' : ''}
  `;

  return (
    <div
      className={classes}
      onClick={onClick}
    />
  );
};