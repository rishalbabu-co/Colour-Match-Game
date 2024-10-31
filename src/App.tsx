import React, { useEffect } from 'react';
import { Grid } from './components/Grid';
import { useGameStore } from './store/gameStore';

function App() {
  const { initializeGame, score } = useGameStore();

  useEffect(() => {
    initializeGame();
  }, []);

  return (
    <div className="min-h-screen bg-gray-900 flex flex-col items-center justify-center">
      <div className="text-white text-4xl font-bold mb-8">
        Color Match Puzzle
      </div>
      <div className="text-white text-2xl mb-4">
        Score: {score}
      </div>
      <div className="bg-gray-800 p-8 rounded-xl shadow-2xl">
        <Grid />
      </div>
      <button
        onClick={initializeGame}
        className="mt-8 px-6 py-3 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition-colors"
      >
        New Game
      </button>
    </div>
  );
}

export default App;