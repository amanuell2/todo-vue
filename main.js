const STORAGE_KEY = 'todos-storage';
new Vue({
  'el': '.todoapp',
  data() {
    return {
      newTodo: '',
      todos: [],
      editedTodo: null,
      visibility: 'all'
    }
  },
  computed: {
    filteredTodos: function () {
      if (this.visibility === 'all') {
        return this.todos;
      } else if (this.visibility === 'active') {
        return this.todos.filter(function (todo) {
          return !todo.completed;
        })
      } else {
        return this.todos.filter(function (todo) {
          return todo.completed;
        })
      }
    }
  },
  methods: {
    addTodo: function () {
      this.todos.push({
        title: this.newTodo,
        completed: false,
        id: this.todos.length
      })
      localStorage.setItem(STORAGE_KEY, JSON.stringify(this.todos))
      this.newTodo = ''
    },
    removeTodo: function (todo) {
      this.todos.splice(this.todos.indexOf(todo), 1)
      localStorage.setItem(STORAGE_KEY, JSON.stringify(this.todos))
    },
    completedTodo: function (todo) {
      todo.completed = !todo.completed
      localStorage.setItem(STORAGE_KEY, JSON.stringify(this.todos))
    },
    editTodo: function (todo) {
      this.editedTodo = todo;
    },
    doneEdit: function (todo) {
      if (!this.editedTodo) {
        return
      }
      this.editedTodo = null
      todo.title = todo.title.trim();
      if (!todo.title) {
        this.removeTodos(todo)
      }
      localStorage.setItem(STORAGE_KEY, JSON.stringify(this.todos))

    }
  },
  created: function () {
    this.todos = JSON.parse(localStorage.getItem(STORAGE_KEY) || '[]')
    // this.todos = JSON.parse(localStorage.getItem(STORAGE_KEY) || '[]');
  }
});