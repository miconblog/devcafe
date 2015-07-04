var React = require('react');

module.exports = React.createClass({

  getInitialState() {
    console.log("Message: ", this.props)
    return {
      message: this.props.message || ''
    };
  },

  render() {
 
    return (
      <div id="message">
        <div className="info">
          {this.state.message.split('\n').map(function(msg, i){
            return <p key={i}>{msg}</p>
          })}
        </div>
        <div>
          <a className="btn" href="/">홈으로 돌아가기</a>
        </div>
      </div>
    );    

  }

});