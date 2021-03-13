import { TodoItem } from "./todoItem";

export class TodoCollection {
  private nextId: number = 1;
  private itemMap = new Map<number, TodoItem>();

  constructor(
    public userName: string,
    todoItems: TodoItem[] = []) {
      todoItems.forEach(item => this.itemMap.set(item.id, item));
    }

  addTodo(task: string) : number {
    while (this.getTodoById(this.nextId)) {
      this.nextId++;
    }

    let item = new TodoItem(this.nextId, task)
    this.itemMap.set(item.id, item);

    return item.id;
  }

  getTodoById(id: number) : TodoItem {
    return this.itemMap.get(id);
  }

  markComplete(id: number, complete: boolean) {
    const todoItem = this.getTodoById(id);
    if (todoItem) {
      todoItem.complete = complete;
    }
  }

  getTodoItems(includeComplete: boolean = false) : TodoItem[] {
    return [...this.itemMap.values()].filter(
      item => includeComplete || !item.complete
    );
  }

  removeComplete() {
    this.itemMap.forEach(item => {
      if (item.complete) {
        this.itemMap.delete(item.id)
      }
    })
  }
}
