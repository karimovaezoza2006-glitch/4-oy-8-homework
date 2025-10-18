const formCreate = document.getElementById("form-create");
const formEdit = document.getElementById("form-edit");
const listGroupTodo = document.getElementById("list-group-todo");
const time = document.getElementById("time");
const fullDay = document.getElementById("full-day");
const hourEl = document.getElementById("hour");
const minuteEl = document.getElementById("minute");
const secondEl = document.getElementById("second");
const modal = document.getElementById("modal");
const overlay = document.getElementById("overlay");
const closeBtn = document.getElementById("close");

let todos = JSON.parse(localStorage.getItem("list")) || [];
let editIndex = null;

if (todos.length) showTodos();

function setTodos() {
  localStorage.setItem("list", JSON.stringify(todos));
}

function showTodos() {
  listGroupTodo.innerHTML = "";
  todos.forEach((item, i) => {
    listGroupTodo.innerHTML += `
      <li class="list-group-item d-flex justify-content-between align-items-center ${
        item.completed ? "completed" : ""
      }">
        <span onclick="toggleComplete(${i})">${item.text}</span>
        <div class="todo-icons d-flex align-items-center gap-2">
          <small class="text-muted">${item.time}</small>
          <img src="./img/edit.svg" alt="edit" width="25" height="25" onclick="editTodo(${i})">
          <img src="./img/delete.svg" alt="delete" width="25" height="25" onclick="deleteTodo(${i})">
        </div>
      </li>
    `;
  });
}

function showMessage(where, message) {
  document.getElementById(`${where}`).textContent = message;
  setTimeout(() => {
    document.getElementById(`${where}`).textContent = "";
  }, 2000);
}

// Create Todo
formCreate.addEventListener("submit", (e) => {
  e.preventDefault();
  const todoText = formCreate["input-create"].value.trim();
  formCreate.reset();

  if (todoText.length) {
    const now = new Date();
    const formattedTime = `${now.getHours()}:${String(
      now.getMinutes()
    ).padStart(2, "0")}, ${now.toLocaleDateString()}`;
    todos.push({ text: todoText, time: formattedTime, completed: false });
    setTodos();
    showTodos();
  } else {
    showMessage("message-create", "Please enter a task!");
  }
});

// Delete Todo
function deleteTodo(i) {
  todos.splice(i, 1);
  setTodos();
  showTodos();
}

// Edit Todo
function editTodo(i) {
  modal.classList.remove("hidden");
  overlay.classList.remove("hidden");
  formEdit["input-edit"].value = todos[i].text;
  editIndex = i;
}

formEdit.addEventListener("submit", (e) => {
  e.preventDefault();
  const updatedText = formEdit["input-edit"].value.trim();

  if (updatedText.length) {
    todos[editIndex].text = updatedText;
    setTodos();
    showTodos();
    closeModal();
  } else {
    showMessage("message-edit", "Text cannot be empty!");
  }
});

function closeModal() {
  modal.classList.add("hidden");
  overlay.classList.add("hidden");
}

closeBtn.addEventListener("click", closeModal);
overlay.addEventListener("click", closeModal);

// Mark as Completed
function toggleComplete(i) {
  todos[i].completed = !todos[i].completed;
  setTodos();
  showTodos();
}

// Real-time clock
function updateClock() {
  const now = new Date();
  fullDay.textContent = now.toLocaleDateString("en-US", {
    weekday: "long",
    month: "long",
    day: "numeric",
    year: "numeric",
  });
  hourEl.textContent = String(now.getHours()).padStart(2, "0");
  minuteEl.textContent = String(now.getMinutes()).padStart(2, "0");
  secondEl.textContent = String(now.getSeconds()).padStart(2, "0");
}
setInterval(updateClock, 1000);
updateClock();
