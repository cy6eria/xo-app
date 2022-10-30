import React from 'react';

interface PlayerInfoProps {
    turn: boolean;
}

export const PlayerInfo = (props: PlayerInfoProps) => {
    const { turn } = props;

    return (
        <>Ходит игрок: {turn ? '1' : '2'}</>
    );
}
