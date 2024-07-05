import { Cell } from "./types/Cell";

export interface IGameField {
    getState(): Cell[][];
    toggleCellState(x: number, y: number);
    nextGeneration();
    setSize(width: number, height: number);
}

export class GameField implements IGameField {
    private width: number;
    private height: number;
    state: Cell[][];

    constructor(width: number = 0, height: number = 0) {
        this.width = width;
        this.height = height;
        this.state = [];

        for (let i = 0; i < height; i++) {
            this.state[i] = [];
            for (let j = 0; j < width; j++) {
                this.state[i][j] = 0;
            }
        }

    }

    getState(): Cell[][] {
        console.log(this.state)
        return this.state;
    }

    nextGeneration() {
    }

    setSize(width: number, height: number) {
        const newState: Cell[][] = [];

        for (let i = 0; i < height; i++) {
            newState[i] = [];
            for (let j = 0; j < width; j++) {
                newState[i][j] = this.state[i] && this.state[i][j] ? this.state[i][j] : 0;
            }
        }

        this.state = newState;
    }

    toggleCellState(x: number, y: number) {
        this.state[y][x] = this.state[y][x] === 0 ? 1: 0;
    }

}