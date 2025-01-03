export default class Todo {
    // Init
    constructor() {
        this.todo = this.getTodoFromStorage();
        this.GoalCoins = this.getCoinFromStorage();
    }

    // LOAD
    getTodoFromStorage() {
        let todo = JSON.parse(localStorage.getItem("todo") || "null");
        // TODO: placeholder -> Add NOT operator [✅]
        if (!todo) {
            todo = {
                tasks: [
                    {
                        id: 1,
                        name: "1 Your Task goes here",
                        completed: false,
                    },
                ],
            };
            this.updatePersistentStorage(todo);
        }
        console.log(todo);
        return todo;
    }
    getCoinFromStorage() {
        let GoalCoins = JSON.parse(localStorage.getItem("gCoin") || "null");
        if (!GoalCoins) {
            GoalCoins = 0;
            this.updatePersistentStorageCoins(GoalCoins);
        }
        console.log(GoalCoins);
        return GoalCoins;
    }
    updatePersistentStorageCoins(gCoin) {
        localStorage.setItem("gCoin", JSON.stringify(gCoin));
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
        const id = this.getNewId();
        const newTask = {
            id,
            name,
            completed: false,
        };
        this.todo.tasks.push(newTask);
        this.updatePersistentStorage(this.todo);
        this.addTaskOnUi(newTask);
        todo_text.value = "";
    }
    updateTaskStatus(id, isCompleted) {
        for (let index = 0; index < this.todo.tasks.length; index++) {
            if (this.todo.tasks[index].id == id) {
                this.todo.tasks[index].completed = isCompleted;
                break;
            }
        }
        this.updatePersistentStorage(this.todo);
        this.updatePersistentStorageCoins(this.GoalCoins);
        if (isCompleted) this.GoalCoins = this.GoalCoins + 1;
        if (isCompleted) this.splashConfetti();
        ui_coin.innerHTML = this.GoalCoins;
        console.log(this.GoalCoins);
    }
    deleteTask(id) {
        // TODO: uncomment this for confirmation
        if (!confirm("Are you sure...?")) return;

        console.log(`deleting task with id : ${id}`);

        this.todo.tasks = this.todo.tasks.filter((task) => !(task.id == id));

        this.updatePersistentStorage(this.todo);

        this.updateUi();
    }
    removeAllCompletedTask() {
        this.todo.tasks = this.todo.tasks.filter((task) => !task.completed);
        console.log(this.todo.tasks);
        this.updatePersistentStorage(this.todo);
        this.updateUi();
    }
    removeAllTask() {
        this.todo.tasks = [];
        console.log(this.todo.tasks);
        this.updatePersistentStorage(this.todo);
        this.updateUi();
    }

    // Utils
    createTaskDom(task) {
        let taskElement = document.createElement("div");
        let buttonElement = document.createElement("button");
        if (!task.completed) {
        }
        buttonElement.addEventListener("click", () => {
            this.deleteTask(task.id);
            this.updateUi();
        });

        buttonElement.innerHTML = `
    <img class="trash" src="./assets/trash.svg" alt=""> 
    <img class="trash-focus" src="./assets/trash-focus.svg" alt="">`;
        taskElement.innerHTML = `
    <input id="task-${task.id}" type="checkbox" ${task.completed ? "checked" : ""
            }>
    <label for="task-${task.id}">${task.name.trim()}</label>
`;

        let checkbox = taskElement.querySelector(`#task-${task.id}`);
        if (!task.completed) {
            checkbox.addEventListener("change", () => {
                this.updateTaskStatus(task.id, checkbox.checked);
                // checkbox.setAttribute("disabled", true);
                this.updateUi();
            });
        } else {
            checkbox.setAttribute("disabled", true);
        }

        taskElement.appendChild(buttonElement);
        return taskElement;
    }
    addTaskOnUi(task) {
        let taskContainer = document.getElementById("TaskList");
        const newTaskElement = this.createTaskDom(task);
        newTaskElement.classList.add("slide_in");
        taskContainer.appendChild(newTaskElement);
        console.log("UI one task:", this.todo);
        document.getElementById("todo_body").scrollBy(0, 10000);
    }
    updateUi() {
        let taskContainer = document.getElementById("TaskList");
        let completedContainer = document.getElementById("CompletedTaskList");
        taskContainer.innerHTML = "";
        completedContainer.innerHTML = "";
        this.todo.tasks.forEach((task) => {
            if (!task.completed) {
                taskContainer.appendChild(this.createTaskDom(task));
            } else {
                completedContainer.appendChild(this.createTaskDom(task));
            }
        });
        console.log("UI updated with todos:", this.todo);
        ui_coin.innerHTML = this.GoalCoins;
    }
    getNewId() {
        let id = 0;
        this.todo.tasks.forEach((task) => {
            if (task.id > id) {
                id = task.id;
            }
        });
        return id + 1;
    }
    splashConfetti() {
        const count = 200,
            defaults = {
                origin: { y: 0.7 },
            };

        function fire(particleRatio, opts) {
            confetti(
                Object.assign({}, defaults, opts, {
                    particleCount: Math.floor(count * particleRatio),
                })
            );
        }

        fire(0.25, {
            spread: 26,
            startVelocity: 55,
        });

        fire(0.2, {
            spread: 60,
        });

        fire(0.35, {
            spread: 100,
            decay: 0.91,
            scalar: 0.8,
        });

        fire(0.1, {
            spread: 120,
            startVelocity: 25,
            decay: 0.92,
            scalar: 1.2,
        });

        fire(0.1, {
            spread: 120,
            startVelocity: 45,
        });
    }
    clearScore() {
        this.GoalCoins = 0;
        this.updatePersistentStorageCoins(this.GoalCoins);
        ui_coin.innerHTML = this.GoalCoins;
    }
}
