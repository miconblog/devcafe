var React = require('react');
var moment = require('moment');
var Jquery = require('jquery');

module.exports = React.createClass({

  getInitialState() {
    return {
      members: this.props.members
    }
  },


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
              <th>소속</th>
              <th>역할</th>
              <th>메일확인</th>
              <th>비번재설정</th>
              <th>가입일</th>
              <th>마지막수정일</th>
            </tr>
          </thead>
          <tbody>
            
            {this.state.members.map(function(member, i){
              
              if( !member.originRole ){
                member.originRole = member.role; 
              }

              member.companyName = member.company ? member.company.name : '-'

              
              return <tr key={member.id}>
                <td>{i+1}</td>
                <td>{member.name}</td>
                <td>{member.email}</td>
                <td>{member.companyName}</td>
                <td>
                  <select value={member.role} onChange={this.handleChangeRole.bind(this, member, i)}>
                    <option value="admin">관리자</option>
                    <option value="user">일반회원</option>
                  </select>
                </td>
                <td>{member.emailVerified? 'Y' : 'N'}</td>
                <td>{member.shouldResetPassword ? 'Y' : 'N'}</td>
                <td>{moment(member.createdAt).format("L")}</td>
                <td>{moment(member.updatedAt).format("LLL")}</td>
                <td>
                  {member.isChange ? <a href="#" onClick={this.handleSave.bind(this, member, i)}>수정 완료</a> : false}
                </td>
              </tr>
            }.bind(this))}
            
          </tbody>
        </table>

      </section>
    );
  }, 
  handleSave(member, idx, e){ 
    var self = this;
    var members = this.state.members;
    e.preventDefault();

    Jquery.ajax({
      type: 'PUT',
      url: '/api/members/' + member.id,
      data: member
    }).done(function(res){
      console.log(res);
      members[idx] = res;
      self.setState({members:members});
    });
  },

  handleChangeRole(member, idx, e){
    var members = this.state.members;
    members[idx].role = e.target.value;

    if(member.originRole !== e.target.value){
      member.isChange = true;
    }else{
      member.isChange = false;
    }

    this.setState({members: members});
  }

});