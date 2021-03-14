import { TodoItem } from "./todoItem";
import { JsonTodoCollection } from "./jsonTodoCollection";
import * as inquirer from 'inquirer';

let todos = [
  new TodoItem(1, "Buy Flowers"),
  new TodoItem(2, "Get Shoes"),
  new TodoItem(3, "Collect Tickets"),
  new TodoItem(4, "Call Joe", true)
]

let collection = new JsonTodoCollection("Feri", todos)

let newId = collection.addTodo("Go for run");
let todoItem = collection.getTodoById(newId);
let showCompleted = true;

function displayTodoList() : void {
  console.log(
    `${collection.userName}'s Todo List'`
    + `(${    collection.getItemCounts().incomplete } items to do)`
  );
  collection.getTodoItems(showCompleted).forEach(item => item.printDetails());
}

enum Commands {
  Add = "Add New Task",
  Complete = "Complete Task",
  Toggle = "Show/Hide Completed",
  Purge = "Purge Completed Tasks",
  Quit = "Quit"
}

function promptAdd() : void {
  console.clear();
  inquirer
    .prompt({
      type: "input",
      name: "add",
      message: "Enter task:"
    })
    .then( answer => {
        let task = answer["add"];
        if (task !== "") {
          collection.addTodo(task);
        }
        promptUser();
    });
}

function promptComplete() : void {
  console.clear();
  inquirer
    .prompt({
      type: "checkbox",
      name: "complete",
      message: "Mark Tasks Complete",
      choices: collection.getTodoItems(showCompleted).map(item => ({
        name: item.task,
        value: item.id,
        checked: item.complete
      }))
    })
    .then(answers => {
      let completedTasks = answers["complete"] as number[];
      collection.getTodoItems(true).forEach(item =>
        collection.markComplete(
          item.id,
          completedTasks.find(id => id === item.id) != undefined
        )
      )
      promptUser();
    });
}


function promptUser() : void {
  console.clear();
  displayTodoList();
  inquirer
    .prompt({
      type: "list",
      name: "command",
      message: "Choose option",
      choices: Object.values(Commands)
    })
    .then(answers => {
      let command = answers["command"];
      switch (command) {
        case Commands.Toggle:
          showCompleted = !showCompleted;
          promptUser();
          break;
        case Commands.Add:
          promptAdd();
          break;
        case Commands.Complete:
          if (collection.getItemCounts().incomplete > 0) {
            promptComplete();
          } else {
            promptUser();
          }
          break;
        case Commands.Purge:
          collection.removeComplete();
          promptUser();
          break;
      }
    });
}

promptUser();
