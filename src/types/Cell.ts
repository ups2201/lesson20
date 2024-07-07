// export type Cell = {
//     state : State;
// };

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

    constructor(status: Status) {
        this.status = status;
    }

    public getStatus(): Status {
        return this.status;
    }

    public setStatus(status: Status) {
        this.status = status;
    }

    public getClassElement(): string {
        if (this.status === Status.LIVING) {
            return 'cell--alive';
        }
        if (this.status === Status.DEAD) {
            return 'cell--dead';
        }
    }


}
