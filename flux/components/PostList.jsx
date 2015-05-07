var React = require('react');
var moment = require('moment');

var PostList = React.createClass({

  getInitialState() {
    return {
      posts: this.props.posts
    }
  },

  render() {

    return (
      <div>
        <h4>Post List</h4>
        <p>TODO: 게시판 이름을 여기에 남기자. </p>
        <div className="board-list">
          
            {this.props.posts.map(function(post, i){
              
              var linkUrl = "/boards/" + post.boardId + "/" + post.id;

              return <a className="item" key={post.id} href={linkUrl}>
                <div>{post.title} ({post.commentCount}) </div>
                <div>{post.writer} - {moment(post.updatedAt).format("MM.DD")} - 좋아요{post.likeCount} </div>
                <div>조회 {post.readCount}</div>
              </a>
            })}
         
        </div>

      </div>
    );
  }

});

module.exports = PostList;