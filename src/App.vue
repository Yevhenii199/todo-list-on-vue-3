<template>
  <div id="app">
    <h1>Todo Aplication</h1>
    <hr>

    <router-view />
  </div>
</template>

<script>
import TodoList from '@/components/TodoList.vue'
import AddTodo from '@/components/AddTodo.vue'
export default {
  name: 'App',
  data() {
    return {
       todos: []
    }
  },
  mounted() {
    fetch('https://jsonplaceholder.typicode.com/todos?_limit= 3')
      .then(response => response.json())
      .then(json => {
        this.todos = json
      })

  },
  methods: {
    removeTodo(id){
      this.todos = this.todos.filter(t => t.id !== id)
    },
    addTodo(todo) {
      this.todos.push(todo)
    }
  },
  components: {
    TodoList, AddTodo
  }
}
</script>

<style>
#app {
  font-family: Avenir, Helvetica, Arial, sans-serif;
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
  text-align: center;
  color: #2c3e50;
  margin-top: 60px;
}
</style>
