//  Type untuk Todo
type Todo = {
  id: string;
  text: string;
  isCompleted: boolean;
};

let todos: Todo[] = [];

//  Fungsi untuk buat ID unik
function generateUniqueId(): string {
  return Date.now().toString() + Math.random().toString(36).substring(2, 9);
}

//  Tambah todo baru
function addTodo(): void {
  const input = document.getElementById("todo-input") as HTMLInputElement;
  const text: string = input.value.trim();
  if (!text) {
    alert("To-do text cannot be empty!");
    return;
  }

  const newTodo: Todo = {
    id: generateUniqueId(),
    text,
    isCompleted: false,
  };

  todos.push(newTodo);
  input.value = "";
  renderTodos();
}

//  Tandai todo selesai
function toggleComplete(id: string): void {
  const todo = todos.find((t) => t.id === id);
  if (todo) {
    todo.isCompleted = !todo.isCompleted;
    renderTodos();
  }
}

//  Hapus todo
function deleteTodo(id: string): void {
  todos = todos.filter((t) => t.id !== id);
  renderTodos();
}

//  Render ke HTML
function renderTodos(): void {
  const list = document.getElementById("todo-list") as HTMLUListElement;
  list.innerHTML = "";

  if (todos.length === 0) {
    list.innerHTML = "<li>No tasks yet. Add one above!</li>";
    return;
  }

  todos.forEach((todo) => {
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

//  Event listener tombol add
(document.getElementById("add-btn") as HTMLButtonElement).addEventListener("click", addTodo);

//  Expose function ke global biar bisa dipanggil di onclick
(window as any).toggleComplete = toggleComplete;
(window as any).deleteTodo = deleteTodo;
