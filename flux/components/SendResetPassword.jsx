var React = require('react');

module.exports = React.createClass({

  getInitialState() {
    return {
      email : this.props.email
    }
  },

  render() {

    if ( this.props.path === 'sendResetPasswordForm') {
      return (
        <div>
          <form className="signinForm" action="/sendResetPassword" method="post">
            <input type="email" className="inputtext" name="email" id="email" placeholder="이메일" ref="email" />
            <input type="submit" value="인증 메일 보내기" />
          </form>
          <p>{this.props.message}</p>
        </div>

      );
    }

    if ( this.props.path === 'sendResetPasswordFormSuccess') {

      var email =  this.props.email;

      return (
        <div>
          입력하신 {email} 로 인증 메일을 전송했습니다. 메일함을 확인해주세요.
        </div>
      );
    }    
    
    return (false);

  }

});