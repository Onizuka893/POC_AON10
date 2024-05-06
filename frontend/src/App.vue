<template>
  <v-app>
    <v-container>
      <h1>Todo App</h1>
      <TodoInput></TodoInput>
      <TodoList
        :markDone="markDone"
        :deleteTodo="deleteTodo"
      ></TodoList>
    </v-container>
  </v-app>
</template>

<script lang="ts">
import {computed, defineComponent, ref} from "vue";
import TodoInput from "./components/TodoInput.vue";
import TodoList from "./components/TodoList.vue";
import { useTodoStore } from "./stores/apistore.ts";

export default defineComponent({
  components: {
    TodoInput,
    TodoList,
  },
  setup() {
    const store = useTodoStore();

    return {
      addTodo: store.addTodo,
      markDone: store.updateTodoStatus,
      deleteTodo: store.deleteTodo,
    };
  },
});
</script>
