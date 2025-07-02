// JS to handle API calls and UI logiclet userId = null;

function register() {
  const username = document.getElementById('username').value;
  const password = document.getElementById('password').value;
  fetch('http://localhost:5000/api/users/register', {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify({ username, password })
  }).then(res => res.json())
    .then(data => alert("Registered! Now login."))
    .catch(err => alert("Register failed."));
}

function login() {
  const username = document.getElementById('username').value;
  const password = document.getElementById('password').value;
  fetch('http://localhost:5000/api/users/login', {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify({ username, password })
  }).then(res => {
    if (!res.ok) throw new Error("Login failed");
    return res.json();
  }).then(data => {
    userId = data.userId;
    document.getElementById("auth").style.display = "none";
    document.getElementById("todo-app").style.display = "block";
    document.getElementById("loggedUser").innerText = username;
    getTodos();
  }).catch(err => alert("Login failed"));
}

function getTodos() {
  fetch(`http://localhost:5000/api/todos/${userId}`)
    .then(res => res.json())
    .then(todos => {
      const list = document.getElementById("todoList");
      list.innerHTML = "";
      todos.forEach(todo => {
        const li = document.createElement("li");
        li.className = todo.completed ? "done" : "";
        li.innerHTML = `
          ${todo.text}
          <span>
            <button onclick="toggleTodo('${todo._id}')">✅</button>
            <button onclick="deleteTodo('${todo._id}')">🗑️</button>
          </span>
        `;
        list.appendChild(li);
      });
    });
}

function addTodo() {
  const text = document.getElementById("todoInput").value;
  fetch('http://localhost:5000/api/todos', {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify({ userId, text })
  }).then(() => {
    document.getElementById("todoInput").value = "";
    getTodos();
  });
}

function toggleTodo(id) {
  fetch(`http://localhost:5000/api/todos/${id}`, {
    method: 'PUT'
  }).then(getTodos);
}

function deleteTodo(id) {
  fetch(`http://localhost:5000/api/todos/${id}`, {
    method: 'DELETE'
  }).then(getTodos);
}
