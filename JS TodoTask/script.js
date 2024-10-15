// Load tasks from localStorage on page load
window.onload = loadTasks;

// Add a new task with the current time
function addTask() {
  const taskInput = document.getElementById('task-input');
  const taskText = taskInput.value.trim();

  if (taskText === "") {
    alert("Please enter a task.");
    return;
  }

  // Get the current tasks from localStorage
  let tasks = JSON.parse(localStorage.getItem('tasks')) || [];

  // Get the current date and time
  const now = new Date();
  const time = now.toLocaleString(); // Formats the time as a readable string

  // Create a task object containing the task text and the time
  const task = {
    text: taskText,
    time: time
  };

  // Add the new task to the array
  tasks.push(task);

  // Update localStorage with the new task list
  localStorage.setItem('tasks', JSON.stringify(tasks));

  // Clear the input and reload the task list
  taskInput.value = "";
  loadTasks();
}

// Load and display tasks from localStorage
function loadTasks() {
  const taskList = document.getElementById('task-list');
  taskList.innerHTML = "";

  // Get the current tasks from localStorage
  let tasks = JSON.parse(localStorage.getItem('tasks')) || [];

  tasks.forEach((task, index) => {
    const li = document.createElement('li');
    li.innerHTML = `
      <span>${task.text}</span>
      <span style="font-size: 0.8em; color: #888;"> (Added on: ${task.time})</span>
      <button class="delete" onclick="deleteTask(${index})">Delete</button>
    `;
    taskList.appendChild(li);
  });
}

// Delete a task
function deleteTask(index) {
  // Get tasks from localStorage
  let tasks = JSON.parse(localStorage.getItem('tasks'));

  // Remove the task from the array
  tasks.splice(index, 1);

  // Update localStorage and reload the task list
  localStorage.setItem('tasks', JSON.stringify(tasks));
  loadTasks();
}
