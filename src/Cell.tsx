import React from 'react';
import type { SyntheticEvent } from 'react';

interface CellProps {
    row: number;
    cell: number;
    state: boolean | null;
    onClick: (e: SyntheticEvent<HTMLDivElement>) => void;
}

export const Cell = (props: CellProps) => {
    const { row, cell, state, onClick } = props;

    return (
        <div
            className="cell"
            data-row={row}
            data-cell={cell}
            onClick={onClick}
          >
            {state === true && 'X'}
            {state === false && 'O'}
          </div>
    );
}
