var React = require('react');
var UserList = require('./UserList.jsx');

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
        { this.props.path === 'users' ? <UserList users={this.props.users} /> : false }
      </div>
    );
  }

});

module.exports = App;