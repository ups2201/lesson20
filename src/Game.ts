import {GameField, IGameField} from "./GameField";
import {GameView, IGameView} from "./GameView";
import {Status} from "./types/Cell";

export interface IGame {
    execute();
}

export class Game implements IGame {
    gameField: IGameField;
    gameView: IGameView;
    timeoutRefresh: number;

    constructor(gameField: IGameField, gameView: IGameView, timeoutRefresh?: number) {
        this.gameField = gameField;
        this.gameView = gameView;
        this.timeoutRefresh = timeoutRefresh;
    }

    start() {
        this.gameView.start(this.gameField);
    }

    execute() {

        // this.gameView.updateGameField(this.gameField.getState());

        this.gameView.updateGameState({
            width: this.gameField.width,
            height: this.gameField.height,
            isRunning: true
        })

        let myTimer = setInterval(() => {

            if (isAllDeadCells(this.gameField)) {
                clearInterval(myTimer);
                alert("GAME OVER")
            }
        }, this.timeoutRefresh);
    }

    /**
     * Все мёртвые клетки
     * @param gameField
     */
    isAllDeadCells(gameField: GameField): boolean {
        return Array.prototype.concat
            .apply([], gameField.getState())
            .filter(cell => cell.getStatus() === Status.LIVING)
            .length === 0;
    }
}

function isAllDeadCells(gameField: IGameField) {
    return Array.prototype.concat
        .apply([], gameField.getState())
        .filter(cell => cell.getStatus() === Status.LIVING)
        .length === 0;
}