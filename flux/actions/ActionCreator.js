var constants = {
  ADD_TODO: "ADD_TODO",
  TOGGLE_TODO: "TOGGLE_TODO",
  CLEAR_TODOS: "CLEAR_TODOS"
};

var methods = {
  addTodo: function(text){
    this.dispatch(constants.ADD_TODO, {text: text});
  },

  toggleTodo: function(id) {
    this.dispatch(constants.TOGGLE_TODO, {id: id});
  },

  clearTodos: function() {
    this.dispatch(constants.CLEAR_TODOS);
  }
};

module.exports = {
  methods: methods,
  constants: constants
}