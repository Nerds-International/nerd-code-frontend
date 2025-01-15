import { makeAutoObservable } from "mobx";

class ProblemsStore {
  tasks = [
    //    { id: "1", name: 'Task 1', description: 'This is the description for task 1', difficulty: 'Easy', likes: 0, dislikes: 0,  created_at: ""},
    //    { id: "2", name: 'Task 2', description: 'This is the description for task 2', difficulty: 'Medium', likes: 0, dislikes: 0,  created_at: "" },
    //    { id: "3", name: 'Task 3', description: 'This is the description for task 3', difficulty: 'Hard', likes: 0, dislikes: 0,  created_at: "" }
  ];

  constructor() {
    makeAutoObservable(this);
  }

  setTask(newTasks) {
    this.tasks = newTasks;
  }
}

const problemsStore = new ProblemsStore();
export default problemsStore;
