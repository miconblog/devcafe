var React = require('react');
var Jquery = require('jquery');
var moment = require('moment');
var Fluxxor = require('fluxxor');

module.exports = React.createClass({
  mixins: [
    Fluxxor.FluxMixin(React)
  ],

  getInitialState() {
    return {
      comments: this.props.comments
    }
  },

  render() {
    return (
      <header>
        <span>{this.state.comments.length}개의 댓글이 있습니다.</span>
      </header>
    );
  }
});