// src/index.ts
import Todo from "./todo"; // Import the Todo class
const todo = new Todo(); // Create an instance of the Todo class
console.log(todo.todo); // Log the todo list (initially empty)
function updateUi() {
    // Logic to update the UI
    console.log("UI updated with todos:", todo.todo);
}
