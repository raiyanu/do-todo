// src/index.ts
import Todo from "./todo.js"; // Import the Todo class
const todo = new Todo(); // Create an instance of the Todo class

// Javascript Util : { Reset, Shortcut }
const $ = (id) => document.getElementById(id);

// Getting necessary DOM Element
let taskContainer = $("TaskList");

function updateUi() {
    taskContainer.innerHTML = "";
    todo.todo.tasks.forEach((task) => {
        taskContainer.appendChild(createTaskDom(task))
    });
    console.log("UI updated with todos:", todo.todo);
}

function createTaskDom(task) {
    let taskElement = document.createElement("div");
    let buttonElement = document.createElement("button");

    buttonElement.innerHTML = `
    <img class="trash" src="./assets/trash.svg" alt=""> 
    <img class="trash-focus" src="./assets/trash-focus.svg" alt="">
`;
    taskElement.innerHTML = `
    <input id="task-${task.id}" type="checkbox" ${task.completed ? "checked" : ""}>
    <label for="task-${task.id}">${task.name.trim()}</label>
`;

    let checkbox = taskElement.querySelector(`#task-${task.id}`);
    checkbox.addEventListener("change", () => {
        todo.updateTaskStatus(task.id, checkbox.checked);
    });

    taskElement.appendChild(buttonElement);
    return taskElement;

}

window.addEventListener("DOMContentLoaded", () => {
    updateUi();
});
