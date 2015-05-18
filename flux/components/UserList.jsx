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
        <h4>가입된 전체 사용자 목록</h4>
        {this.props.users.map(function(user, i){
          return <div key={user.id}>{user.id} {user.name} {user.email} </div>
        })}

      </div>
    );
  }

});

module.exports = UserList;