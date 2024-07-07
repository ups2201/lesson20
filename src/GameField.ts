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
                this.state[i][j] = new Cell(i,j,Status.DEAD);
                // this.state[i][j] = new Cell(i,j,Status.LIVING);
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
        console.log(Date.now())

        let neededModifyCellAndNeighboring = new Set<Cell>();

        // Ищем ячеки которые необходимо проверить для следующей итерации, добавляем к ним соседние ячейки
        const neededModifyCell = this.state.map(row => row.filter(column => column.getStatus() === Status.LIVING));
        neededModifyCell.forEach((row) => {
            row.forEach((cell) => {
                console.log(`${cell.x}, ${cell.y}, ${cell.getStatus()}`)
                neededModifyCellAndNeighboring.add(cell);
                const neighboringCells = this.getNeighboringCells(cell.x, cell.y);
                neighboringCells.forEach((e) => neededModifyCellAndNeighboring.add(e));
            })
        })
        console.log(neededModifyCell);
        console.log(neededModifyCellAndNeighboring);

        const newGenerationField = new GameField(this.width, this.height);
        let ar = newGenerationField.getState();

        neededModifyCellAndNeighboring.forEach((cell) => {
            const i = cell.x;
            const j = cell.y;

            const neighboringCells = this.getNeighboringCells(i, j);

            // Определяем живые соседние клетки
            const neighboringCellsLiving = neighboringCells
                .filter(cell => cell.getStatus() === Status.LIVING);

            if (cell.getStatus() === Status.DEAD && neighboringCellsLiving.length === 3) {
                ar[i][j] = new Cell(i, j, Status.LIVING);
                return;
            }

            if (cell.getStatus() === Status.LIVING && [2,3].includes(neighboringCellsLiving.length)) {
                ar[i][j] = new Cell(i, j, Status.LIVING);
            } else {
                ar[i][j] =new Cell(i, j, Status.DEAD);
            }
        })

        this.state = ar;
        console.log(this.state);
    }

    changeState(cell: Cell): Cell {
        const neighboringCells = this.getNeighboringCells(cell.x, cell.y);
        // console.log(neighboringCells)

        // Определяем живые соседние клетки
        const neighboringCellsLiving = neighboringCells
            .filter(cell => cell.getStatus() === Status.LIVING);

        if (cell.getStatus() === Status.DEAD && neighboringCellsLiving.length === 3) {
            console.log("length === 3")
            return new Cell(cell.x, cell.y, Status.LIVING, cell.cellElement);
        }

        if (cell.getStatus() === Status.LIVING && [2,3].includes(neighboringCellsLiving.length)) {
            console.log("length === [2,3]")
            return new Cell(cell.x, cell.y, Status.LIVING, cell.cellElement);
        } else {
            console.log("length === else")
            return new Cell(cell.x, cell.y, Status.DEAD, cell.cellElement);
        }
    }

    setSize(width: number, height: number) {
        const newState = [[]];

        for (let i = 0; i < height; i++) {
            newState[i] = [];
            for (let j = 0; j < width; j++) {
                newState[i][j] = this.state[i] && this.state[i][j] ? this.state[i][j] : new Cell(i,j,Status.DEAD);
            }
        }
        this.width = width;
        this.height = height;
        this.state = newState;
    }

    toggleCellState(x: number, y: number) {
        // const cell = this.state[y][x];
        // cell.cellElement.class

        // this.state[y][x] = this.state[y][x].getStatus() === Status.DEAD ? new Cell(x,y,Status.LIVING): new Cell(x,y,Status.DEAD);
        // this.state[y][x] = this.state[y][x].getStatus() === Status.DEAD ? this.state[y][x].setStatus(Status.LIVING): new Cell(x,y,Status.DEAD);
        if (this.state[y][x].getStatus() === Status.DEAD) {
            this.state[y][x].setStatus(Status.LIVING);
        } else {
            this.state[y][x].setStatus(Status.DEAD)
        }

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