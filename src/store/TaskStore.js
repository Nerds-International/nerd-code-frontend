import { makeAutoObservable } from 'mobx';

class TaskStore {
    // потом берем из бд
    tasks = [
        { id: 1, name: 'Task 1', description: 'This is the description for task 1', difficulty: 'Easy' },
        { id: 2, name: 'Task 2', description: 'This is the description for task 2', difficulty: 'Medium' },
        { id: 3, name: 'Task 3', description: 'This is the description for task 3', difficulty: 'Hard' },
        { id: 4, name: 'Poker', description: 'This is the description for Poker', difficulty: 'Hard' },
        { id: 5, name: 'Two Sum', description: 'This is the description for Two Sum', difficulty: 'Easy' },
        { id: 6, name: 'Roman to Integer', description: 'This is the description for Roman', difficulty: 'Medium' },
        { id: 7, name: 'be1', description: 'This is the description for Roman', difficulty: 'Medium' },
        { id: 8, name: 'be2', description: 'This is the description for Roman', difficulty: 'Hard' },
        { id: 9, name: 'be3', description: 'This is the description for Roman', difficulty: 'Easy' },
        { id: 10, name: 'be4', description: 'This is the description for Roman', difficulty: 'Medium' },
        { id: 11, name: 'be5', description: 'This is the description for Roman', difficulty: 'Medium' },
    ];

    constructor() {
        makeAutoObservable(this);
    }
}

const taskStore = new TaskStore();
export default taskStore;
