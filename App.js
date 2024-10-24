const taskForm = document.getElementById('task-form');
const taskInput = document.getElementById('new-task');
const taskList = document.getElementById('task-list');
const tasksCount = document.getElementById('tasks-count');
const clearCompletedBtn = document.getElementById('clear-completed');
const allTasksBtn = document.getElementById('all-tasks');
const activeTasksBtn = document.getElementById('active-tasks');
const completedTasksBtn = document.getElementById('completed-tasks');

let tasks = JSON.parse(localStorage.getItem('tasks')) || [];

// Function to save tasks to localStorage
function saveTasks() {
  localStorage.setItem('tasks', JSON.stringify(tasks));
}

// Function to render tasks
function renderTasks(tasksToRender = tasks) {
  taskList.innerHTML = '';
  tasksToRender.forEach((task, index) => {
    const listItem = document.createElement('li');
    listItem.innerHTML = `
      ${task.text}
      <button class="complete-btn" onclick="toggleComplete(${index})">
        <i class="fas ${task.completed ? 'fa-check-circle' : 'fa-circle'}"></i>
      </button>
      <button class="delete-btn" onclick="deleteTask(${index})">
        <i class="fas fa-trash"></i>
      </button>
    `;
    if (task.completed) {
      listItem.classList.add('completed');
    }
    taskList.appendChild(listItem);
  });
  updateTasksCount();
}

// Function to add a task
function addTask(e) {
  e.preventDefault();
  const taskText = taskInput.value.trim();
  if (taskText === '') return;
  
  tasks.push({ text: taskText, completed: false });
  taskInput.value = '';
  saveTasks();
  renderTasks();
}

// Function to delete a task
function deleteTask(index) {
  tasks.splice(index, 1);
  saveTasks();
  renderTasks();
}

// Function to toggle task completion
function toggleComplete(index) {
  tasks[index].completed = !tasks[index].completed;
  saveTasks();
  renderTasks();
}

// Function to update tasks count
function updateTasksCount() {
  const activeTasks = tasks.filter(task => !task.completed).length;
  tasksCount.textContent = `${activeTasks} task${activeTasks !== 1 ? 's' : ''} left`;
}

// Function to clear completed tasks
function clearCompleted() {
  tasks = tasks.filter(task => !task.completed);
  saveTasks();
  renderTasks();
}

// Event listeners
taskForm.addEventListener('submit', addTask);
clearCompletedBtn.addEventListener('click', clearCompleted);
allTasksBtn.addEventListener('click', () => renderTasks());
activeTasksBtn.addEventListener('click', () => renderTasks(tasks.filter(task => !task.completed)));
completedTasksBtn.addEventListener('click', () => renderTasks(tasks.filter(task => task.completed)));

// Initial render
renderTasks();