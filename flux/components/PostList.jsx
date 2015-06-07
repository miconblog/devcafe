var React = require('react');
var moment = require('moment');

module.exports = React.createClass({
 
  render() {

    var posts = this.props.posts;
    var url = "/boards/" + this.props.board.id;
    var formUrl = url + "/newpost";

    return (
      <div className="post-list">
            
        {posts.map(function(post, i){
          
          var linkUrl = "/boards/" + post.boardId + "/" + post.id;
          var titleHtml = [post.title,'(', post.commentCount, ')'].join("");
          var classs = "list-item";

          if(i === 0) {
            classs = "list-item first"
          }else if(i === posts.length-1 ){
            classs = "list-item last"
          }

          return <div key={post.id} className={classs}>
            <span>{post.id} </span>
            <a href={linkUrl} dangerouslySetInnerHTML={{__html: titleHtml }} />
            <span> {post.username} - {moment(post.updatedAt).format("MM.DD")} </span>
            <span>좋아요{post.likeCount}</span>
            <span className="read-count">조회 {post.readCount}</span>
          </div>

        })}
       
      </div>
    );
    
  }

});
