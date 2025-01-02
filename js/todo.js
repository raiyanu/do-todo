export default class Todo {
    // Init
    constructor() {
        this.todo = this.getTodoFromStorage();
    }

    // LOAD
    getTodoFromStorage() {
        let todo = JSON.parse(localStorage.getItem("todo") || "null");
        // TODO: placeholder -> Added NOT operator [✅]
        if (!todo) {
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
                        id: 5,
                        name: "Your deleted Task goes here",
                        completed: true,
                    },
                    {
                        id: 6,
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


    // CRUD Operation
    addTask() {
        const name = todo_text.value;
        if (!name) {
            alert("Task cannot be empty");
            return;
        }
        if (name.length > 100) {
            alert("Task cannot be longer than 100 characters");
            return;
        }
        console.log(name);
        console.log(`New id : ${this.getNewId()}`);
        const id = this.getNewId()
        const newTask = {
            id,
            name,
            completed: false,
        }
        this.todo.tasks.push(newTask);
        this.updatePersistentStorage(this.todo);
        this.addTaskOnUi(newTask);
        todo_text.value = '';
    }
    updateTaskStatus(id, isCompleted) {
        for (let index = 0; index < this.todo.tasks.length; index++) {
            if (this.todo.tasks[index].id == id) {
                this.todo.tasks[index].completed = isCompleted;
                break;
            }
        }
        this.updatePersistentStorage(this.todo);
    }
    deleteTask(id) {
        if (!confirm("Are you sure...?")) return;

        console.log(`deleting task with id : ${id}`);

        this.todo.tasks = this.todo.tasks.filter((task) => !(task.id == id));

        this.updatePersistentStorage(this.todo);
    }



    // Utils
    createTaskDom(task) {
        let taskElement = document.createElement("div");
        let buttonElement = document.createElement("button");

        buttonElement.addEventListener("click", () => {
            this.deleteTask(task.id);
            this.updateUi();
        });

        buttonElement.innerHTML = `
    <img class="trash" src="./assets/trash.svg" alt=""> 
    <img class="trash-focus" src="./assets/trash-focus.svg" alt="">`;
        taskElement.innerHTML = `
    <input id="task-${task.id}" type="checkbox" ${task.completed ? "checked" : ""}>
    <label for="task-${task.id}">${task.name.trim()}</label>
`;

        let checkbox = taskElement.querySelector(`#task-${task.id}`);
        checkbox.addEventListener("change", () => {
            this.updateTaskStatus(task.id, checkbox.checked);
        });

        taskElement.appendChild(buttonElement);
        return taskElement;

    }
    addTaskOnUi(task) {
        let taskContainer = document.getElementById('TaskList')
        const newTaskElement = this.createTaskDom(task);
        newTaskElement.classList.add('slide_in');
        taskContainer.appendChild(newTaskElement)
        console.log("UI one task:", this.todo);
    }
    updateUi() {
        let taskContainer = document.getElementById('TaskList')
        taskContainer.innerHTML = "";
        this.todo.tasks.forEach((task) => {
            taskContainer.appendChild(this.createTaskDom(task))
        });
        console.log("UI updated with todos:", this.todo);
    }
    getNewId() {
        let id = 0
        this.todo.tasks.forEach(task => {
            if (task.id > id) {
                id = task.id;
            }
        });
        this.todo.recycleBin.forEach(task => {
            console.log(task);

            if (task.id > id) {
                id = task.id;
            }
        });
        return id + 1;
    }
}
