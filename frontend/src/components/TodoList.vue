<template>
  <div>
    <v-row>
      <v-col
        v-for="(todo, index) in todos"
        :key="index"
        cols="12"
        md="6"
        lg="4"
      >
        <v-card class="mb-3">
          <v-card-text>
            <p :class="{ 'todo-done': todo.done }">{{ todo.text }}</p>
          </v-card-text>
          <v-card-actions>
            <v-btn @click="markDone(index)" v-if="!todo.done">Mark Done</v-btn>
            <v-btn @click="deleteTodo(index)">Delete</v-btn>
          </v-card-actions>
        </v-card>
      </v-col>
    </v-row>
  </div>
</template>

<script lang="ts">
import { defineComponent } from "vue";

interface Todo {
  text: string;
  done: boolean;
}

export default defineComponent({
  props: {
    todos: {
      type: Array as () => Todo[],
      required: true,
    },
    markDone: Function as (index: number) => void,
    deleteTodo: Function as (index: number) => void,
  },
});
</script>

<style scoped>
.todo-done {
  text-decoration: line-through;
}
</style>
