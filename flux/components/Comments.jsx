var React = require('react');
var Jquery = require('jquery');
var moment = require('moment');

var CommentHeader = require('./CommentHeader.jsx');
var CommentList = require('./CommentList.jsx');
var CommentCreateForm = require('./CommentCreateForm.jsx');

module.exports = React.createClass({

  getInitialState() {
    return {}
  },

  render() {
    
    return (
      <section>
        <CommentHeader />
        <CommentList flux={this.props.flux} boardId={this.props.board.id} postId={this.props.post.id} comments={this.props.comments} />
        <CommentCreateForm flux={this.props.flux} boardId={this.props.board.id} postId={this.props.post.id} />
      </section>
    ); 
  }

});
