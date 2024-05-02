<template>
  <v-app>
    <v-container>
      <h1>Todo App</h1>
      <TodoInput></TodoInput>
      <TodoList
        :todos="todos"
        :markDone="markDone"
        :deleteTodo="deleteTodo"
      ></TodoList>
    </v-container>
  </v-app>
</template>

<script lang="ts">
import { defineComponent } from "vue";
import TodoInput from "./components/TodoInput.vue";
import TodoList from "./components/TodoList.vue";
import { useTodoStore } from "./stores/store.ts";

export default defineComponent({
  components: {
    TodoInput,
    TodoList,
  },
  setup() {
    const store = useTodoStore();

    return {
      todos: store.todos,
      addTodo: store.addTodo,
      markDone: store.markDone,
      deleteTodo: store.deleteTodo,
    };
  },
});
</script>
