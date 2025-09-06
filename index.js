var _a;
var todos = [];
function generateUniqueId() {
    return Date.now().toString() + Math.random().toString(36).substring(2, 9);
}
function addTodo() {
    var input = document.getElementById("todo-input");
    var text = input.value.trim();
    if (!text) {
        alert("To-do text cannot be empty!");
        return;
    }
    var newTodo = { id: generateUniqueId(), text: text, isCompleted: false };
    todos.push(newTodo);
    input.value = "";
    renderTodos();
}
function toggleComplete(id) {
    var todo = todos.find(function (t) { return t.id === id; });
    if (todo) {
        todo.isCompleted = !todo.isCompleted;
        renderTodos();
    }
}
function deleteTodo(id) {
    todos = todos.filter(function (t) { return t.id !== id; });
    renderTodos();
}
function renderTodos() {
    var list = document.getElementById("todo-list");
    list.innerHTML = "";
    if (todos.length === 0) {
        list.innerHTML = "<li>No tasks yet. Add one above!</li>";
        return;
    }
    todos.forEach(function (todo) {
        var li = document.createElement("li");
        li.innerHTML = "\n      <span style=\"text-decoration: ".concat(todo.isCompleted ? "line-through" : "none", "\">\n        ").concat(todo.text, "\n      </span>\n      <button onclick=\"toggleComplete('").concat(todo.id, "')\">\u2714</button>\n      <button onclick=\"deleteTodo('").concat(todo.id, "')\">\u274C</button>\n    ");
        list.appendChild(li);
    });
}
(_a = document.getElementById("add-btn")) === null || _a === void 0 ? void 0 : _a.addEventListener("click", addTodo);
window.toggleComplete = toggleComplete;
window.deleteTodo = deleteTodo;
