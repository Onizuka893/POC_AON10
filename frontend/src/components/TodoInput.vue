<template>
  <v-form @submit.prevent="addTodo">
    <v-text-field v-model="newTodo" label="Add Todo"></v-text-field>
  </v-form>
</template>

<script lang="ts">
import { defineComponent, ref } from "vue";
import { useTodoStore } from "../stores/store.ts"; // Import the store

export default defineComponent({
  setup() {
    const newTodo = ref("");
    const todoStore = useTodoStore(); // Initialize the store

    const addTodo = () => {
      if (newTodo.value.trim() !== "") {
        todoStore.addTodo(newTodo.value.trim()); // Call the addTodo function from the store
        newTodo.value = ""; // Clear the input field after adding the todo
      }
    };

    return {
      newTodo,
      addTodo,
    };
  },
});
</script>
