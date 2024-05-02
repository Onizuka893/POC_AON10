import { defineStore } from "pinia";

interface Todo {
  text: string;
  done: boolean;
}

export const useTodoStore = defineStore("todoStore", {
  state: (): { todos: Todo[] } => ({
    todos: [],
  }),
  actions: {
    addTodo(this: any, newTodo: string) {
      this.todos.push({ text: newTodo, done: false });
    },
    markDone(this: any, index: number) {
      this.todos[index].done = true;
    },
    deleteTodo(this: any, index: number) {
      this.todos.splice(index, 1);
    },
  },
});
