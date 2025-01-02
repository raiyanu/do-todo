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

    // GoalCoin Clear 
    let ui_coin_container = document.getElementById("ui_coin_container");

    // Double click trigger 
    ui_coin_container.addEventListener('dblclick', () => {
        if (confirm("Do you wanna clear score?") && confirm("Are you really sure...?")) {
            todo.clearScore();
        }
    });

    // Long-press util
    let progress = 0;
    let interval;
    let isHolding = false;

    ui_coin_container.addEventListener('mousedown', startProgress);
    ui_coin_container.addEventListener('mouseup', stopProgress);
    ui_coin_container.addEventListener('mouseleave', stopProgress);

    function startProgress() {
        if (isHolding) return;
        isHolding = true;
        interval = setInterval(() => {
            if (progress < 100) {
                progress += 1;
                ui_coin_container.style.cssText = `--value: ${progress}%;`;
            }
        }, 10);
    }

    function stopProgress() {
        if (isHolding) {
            clearInterval(interval);
            isHolding = false;
            if (progress < 100) {
                // on failed press
            } else {
                // on Successfull press
                if (confirm("Do you wanna clear score?") && confirm("Are you really sure...?")) {
                    todo.clearScore();
                }
            }
            progress = 0;
            ui_coin_container.style.cssText = `--value: ${progress}%; `;
        }
    }
});