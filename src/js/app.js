import Vue from 'vue'

Vue.component('create-todo', {
  props:['value','errflg'],
  data:function (){
    return {
      errMsg: '入力が空です',
    }
  },
  methods: {
    addTodo: function () {
      this.$emit('add-todo');
    }
  },
  template:`
  <div class="form">
    <div class="inputArea">
      <input type="text" class="inputText" v-bind:value="value"
       v-on:input="$emit('input', $event.target.value)" @keyup.shift.enter="addTodo">
      <span v-if="errflg" class="error">{{errMsg}}</span>
    </div>
  </div>
  `
});

Vue.component('search-box', {
  props:['value'],
  template:`
  <div class="searchBox">
    <i class="fa fa-search searchBox__icon" aria-hidden="true"></i>
    <input type="text" class="searchBox__input js-search"
    v-bind:value="value" v-on:input="$emit('input', $event.target.value)">
  </div>
  `
});

Vue.component('todo-task', {
  props:['todo'],
  methods: {
    doneTodo: function (todo) {
      this.$emit('done-todo', todo);
    },
    deleteTodo: function (todo) {
      this.$emit('delete-todo', todo);
    },
    openEditTodo: function (todo) {
      this.$emit('open-edit-todo', todo);
    },

    closeEditTodo: function (todo) {
      this.$emit('close-edit-todo', todo);
    },
  },
  template:`
  <li :class="{'list__item--done': todo.isDone}" class="list__item">
    <i :class="{'fa fa-circle-o': !todo.isDone, 'fa fa-check-circle': todo.isDone} " class=" icon-check"  @click="doneTodo(todo)" aria-hidden="true"></i>
    <span v-if="!todo.editText" @click="openEditTodo(todo)">{{todo.title}}</span>
    <input v-if="todo.editText"  v-model="todo.title" type="text" @keyup.shift.enter="closeEditTodo(todo)" class="editText" >
    <i class="fa fa-trash icon-trash" @click="deleteTodo(todo)" aria-hidden="true"></i>
  </li>
  `
});

new Vue({
  el: '#app1',
  data: {
      val: '',
      searchWord: '',
      errflg: false,
      count:3,
      todos: [
        { id:1, title: 'sample todo 01', isDone: false, editText: false},
        { id:2, title: 'sample todo 02', isDone: false, editText: false }
      ]
    },
    computed : {
      filteredTodo:function () {

        let todos = [];
        let regExp = new RegExp('^' + this.searchWord);
        for(let i in this.todos) {
          let todo = this.todos[i];
          if(todo.title.match(regExp)) {
            todos.push(todo);
          }
        }
        return todos;
      }
    },
  methods: {

    addTodo: function () {
        if(this.val === ''){
          this.errflg = true
        }else{
          this.errflg = false
          this.todos.push({
            id:this.count,
            title: this.val,
            isDone: false,
            editText: false
          })
          this.count++
          this.val = ''
        }
    },
    deleteTodo: function (todo) {
      const todos = this.todos;
      const index = todos.indexOf(todo);
      todos.splice(index, 1);

    },

    doneTodo: function (todo) {
      todo.isDone = !todo.isDone;
    },

    openEditTodo: function (todo) {
      todo.editText = !todo.editText;
    },

    closeEditTodo: function (todo) {
        todo.editText = !todo.editText;
    },


  }
})
