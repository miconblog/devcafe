var React = require('react');

module.exports = React.createClass({

  render() {

    return (
      <div>
        <h4>회사 목록</h4>
        {this.props.companys.map(function(company, i){
          return <div key={company.id} data-id={company.id}>{i+1} {company.name} {company.domain} </div>
        })}

      </div>
    );
  }

});