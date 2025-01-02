// src/index.ts
import Todo from "./todo.js"; // Import the Todo class
const todo = new Todo(); // Create an instance of the Todo class

window.addEventListener("DOMContentLoaded", () => {
    todo.updateUi();
    taskForm.addEventListener('submit', (e) => {
        try {
            e.preventDefault();
        } catch (error) {
            console.log("form preventing error");
        }
        todo.addTask();
    })
    ui_coin_container.addEventListener('dblclick', () => {
        if (confirm("Do you wanna clear score?") && confirm("Are you really sure...?")) {
            todo.clearScore();
        }
    });
});
