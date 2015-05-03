var React = require('react');

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
        {this.props.posts.map(function(post, i){
          return <div key={post.id}>{post.id} {post.title} {post.content} </div>
        })}

      </div>
    );
  }

});

module.exports = PostList;