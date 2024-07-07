import {GameField, IGameField} from "./GameField";
import {GameView, IGameView} from "./GameView";
import {Cell, Status} from "./types/Cell";

export interface IGame{
    execute();
}

export class Game implements IGame {
    gameField: GameField;
    gameView: GameView;
    timeoutRefresh: number;
    state : Cell[][];
    public static isRunning: boolean = false;
    public static iteration: number = 0;

    constructor(gameField: GameField, gameView: GameView, timeoutRefresh?: number) {
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

        const setSizeButton = document.querySelector('#setSize')
        setSizeButton.addEventListener("click", () => {
            let gameFieldWidth = Number((document.querySelector('#gameFieldWidth') as HTMLInputElement).value);
            let gameFieldHeight = Number((document.querySelector('#gameFieldHeight') as HTMLInputElement).value);

            this.gameField.setSize(gameFieldWidth, gameFieldHeight);
            this.gameView.updateGameField(this.gameField.getState());
        });

        const nextGenerationButton = document.querySelector('#nextGeneration')
        nextGenerationButton.addEventListener("click", () => {
            switch (Game.iteration % 2) {
                case 0:
                    this.gameField.nextFaze1();
                    break;
                case 1:
                    this.gameField.nextFaze2();
                    break;
                default: return;
            }
            this.gameView.updateGameField(this.gameField.getState());
            Game.iteration++;
        });

        document.querySelector('#app').addEventListener('click', (ev) => {
            if (ev.target instanceof HTMLTableCellElement) {
                let y = ev.target.closest('tr').rowIndex;
                let x = ev.target.cellIndex;
                console.log(x)
                console.log(y)
                this.gameField.toggleCellState(x, y);
                this.gameView.updateGameField(this.gameField.getState());
            }
        });
    }

    start() {
        this.gameView.start(this.gameField);
    }

    execute() {

        // this.gameView.updateGameField(this.gameField.getState());
        // this.gameView.updateGameState({
        //     isRunning: true
        // })

        // let myTimer = setInterval(() => {
        //     this.gameField.nextGeneration();
        //
        // }, 5000);


    }


    onFieldSizeChange() {
        let gameFieldWidth = Number(this.gameView.element.querySelector('#gameFieldWidth'));
        let gameFieldHeight = Number(this.gameView.element.querySelector('#gameFieldHeight'));

        this.gameField.setSize(gameFieldWidth, gameFieldHeight);
        this.gameView.updateGameField(this.gameField.getState());
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