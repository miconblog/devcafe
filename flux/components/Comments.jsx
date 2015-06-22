var React = require('react');
var Jquery = require('jquery');
var moment = require('moment');
var Fluxxor = require('fluxxor');

var CommentCreateForm = require('./CommentCreateForm.jsx');
var CommentHeader = require('./CommentHeader.jsx');
var CommentList = require('./CommentList.jsx');

module.exports = React.createClass({
  
  // START - Fluxxor의 스토어를 사용할 경우 END 까지는 기본으로 추가해야한다.
  mixins: [
    Fluxxor.FluxMixin(React),
    Fluxxor.StoreWatchMixin('CommentStore')
  ],

  getStateFromFlux: function(){
    var flux = this.props.flux;
    flux.store("CommentStore").setState(this.props.post.comments);
    return flux.store("CommentStore").getState();
  },

  componentWillReceiveProps: function (nextProps) {
    this.setState(this.getStateFromFlux());
  },
  // END

  getInitialState() {
    return {}
  },

  render() {
    
    return (
      <section>
        <CommentHeader flux={this.props.flux} comments={this.state.comments} />
        <CommentCreateForm flux={this.props.flux} boardId={this.props.board.id} postId={this.props.post.id} />
        <CommentList flux={this.props.flux} boardId={this.props.board.id} postId={this.props.post.id} comments={this.state.comments} />
      </section>
    ); 
  }

});
