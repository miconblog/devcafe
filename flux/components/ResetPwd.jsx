var React = require('react');

var ResetPwd = React.createClass({
  getInitialState() {

    return {
      member: this.props.member
    }
  },

  render() {
    var member = this.props.member;

    return (
      <form>
        <h4>Reset Password</h4>
        <input type="text"  />
        <input type="text"  />
        <input type="submit" value="변경완료" />
      </form>
    );
  }

});

module.exports = ResetPwd;