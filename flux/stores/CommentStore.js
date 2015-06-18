var Fluxxor = require('fluxxor');
var actions = require('../actionCreator.js');
var Jquery = require('jquery');

module.exports = Fluxxor.createStore({

  initialize : function(){
    this.comments = [];

    // 디스패처에서 상수로 정의한 이벤트(액션)가 들어오면 스토어에 변경을 가한다. 
    // 즉, 기존에 컨트롤러가 스토어의 값을 변경한것을 디스패처가 액션을 호출하는 형태로 변경한것!
    this.bindActions(
      actions.constants.ADD_COMMENT, this.onAddComment,
      actions.constants.DELETE_COMMENT, this.onDeleteComment
    );

  },

  setState: function(comments){
    this.comments = comments;
  },

  onAddComment: function(payload) {
    var self = this;
    var comment = payload.comment;

    // 실제로는 여기서 댓글 객체를 받으면 Ajax로 서버에 쏘고 그 응답을 커맨트에 담은 뒤에 
    // change 이벤트를 발생시켜야한다. 

    Jquery.ajax({
      type: 'POST',
      url: ['/boards', comment.boardId, comment.postId, 'comment'].join('/'),
      data: {
        content : comment.content
      }
    }).done(function(res){
      
      if(res.result === "OK") {
        res.data.isOwner = true;
        self.comments.push(res.data);
        self.emit("change");
      }else{
        alert(res.message);
      }

    }).fail(function(res){
    
      console.log(res);
      alert(res.responseJSON.message);
    
    });

  },

  onDeleteComment: function(payload) {
    var self = this;
    var comment = payload.comment;

    Jquery.ajax({
      type: 'DELETE',
      url: ['/boards', comment.boardId, comment.postId, 'comment', comment.id].join('/')
      //url: '/boards/' + this.props.boardId + '/' + this.props.postId + "/comment/" + this.state.comments[i].id
    }).done(function(res){

      if(res.result === "OK") {

        self.comments.splice(comment.idx, 1);
        self.emit("change");

      }else{

        alert(res.error.message);

      }

    });

  },

  getState: function(){

    return {
      comments: this.comments
    }
  }

});