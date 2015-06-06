var React = require('react');

module.exports = React.createClass({

  render() {

    return (
      <div>
        <h4>회원 목록</h4>
        {this.props.members.map(function(user, i){

          return <div key={user.id} data-id={user.id}>{i+1} {user.name} {user.email} </div>
        })}

      </div>
    );
  }

});