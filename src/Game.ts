import {GameField, IGameField} from "./GameField";
import {GameView, IGameView} from "./GameView";
import {Cell, Status} from "./types/Cell";

export interface IGame{
    execute();
}

export class Game implements IGame {
    gameField: IGameField;
    gameView: IGameView;
    timeoutRefresh: number;
    state : Cell[][];
    public static isRunning: boolean = false;

    constructor(gameField: IGameField, gameView: IGameView, timeoutRefresh?: number) {
        this.gameField = gameField;
        this.gameView = gameView;
        this.timeoutRefresh = timeoutRefresh;
        this.state = gameField.getState();
        gameView.updateGameField(gameField.getState());
        gameView.updateGameState({
            isRunning: false,
            width: this.state[0].length,
            height: this.state.length
        })
    }

    start() {
        this.gameView.start(this.gameField);
    }

    execute() {

        // this.gameView.updateGameField(this.gameField.getState());
        this.gameView.updateGameState({
            isRunning: true
        })

        let myTimer = setInterval(() => {
            this.gameField.nextGeneration();

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