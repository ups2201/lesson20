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
  // onCellClick(cb: (x: number, y: number) => void);
  // onGameStateChange(cb: (newState: boolean) => void);
  onFieldSizeChange(cb: (width: number, height: number) => void);
  // start(field: IGameField);
}

export class GameView implements IGameView {
  element: HTMLElement;

  constructor(element: HTMLElement) {
    this.element = element;

    const id = element.getAttribute('id');

    this.element.innerHTML = `
    <section>
        <fieldset>
            <legend>Размеры поля:</legend>
            <label>Ширина:</label><input class="sizeField" id="gameFieldWidth" type="number" min="1">
            <label>Высота:</label><input class="sizeField" id="gameFieldHeight" type="number" min="1">
            <button id="setSize">Задать размер</button>
        </fieldset>
    </section>
    <section>
        <fieldset>
            <legend>Выберите режим работы:</legend>
            <div>
                <input type="radio" id="autoMode" name="${id}__radio" value="autoMode" appId="${id}"/>
                <label for="autoMode">Автоматическая итерация</label>
            </div>
            <div>
                <input type="radio" id="customMode" name="${id}__radio" appId="${id}" value="customMode" checked/>
                <label for="customMode">Ручная итерация</label>
                <button id="nextGeneration" appId="${id}">Следующая фаза</button>
            </div>
        </fieldset>
        <fieldset>
            <legend>Выберите скорость работы:</legend>
            <div>
                <input type="range" id="speed" name="speed" min="1" max="6" value="1" disabled/>
            </div>
            <button id="start" disabled>Старт</button>
            <button id="stop" disabled>Стоп</button>
        </fieldset>
    </section>
    <section class="grid">
        <table class="gameField"></table>
    </section>
    `
  }

  onFieldSizeChange(cb: (width: number, height: number) => void) {
    let gameFieldWidth = Number(
        (this.element.querySelector("#gameFieldWidth") as HTMLInputElement).value,
    );
    let gameFieldHeight = Number(
        (this.element.querySelector("#gameFieldHeight") as HTMLInputElement).value,
    );

    cb(gameFieldWidth, gameFieldHeight);
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


}
