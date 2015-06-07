var React = require('react');
var moment = require('moment');

module.exports = React.createClass({

  render() {

    return (
      <div className="block">

        <table>
          <caption>회사 목록</caption>
          <thead>
            <tr>
              <th>No.</th>
              <th>이름</th>
              <th>도메인</th>
              <th>회원수</th>
              <th>생성시간</th>
              <th>마지막수정</th>
            </tr>
          </thead>
          <tbody>
            
            {this.props.companys.map(function(company, i){
              return <tr key={company.id}>
                <td>{i+1}</td>
                <td>{company.name}</td>
                <td>{company.domain}</td>
                <td>{company.memberCount}</td>
                <td>{moment(company.createAt).format("LLL")}</td>
                <td>{moment(company.updateAt).format("LLL")}</td>
              </tr>
            })}
            
          </tbody>
        </table>

      </div>
    );
  }

});