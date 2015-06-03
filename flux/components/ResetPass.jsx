/**
 * HTML 1.x 버전에서 Form 태그는 GET과 POST만 지원하므로 PUT외에 다른 메소드는 Ajax로 호출한다.
 */

var React = require('react');
var Jquery = require('jquery');

module.exports = React.createClass({
  getInitialState() {

    return {
      password: null,
      validate: false,
      member: this.props.member
    }
  },

  render() {
    var member = this.props.member;
    var actionUrl = "/member/" + member.id + "/resetPassword";

    if( this.state.validate ) {
      var SubmitButton = <input type="submit" value="변경하기" />;
    }else{
      var SubmitButton = <div>
        <input type="submit" value="변경하기" disabled />
        <p>비밀번호가 일치하지 않습니다.</p>
      </div>
    }

    return (
      <form method="PUT" action={actionUrl} onSubmit={this.handleEditSubmit}>
        <h4>Reset Password</h4>
        <input type="password" name="password" onChange={this.handleChangePassword} value={this.state.password} />
        <input type="password" name="confirm" onChange={this.handleChangeConfirm} />
        {SubmitButton}
      </form>
    );
  },

  handleChangePassword(e){
    this.setState({password: e.target.value});
  },

  handleChangeConfirm(e){

    if( this.state.password === e.target.value ) {
      this.setState({validate: true});
    }else{
      this.setState({validate: false});
    }
  },

  handleEditSubmit(e){

    e.preventDefault();
    var redirectUrl = "/boards";

    Jquery.ajax({
      type: 'PUT',
      url: '/members/' + this.props.member.id + '/password',
      data: {
        password: this.state.password
      }
    }).done(function(res){

      if(res.result === "OK") {
        location.href = redirectUrl;
      }else{
        alert(res.error.message);
        location.href = redirectUrl;
      }
    });
  }

});