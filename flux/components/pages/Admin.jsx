var React = require('react');

// 하위 컴포넌트
var SignInOut = require('../SignInOut.jsx');
var AdminBoardList = require('../AdminBoardList.jsx');
var AdminMemberList = require('../AdminMemberList.jsx');
var AdminCompanyList = require('../AdminCompanyList.jsx');


module.exports = React.createClass({

  componentDidMount() {
    console.log("Home componentDidMount:", this.props)

  },

  render() {

    return (
      <div>
        <SignInOut path={this.props.path} message={this.props.message} email={this.props.email}/>
        <div>
          <ul>
            <li>기본관리</li>
            <li>통계관리</li>
          </ul>
        </div>
        <div>
          <AdminBoardList boards={this.props.boards} />
          <AdminMemberList members={this.props.members} />
          <AdminCompanyList companys={this.props.companys} />
        </div>
      </div>
    );
  }

 

});