type Todo = { id: string; text: string; isCompleted: boolean; };
let todos: Todo[] = [];

function generateUniqueId(): string {
  return Date.now().toString() + Math.random().toString(36).substring(2, 9);
}

function addTodo(): void {
  const input = document.getElementById("todo-input") as HTMLInputElement;
  const text = input.value.trim();
  if (!text) { alert("Task cannot be empty!"); return; }

  const newTodo: Todo = { id: generateUniqueId(), text, isCompleted: false };
  todos.push(newTodo);
  input.value = "";
  renderTodos();
}

function toggleComplete(id: string): void {
  const todo = todos.find(t => t.id === id);
  if (todo) todo.isCompleted = !todo.isCompleted;
  renderTodos();
}

function deleteTodo(id: string): void {
  todos = todos.filter(t => t.id !== id);
  renderTodos();
}

function renderTodos(): void {
  const list = document.getElementById("todo-list") as HTMLUListElement;
  list.innerHTML = "";
  if (todos.length === 0) {
    list.innerHTML = "<li>No tasks yet. Add one above!</li>";
    return;
  }
  todos.forEach(todo => {
    const li = document.createElement("li");
    li.className = todo.isCompleted ? "completed" : "";
    li.innerHTML = `
      <span>${todo.text}</span>
      <div>
        <button onclick="toggleComplete('${todo.id}')">✔</button>
        <button onclick="deleteTodo('${todo.id}')">❌</button>
      </div>
    `;
    list.appendChild(li);
  });
}

// Event listeners
(document.getElementById("add-btn") as HTMLButtonElement).addEventListener("click", addTodo);
(window as any).toggleComplete = toggleComplete;
(window as any).deleteTodo = deleteTodo;

// Dark mode toggle
(document.getElementById("toggle-mode") as HTMLButtonElement).addEventListener("click", () => {
  document.body.classList.toggle("dark");
});

// Keyboard support
const inputEl = document.getElementById("todo-input") as HTMLInputElement;
inputEl.addEventListener("keydown", (e) => {
  if (e.key === "Enter") addTodo();
  else if ((e.key === "Backspace" || e.key === "Delete") && todos.length > 0) {
    todos.pop();
    renderTodos();
  }
});
