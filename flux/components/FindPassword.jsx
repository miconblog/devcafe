var React = require('react');

module.exports = React.createClass({

  getInitialState() {
    return {
      email : this.props.email
    }
  },

  render() {

    return (
      <div id="find_pass">
        <form className="findPassForm" action="/findPassword" method="post">
          <div className="cell">
            <input type="email" className="inputtext" required name="email" id="email" placeholder="이메일" ref="email" />
          </div>
          <div className="cell">
            <input type="submit" value="인증 메일 보내기" />
          </div>
        </form>
        <p>{this.props.message}</p>
      </div>

    );    
  }

});