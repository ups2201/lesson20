import { Cell, Status } from "./types/Cell";

export interface IGameField {
  getState(): Cell[][];
  toggleCellState(x: number, y: number);
  nextFaze1();
  nextFaze2();
  setSize(width: number, height: number);
}

export class GameField implements IGameField {
  width: number;
  height: number;
  state: Cell[][];
  bornCellsInNextIteration: Set<Cell> = new Set<Cell>();
  dieCellsInNextIteration: Set<Cell> = new Set<Cell>();

  constructor(width: number = 0, height: number = 0) {
    this.width = width;
    this.height = height;
    this.state = [[]];

    for (let i = 0; i < height; i++) {
      this.state[i] = [];
      for (let j = 0; j < width; j++) {
        this.state[i][j] = new Cell(i, j, Status.DEAD);
      }
    }
  }

  getState(): Cell[][] {
    const gameField = [[]];

    for (let i = 0; i < this.height; i++) {
      gameField[i] = [];
      for (let j = 0; j < this.width; j++) {
        gameField[i][j] = this.state[i][j];
      }
    }

    return gameField;
  }

  nextFaze1() {
    console.log(
      "nextFaze1 = Фаза определения ячеек которые должны умереть и которые должны возродится",
    );
    let neededModifyCellAndNeighboring = new Set<Cell>();

    // Ищем ячеки которые необходимо проверить для следующей итерации, добавляем к ним соседние ячейки
    const neededModifyCell = this.state.map((row) =>
      row.filter((column) => column.getStatus() === Status.LIVING),
    );
    neededModifyCell.forEach((row) => {
      row.forEach((cell) => {
        console.log(`${cell.x}, ${cell.y}, ${cell.getStatus()}`);
        neededModifyCellAndNeighboring.add(cell);
        const neighboringCells = this.getNeighboringCells(cell.x, cell.y);
        neighboringCells.forEach((e) => neededModifyCellAndNeighboring.add(e));
      });
    });

    const newGenerationField = new GameField(this.width, this.height);
    let nextFieldState = newGenerationField.getState();

    neededModifyCellAndNeighboring.forEach((cell) => {
      const x = cell.x;
      const y = cell.y;

      const neighboringCells = this.getNeighboringCells(x, y);

      // Определяем живые соседние клетки
      const neighboringCellsLiving = neighboringCells.filter(
        (cell) => cell.getStatus() === Status.LIVING,
      );

      if (
        cell.getStatus() === Status.DEAD &&
        neighboringCellsLiving.length === 3
      ) {
        this.bornCellsInNextIteration.add(new Cell(x, y, Status.LIVING));
        return;
      }

      if (
        cell.getStatus() === Status.LIVING &&
        [2, 3].includes(neighboringCellsLiving.length)
      ) {
        nextFieldState[x][y] = new Cell(x, y, Status.LIVING);
        return;
      }

      if (
        cell.getStatus() === Status.LIVING &&
        (neighboringCellsLiving.length < 2 || neighboringCellsLiving.length > 3)
      ) {
        nextFieldState[x][y] = new Cell(x, y, Status.MUST_DIE);
        this.dieCellsInNextIteration.add(new Cell(x, y, Status.MUST_DIE));
        return;
      }
    });

    this.state = nextFieldState;
    console.log(this.state);
  }

  nextFaze2() {
    console.log("nextFaze2 = Фаза отрисовки ячеек");

    this.dieCellsInNextIteration.forEach((cell) => {
      this.state[cell.x][cell.y] = new Cell(cell.x, cell.y, Status.DEAD);
    });
    this.bornCellsInNextIteration.forEach((cell) => {
      this.state[cell.x][cell.y] = new Cell(cell.x, cell.y, Status.LIVING);
    });

    this.bornCellsInNextIteration.clear();
    this.dieCellsInNextIteration.clear();
  }

  setSize(width: number, height: number) {
    const newState = [[]];

    for (let i = 0; i < height; i++) {
      newState[i] = [];
      for (let j = 0; j < width; j++) {
        newState[i][j] =
          this.state[i] && this.state[i][j]
            ? this.state[i][j]
            : new Cell(i, j, Status.DEAD);
      }
    }
    this.width = width;
    this.height = height;
    this.state = newState;
  }

  toggleCellState(x: number, y: number) {
    if (this.state[x][y].getStatus() === Status.DEAD) {
      this.state[x][y].setStatus(Status.LIVING);
    } else {
      this.state[x][y].setStatus(Status.DEAD);
    }

    console.log(`click cell ${x} ${y}`);
  }

  /**
   * Получаем соседние клетки
   * @param x
   * @param y
   */
  getNeighboringCells(x: number, y: number): Cell[] {
    const neighboringCells = [];

    neighboringCells.push(this.getCellValue(x - 1, y));
    neighboringCells.push(this.getCellValue(x - 1, y + 1));
    neighboringCells.push(this.getCellValue(x - 1, y - 1));
    neighboringCells.push(this.getCellValue(x + 1, y));
    neighboringCells.push(this.getCellValue(x + 1, y + 1));
    neighboringCells.push(this.getCellValue(x + 1, y - 1));
    neighboringCells.push(this.getCellValue(x, y + 1));
    neighboringCells.push(this.getCellValue(x, y - 1));

    return neighboringCells.filter((e) => e != undefined);
  }

  getCellValue(x: number, y: number): Cell {
    try {
      return this.state[x][y];
    } catch (e) {
      return undefined;
    }
  }
}
