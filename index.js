"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.todos = void 0;
exports.generateUniqueId = generateUniqueId;
exports.addTodo = addTodo;
exports.markTodoCompleted = markTodoCompleted;
exports.deleteTodo = deleteTodo;
exports.listTodos = listTodos;
exports.runTodoApp = runTodoApp;
//  Handle import dengan cara modern TypeScript
var prompt_sync_1 = require("prompt-sync"); //  handle import
var prompt = (0, prompt_sync_1.default)({ sigint: true });
//  Array todos sekarang berisi Todo[]
var todos = []; //  give type: array of Todo
exports.todos = todos;
//  Fungsi untuk buat ID unik
function generateUniqueId() {
    return Date.now().toString() + Math.random().toString(36).substring(2, 9);
}
//  Tambah todo baru
function addTodo() {
    var text = prompt("Enter new to-do text:").trim(); //  kasih type string
    if (!text) {
        console.log("To-do text cannot be empty!");
        return;
    }
    var newTodo = {
        id: generateUniqueId(),
        text: text,
        isCompleted: false,
    };
    todos.push(newTodo);
    console.log("To-do \"".concat(newTodo.text, "\" added."));
}
//  Tandai todo selesai
function markTodoCompleted() {
    listTodos();
    var input = prompt("Enter the NUMBER of the to-do to mark as completed:").trim();
    //  Type guard: pastikan input valid number
    if (!input || isNaN(Number(input))) {
        console.log("Invalid number. Please enter a valid number from the list.");
        return;
    }
    var todoIndex = Number(input) - 1; //  ubah ke number
    if (todoIndex < 0 || todoIndex >= todos.length) {
        console.log("Invalid number. Please enter a valid number from the list.");
        return;
    }
    if (todos[todoIndex].isCompleted) {
        console.log("To-do \"".concat(todos[todoIndex].text, "\" is already completed."));
    }
    else {
        todos[todoIndex].isCompleted = true;
        console.log("To-do \"".concat(todos[todoIndex].text, "\" marked as completed."));
    }
}
//  Hapus todo
function deleteTodo() {
    listTodos();
    var input = prompt("Enter the NUMBER of the to-do to delete:").trim();
    //  Type guard untuk validasi angka
    if (!input || isNaN(Number(input))) {
        console.log("Invalid number. Please enter a valid number from the list.");
        return;
    }
    var todoIndex = Number(input) - 1;
    if (todoIndex < 0 || todoIndex >= todos.length) {
        console.log("Invalid number. Please enter a valid number from the list.");
        return;
    }
    var deletedTodo = todos.splice(todoIndex, 1)[0]; //  tipe Todo
    console.log("To-do \"".concat(deletedTodo.text, "\" deleted."));
}
//  Tampilkan semua todos
function listTodos() {
    console.log("\n--- YOUR TO-DO LIST ---");
    if (todos.length === 0) {
        console.log("No to-dos to display.");
        return;
    }
    todos.forEach(function (todo, index) {
        var status = todo.isCompleted ? "[DONE]" : "[ACTIVE]";
        console.log("".concat(index + 1, ". ").concat(status, " | ").concat(todo.text));
    });
    console.log("-----------------------\n");
}
//  Jalankan aplikasi utama
function runTodoApp() {
    var running = true; //  beri type boolean
    while (running) {
        console.log("\nWelcome to Simple To-Do List!");
        console.log("Commands:");
        console.log("1. add");
        console.log("2. complete");
        console.log("3. delete");
        console.log("4. list");
        console.log("5. exit");
        var command = prompt("Enter command:").toLowerCase().trim();
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
