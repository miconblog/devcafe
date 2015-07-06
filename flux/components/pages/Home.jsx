var React = require('react');

// 하위 컴포넌트
var Message          = require('../Message.jsx');
var SignIn           = require('../SignIn.jsx');
var SignUp           = require('../SignUp.jsx');
var BoardList        = require('../BoardList.jsx');
var TodoList         = require('../TodoList.jsx');
var FindPassword     = require('../FindPassword.jsx');

module.exports = React.createClass({
  
   getInitialState() {

    return {
      path: this.props.path,
      isAuth: this.props.isAuth
    }
  },


  render() {

    var path = this.state.path;
    var isAuth = this.state.isAuth;

    // 로그인후 메인 데쉬보드 
    if(isAuth){
      return <BoardList boards={this.props.boards} />;
    }

    // 로그인
    if(path === 'home') {
      return <SignIn message={this.props.message} />;
    }

    // 회원가입 
    if(path === 'signup') {
      return <SignUp message={this.props.message} email={this.props.email} emailDomain={this.props.emailDomain} 
                     companyId={this.props.companyId} companys={this.props.companys}/>;
    }

    // 비밀번호 찾기
    if(path === 'findPassword') {
      return <FindPassword path={this.props.path} message={this.props.message} email={this.props.email} />;
    }


    return <Message message={this.props.message}/>;
  }

});