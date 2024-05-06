import { defineStore } from "pinia";
import {v4 as uuidv4} from 'uuid';
import axios from "axios";

interface Todo {
  id: string;
  text: string;
  done: boolean;
}


const url = 'http://localhost:8000/todos';

export const useTodoStore = defineStore("todoStore", {
  state: () => ({
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
        const response = await axios.get(url);
        console.log("this is it: " + response.data)
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
        const myuuid = uuidv4();
        const response = await axios.post(url, {
          id: myuuid,
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
    async updateTodoStatus(todoId: string) {
      try {
        this.loading = true;
        const todo = this.todos.filter(x => x.id === todoId);
        this.todos = this.todos.filter(todo => todo.id !== todoId);
        console.log(todo);
        const response = await axios.patch(`${url}/${todoId}`, {
          done: !todo.done,
        });
        this.todos.push(response.data);
      } catch (error) {
        this.error = error.message;
      } finally {
        this.loading = false;
      }
    },
    async deleteTodo(todoId: string) {
      try {
        this.loading = true;
        await axios.delete(`${url}/${todoId}`);
        this.todos = this.todos.filter((todo) => todo.id !== todoId);
      } catch (error) {
        this.error = error.message;
      } finally {
        this.loading = false;
      }
    },
  },
});
