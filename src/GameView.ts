import { Cell } from "./types/Cell";
import {GameField, IGameField} from "./GameField";

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
    start(field: IGameField);
}

export class GameView implements IGameView {

    element: HTMLElement;

    constructor(element: HTMLElement) {
        this.element = element;
    }

    onCellClick(cb: (x: number, y: number) => void) {

    }

    onFieldSizeChange(cb: (width: number, height: number) => void) {
    }

    onGameStateChange(cb: (newState: boolean) => void) {
    }

    start(gameField: GameField) {
        const table = document.createElement("table");
        for (let i = 0; i < gameField.width; i++) {
            let tr = document.createElement("tr");
            for (let j = 0; j < gameField.height; j++) {
                let td = document.createElement("td");
                td.classList.add('cell');

                td.addEventListener("click", () => {
                    td.style.background = 'black';
                });

                td.innerHTML = `${i},${j}`;
                tr.appendChild(td);
            }
            table.appendChild(tr);
        }

        this.element.appendChild(table);

        const buttonStart = document.createElement("button");
        buttonStart.innerText = 'Start';
        this.element.appendChild(buttonStart);
    }

    updateGameField(field: Cell[][]) {

    }

    updateGameState(state: { width?: number; height?: number; isRunning?: boolean }) {

    }

    //
    // export function addForm(el: Element, x, y) {
    //     const table = document.createElement("table");
    //     for (let i = 0; i < y.valueOf(); i++) {
    //         let tr = document.createElement("tr");
    //         for (let j = 0; j < x.valueOf(); j++) {
    //             let td = document.createElement("td");
    //             td.classList.add('cell');
    //
    //             td.addEventListener("click", () => {
    //                 td.style.background = 'black';
    //             });
    //
    //             td.innerHTML = `i = ${i}, j = ${j}`;
    //             tr.appendChild(td);
    //         }
    //         table.appendChild(tr);
    //     }
    //
    //     el.appendChild(table);
    // }
    //
    //
    // export function getTable(el: Element, x, y) {
    //     const table = document.createElement("table");
    //     for (let i = 0; i < y.valueOf(); i++) {
    //         let tr = document.createElement("tr");
    //         for (let j = 0; j < x.valueOf(); j++) {
    //             let td = document.createElement("td");
    //             td.classList.add('cell');
    //
    //             td.addEventListener("click", () => {
    //                 td.style.background = 'black';
    //             });
    //
    //             td.innerHTML = `i = ${i}, j = ${j}`;
    //             tr.appendChild(td);
    //         }
    //         table.appendChild(tr);
    //     }
    //
    //     el.appendChild(table);
    // }

}