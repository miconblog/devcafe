var React = require('react');
var moment = require('moment');

module.exports = React.createClass({

  render() {

    return (
      <section className="container">

        <table>
          <caption>회원 목록</caption>
          <thead>
            <tr>
              <th>No.</th>
              <th>이름</th>
              <th>이메일</th>
              <th>역할</th>
              <th>메일확인</th>
              <th>비번재설정</th>
              <th>가입일</th>
              <th>마지막수정일</th>
            </tr>
          </thead>
          <tbody>
            
            {this.props.members.map(function(member, i){
              
              return <tr key={member.id}>
                <td>{i+1}</td>
                <td>{member.name}</td>
                <td>{member.email}</td>
                <td>{member.role}</td>
                <td>{member.emailVerified? 'Y' : 'N'}</td>
                <td>{member.shouldResetPassword ? 'Y' : 'N'}</td>
                <td>{moment(member.createAt).format("LLL")}</td>
                <td>{moment(member.updateAt).format("LLL")}</td>
                <td>
                  <a href="#" onClick={this.handleEdit}>수정</a>
                </td>
              </tr>
            }.bind(this))}
            
          </tbody>
        </table>

      </section>
    );
  }, 
  handleEdit(e){ 
    e.preventDefault();

  }

});