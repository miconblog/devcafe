/**
 * 액션 헬퍼 객체에는 Constants도 포함하고 있다. 
 * 따라서 액션을 정의할때 Constants도 수정해줘야한다.
 */

var constants = {
  ADD_TODO: "ADD_TODO",
  TOGGLE_TODO: "TOGGLE_TODO",
  CLEAR_TODOS: "CLEAR_TODOS",
  ADD_COMMENT: "ADD_COMMENT",
  DELETE_COMMENT: "DELETE_COMMENT"
};

var methods = {
  
  addComment: function(comment){

    this.dispatch(constants.ADD_COMMENT, {comment: comment});
  },

  deleteComment: function(comment){

    this.dispatch(constants.DELETE_COMMENT, {comment: comment});
  },

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