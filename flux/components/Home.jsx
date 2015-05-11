var React = require('react');
var UserList = require('./UserList.jsx');
var BoardList = require('./BoardList.jsx');
var PostList = require('./PostList.jsx');
var Signin = require('./Signin.jsx');

var App = React.createClass({
  getInitialState() {
    return {
      title: this.props.title
    }
  },

  render() {
    return (
      <div>
        <h1> Home Component (state.title: {this.state.title})</h1>
        <Signin path={this.props.path} />
      </div>
    );
  }

});

module.exports = App;