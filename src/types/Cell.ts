export enum Status {
    DEAD = 0,
    LIVING = 1,
    MUST_DIE = 2
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
            cellElement = this.getDefaultCell(x,y,status);
        }
        this.cellElement = cellElement;
    }

    public getDefaultCell(x: number, y: number, status: Status) {
        const cellElement = document.createElement("td");
        cellElement.classList.add('cell');
        cellElement.setAttribute('x', x.toString());
        cellElement.setAttribute('y', y.toString());
        if (status === Status.LIVING) {
            cellElement.classList.add('cell--alive');
        }
        if (status === Status.DEAD) {
            cellElement.classList.add('cell--dead');
        }
        if (status === Status.MUST_DIE) {
            cellElement.classList.add('cell--must_die');
        }
        return cellElement;
    }

    public getStatus(): Status {
        return this.status;
    }

    public setStatus(status: Status) {
        this.status = status;
        if (status === Status.LIVING) {
            this.cellElement.classList.replace('cell--dead', 'cell--alive');
        }
        if (status === Status.DEAD) {
            this.cellElement.classList.replace('cell--alive', 'cell--dead');
        }
        if (status === Status.MUST_DIE) {
            this.cellElement.classList.add('cell--must_die');
        }

    }

}
