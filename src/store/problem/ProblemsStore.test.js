import problemsStore from "./ProblemsStore";

describe('ProblemsStore', function() {
    let store;

    beforeEach(function() {
        store = problemsStore;
    });

    test('should initialize with an empty tasks array', () => {
        console.assert(Array.isArray(store.tasks), 'Tasks should be an array');
        console.assert(store.tasks.length === 0, 'Tasks array should be empty');
    });

    test('should update tasks array with setTask method', () => {
        const newTasks = [
            { id: "1", name: 'Task 1', description: 'This is the description for task 1', difficulty: 'Easy', likes: 0, dislikes: 0, created_at: "" },
            { id: "2", name: 'Task 2', description: 'This is the description for task 2', difficulty: 'Medium', likes: 0, dislikes: 0, created_at: "" },
            { id: "3", name: 'Task 3', description: 'This is the description for task 3', difficulty: 'Hard', likes: 0, dislikes: 0, created_at: "" }
        ];

        store.setTask(newTasks);
        console.assert(JSON.stringify(store.tasks) === JSON.stringify(newTasks), 'Tasks array should be updated');
    });
});
