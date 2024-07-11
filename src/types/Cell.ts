export enum Status {
  DEAD = 0,
  LIVING = 1,
  MUST_DIE = 2,
}

export class Cell {
  x: number;
  y: number;
  cellElement: HTMLElement;
  private status: Status;

  constructor(x: number, y: number, status: Status, cellElement?: HTMLElement) {
    this.x = x;
    this.y = y;
    this.status = status;
    if (cellElement === undefined) {
      cellElement = this.getDefaultCell(status);
    }
    this.cellElement = cellElement;
  }

  public getDefaultCell(status: Status): HTMLElement {
    const cellElement = document.createElement("td");
    cellElement.classList.add("cell");
    cellElement.setAttribute("x", this.x.toString());
    cellElement.setAttribute("y", this.y.toString());
    cellElement.innerText = `${this.x},${this.y}`;
    switch (status) {
      case Status.LIVING:
        cellElement.classList.add("cell--alive");
        break;
      case Status.DEAD:
        cellElement.classList.add("cell--dead");
        break;
      case Status.MUST_DIE:
        cellElement.classList.add("cell--must_die");
        break;
    }
    return cellElement;
  }

  public getStatus(): Status {
    return this.status;
  }

  public setStatus(status: Status) {
    this.status = status;
    switch (status) {
      case Status.LIVING:
        this.cellElement.classList.remove("cell--dead");
        this.cellElement.classList.remove("cell--must_die");
        this.cellElement.classList.add("cell--alive");
        break;
      case Status.DEAD:
        this.cellElement.classList.remove("cell--alive");
        this.cellElement.classList.remove("cell--must_die");
        this.cellElement.classList.add("cell--dead");
        break;
      case Status.MUST_DIE:
        this.cellElement.classList.remove("cell--alive");
        this.cellElement.classList.remove("cell--dead");
        this.cellElement.classList.add("cell--must_die");
        break;
    }
  }
}
