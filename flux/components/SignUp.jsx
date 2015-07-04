var React = require('react');

module.exports = React.createClass({

  getInitialState() {

    console.log("SignUp: ", this.props)

    var domainName = null;
    if( this.props.companys && 0 < this.props.companys.length ) {
      domainName = this.props.companys[0].domain
    }

    return {
      disabledDomain: true,
      disabledClass: 'disabled',
      domainName: domainName
    }
  },

  render() {
 
    var companys =  this.props.companys;
    if( !companys ){
      companys = [];
    }
    var EmailDomain = false;

    return (
      <div id="signup">
        <form action="/signup" method="post" onSubmit={this.handleSignupSubmit}>
          <div className="cell">
            <select name="company" onChange={this.handleSelectChange} >
              {companys.map(function(company, i){
                return <option value={company.domain + ':' + company.id} key={company.id}>{company.name}</option>
              })}
              <option value="0">프리랜서</option>
            </select>
          </div>
          <div className="cell">
            <input type="text" name="emailName" placeholder="이메일 아이디" ref="email" />
            <input type="text" name="emailDomain" placeholder="이메일 도메인" 
                  value={this.state.domainName} 
                  disabled={this.state.disabledDomain} 
                  onChange={this.handleChangeDomain}
                  className={this.state.disabledClass}/>
          </div>
          <div className="cell">
            <input type="submit" value="회원가입" />
          </div>
        </form>
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