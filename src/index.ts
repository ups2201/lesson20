import { Game } from "./Game";
import { GameField } from "./GameField";
import { GameView } from "./GameView";
import "./styles.css";

const el = document.getElementById("app") as HTMLElement;

const gameView = new GameView(el);
const gameField = new GameField(5, 5);
const game = new Game(gameField, gameView, 1000);

const el2 = document.getElementById("app2") as HTMLElement;
const gameView2 = new GameView(el2);
const gameField2 = new GameField(3, 3);
const game2 = new Game(gameField2, gameView2, 1000);
