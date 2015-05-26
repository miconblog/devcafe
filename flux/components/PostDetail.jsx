var React = require('react');
var moment = require('moment');
var Jquery = require('jquery');

module.exports = React.createClass({
 
  render() {

    var post = this.props.post;
    var url = "/boards/" + this.props.board.id;
    var ModifyButton = false;

    if(this.props.post.isOwner){
      ModifyButton = <div className="action">
        <button onClick={this.handleEditPost}>편집</button>
        <button onClick={this.handleDeletePost}>삭제</button>
      </div>;
    }


    return (
      <article>
        <h4><a href={url}> &lt; {this.props.board.name} 목록으로</a></h4>
        {ModifyButton}
        <div>{post.title} ({post.commentCount}) {post.username} - {moment(post.updatedAt).format("LLL")} </div> 
        <div dangerouslySetInnerHTML={{__html: post.content.replace(/\n/g, '</br>') }} />
        <div>좋아요{post.likeCount} - 조회 {post.readCount}</div>
      </article>
    );
    
  },

  handleEditPost(e){
    e.preventDefault();

    location.href = '/boards/' + this.props.board.id + '/' + this.props.post.id + '/edit';
  },

  handleDeletePost(e){ 
    e.preventDefault();

    var post = this.props.post;
    var redirectUrl = "/boards/"+ this.props.board.id;
    var yes = confirm("정말로 삭제할까요?");

    if(!yes) {
      return;
    }

    Jquery.ajax({
      type: 'DELETE',
      url: '/boards/' + this.props.board.id + '/' + post.id
    }).done(function(res){
      if(res.result === "OK") {
        location.href = redirectUrl;
      }else{
        alert(res.error.message);
        location.href = redirectUrl;
      }
    });
  }

});
