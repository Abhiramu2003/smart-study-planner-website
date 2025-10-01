// Sections toggle
function showSection(id) {
  document.querySelectorAll("section").forEach(sec => sec.classList.remove("active"));
  document.getElementById(id).classList.add("active");
}

// Load tasks from localStorage
let tasks = JSON.parse(localStorage.getItem("tasks")) || [];
const taskList = document.getElementById("task-list");
const timelineContainer = document.getElementById("timeline-container");

// Render tasks
function renderTasks() {
  taskList.innerHTML = "";
  timelineContainer.innerHTML = "";

  let completed = 0;

  tasks.forEach((task, index) => {
    if (task.done) completed++;

    // Dashboard task
    const li = document.createElement("li");
    li.innerHTML = `
      <span>${task.title}</span> 
      <small>[${task.category}] - ${task.date}</small>
      <div class="task-actions">
        <button onclick="deleteTask(${index})">❌</button>
        <button onclick="markDone(${index})">${task.done ? "✔ Undo" : "✔ Done"}</button>
      </div>
    `;
    if (task.done) li.style.opacity = "0.6";
    taskList.appendChild(li);

    // Timeline task
    const div = document.createElement("div");
    div.className = "timeline-item";
    div.innerHTML = `<strong>${task.title}</strong> <br><small>Subject: ${task.category} | Deadline: ${task.date}</small>`;
    if (task.done) div.style.borderLeftColor = "green";
    if (new Date(task.date) < new Date() && !task.done) div.style.borderLeftColor = "red";
    timelineContainer.appendChild(div);
  });

  // Progress bar update
  let progress = tasks.length ? (completed / tasks.length) * 100 : 0;
  document.getElementById("progress-bar").style.width = progress + "%";
  document.getElementById("progress-text").innerText = `${completed} of ${tasks.length} tasks completed`;

  localStorage.setItem("tasks", JSON.stringify(tasks));
}

// Add task
document.getElementById("task-form").addEventListener("submit", e => {
  e.preventDefault();
  const title = document.getElementById("task-title").value;
  const date = document.getElementById("task-date").value;
  const category = document.getElementById("task-category").value;

  tasks.push({ title, date, category, done: false });
  renderTasks();
  e.target.reset();
});

// Delete task
function deleteTask(index) {
  tasks.splice(index, 1);
  renderTasks();
}

// Mark task as done
function markDone(index) {
  tasks[index].done = !tasks[index].done;
  renderTasks();
}

// Dark mode toggle
document.getElementById("dark-mode-toggle").addEventListener("click", () => {
  document.body.classList.toggle("dark-mode");
  let btn = document.getElementById("dark-mode-toggle");
  btn.textContent = document.body.classList.contains("dark-mode") ? "☀️ Light Mode" : "🌙 Dark Mode";
});

// Motivational quotes
const quotes = [
  "Success is the sum of small efforts, repeated day in and day out.",
  "Don’t watch the clock; do what it does. Keep going.",
  "The future depends on what you do today.",
  "Push yourself, because no one else is going to do it for you.",
  "Great things never come from comfort zones."
];
document.getElementById("quote").innerText = quotes[Math.floor(Math.random() * quotes.length)];

// Initial render
renderTasks();
