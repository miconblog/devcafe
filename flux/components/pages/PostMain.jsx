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
      return (<PostDetail board={this.props.board} post={this.props.post}/>);

      case 'list':

      var posts = this.props.posts;
      return (
        <div>
          <h4>{this.props.board.name} </h4>

          <div className="action">
            <button onClick={this.handleNewPost}>글쓰기</button>
          </div>
          <PostList board={this.props.board} posts={this.props.posts} />
          <PostPaging board={this.props.board} page={this.props.page} total_count={this.props.total_count} page_size={this.props.page_size} />
        </div>
      );

    }

  },

  handleNewPost(e) {
    e.preventDefault();
    location.href = "/boards/"+ this.props.board.id +"/newpost";
    console.log(e);
  }

});