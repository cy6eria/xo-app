const checkDiff = (leftPointer: number, rightPointer: number, winCondition: number) => {
    const diff = rightPointer - leftPointer + 1;

    return diff === winCondition;
}

interface Config {
    leftPointer: number;
    rightPointer: number;
    getLeftElement: (currentLeftPointer: number) => boolean;
    getRightElement: (currentRightPointer: number) => boolean;
}

const scan = (field: boolean[][], player: boolean, row: number, cell: number, winCondition: number, config: Config) => {
    let leftPointer = config.leftPointer;
    let rightPointer = config.rightPointer;
    let win = false;

    while (!win) {
        if (config.getLeftElement(leftPointer) === player) {
            leftPointer -= 1;

            if (checkDiff(leftPointer, rightPointer, winCondition)) {
                win = true
                break;
            }
        } else {
            break;
        }
    }

    while (!win) {
        if (config.getRightElement(rightPointer) === player) {
            rightPointer += 1;

            if (checkDiff(leftPointer, rightPointer, winCondition)) {
                win = true
                break;
            }
        } else {
            break;
        }
    }

    return win;
}

export const scanHorizontal = (field: boolean[][], player: boolean, row: number, cell: number, winCondition: number) => {
    return scan(field, player, row, cell, winCondition, {
        leftPointer: cell,
        rightPointer: cell,
        getLeftElement: (leftPointer: number) => field[row][leftPointer - 1],
        getRightElement: (rightPointer: number) => field[row][rightPointer + 1],
    });
}

export const scanVertical = (field: boolean[][], player: boolean, row: number, cell: number, winCondition: number) => {
    return scan(field, player, row, cell, winCondition, {
        leftPointer: row,
        rightPointer: row,
        getLeftElement: (leftPointer: number) => field[leftPointer - 1]?.[cell],
        getRightElement: (rightPointer: number) => field[rightPointer + 1]?.[cell],
    });
}

export const scanAngleLeftRight = (field: boolean[][], player: boolean, row: number, cell: number, winCondition: number) => {
    return scan(field, player, row, cell, winCondition, {
        leftPointer: cell,
        rightPointer: cell,
        getLeftElement: (leftPointer: number) => field[row - (cell - leftPointer) - 1]?.[leftPointer - 1],
        getRightElement: (rightPointer: number) => field[row + (rightPointer - cell) + 1]?.[rightPointer + 1],
    });
}

export const scanAngleRightLeft = (field: boolean[][], player: boolean, row: number, cell: number, winCondition: number) => {
    return scan(field, player, row, cell, winCondition, {
        leftPointer: cell,
        rightPointer: cell,
        getLeftElement: (leftPointer: number) => field[row + (cell - leftPointer) + 1]?.[leftPointer - 1],
        getRightElement: (rightPointer: number) => field[row - (rightPointer - cell) - 1]?.[rightPointer + 1],
    });
}

