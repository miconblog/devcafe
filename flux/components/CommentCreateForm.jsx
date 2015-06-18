var React = require('react');
var moment = require('moment');
var Fluxxor = require('fluxxor');

module.exports = React.createClass({
  mixins: [
    Fluxxor.FluxMixin(React)
  ],

  getInitialState() {
    
    return {
      content: '',
      postId: this.props.postId,
      boardId: this.props.boardId
    }
  },

  render() {

    var commentCreateUrl = "/boards/" + this.props.boardId + "/" + this.props.postId + "/comment";
    
    return (
      <form action={commentCreateUrl} method="POST" onSubmit={this.handleCommentCreateSubmit}>
        <input type="text" ref="commentInput" placeholder="댓글을 입력해주세요" value={this.state.content} onChange={this.handleChangeContent} />
      </form>
    ); 
  },

  handleChangeContent(e){
    this.setState({content: e.target.value});


  },

  handleCommentCreateSubmit(e){

    e.preventDefault();

    if( !this.state.content ){
      alert("댓글이 입력되어 있지 않습니다.");
      return;
    }
 
    this.getFlux().actions.addComment(this.state);
    this.setState({content:''});
  }

});
