var React = require('react');
var moment = require('moment');

module.exports = React.createClass({
 
  render() {

    var posts = this.props.posts;
    var url = "/boards/" + this.props.board.id;
    var formUrl = url + "/newpost";

    return (
      <ul id="post-list">
        
        {posts.map(function(post, i){
          
          var linkUrl = "/boards/" + post.boardId + "/" + post.id;
          var titleHtml = [post.title,'(', post.commentCount, ')'].join("");
          var classs = "list-item";

          if(i === 0) {
            classs = "list-item first"
          }else if(i === posts.length-1 ){
            classs = "list-item last"
          }

          return <li key={post.id} className={classs}>
            <a href={linkUrl}>
              <span className="title" dangerouslySetInnerHTML={{__html: titleHtml }} />
              <time className="time">{moment(post.updatedAt).format("LLL")}</time>
              <span className="like">{post.likeCount}좋아요</span>
              <span className="count">{post.readCount}조회</span>
              <span className="name">{post.username}</span>
            </a>
          </li>

        })}
       
      </ul>
    );
    
  },

  handleClick(e){
    console.log(e.target)
    //location.href = ""
  }

});
