var React = require('react');
var UserList = require('./UserList.jsx');
var BoardList = require('./BoardList.jsx');
var PostList = require('./PostList.jsx');

var App = React.createClass({
  getInitialState() {
    return {
      title: this.props.title
    }
  },

  render() {
    return (
      <div>
        <h1> Welcome to {this.state.title} & React </h1>
        <p>React Ready!!</p>
      </div>
    );
  }

});

module.exports = App;