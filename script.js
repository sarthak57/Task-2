document.addEventListener("DOMContentLoaded", function() {
    const taskInput = document.getElementById("taskInput");
    const addTaskButton = document.getElementById("addTask");
    const taskList = document.getElementById("taskList");

    // Load tasks from local storage
    const tasks = JSON.parse(localStorage.getItem("tasks")) || [];

    function displayTasks() {
        taskList.innerHTML = "";
        for (let i = 0; i < tasks.length; i++) {
            const li = document.createElement("li");
            li.innerHTML = `
                <span>${tasks[i]}</span>
                <button class="delete" data-index="${i}">Delete</button>
            `;
            taskList.appendChild(li);
        }
    }

    function saveTasks() {
        localStorage.setItem("tasks", JSON.stringify(tasks));
    }

    addTaskButton.addEventListener("click", function() {
        const taskText = taskInput.value.trim();
        if (taskText !== "") {
            tasks.push(taskText);
            taskInput.value = "";
            saveTasks();
            displayTasks();
        }
    });

    taskList.addEventListener("click", function(e) {
        if (e.target.classList.contains("delete")) {
            const index = e.target.getAttribute("data-index");
            tasks.splice(index, 1);
            saveTasks();
            displayTasks();
        }
    });

    displayTasks();
});
