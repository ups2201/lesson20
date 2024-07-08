import { GameField, IGameField } from "./GameField";
import { GameView, IGameView } from "./GameView";
import { Cell, Status } from "./types/Cell";

export interface IGame {
  execute();
}

export class Game implements IGame {
  gameField: GameField;
  gameView: GameView;
  timeoutRefresh: number;
  speed: number = 1;
  state: Cell[][];
  public isRunning: boolean = false;
  public iteration: number = 0;
  myTimer: NodeJS.Timeout;

  constructor(
    gameField: GameField,
    gameView: GameView,
    timeoutRefresh?: number,
  ) {
    this.gameField = gameField as GameField;
    this.gameView = gameView as GameView;
    this.timeoutRefresh = timeoutRefresh;
    this.state = gameField.getState();
    gameView.updateGameField(gameField.getState());
    // gameView.updateGameState({
    //     isRunning: false,
    //     width: this.state[0].length,
    //     height: this.state.length
    // })

    const setSizeButton = this.gameView.element.querySelector("#setSize");
    setSizeButton.addEventListener("click", () => {
      let gameFieldWidth = Number(
        (this.gameView.element.querySelector("#gameFieldWidth") as HTMLInputElement).value,
      );
      let gameFieldHeight = Number(
        (this.gameView.element.querySelector("#gameFieldHeight") as HTMLInputElement).value,
      );

      this.gameField.setSize(gameFieldWidth, gameFieldHeight);
      this.gameView.updateGameField(this.gameField.getState());
    });

    const nextGenerationButton = this.gameView.element.querySelector("#nextGeneration");
    nextGenerationButton.addEventListener("click", () => {
      switch (this.iteration % 2) {
        case 0:
          this.gameField.nextFaze1();
          break;
        case 1:
          this.gameField.nextFaze2();
          break;
        default:
          return;
      }
      this.gameView.updateGameField(this.gameField.getState());
      this.iteration++;
    });

    this.gameView.element.addEventListener("click", (ev) => {
      if (ev.target instanceof HTMLTableCellElement) {
        let y = ev.target.closest("tr").rowIndex;
        let x = ev.target.cellIndex;
        console.log(x);
        console.log(y);
        this.gameField.toggleCellState(x, y);
        this.gameView.updateGameField(this.gameField.getState());
      }
    });

    this.gameView.element.querySelector("#speed").addEventListener("input", (ev) => {
      this.speed = Number((ev.target as HTMLInputElement).value);
    });

    this.gameView.element.querySelector("#start").addEventListener("click", () => {
      (this.gameView.element.querySelector('#start') as HTMLButtonElement).disabled = true;
      (this.gameView.element.querySelector('#stop') as HTMLButtonElement).disabled = false;
      (this.gameView.element.querySelector('#speed') as HTMLInputElement).disabled = true;
      this.execute();
    });

    this.gameView.element.querySelector("#stop").addEventListener("click", () => {
      (this.gameView.element.querySelector('#start') as HTMLButtonElement).disabled = false;
      (this.gameView.element.querySelector('#stop') as HTMLButtonElement).disabled = true;
      (this.gameView.element.querySelector('#speed') as HTMLInputElement).disabled = false;
      this.stop();
    });

    this.gameView.element.querySelectorAll('input[type=radio]').forEach(
        (radio => {
          radio.addEventListener('click', (event) =>{
            const id = (event.target as HTMLInputElement).getAttribute('id');

            const nextGeneration = this.gameView.element.querySelector('#nextGeneration') as HTMLButtonElement;
            const startButton = this.gameView.element.querySelector('#start') as HTMLButtonElement;
            const stopButton = this.gameView.element.querySelector('#stop') as HTMLButtonElement;
            const speedRange = this.gameView.element.querySelector('#speed') as HTMLInputElement;

            if (id === "autoMode") {
              nextGeneration.disabled = true;
              startButton.disabled = false;
              stopButton.disabled = true;
              speedRange.disabled = false;
            } else {
              nextGeneration.disabled = false;
              startButton.disabled = true;
              stopButton.disabled = true;
              speedRange.disabled = true;
            }
          });
        })
    )
  }

  getTimeoutRefresh() {
    console.log(this.timeoutRefresh / this.speed);
    return this.timeoutRefresh / this.speed;
  }

  stop() {
    clearInterval(this.myTimer);
  }

  execute() {
    this.gameView.updateGameField(this.gameField.getState());
    this.myTimer = setInterval(() => {
      const nextGenerationButton = this.gameView.element.querySelector("#nextGeneration");
      nextGenerationButton.dispatchEvent(new Event("click"));
    }, this.getTimeoutRefresh());
  }

  onFieldSizeChange() {
    let gameFieldWidth = Number(
      this.gameView.element.querySelector("#gameFieldWidth"),
    );
    let gameFieldHeight = Number(
      this.gameView.element.querySelector("#gameFieldHeight"),
    );

    this.gameField.setSize(gameFieldWidth, gameFieldHeight);
    this.gameView.updateGameField(this.gameField.getState());
  }

  /**
   * Все мёртвые клетки
   * @param gameField
   */
  isAllDeadCells(gameField: GameField): boolean {
    return (
      Array.prototype.concat
        .apply([], gameField.getState())
        .filter((cell) => cell.getStatus() === Status.LIVING).length === 0
    );
  }
}

function isAllDeadCells(gameField: IGameField) {
  return (
    Array.prototype.concat
      .apply([], gameField.getState())
      .filter((cell) => cell.getStatus() === Status.LIVING).length === 0
  );
}
