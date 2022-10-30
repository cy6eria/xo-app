import React from 'react';
import type { SyntheticEvent } from 'react';

interface WinConditionSelectorProps {
    onChange: (e: SyntheticEvent<HTMLSelectElement>) => void; 
    disabled: boolean;
}

export const WinConditionSelector = (props: WinConditionSelectorProps) => {
    const { onChange, disabled } = props;
    return (
        <>
            Условия победы:&nbsp;&nbsp;
            <select onChange={onChange} disabled={disabled}>
                <option value="3">3</option>
                <option value="4">4</option>
                <option value="5">5</option>
            </select>
        </>
    );
}
