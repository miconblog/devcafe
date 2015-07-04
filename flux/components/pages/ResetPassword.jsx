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
    var actionUrl = "/api/member/" + member.id + "/resetPassword";

    if( this.state.validate ) {
      var SubmitButton = <div className="cell">
        <input type="submit" value="비밀번호 변경하기" />
      </div>
    }else{
      var SubmitButton = <div className="cell">
        <input type="submit" value="비밀번호 변경하기" disabled />
        <p>비밀번호가 일치하지 않습니다.</p>
      </div>
    }

    return (
      <div id="reset_password">
        <h3>비밀번호를 변경하세요.</h3>
        <form method="PUT" action={actionUrl} onSubmit={this.handleEditSubmit}>
          <div className="cell">
            <input type="password" name="password" onChange={this.handleChangePassword} value={this.state.password} />
            <input type="password" name="confirm" onChange={this.handleChangeConfirm} />
          </div>
          {SubmitButton}
        </form>
      </div>
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
    var redirectUrl = this.props.redirectUrl ? this.props.redirectUrl : '/'

    Jquery.ajax({
      type: 'PUT',
      url: '/api/members/' + this.props.member.id + '/password',
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