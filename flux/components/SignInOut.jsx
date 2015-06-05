var React = require('react');

module.exports = React.createClass({

  getInitialState() {
    return {
      freelance: false
    }
  },

  render() {

    if ( this.props.path === 'signin') {
      return (
        <div>
          <form className="signinForm" action="/signin" method="post">
            <input type="text" className="inputtext" name="email" id="email" placeholder="이메일" ref="email" />
            <input type="password" className="inputtext" name="password" id="password" placeholder="비밀번호" ref="password" />
            <input type="submit" value="로그인" />
          </form>
          <p>{this.props.message}</p>
        </div>

      );
    }

    if ( this.props.path === 'signup') {

      var companys =  this.props.companys;
      var Freelance = false;

      if( this.state.freelance ) {
        Freelance = <span>
          <span>@</span><input type="text" placeholder="이메일 도메인" />
        </span>;
      }

      return (
        <div>
          <form className="signupForm" action="/signup" method="post">
            <input type="text" className="inputtext" name="email" id="email" defaultValue={this.props.email} placeholder="이메일 아이디" ref="email" />
            
            {Freelance}
            
            <select onChange={this.handleSelectChange}>
              {companys.map(function(company){
                return <option value={company.id} key={company.id}>{company.name}</option>
              })}
              <option value="0">프리랜서</option>
            </select>

            <input type="submit" value="회원가입" />
          </form>
          <p>{this.props.message}</p>
        </div>
      );
    }    
    
    return (false);

  },

  handleSelectChange(e) {

    if(e.target.value === '0') {
      this.setState({freelance:true});    
    }else{
      this.setState({freelance:false});
    }
  }

});