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
        {this.props.users.map(function(user, i){
          return <div key={user.id}>{user.id} {user.username} {user.email} </div>
        })}

      </div>
    );
  }

});

module.exports = UserList;