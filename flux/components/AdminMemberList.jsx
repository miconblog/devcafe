var React = require('react');

module.exports = React.createClass({

  render() {

    return (
      <div>

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
                <td>{member.createAt}</td>
                <td>{member.updateAt}</td>

              </tr>
            })}
            
          </tbody>
        </table>

      </div>
    );
  }

});