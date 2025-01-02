export default class Todo {
    // LOAD & CRUD
    getTodoFromStorage() {
        let todo = JSON.parse(localStorage.getItem("todo") || "null");
        // TODO: placeholder -> Added NOT operator [✅]
        if (todo) {
            todo = {
                tasks: [
                    {
                        id: 1,
                        name: "1 Your Task goes here",
                        completed: false,
                    },
                    {
                        id: 2,
                        name: "2 Your completed Task goes here",
                        completed: true,
                    },
                    {
                        id: 3,
                        name: "3 Your Task goes here",
                        completed: false,
                    },
                    {
                        id: 4,
                        name: "4 Your completed Task goes here",
                        completed: true,
                    },
                ],
                recycleBin: [
                    {
                        name: "Your deleted Task goes here",
                        completed: true,
                    },
                    {
                        name: "Your deleted Task goes here",
                        completed: true,
                    },
                ],
            };
            this.updatePersistentStorage(todo)
        }
        console.log(todo);
        return todo;
    }

    updatePersistentStorage(todo) {
        localStorage.setItem("todo", JSON.stringify(todo));
    }

    deleteTask(id) {
        console.log(`deleting task with id : ${id}`);

        this.todo.tasks = this.todo.tasks.filter((task) => !(task.id == id));

        this.updatePersistentStorage(this.todo);
    }

    updateTaskStatus(id, isCompleted) {
        for (let index = 0; index < this.todo.tasks.length; index++) {
            if (this.todo.tasks[index].id == id) {
                this.todo.tasks[index].completed = isCompleted;
                console.log(this.todo.tasks[index]);
                break;
            }
        }
        this.updatePersistentStorage(this.todo);
    }

    // Init
    constructor() {
        this.todo = this.getTodoFromStorage();
    }
}
