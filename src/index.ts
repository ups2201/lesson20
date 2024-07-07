import { Game } from "./Game";
import { GameField } from "./GameField";
import { GameView } from "./GameView";
import "./styles.css";

const el = document.getElementById("app") as HTMLElement;

const gameView = new GameView(el);
const gameField = new GameField(5, 5);
const game = new Game(gameField, gameView, 1000);

document.querySelector("#start").addEventListener("click", () => {
  game.execute();
});

document.querySelector("#stop").addEventListener("click", () => {
  game.stop();
});
