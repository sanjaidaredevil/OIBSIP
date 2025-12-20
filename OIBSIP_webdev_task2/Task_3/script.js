let tasks = JSON.parse(localStorage.getItem("tasks")) || [];

function save() {
  localStorage.setItem("tasks", JSON.stringify(tasks));
}

function addTask() {
  let input = document.getElementById("taskInput");
  let text = input.value.trim();

  if (text === "") return alert("Please enter a task!");

  tasks.push({
    text,
    completed: false,
    created: new Date().toLocaleString(),
    completedAt: null
  });

  input.value = "";
  save();
  display();
}

function toggleComplete(index) {
  tasks[index].completed = true;
  tasks[index].completedAt = new Date().toLocaleString();
  save();
  display();
}

function deleteTask(index) {
  tasks.splice(index, 1);
  save();
  display();
}

function editTask(index) {
  let newText = prompt("Edit your task:", tasks[index].text);
  if (newText !== null && newText.trim() !== "") {
    tasks[index].text = newText.trim();
    save();
    display();
  }
}

function display() {
  let pending = document.getElementById("pendingList");
  let completed = document.getElementById("completedList");

  pending.innerHTML = "";
  completed.innerHTML = "";

  tasks.forEach((task, index) => {
    let li = document.createElement("li");
    li.className = "task " + (task.completed ? "completed" : "");

    li.innerHTML = `
      <div>
        <strong>${task.text}</strong>
        <div class="timestamp">
          Added: ${task.created}
          ${task.completed ? `<br>Completed: ${task.completedAt}` : ""}
        </div>
      </div>

      <div class="buttons">
        ${!task.completed ? `<button class="complete-btn" onclick="toggleComplete(${index})">✔</button>` : ""}
        <button class="edit-btn" onclick="editTask(${index})">✏️</button>
        <button class="delete-btn" onclick="deleteTask(${index})">🗑</button>
      </div>
    `;

    if (task.completed) completed.appendChild(li);
    else pending.appendChild(li);
  });
}

display();
