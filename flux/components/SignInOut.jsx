var React = require('react');

var Signin = React.createClass({

  render() {

    console.log("this.this.props ", this.props);

    if ( this.props.path === 'signin') {
      return (
        <div>
          <form className="signinForm" action="/signin" method="post">
            <input type="text" className="inputtext" name="email" id="email" placeholder="이메일" ref="email" />
            <input type="password" className="inputtext" name="password" id="password" placeholder="비밀번호" ref="password" />
            <input type="submit" value="로그인" />
          </form>
        </div>
      );
    }

    if ( this.props.path === 'signup') {

      if ( this.props.message ) {
        return (<p>{this.props.message}</p>);
      }

      return (
        <div>
          <form className="signupForm" action="/signup" method="post">
            <input type="text" className="inputtext" name="email" id="email" placeholder="이메일" ref="email" />
            <input type="submit" value="회원가입" />
          </form>
        </div>
      );
    }    
    
    return (false);

  }

});

module.exports = Signin;