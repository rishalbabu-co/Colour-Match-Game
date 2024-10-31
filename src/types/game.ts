export type CellColor = 'red' | 'blue' | 'green' | 'yellow' | 'purple';
export type Cell = {
  id: string;
  color: CellColor;
  isSelected: boolean;
  isMatched: boolean;
};

export type Position = {
  row: number;
  col: number;
};