import type { SyntheticEvent } from 'react';
import { useState, useCallback, useEffect } from 'react';
import { useTurnHandler } from './useTurnHandler';
import { WinConditionSelector } from './WinConditionSelector';
import { PlayerInfo } from './PlayerInfo';
import { Cell } from './Cell';
import './App.css'

const FIELD_WIDTH = 10;
const FIELD_HEIGHT = 10;

const FIELD: boolean[][] = new Array(FIELD_HEIGHT).fill(new Array(FIELD_WIDTH).fill(null));

const fieldRowStyle = { gridTemplateColumns: `repeat(${FIELD_WIDTH}, 1fr)` };

function App() {
  const [gameStarted, setGameStarted] = useState(false);
  const [winCondition, setWinCondition] = useState(3);
  const [gameState, setGameState] = useState({
    field: FIELD,
    player: true,
    win: false,
  });

  const handleReset = useCallback(() => {
    setGameStarted(false);
    setGameState({
      field: FIELD,
      player: true,
      win: false,
    });
  }, []);

  useEffect(() => {
    if (gameState.win) {
      alert('Win!');
      handleReset();
    }
  }, [gameState.win, handleReset])

  const handleTurn = useTurnHandler(setGameStarted, setGameState, winCondition);

  const handleWinConditionChange = useCallback((e: SyntheticEvent<HTMLSelectElement>) => {
    setWinCondition(Number(e.currentTarget.value));
  }, []);

  return (
    <div className="App">
      <div className="panel">
        <div>
          <WinConditionSelector onChange={handleWinConditionChange} disabled={gameStarted} /> 
        </div>
        <div><PlayerInfo turn={gameState.player} /></div>
        <div>
          <button onClick={handleReset} disabled={!gameStarted}>Начать заново</button>
        </div>
      </div>
      <div className="field" style={fieldRowStyle}>
        {gameState.field.map((row, rowIndex) => row.map((cell, cellIndex) => (
          <Cell
            key={`${rowIndex}_${cellIndex}`}
            row={rowIndex}
            cell={cellIndex}
            onClick={handleTurn}
            state={cell}
          />
        )))}
      </div>
    </div>
  )
}

export default App
