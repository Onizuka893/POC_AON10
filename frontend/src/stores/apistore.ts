import { defineStore } from "pinia";
import axios from "axios";

interface Todo {
  id: string;
  text: string;
  done: boolean;
}

export const useTodoStore = defineStore("todoStore", {
  state: () => ({
    todos: [] as Todo[],
    loading: false,
    error: null as string | null,
  }),
  actions: {
    async fetchTodos() {
      try {
        this.loading = true;
        const response = await axios.get("/api/todos");
        this.todos = response.data;
      } catch (error) {
        this.error = error.message;
      } finally {
        this.loading = false;
      }
    },
    async addTodo(newTodo: string) {
      try {
        this.loading = true;
        const response = await axios.post("/api/todos", {
          text: newTodo,
          done: false,
        });
        this.todos.push(response.data);
      } catch (error) {
        this.error = error.message;
      } finally {
        this.loading = false;
      }
    },
    async updateTodoStatus(todo: Todo) {
      try {
        this.loading = true;
        const response = await axios.put(`/api/todos/${todo.id}`, {
          ...todo,
          done: !todo.done,
        });
        const index = this.todos.findIndex((t) => t.id === todo.id);
        if (index !== -1) {
          this.todos[index] = response.data;
        }
      } catch (error) {
        this.error = error.message;
      } finally {
        this.loading = false;
      }
    },
    async deleteTodo(todoId: string) {
      try {
        this.loading = true;
        await axios.delete(`/api/todos/${todoId}`);
        this.todos = this.todos.filter((todo) => todo.id !== todoId);
      } catch (error) {
        this.error = error.message;
      } finally {
        this.loading = false;
      }
    },
  },
});
