//  Handle import dengan cara modern TypeScript
import promptSync from "prompt-sync"; //  handle import
const prompt = promptSync({ sigint: true });

//  Buat type untuk Todo
type Todo = {
  id: string;          //  memberi type string untuk id
  text: string;        //  memberi type string untuk isi todo
  isCompleted: boolean; //  memberi type boolean untuk status selesai/aktif
};

//  Array todos sekarang berisi Todo[]
let todos: Todo[] = []; //  give type: array of Todo

//  Fungsi untuk buat ID unik
function generateUniqueId(): string { //  give type: return string
  return Date.now().toString() + Math.random().toString(36).substring(2, 9);
}

//  Tambah todo baru
function addTodo(): void { //  give type: return void
  const text: string = prompt("Enter new to-do text:").trim(); //  kasih type string
  if (!text) {
    console.log("To-do text cannot be empty!");
    return;
  }

  const newTodo: Todo = { //  newTodo harus mengikuti type Todo
    id: generateUniqueId(),
    text: text,
    isCompleted: false,
  };

  todos.push(newTodo);
  console.log(`To-do "${newTodo.text}" added.`);
}

//  Tandai todo selesai
function markTodoCompleted(): void { //  return void
  listTodos();
  const input: string = prompt("Enter the NUMBER of the to-do to mark as completed:").trim();

  //  Type guard: pastikan input valid number
  if (!input || isNaN(Number(input))) {
    console.log("Invalid number. Please enter a valid number from the list.");
    return;
  }

  const todoIndex: number = Number(input) - 1; //  ubah ke number
  if (todoIndex < 0 || todoIndex >= todos.length) {
    console.log("Invalid number. Please enter a valid number from the list.");
    return;
  }

  if (todos[todoIndex].isCompleted) {
    console.log(`To-do "${todos[todoIndex].text}" is already completed.`);
  } else {
    todos[todoIndex].isCompleted = true;
    console.log(`To-do "${todos[todoIndex].text}" marked as completed.`);
  }
}

//  Hapus todo
function deleteTodo(): void {
  listTodos();
  const input: string = prompt("Enter the NUMBER of the to-do to delete:").trim();

  //  Type guard untuk validasi angka
  if (!input || isNaN(Number(input))) {
    console.log("Invalid number. Please enter a valid number from the list.");
    return;
  }

  const todoIndex: number = Number(input) - 1;
  if (todoIndex < 0 || todoIndex >= todos.length) {
    console.log("Invalid number. Please enter a valid number from the list.");
    return;
  }

  const deletedTodo: Todo = todos.splice(todoIndex, 1)[0]; //  tipe Todo
  console.log(`To-do "${deletedTodo.text}" deleted.`);
}

//  Tampilkan semua todos
function listTodos(): void {
  console.log("\n--- YOUR TO-DO LIST ---");

  if (todos.length === 0) {
    console.log("No to-dos to display.");
    return;
  }

  todos.forEach((todo: Todo, index: number) => {
    const status: string = todo.isCompleted ? "[DONE]" : "[ACTIVE]";
    console.log(`${index + 1}. ${status} | ${todo.text}`);
  });
  console.log("-----------------------\n");
}

//  Jalankan aplikasi utama
function runTodoApp(): void {
  let running: boolean = true; //  beri type boolean
  while (running) {
    console.log("\nWelcome to Simple To-Do List!");
    console.log("Commands:");
    console.log("1. add");
    console.log("2. complete");
    console.log("3. delete");
    console.log("4. list");
    console.log("5. exit");
    const command: string = prompt("Enter command:").toLowerCase().trim();

    switch (command) {
      case "add":
      case "1":
        addTodo();
        break;
      case "complete":
      case "2":
        markTodoCompleted();
        break;
      case "delete":
      case "3":
        deleteTodo();
        break;
      case "list":
      case "4":
        listTodos();
        break;
      case "exit":
      case "5":
        running = false;
        console.log("Exiting To-Do List. Goodbye!");
        break;
      default:
        console.log("Invalid command. Please try again.");
    }
  }
}

//  Pastikan hanya jalan kalau file ini dijalankan langsung
if (require.main === module) {
  runTodoApp();
}

//  Export supaya bisa dites
export {
  todos,
  generateUniqueId,
  addTodo,
  markTodoCompleted,
  deleteTodo,
  listTodos,
  runTodoApp,
};
