import {Cell, Status} from "./types/Cell";

export interface IGameField {
    getState(): Cell[][];
    toggleCellState(x: number, y: number);
    nextGeneration();
    setSize(width: number, height: number);
}

export class GameField implements IGameField {
    width: number;
    height: number;
    state: Cell[][];

    constructor(width: number = 0, height: number = 0) {
        this.width = width;
        this.height = height;
        this.state = [[]];

        for (let i = 0; i < height; i++) {
            this.state[i] = [];
            for (let j = 0; j < width; j++) {
                this.state[i][j] = new Cell(Status.DEAD);
            }
        }
    }

    getState(): Cell[][] {
        const gameField = [[]];

        for (let i = 0; i < this.height; i++) {
            gameField[i] = [];
            for (let j = 0; j < this.width; j++) {
                gameField[i][j] = this.state[i][j];
            }
        }

        return gameField;
    }

    nextGeneration() {

        const newGenerationField = new GameField(this.width, this.height);
        for (let i = 0; i < this.height; i++) {
            for (let j = 0; j < this.width; j++) {
                const cell = this.state[i][j];
                const neighboringCells = this.getNeighboringCells(i, j);

                // Определяем живые соседние клетки
                const neighboringCellsLiving = neighboringCells
                    .filter(cell => cell.getStatus() === Status.LIVING);

                if (cell.getStatus() === Status.DEAD && neighboringCellsLiving.length === 3) {
                    newGenerationField.getState()[i][j].setStatus(Status.LIVING)
                    continue;
                }

                if (cell.getStatus() === Status.LIVING && [2,3].includes(neighboringCellsLiving.length)) {
                    newGenerationField.getState()[i][j].setStatus(Status.LIVING);
                } else {
                    newGenerationField.getState()[i][j].setStatus(Status.DEAD);
                }
            }
        }

        for (let i = 0; i < this.height; i++) {
            for (let j = 0; j < this.width; j++) {
                const cell = newGenerationField.getState()[i][j];
                const neighboringCells = this.getNeighboringCells(i, j);

                const neighboringCellsLiving = neighboringCells
                    .filter(cell => cell.getStatus() === Status.LIVING);

                if (cell.getStatus() === Status.LIVING && (neighboringCellsLiving.length < 2 || neighboringCellsLiving.length > 3)) {
                    cell.setStatus(Status.MUST_DIE);
                }
            }
        }

        this.state = newGenerationField.getState();
    }

    setSize(width: number, height: number) {
        const newState: Cell[][] = [];

        for (let i = 0; i < height; i++) {
            newState[i] = [];
            for (let j = 0; j < width; j++) {
                newState[i][j] = this.state[i] && this.state[i][j] ? this.state[i][j] : new Cell(Status.DEAD);
            }
        }
        this.width = width;
        this.height = height;
        this.state = newState;
    }

    toggleCellState(x: number, y: number) {
        this.state[y][x] = this.state[y][x].getStatus() === Status.DEAD ? new Cell(Status.LIVING): new Cell(Status.DEAD);
        console.log(`click cell ${x} ${y}`)
    }

    /**
     * Получаем соседние клетки
     * @param x
     * @param y
     */
    getNeighboringCells(x: number, y: number): Cell[] {
        const neighboringCells = [];

        neighboringCells.push(this.getCellValue(x-1,y))
        neighboringCells.push(this.getCellValue(x-1,y+1))
        neighboringCells.push(this.getCellValue(x-1,y-1))
        neighboringCells.push(this.getCellValue(x+1,y))
        neighboringCells.push(this.getCellValue(x+1,y+1))
        neighboringCells.push(this.getCellValue(x+1,y-1))
        neighboringCells.push(this.getCellValue(x,y+1))
        neighboringCells.push(this.getCellValue(x,y-1))

        return neighboringCells.filter(e => e != undefined);
    }

    getCellValue(x: number, y: number): Cell {
        try {
            return this.state[x][y];
        } catch (e) {
            return undefined;
        }
    }
}