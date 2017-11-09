export class Todo {
    constructor(
        public id?: number,
        public description?: string,
        public completed?: boolean,
    ) {
        this.completed = false;
    }
}
