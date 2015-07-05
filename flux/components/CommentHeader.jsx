var React = require('react');
var Fluxxor = require('fluxxor');

module.exports = React.createClass({
  mixins: [
    Fluxxor.FluxMixin(React)
  ],

  getInitialState() {
    return {
    }
  },

  render() {
    return (
      <header className="actions">
        <a href="#">좋아요</a>
        <a href="#createComment">댓글달기</a>
        <a href="#">공유하기</a>
      </header>
    );
  }
});