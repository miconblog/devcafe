var React = require('react');
var UserList = require('./UserList.jsx');
var BoardList = require('./BoardList.jsx');
var PostList = require('./PostList.jsx');
var SignInOut = require('./SignInOut.jsx');

var Home = React.createClass({
  // getInitialState() {
  //   return {
  //     title: this.props.title
  //   }
  // },

  render() {

    return (
      <div>
        <h1> Home Component (props.title: {this.props.title})</h1>
        <SignInOut path={this.props.path} message={this.props.message}/>
      </div>
    );
  }

});

module.exports = Home;