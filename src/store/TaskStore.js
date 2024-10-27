import { makeAutoObservable } from 'mobx';

class TaskStore {
    tasks = [
        { id: 1, name: 'Task 1', description: 'This is the description for task 1', difficulty: 'Easy' },
        { id: 2, name: 'Task 2', description: 'This is the description for task 2', difficulty: 'Medium' },
        { id: 3, name: 'Task 3', description: 'This is the description for task 3', difficulty: 'Hard' },
    ];

    constructor() {
        makeAutoObservable(this);
    }
}

export default new TaskStore();
