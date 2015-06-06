var Fluxxor = require('fluxxor');
var actions = require('../actionCreator.js');

module.exports = Fluxxor.createStore({

  initialize : function(){

    this.todoId = 0;
    this.todos = [];

    // 디스패처에서 상수로 정의한 이벤트(액션)가 들어오면 스토어에 변경을 가한다. 
    // 즉, 기존에 컨트롤러가 스토어의 값을 변경한것을 디스패처가 액션을 호출하는 형태로 변경한것!
    this.bindActions(
      actions.constants.ADD_TODO, this.onAddTodo, 
      actions.constants.TOGGLE_TODO, this.onToggleTodo,
      actions.constants.CLEAR_TODOS, this.onClearTodos
    );

  }, 

  onAddTodo: function(payload) {
    var id = this._nextTodoId();
    var todo = {
      id: id, 
      text: payload.text,
      complete: false
    }

    this.todos[id] = todo;
    this.emit("change");
  },

  onToggleTodo: function(payload) {
    var id = payload.id;
    this.todos[id].complete = !this.todos[id].complete;
    this.emit("change");
  },

  onClearTodos: function(){

    var todos = this.todos;

    Object.keys(todos).forEach(function(key){
      if( todos[key].complete ) {
        delete todos[key];
      }
    });

    this.emit("change");
  },

  getState: function(){

    return {
      todos: this.todos
    }
  },

  _nextTodoId: function(){
    return ++this.todoId;
  }
});