var React = require('react');
var moment = require('moment');

var PostList = React.createClass({

  getInitialState() {
    return {

      posts: this.props.posts
    }
  },

  render() {

  
    if( this.props.type === 'detail' ) {

      var post = this.props.post;
      var url = "/boards/" + this.props.board.id;
      return (
        <div>
          <h4><a href={url}> &lt; {this.props.board.name} 목록으로</a></h4>
          <div>{post.title} ({post.commentCount}) </div>
          <div>{post.content} {post.username} - {moment(post.updatedAt).format("MM.DD")} </div>
          <div>좋아요{post.likeCount} - 조회 {post.readCount}</div>

        </div>
      );

    }else {

      var posts = this.props.posts;
      return (
        <div>
          <h4>{this.props.board.name} </h4>
          <div className="board-list">
            
            {posts.map(function(post, i){
              
              var linkUrl = "/boards/" + post.boardId + "/" + post.id;

              return <a className="item" key={post.id} href={linkUrl}>
                <div>{post.title} ({post.commentCount}) </div>
                <div>{post.username} - {moment(post.updatedAt).format("MM.DD")} </div>
                <div>좋아요{post.likeCount} - 조회 {post.readCount}</div>
              </a>

            })}
           
          </div>

        </div>
      );
    }
  }

});

module.exports = PostList;