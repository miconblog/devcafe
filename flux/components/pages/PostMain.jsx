var React = require('react');
var PostCreateForm = require('../PostCreateForm.jsx');
var PostEditForm = require('../PostEditForm.jsx');
var PostList = require('../PostList.jsx');
var PostDetail = require('../PostDetail.jsx');
var PostPaging = require('../PostPaging.jsx');

module.exports = React.createClass({

  getInitialState() {

    return {

      posts: this.props.posts
    }
  },

  render() {

    switch(this.props.type){
      case 'create':
      return (<PostCreateForm board={this.props.board} />);
     
      case 'edit':
      return (<PostEditForm board={this.props.board} post={this.props.post}/>);
      
      case 'detail':
      return (<PostDetail flux={this.props.flux} board={this.props.board} post={this.props.post}/>);

      case 'list':

      var posts = this.props.posts;
      var linkUrl = "/boards/"+ this.props.board.id +"/newpost";
      return (
        <section id="post-main">
          <header className="title-box">
            <div className="title">
              <h3>{this.props.board.name}</h3>
            </div>
            <div className="total">게시글 <span>10/30</span>개</div>
            <div className="ctrl-box">
              <a className="btn" href={linkUrl}>글쓰기</a>
            </div>
          </header>

          <PostList board={this.props.board} posts={this.props.posts} />
          <PostPaging board={this.props.board} page={this.props.page} totalCount={this.props.totalCount} pageSize={this.props.pageSize} />
        </section>
      );

    }
  }

});