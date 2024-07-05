// export type Cell = {
//     state : State;
// };

export enum Status {
    DEAD = 0,
    LIVING = 1,
    MUST_DIE = 2
}

export class Cell {
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
}
