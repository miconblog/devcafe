var React = require('react');
var Fluxxor = require('fluxxor');
var moment = require('moment');

module.exports = React.createClass({
  mixins: [
    Fluxxor.FluxMixin(React)
  ],
  
  getInitialState() {
    return {
      comments: this.props.comments
    }
  },

  render() {
    var comments = this.state.comments;
    var self = this;

    return (
      <ul id="comment-list">
        {comments.map(function(comment, i){

          var embedClass = "list-item";
          var ownerFunction = <a href="#" onClick={self.handleDeleteComment.bind(self, comment, i)} key={i}>삭제</a>
          if(i === 0) {
            embedClass += " first";
          }else if(i === comments.length-1 ){
            embedClass += " last";
          }

          return <li key={comment.id} className={embedClass} >      
            <div className="info">
              <span>{comment.isOwner}</span>
              <span className="name">{comment.username}</span>
              <time className="time">{moment(comment.createdAt).format("LLL")}</time>
              <span className="like">{comment.likeCount}좋아요</span>
              {comment.isOwner ? ownerFunction : false }
            </div>
            <div className="content" dangerouslySetInnerHTML={{__html: comment.content.replace(/\n/g, '</br>') }} />
          </li>
        })}
      </ul>
    );
    
  },
  
  handleDeleteComment(comment, idx, e){
    e.preventDefault();

    var yes = confirm("정말로 삭제할까요?");
    
    if(yes) {
      this.getFlux().actions.deleteComment({
        id: comment.id,
        idx: idx,
        boardId: this.props.boardId,
        postId : this.props.postId
      });
    }

  }

});
