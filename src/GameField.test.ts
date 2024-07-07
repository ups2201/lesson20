import { GameField } from "./GameField";
import {Cell} from "./types/Cell";

describe("GameField", () => {
    describe("public interface", () => {
        it("is a class", () => {
            expect(GameField).toBeInstanceOf(Function);
            expect(new GameField()).toBeInstanceOf(GameField);
        });

        it("has a function getState", () => {
            const gameField = new GameField();
            expect(gameField.getState).toBeInstanceOf(Function);
            expect(gameField.getState()).toEqual([[]]);
        });
    });

    describe("functional tests", () => {
        const width = 2;
        const height = 3;
        let gameField;
        beforeEach(() => {
            gameField = new GameField(width, height);
        });

        it("supports settings side from constructor", () => {
            expect(gameField.getState()).toEqual([
                [new Cell(0), new Cell(0)],
                [new Cell(0), new Cell(0)],
                [new Cell(0), new Cell(0)]
            ]);
        });

        it("has .toggleCellState method", () => {
            expect(gameField.toggleCellState).toBeInstanceOf(Function);
            const [x1, y1] = [0, 0];
            const [x2, y2] = [1, 2];
            gameField.toggleCellState(x1, y1);
            gameField.toggleCellState(x2, y2);
            expect(gameField.getState()).toEqual([
                [new Cell(1), new Cell(0)],
                [new Cell(0), new Cell(0)],
                [new Cell(0), new Cell(1)]
            ]);
            gameField.toggleCellState(x2, y2);
            expect(gameField.getState()).toEqual([
                [new Cell(1), new Cell(0)],
                [new Cell(0), new Cell(0)],
                [new Cell(0), new Cell(0)]
            ]);
        });

        it("has method .nextGeneration", () => {
            expect(gameField.nextGeneration).toBeInstanceOf(Function);
            const [x1, y1] = [0, 0];
            const [x2, y2] = [1, 2];
            gameField.toggleCellState(x1, y1);
            gameField.toggleCellState(x2, y2);
            expect(gameField.getState()).toEqual([
                [new Cell(1), new Cell(0)],
                [new Cell(0), new Cell(0)],
                [new Cell(0), new Cell(1)]
            ]);
            gameField.nextGeneration();
            expect(gameField.getState()).toEqual([
                [new Cell(0), new Cell(0)],
                [new Cell(0), new Cell(0)],
                [new Cell(0), new Cell(0)]
            ]);
            gameField.toggleCellState(0, 0);
            gameField.toggleCellState(1, 0);
            gameField.toggleCellState(0, 1);
            expect(gameField.getState()).toEqual([
                [new Cell(1), new Cell(1)],
                [new Cell(1), new Cell(0)],
                [new Cell(0), new Cell(0)]
            ]);
            gameField.nextGeneration();
            expect(gameField.getState()).toEqual([
                [new Cell(1), new Cell(1)],
                [new Cell(1), new Cell(1)],
                [new Cell(0), new Cell(0)]
            ]);
        });

        it("has method .setSize(newWidth, newHeight)", () => {
            gameField.toggleCellState(0, 0);
            gameField.toggleCellState(1, 1);
            gameField.toggleCellState(0, 2);
            expect(gameField.getState()).toEqual([
                [new Cell(1), new Cell(0)],
                [new Cell(0), new Cell(1)],
                [new Cell(1), new Cell(0)]
            ]);
            gameField.setSize(3, 4);
            expect(gameField.getState()).toEqual([
                [new Cell(1), new Cell(0), new Cell(0)],
                [new Cell(0), new Cell(1), new Cell(0)],
                [new Cell(1), new Cell(0), new Cell(0)],
                [new Cell(0), new Cell(0), new Cell(0)]
            ]);
            gameField.setSize(2, 2);
            expect(gameField.getState()).toEqual([
                [new Cell(1), new Cell(0)],
                [new Cell(0), new Cell(1)]
            ]);
        });
    });
});
