import { TodoItem } from "./todoItem";
import { TodoCollection } from "./todoCollection";

let todos = [
  new TodoItem(1, "Buy Flowers"),
  new TodoItem(2, "Get Shoes"),
  new TodoItem(3, "Collect Tickets"),
  new TodoItem(4, "Call Joe", true)
]

let collection = new TodoCollection("Feri", todos)

// console.clear();
console.log(`${collection.userName}'s Todo List'`);

let newId = collection.addTodo("Go for run");
let todoItem = collection.getTodoById(newId);

// console.log(JSON.stringify(todoItem));
// todoItem.printDetails()

collection.getTodoItems(true).forEach(item => item.printDetails());

console.log("Removing completed TODO items");

collection.removeComplete();

collection.getTodoItems(true).forEach(item => item.printDetails());
