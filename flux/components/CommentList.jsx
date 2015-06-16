var React = require('react');
var Jquery = require('jquery');
var moment = require('moment');

module.exports = React.createClass({

  getInitialState() {
    return {
      comments: this.props.post.comments
    }
  },

  render() {
    var comments = this.state.comments;
    var self = this;
    var CommentList;
    if( !comments || !comments.length ){
      CommentList =
        <span>댓글이 없습니다.</span>
    }else{
      CommentList =
        <div>
          <span>{this.props.post.commentCount}개의 댓글이 있습니다.</span>
          <ul id="comment-list">
            {comments.map(function(comment, i){

              var embedClass = "list-item";
              var ownerFunction = <a href="#" onClick={self.handleDeleteComment.bind(self, i)} key={i}>삭제</a>
              if(i === 0) {
                embedClass += " first";
              }else if(i === comments.length-1 ){
                embedClass += " last";
              }

              return <li key={comment.id} className={embedClass} >
                <span>{comment.isOwner}</span>
                <span className="name">{comment.username}</span>
                <span className="content" dangerouslySetInnerHTML={{__html: comment.content }} />
                <time className="time">{moment(comment.createdAt).format("LLL")}</time>
                <span className="like">{comment.likeCount}좋아요</span>
                {comment.isOwner ? ownerFunction : false }
              </li>
            })}
          </ul>
        </div>
    }

    var commentCreateUrl = "/boards/" + this.props.board.id + "/" + this.props.post.id + "/comment";
    var CommentCreateForm = (
      <form action={commentCreateUrl} method="POST" onSubmit={this.handleCommentCreateSubmit}>
        <input type="text" ref="commentInput" placeholder="댓글을 입력해주세요" value={this.state.content} onChange={this.handleChangeContent} />
      </form>
    );


    return (
      <div>
        {CommentList}
        {CommentCreateForm}
      </div>
    );
    
  },
  handleChangeContent(e){
    this.setState({content: e.target.value});
  },
  handleCommentCreateSubmit(e){

    e.preventDefault();

    if( !this.state.content ){
      alert("댓글이 입력되어 있지 않습니다.");
      return;
    }
    var self = this;
    Jquery.ajax({
      type: 'POST',
      url: e.target.action,
      data: {
        content : this.state.content
      }
    }).done(function(res){
      if(res.result === "OK") {
        self.state.comments.push(res.data);
        self.setState({content: '', comments: self.state.comments}, function(){
          React.findDOMNode(self.refs.commentInput).focus();
        });
      }else{
        alert(res.message);
      }
    }).fail(function(res){
      console.log(res);
        alert(res.responseJSON.message);
    });
  },
  handleDeleteComment(i, e){
    console.log(i);
    e.preventDefault();
    e.stopPropagation();

    var yes = confirm("정말로 삭제할까요?");

    if(!yes) {
      return;
    }
    var self = this;

    Jquery.ajax({
      type: 'DELETE',
      url: '/boards/' + this.props.board.id + '/' + this.props.post.id + "/comment/" + this.state.comments[i].id
    }).done(function(res){
      if(res.result === "OK") {
        //location.href = redirectUrl;
        self.state.comments.splice(i, 1);
        self.setState({comments: self.state.comments});
      }else{
        alert(res.error.message);
        //location.href = redirectUrl;
      }
    });
  }

});
