var React = require('react');

var Signin = React.createClass({

  render() {

    console.log("this.this.props ", this.props);

    if ( this.props.path !== 'signin') {
      return false;
    }

    if ( this.props.message ) {
      return (<p>{this.props.message}</p>);
    }


    return (
      <div>
        <form className="loginForm" onSubmit={this.handleSignin} action="/signin" method="post">
          <input type="text" className="inputtext" name="email" id="email" placeholder="이메일" ref="email" />
          <input type="submit" value="회원가입" />
        </form>
      </div>
    );
  }

});

module.exports = Signin;