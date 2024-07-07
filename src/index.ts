import { Game } from "./Game";
import { GameField } from "./GameField";
import { GameView } from "./GameView";
import "./styles.css";

const el = document.getElementById("app") as HTMLElement;

const gameView = new GameView(el);
const gameField = new GameField(5, 5);
const game = new Game(gameField, gameView, 1000);
gameField.getState();

document.querySelector("button").addEventListener("click", () => {
    game.execute();
});

el.querySelectorAll("td").forEach((cell) => {
    cell.addEventListener("click", (ev) => {
        const y = cell.closest('tr').rowIndex;
        const x = cell.cellIndex;
        gameField.toggleCellState(x,y);
        gameView.updateGameField(gameField.getState());
    });
  }
)
