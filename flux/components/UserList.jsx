var React = require('react');

var UserList = React.createClass({
  getInitialState() {

    

    return {
      users: this.props.users
    }
  },

  render() {

    return (
      <div>
        <h4>User List</h4>
        <p>{this.state.users}</p>
      </div>
    );
  }

});

module.exports = UserList;