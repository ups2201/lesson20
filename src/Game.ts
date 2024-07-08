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
      this.gameView.onFieldSizeChange(this.gameField.setSize.bind(this.gameField));
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
        const cell = ev.target as HTMLTableCellElement;
        this.gameView.onCellClick(cell, this.gameField.toggleCellState.bind(this.gameField));
      }
    });

    this.gameView.element.querySelector("#speed").addEventListener("input", (ev) => {
      this.speed = Number((ev.target as HTMLInputElement).value);
    });

    this.gameView.element.querySelector("#start").addEventListener("click", () => {
      this.gameView.startButton.disabled = true;
      this.gameView.stopButton.disabled = false;
      this.gameView.speedRange.disabled = true;
      this.execute();
    });

    this.gameView.element.querySelector("#stop").addEventListener("click", () => {
      this.gameView.startButton.disabled = false;
      this.gameView.stopButton.disabled = true;
      this.gameView.speedRange.disabled = false;
      this.stop();
    });

    this.gameView.element.querySelectorAll('input[type=radio]').forEach(
        (radio => {
          radio.addEventListener('click', (event) =>{
            const id = (event.target as HTMLInputElement).getAttribute('id');
            if (id === "autoMode") {
              this.gameView.nextGeneration.disabled = true;
              this.gameView.startButton.disabled = false;
              this.gameView.stopButton.disabled = true;
              this.gameView.speedRange.disabled = false;
            } else {
              this.gameView.nextGeneration.disabled = false;
              this.gameView.startButton.disabled = true;
              this.gameView.stopButton.disabled = true;
              this.gameView.speedRange.disabled = true;
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
      this.gameView.nextGeneration.dispatchEvent(new Event("click"));
    }, this.getTimeoutRefresh());
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
