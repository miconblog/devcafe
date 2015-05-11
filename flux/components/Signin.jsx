var React = require('react');

var Signin = React.createClass({
  getInitialState() {
    return {
      path : this.props.path
    }
  },

  handleSignin(){

  },

  render() {

    console.log("this.this.props ", this.props);

    if ( this.props.path !== 'signin') {
      return false;
    }


    return (
      <div>
        <form className="loginForm" onSubmit={this.handleSignin}>
          <input type="text" className="inputtext" name="email" id="email" placeholder="이메일" ref="email" />
          <input type="submit" value="회원가입" />
        </form>
      </div>
    );
  }

});

module.exports = Signin;