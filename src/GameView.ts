import {Cell, Status} from "./types/Cell";
import {GameField, IGameField} from "./GameField";
import {Game} from "./Game";

export interface IGameView {
    updateGameField(field: Cell[][]);
    updateGameState(state: {
        width?: number;
        height?: number;
        isRunning?: boolean;
    });
    onCellClick(cb: (x: number, y: number) => void);
    onGameStateChange(cb: (newState: boolean) => void);
    onFieldSizeChange(cb: (width: number, height: number) => void);
    // start(field: IGameField);
}

export class GameView implements IGameView {
    element: HTMLElement;
    // field: Cell[][];
    // x: number;
    // y: number;

    constructor(element: HTMLElement) {
        const table = document.createElement("table");
        table.classList.add('gameField');
        element.appendChild(table);
        this.element = element;

        let buttonStart = document.createElement("button");
        buttonStart.innerText = 'Start';
        this.element.appendChild(buttonStart);
    }

    click(x: number, y: number): void {
        let tr = this.element.querySelectorAll("tr");
        tr[x].querySelectorAll('td')[y].dispatchEvent(
            new Event("click", {
                bubbles: true
            })
        );
        tr[x].querySelectorAll('td')[y].style.background = 'black';
    }

    onCellClick(cb: (x: number, y: number) => void) {
        // this.element.querySelector(".cell").dispatchEvent(
        //     new Event("click", {
        //         bubbles: true
        //     })
        // );
    }

    onFieldSizeChange(cb: (width: number, height: number) => void) {
    }

    onGameStateChange(cb: (newState: boolean) => void) {
    }

    updateGameField(field: Cell[][]) {
        let table = this.element.querySelector('.gameField');
        table.remove();
        table = document.createElement("table");
        table.classList.add('gameField');

        for (let i = 0; i < field.length; i++) {
            let tr = document.createElement("tr");
            for (let j = 0; j < field[i].length; j++) {
                let td = document.createElement("td");
                td.classList.add('cell');
                td.setAttribute('x', i);
                td.setAttribute('y', j);
                td.classList.add('cell');
                td.classList.add(GameView.getClassElement(field[i][j]))
                td.innerHTML = `${i},${j}`;
                tr.appendChild(td);
            }
            table.appendChild(tr);
        }
        this.element.appendChild(table);
        // this.field = field;
    }

    updateGameState(state: { width?: number; height?: number; isRunning?: boolean }) {
        // Game.isRunning = state.isRunning;

    }

    public static getClassElement(cell: Cell): string {
        if (cell.getStatus() === Status.LIVING) {
            return 'cell--alive';
        }
        if (cell.getStatus() === Status.DEAD) {
            return 'cell--dead';
        }
        if (cell.getStatus() === Status.MUST_DIE) {
            return 'cell--must_die';
        }
    }

}