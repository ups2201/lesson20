import { Cell, Status } from "./types/Cell";
import { GameField, IGameField } from "./GameField";
import { Game } from "./Game";

export interface IGameView {
  updateGameField(field: Cell[][]);
  // updateGameState(state: {
  //     width?: number;
  //     height?: number;
  //     isRunning?: boolean;
  // });
  onCellClick(cb: (x: number, y: number) => void);
  // onGameStateChange(cb: (newState: boolean) => void);
  // onFieldSizeChange(cb: (width: number, height: number) => void);
  // start(field: IGameField);
}

export class GameView implements IGameView {
  element: HTMLElement;

  constructor(element: HTMLElement) {
    this.element = element;
  }

  onFieldSizeChange() {
    let gameFieldWidth = Number(this.element.querySelector("#gameFieldWidth"));
    let gameFieldHeight = Number(
      this.element.querySelector("#gameFieldHeight"),
    );
  }

  onGameStateChange(cb: (newState: boolean) => void) {}

  updateGameField(field: Cell[][]) {
    let table = this.element.querySelector(".gameField");
    table.remove();
    table = document.createElement("table");
    table.classList.add("gameField");

    for (let i = 0; i < field.length; i++) {
      let tr = document.createElement("tr");
      for (let j = 0; j < field[i].length; j++) {
        tr.appendChild(field[i][j].cellElement);
      }
      table.appendChild(tr);
    }
    this.element.querySelector(".grid").appendChild(table);
  }

  onCellClick(cb: (x: number, y: number) => void) {
    const cells = document.querySelectorAll("td");
    cells.forEach((cell) => {
      cell.addEventListener("click", () => {
        let y = cell.closest("tr").rowIndex;
        let x = cell.cellIndex;
        this.gameField.toggleCellState(x, y);
        this.gameView.updateGameField(this.gameField.getState());
      });
    });
  }
}
