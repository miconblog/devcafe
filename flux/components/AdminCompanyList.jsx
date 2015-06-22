var React = require('react');
var moment = require('moment');
var Jquery = require('jquery');

module.exports = React.createClass({
  getInitialState() {

    return {
      company: {
        name : 'Naver',
        domain: 'naver.com'
      },
      layer: 'layer'
    }
  },

  render() {

    return (
      <section className="container">
        <header>
          <div id="ly_company_form" className={this.state.layers}>
            <input type="text" placeholder="회사이름" onChange={this.handleChangeName} value={this.state.company.name} />
            <input type="text" placeholder="이메일 도메인" onChange={this.handleChangeDomain} value={this.state.company.domain} />
            <input type="button" value="회사 추가" onClick={this.handleCreateCompany} />
          </div>
        </header>
        <table>
          <caption>회사 목록</caption>
          <thead>
            <tr>
              <th>No.</th>
              <th>이름</th>
              <th>도메인</th>
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
                <td>{moment(company.createAt).format("LLL")}</td>
                <td>{moment(company.updateAt).format("LLL")}</td>
                <td><a href="#" onClick={this.handleEdit}>수정</a></td>
              </tr>
            }.bind(this))}
            
          </tbody>
        </table>
      </section>
    );
  },
  handleEdit(e){
    e.preventDefault();
  },
  handleOpenCreateCompany(e){
    e.preventDefault();

    if( this.state.layer.indexOf('show') < 0 ) {
      this.setState({layer:'layer show'});     
    }else{
      this.setState({layer:'layer'});
    }
      
  },

  handleChangeName(e){

  },

  handleChangeDomain(e){

  },

  handleCreateCompany(e){

    e.preventDefault();

    Jquery.ajax({
      type: 'POST',
      url: '/api/companys',
      data: this.state.company
    }).done(function(res){
      
      console.log(res);

    }).fail(function(res){
    
      console.log(res);
       
    });


  }

});