document.addEventListener('DOMContentLoaded', () => {
    const taskInput = document.getElementById('taskInput');
    const addTaskButton = document.getElementById('addTaskButton');
    const taskList = document.getElementById('taskList');

    // Load tasks from localStorage
    loadTasks();

    // Add task
    addTaskButton.addEventListener('click', () => {
        const taskText = taskInput.value.trim();
        if (taskText) {
            addTask(taskText);
            taskInput.value = '';
        }
    });

    // Add task to list and localStorage
    function addTask(text) {
        const li = document.createElement('li');
        li.innerHTML = `
            <span>${text}</span>
            <div>
                <button class="complete">Complete</button>
                <button class="remove">Remove</button>
            </div>
        `;

        const completeButton = li.querySelector('.complete');
        const removeButton = li.querySelector('.remove');

        completeButton.addEventListener('click', () => {
            li.querySelector('span').style.textDecoration = 'line-through';
            completeButton.disabled = true;
        });

        removeButton.addEventListener('click', () => {
            li.remove();
            saveTasks();
        });

        taskList.appendChild(li);
        saveTasks();
    }

    // Save tasks to localStorage
    function saveTasks() {
        const tasks = [];
        taskList.querySelectorAll('li').forEach(li => {
            tasks.push({
                text: li.querySelector('span').textContent,
                completed: li.querySelector('span').style.textDecoration === 'line-through'
            });
        });
        localStorage.setItem('tasks', JSON.stringify(tasks));
    }

    // Load tasks from localStorage
    function loadTasks() {
        const tasks = JSON.parse(localStorage.getItem('tasks')) || [];
        tasks.forEach(task => addTask(task.text, task.completed));
    }
});
