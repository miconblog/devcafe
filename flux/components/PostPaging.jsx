var React = require('react');

module.exports = React.createClass({
 
  render() {

    if( !this.props.totalCount ) {
      return (false);
    }


    var page = this.props.page;
    var totalCount = this.props.totalCount;
    var pageSize = this.props.pageSize;
    var url = "/boards/" + this.props.board.id;

    // 11개, 10개일때 lastNum 은 2페이지
    // 10개, 10개일때 lastNum 은 1페이지
    var lastNum = parseInt(totalCount / pageSize);
    if( ( totalCount % pageSize ) > 0 ){
      lastNum++;
    }
    var startNum = 1;
    if( page > 10 ){
      startNum = ( page / 10 ) * 10;
    }

    var endNum = startNum + 9;

    if( endNum > lastNum ){
      endNum = lastNum;
    }

    var pageNumbers = [];
    for( var i = startNum; i <= endNum; i++ ){
      pageNumbers.push(i);
    }

    return(
      <div className="post-paging">
        {pageNumbers.map(function(num){
          return <a href={url + '?p=' + num}>{num}</a>
        })}
      </div>
    );

  }

});
