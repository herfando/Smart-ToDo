type Todo = {
  id: string;
  text: string;
  isCompleted: boolean;
};

let todos: Todo[] = [];

function generateUniqueId(): string {
  return Date.now().toString() + Math.random().toString(36).substring(2, 9);
}

function addTodo(): void {
  const input = document.getElementById("todo-input") as HTMLInputElement;
  const text = input.value.trim();
  if (!text) {
    alert("To-do text cannot be empty!");
    return;
  }
  const newTodo: Todo = { id: generateUniqueId(), text, isCompleted: false };
  todos.push(newTodo);
  input.value = "";
  renderTodos();
}

function toggleComplete(id: string): void {
  const todo = todos.find((t) => t.id === id);
  if (todo) {
    todo.isCompleted = !todo.isCompleted;
    renderTodos();
  }
}

function deleteTodo(id: string): void {
  todos = todos.filter((t) => t.id !== id);
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
    li.innerHTML = `
      <span style="text-decoration: ${todo.isCompleted ? "line-through" : "none"}">
        ${todo.text}
      </span>
      <button onclick="toggleComplete('${todo.id}')">✔</button>
      <button onclick="deleteTodo('${todo.id}')">❌</button>
    `;
    list.appendChild(li);
  });
}

document.getElementById("add-btn")?.addEventListener("click", addTodo);
(window as any).toggleComplete = toggleComplete;
(window as any).deleteTodo = deleteTodo;
