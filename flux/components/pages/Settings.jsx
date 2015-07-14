/**
 * HTML 1.x 버전에서 Form 태그는 GET과 POST만 지원하므로 PUT외에 다른 메소드는 Ajax로 호출한다.
 */

var React = require('react');
var Jquery = require('jquery');

// 하위 컴포넌트
var SettingMemberInfo = require('../SettingMemberInfo.jsx');
var ResetPass = require('./ResetPassword.jsx')
module.exports = React.createClass({

  render() {
    var SettingMenus = <ul>
      <li><a href="/account/settings/member">사용자 정보 변경</a></li>
      <li><a href="/account/settings/password">비밀번호 변경</a></li>
    </ul>

    var currentComponent;
    switch(this.props.type){
      case 'memberInfo':
        currentComponent = <SettingMemberInfo member={this.props.member} />;
        break;
      case 'password':
        currentComponent = <ResetPass member={this.props.member} redirectUrl='/settings' />;
        break;
      default:
        currentComponent = <div>Dashboard - 메뉴를 선택해주세요</div>
    }

    return (
      <div>
        {SettingMenus}
        {currentComponent}
      </div>
    );
  }
});