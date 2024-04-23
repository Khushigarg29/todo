document.addEventListener("DOMContentLoaded", function () {
    const searchBtn = document.getElementById("searchBtn");
    const searchInput = document.getElementById("searchInput");
    const sortBtn = document.getElementById("sortBtn");
    const allTasksBtn = document.getElementById("allTasksBtn");
    const completedTasksBtn = document.getElementById("completedTasksBtn");
    const uncompletedTasksBtn = document.getElementById("uncompletedTasksBtn");
    const taskContainer = document.getElementById("taskContainer");

   

    searchBtn.addEventListener("click", function () {
        const searchTerm = searchInput.value.toLowerCase();
        const taskCards = document.getElementsByClassName("card");

        for (const taskCard of taskCards) {
            const taskText = taskCard.textContent.toLowerCase();
            if (taskText.includes(searchTerm)) {
                taskCard.style.display = "block";
            } else {
                taskCard.style.display = "none";
            }
        }
    });

    allTasksBtn.addEventListener("click", function () {
        showAllTasks();
    });

    completedTasksBtn.addEventListener("click", function () {
        showCompletedTasks();
    });

    uncompletedTasksBtn.addEventListener("click", function () {
        showUncompletedTasks();
    });

    const addBtn = document.getElementById("addBtn");

    addBtn.addEventListener("click", function () {
        const taskInput = document.getElementById("task");
        const taskTimeInput = document.getElementById("taskTime");
        const taskTypeInput = document.getElementById("taskType");

        const task = taskInput.value;
        const taskTime = taskTimeInput.value;
        const taskType = taskTypeInput.value;

        const currentTime = new Date();
        const selectedTime = new Date(taskTime);

        if (task.trim() !== "" && selectedTime >= currentTime) {
            const taskCard = createTaskCard(task, taskTime, taskType);
            taskContainer.appendChild(taskCard);
            sortTasks();
            taskInput.value = "";
            taskTimeInput.value = "";
            taskTypeInput.value = "";
        } else {
            alert("Please enter a valid task and future date.");
        }
    });

    function createTaskCard(task, taskTime, taskType) {
        const card = document.createElement("div");
        card.classList.add("card");

        const content = document.createElement("div");
        content.classList.add("content");
        content.textContent = `${task} - ${taskTime} (${taskType})`;

        const btnContainer = document.createElement("div");
        btnContainer.classList.add("btns");

        const editBtn = document.createElement("button");
        editBtn.textContent = "✎";
        editBtn.addEventListener("click", function () {
            const editedTask = prompt("Edit task:", task);
            if (editedTask !== null) {
                content.textContent = `${editedTask} - ${taskTime} (${taskType})`;
            }
        });

        const deleteBtn = document.createElement("button");
        deleteBtn.textContent = "❌";
        deleteBtn.addEventListener("click", function () {
            if (confirm("Are you sure you want to delete this task?")) {
                card.remove();
            }
        });

        const completeBtn = document.createElement("button");
        completeBtn.textContent = "✔";
        completeBtn.addEventListener("click", function () {
            card.classList.toggle("completed");
        });

        btnContainer.appendChild(editBtn);
        btnContainer.appendChild(deleteBtn);
        btnContainer.appendChild(completeBtn);

        card.appendChild(content);
        card.appendChild(btnContainer);

        return card;
    }

    
    function showAllTasks() {
        const taskCards = document.getElementsByClassName("card");
        for (const taskCard of taskCards) {
            taskCard.style.display = "block";
        }
    }

    function showCompletedTasks() {
        const taskCards = document.getElementsByClassName("card");
        for (const taskCard of taskCards) {
            if (taskCard.classList.contains("completed")) {
                taskCard.style.display = "block";
            } else {
                taskCard.style.display = "none";
            }
        }
    }

    function showUncompletedTasks() {
        const taskCards = document.getElementsByClassName("card");
        for (const taskCard of taskCards) {
            if (!taskCard.classList.contains("completed")) {
                taskCard.style.display = "block";
            } else {
                taskCard.style.display = "none";
            }
        }
    }
});
