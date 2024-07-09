import { GameField } from "./GameField";
import { GameView } from "./GameView";
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
  autoMode: boolean = false;

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

    const setSizeButton = this.gameView.element.querySelector("#setSize");
    setSizeButton.addEventListener("click", () => {
      this.gameView.onFieldSizeChange(
        this.gameField.setSize.bind(this.gameField),
      );
      this.gameView.updateGameField(this.gameField.getState());
    });

    const nextGenerationButton =
      this.gameView.element.querySelector("#nextGeneration");
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
      this.checkIsAllDeadCells();
    });

    this.gameView.element.addEventListener("click", (ev) => {
      if (ev.target instanceof HTMLTableCellElement) {
        const cell = ev.target as HTMLTableCellElement;
        this.gameView.onCellClick(
          cell,
          this.gameField.toggleCellState.bind(this.gameField),
        );
      }
    });

    this.gameView.element
      .querySelector("#speed")
      .addEventListener("input", (ev) => {
        this.speed = Number((ev.target as HTMLInputElement).value);
      });

    this.gameView.element
      .querySelector("#start")
      .addEventListener("click", () => {
        this.gameView.startButton.disabled = true;
        this.gameView.stopButton.disabled = false;
        this.gameView.speedRange.disabled = true;
        this.execute();
      });

    this.gameView.element
      .querySelector("#stop")
      .addEventListener("click", () => {
        this.gameView.startButton.disabled = false;
        this.gameView.stopButton.disabled = true;
        this.gameView.speedRange.disabled = false;
        this.stop();
      });

    this.gameView.element
      .querySelectorAll("input[type=radio]")
      .forEach((radio) => {
        radio.addEventListener("click", (event) => {
          const id = (event.target as HTMLInputElement).getAttribute("id");
          if (id === "autoMode") {
            this.autoMode = true;
          } else {
            this.autoMode = false;
          }
          this.gameView.onChangeModeView(this.autoMode);
        });
      });
  }

  getTimeoutRefresh() {
    console.log(this.timeoutRefresh / this.speed);
    return this.timeoutRefresh / this.speed;
  }

  stop() {
    clearInterval(this.myTimer);
    this.gameView.onChangeModeView(this.autoMode);
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
  checkIsAllDeadCells(): boolean {
    const result =
      Array.prototype.concat
        .apply([], this.gameField.getState())
        .filter(
          (cell) =>
            cell.getStatus() === Status.LIVING ||
            cell.getStatus() === Status.MUST_DIE,
        ).length === 0;
    if (result) {
      this.stop();
      alert("Игра окончена, все клетки умерли");
      return true;
    }
  }
}
