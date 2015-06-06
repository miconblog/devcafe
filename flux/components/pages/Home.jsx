var React = require('react');

// 하위 컴포넌트
var SignInOut = require('../SignInOut.jsx');
var BoardList = require('../BoardList.jsx');
var TodoList = require('../TodoList.jsx');

module.exports = React.createClass({
  

  render() {

    return (
      <div>
        <SignInOut path={this.props.path} message={this.props.message} email={this.props.email} companys={this.props.companys}/>
        <BoardList boards={this.props.boards} />
        <TodoList flux={this.props.flux} isShow={this.props.showTodoList}/>
      </div>
    );
  }

});