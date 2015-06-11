var React = require('react');
var Jquery = require('jquery');

module.exports = React.createClass({
 
  getInitialState() {

    var rawEmail = this.props.member.email;
    var atIndex = rawEmail.indexOf('@');
    var emailPrev = rawEmail.substring(0, atIndex);
    var emailNext = rawEmail.substring(atIndex + 1);

    return {
      member: this.props.member,
      name: this.props.member.name,
      emailPrev: emailPrev,
      emailNext: emailNext,
      message: this.props.message
    }
  },

  render() {

    var url = "/member/" + this.props.member.id + "/info";

    return (
      <div>
        <form action={url} method="PUT" onSubmit={this.handleInfoSubmit}>
          <div>
            <label for="name">{this.state.validNameMessage}</label><br />
            <input type="text" placeholder="이름" name="name" onChange={this.handleChangeName} value={this.state.name} />
          </div>
          <div>
            <label for="emailPrev">{this.state.validEmailMessage}</label><br />
            <input type="text" placeholder="이메일" name="emailPrev" onChange={this.handleChangeEmailPrev} value={this.state.emailPrev} />
            <span>@{this.state.emailNext}</span>
          </div>
          <div>
            <input type="button" value="취소" onClick={this.handleEditCancel}/>
            <input type="submit" value="저장" />
          </div>
          <div>
            <p>{this.state.message}</p>
          </div>
        </form>
      </div>
    );

  },

  handleChangeName(e){
    this.setState({name: e.target.value});
    if( !e.target.value ){
      this.state.validNameMessage = "이름을 입력해주세요";
    }else{
      delete this.state.validNameMessage;
    }

  },

  handleChangeEmailPrev(e){
    this.setState({emailPrev: e.target.value});
    if( !e.target.value ){
      this.state.validEmailMessage = "이메일을 입력해주세요";
    }else{
      delete this.state.validEmailMessage;
    }
  },

  handleEditCancel(e){
    history.back();
  },

  handleInfoSubmit(e){

    e.preventDefault();
    var self = this;
    Jquery.ajax({
      type: 'PUT',
      url: "/members/" + this.props.member.id + "/info",
      data: {
        name: this.state.name,
        email: this.state.emailPrev + '@' + this.state.emailNext
      }
    }).done(function(res){
      if(res.result === "OK") {
        this.setState({
          message :"회원정보 저장 성공"
        });
      }else{
        this.setState({
          message: res.error.message
        });
      }
    }.bind(this));

  }


});
