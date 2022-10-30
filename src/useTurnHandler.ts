import type { SyntheticEvent, Dispatch, SetStateAction } from 'react';
import { useCallback } from 'react';
import { scanHorizontal, scanVertical, scanAngleLeftRight, scanAngleRightLeft } from './scan';

interface GameState {
    field: boolean[][];
    player: boolean;
    win: boolean;
}

export const useTurnHandler = (setGameStarted: Dispatch<SetStateAction<boolean>>, setGameState: Dispatch<SetStateAction<GameState>>, winCondition: number) => {
    const handleTurn = useCallback((e: SyntheticEvent<HTMLDivElement>) => {
        const { row, cell } = e.currentTarget.dataset;

    if (row && cell) {
      setGameStarted(true);
      setGameState((currentState) => {
        const { player, field } = currentState;
        const rowIndex = Number(row);
        const cellIndex = Number(cell);

        if (typeof field[rowIndex][cellIndex] === 'boolean') {
          return currentState;
        }

        const nextRow = [...field[rowIndex]];

        nextRow[cellIndex] = player;

        const nextState = {
            player: !player,
            field: field.map((currentRow, currentRowIndex) => currentRowIndex === rowIndex ? nextRow : currentRow),
            win: false,
        };

        const scans = [scanHorizontal, scanVertical, scanAngleLeftRight, scanAngleRightLeft];

        nextState.win = scans.some((scanFn) => scanFn(field, player, rowIndex, cellIndex, winCondition));

        return nextState;
      });
    }
    }, [winCondition]);

    return handleTurn;
}
