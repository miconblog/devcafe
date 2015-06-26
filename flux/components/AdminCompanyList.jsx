var React = require('react');
var Jquery = require('jquery');
var moment = require('moment');
var _ = require('lodash');

module.exports = React.createClass({
  getInitialState() {

    return {
      companys: this.props.companys,
      company: {
        id : null,
        name : '',
        domain: ''
      },
      isCreateMode: true,
      layer: 'layer'
    }
  },

  render() {
    var BtnCreateOrEdit = <input type="button" value="수정 완료" onClick={this.handleEditCompany} />
    if(this.state.isCreateMode){
      BtnCreateOrEdit = <input type="button" value="회사 추가" onClick={this.handleCreateCompany} />
    }

    return (
      <section className="container">
        <header>
          <div id="ly_company_form" className={this.state.layers}>
            <input type="text" placeholder="회사이름" onChange={this.handleChangeName} value={this.state.company.name} />
            <input type="text" placeholder="이메일 도메인" onChange={this.handleChangeDomain} value={this.state.company.domain} />
            {BtnCreateOrEdit}
            <input type="button" value="닫기" onClick={this.handleClose} />
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
            
            {this.state.companys.map(function(company, i){

              return <tr key={company.id}>
                <td>{i+1}</td>
                <td>{company.name}</td>
                <td>{company.domain}</td>
                <td>{moment(company.createdAt).format("LLL")}</td>
                <td>{moment(company.updatedAt).format("LLL")}</td>
                <td>
                  <a href="#" onClick={this.handleEdit.bind(this, company)}>수정</a>
                  <a href="#" onClick={this.handleDelete.bind(this, company)}>삭제</a>
                </td>
              </tr>
            }.bind(this))}
            
          </tbody>
        </table>
      </section>
    );
  },
  handleEdit(company, e){
    e.preventDefault();
    this.setState({
      company: company,
      isCreateMode: false
    });
  },
  handleClose(company, e){
    this.setState({
      company: {
        id: null,
        name: '',
        domain: ''
      },
      isCreateMode: true
    });
  },
  handleDelete(company, e){
    var self = this;
    e.preventDefault();

    Jquery.ajax({
      type: 'DELETE',
      url: '/api/companys/' + company.id,
    }).done(function(res){

      var coms = self.state.companys;
      var idx = _.findIndex(coms, function(com) {
        return com.id === company.id;
      });

      coms.splice(idx, 1);
      self.setState({companys: coms});
    });
    
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
    e.preventDefault();
    this.state.company.name = e.target.value;
    this.setState({company: this.state.company});
  },

  handleChangeDomain(e){
    e.preventDefault();
    this.state.company.domain = e.target.value;
    this.setState({company: this.state.company});
  },

  handleEditCompany(e){

    var self = this;
    e.preventDefault();

    Jquery.ajax({
      type: 'PUT',
      url: '/api/companys',
      data: this.state.company
    }).done(function(res){
      
      self.setState({company:res});
      console.log(res);

    }).fail(function(res){
    
      console.log(res);
       
    });
  },

  handleCreateCompany(e){

    var self = this;
    e.preventDefault();

    Jquery.ajax({
      type: 'POST',
      url: '/api/companys',
      data: this.state.company
    }).done(function(res){

      var coms = self.state.companys;
      coms.push(res);
      self.setState({companys:coms});
      console.log(res);

    }).fail(function(res){
    
      console.log(res);
       
    });
  }

});