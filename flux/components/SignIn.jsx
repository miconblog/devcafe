var React = require('react');

module.exports = React.createClass({

  getInitialState() {
    console.log("SignIn: ", this.props)
    return {}
  },


  render() {

    return (
      <div id="signin">
        <form action="/" method="post">
          <div className="cell">
            <input type="text" className="inputtext" name="email" id="email" placeholder="이메일" ref="email" />
            <input type="password" className="inputtext" name="password" id="password" placeholder="비밀번호" ref="password" />
          </div>
          <div className="cell">
            <input type="submit" value="로그인" />
          </div>
        </form>
        <a href="/findPassword">비밀번호 찾기</a>
        <p>{this.props.message}</p>
      </div>

    );
    

  },

  handleChangeDomain(e){
    this.setState({domainName: e.target.value})
  },

  handleSelectChange(e) {
    console.log(e.target.value)

    // 프리랜서일 경우, 이메일 도메인을 직접 입력해야한다.
    if(e.target.value === '0') {
      
      this.setState({
        disabledDomain: false,
        disabledClass: '',
        domainName: ''
      });

    }else{

      this.setState({
        disabledDomain: true,
        disabledClass: 'disabled',
        domainName: e.target.value.split(":")[0]
      });

    }
  }
});