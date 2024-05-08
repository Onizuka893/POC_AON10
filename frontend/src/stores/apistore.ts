import { defineStore } from "pinia";
import { v4 as uuidv4 } from "uuid";
import axios from "axios";

interface Todo {
  id: string;
  text: string;
  done: boolean;
}

//const url = 'http://localhost:8000/todos';
const url = "https://api.jsonbin.io/v3/b/663b7bfee41b4d34e4f096e5";
const apiKey = "$2a$10$91UChaLHKsSkyjShQBXJ0OzU70w3ntALo4UUJncNcICQcD7KIeUwK";

export const useTodoStore = defineStore("todoStore", {
  state: () => ({
    existingData: null,
    todos: [] as Todo[],
    loading: false,
    error: null as string | null,
  }),
  getters: {
    getTasks(): Todo[] {
      return this.todos || [];
    },
  },
  actions: {
    async fetchTodos() {
      try {
        this.loading = true;
        const response = await axios.get(`${url}/latest`, {
          headers: {
            "secret-key": apiKey,
          },
        });
        this.existingData = response.data;
        this.todos = this.existingData.record.todos;
      } catch (error) {
        this.error = error.message;
      } finally {
        this.loading = false;
      }
    },
    async addTodo(newTodo: string) {
      try {
        this.loading = true;
        const myuuid = uuidv4();
        const newTodoObj = {
          id: myuuid, // Generate a unique ID here
          text: newTodo,
          done: false,
        };
        this.existingData.record.todos.push(newTodoObj);
        const response = await axios.put(url, this.existingData.record, {
          headers: {
            "content-type": "application/json",
            "secret-key": this.apiKey,
          },
        });
        this.todos = response.data.record.todos;
      } catch (error) {
        this.error = error.message;
      } finally {
        this.loading = false;
      }
    },
    async updateTodoStatus(todoId: string) {
      try {
        this.loading = true;
        const todo = this.todos.find((todo) => todo.id === todoId);
        todo.done = !todo.done;
        this.existingData.record.todos = this.todos;
        const response = await axios.put(url, this.existingData.record, {
          headers: {
            "content-type": "application/json",
            "secret-key": apiKey,
          },
        });
        this.todos = response.data.record.todos;
      } catch (error) {
        this.error = error.message;
      } finally {
        this.loading = false;
      }
    },
    async deleteTodo(todoId: string) {
      try {
        this.loading = true;
        this.todos = this.todos.filter((todo) => todo.id !== todoId);
        this.existingData.record.todos = this.todos;
        const response = await axios.put(url, this.existingData.record, {
          headers: {
            "content-type": "application/json",
            "secret-key": apiKey,
          },
        });
        this.todos = response.data.record.todos;
      } catch (error) {
        this.error = error.message;
      } finally {
        this.loading = false;
      }
    },
  },
});
