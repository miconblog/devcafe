var React = require('react');
var moment = require('moment');

var PostList = React.createClass({

  getInitialState() {
    return {

      posts: this.props.posts
    }
  },

  render() {

    if( this.props.type === 'create' ) {

      var post = this.props.post;
      var url = "/boards/" + this.props.board.id;
      var formUrl = url + "/newpost";
      return (
        <div>
          <h4><a href={url}> &lt; {this.props.board.name} 목록으로</a></h4>
          <form action={formUrl} method="POST">
            <div>
              <input type="text" placeholder="제목" name="title" />
            </div>
            <div>
              <textarea type="text" placeholder="내용" name="content"></textarea>
            </div>
            <div>
              <input type="button" value="취소" />
              <input type="submit" value="저장" />
            </div>
            <div>
              <p>{this.props.message}</p>
            </div>
          </form>
        </div>
      );

    }else if( this.props.type === 'detail' ) {

      var post = this.props.post;
      var url = "/boards/" + this.props.board.id;
      return (
        <article>
          <h4><a href={url}> &lt; {this.props.board.name} 목록으로</a></h4>
          <div className="action">
            <button onClick={this.handleEditPost}>편집</button>
          </div>

          <div>{post.title} ({post.commentCount}) {post.username} - {moment(post.updatedAt).format("MM.DD")} </div> 
          <div dangerouslySetInnerHTML={{__html: post.content.replace(/\n/g, '</br>') }} />
          <div>좋아요{post.likeCount} - 조회 {post.readCount}</div>
        </article>
      );

    }else {

      var posts = this.props.posts;
      return (
        <div>
          <h4>{this.props.board.name} </h4>

          <div className="action">
            <button onClick={this.handleNewPost}>글쓰기</button>
          </div>


          <div className="post-list">
            
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
  },

  handleNewPost(e) {
    e.preventDefault();
    location.href = "/boards/skp/newpost";
    console.log(e);
  },

  handleEditPost(e){
    e.preventDefault();
    //location.href = "/boards/skp/newpost";
  }

});

module.exports = PostList;