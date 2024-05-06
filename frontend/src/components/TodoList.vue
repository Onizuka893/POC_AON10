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
            <v-btn @click="markDone(todo.id)" v-if="!todo.done">Mark Done</v-btn>
            <v-btn @click="deleteTodo(todo.id)">Delete</v-btn>
          </v-card-actions>
        </v-card>
      </v-col>
    </v-row>
  </div>
</template>

<script lang="ts">
import {computed, defineComponent} from "vue";
import {useTodoStore} from "../stores/apistore";

interface Todo {
  text: string;
  done: boolean;
}

export default defineComponent({
  props: {
    markDone: Function as (index: number) => void,
    deleteTodo: Function as (index: number) => void,
  },
  setup() {
    const store = useTodoStore();
    const todos = computed(() => store.getTasks);

    onMounted(async () => {
      await store.fetchTodos();
    });

    return {
      todos,
    }
  }
});
</script>

<style scoped>
.todo-done {
  text-decoration: line-through;
}
</style>
