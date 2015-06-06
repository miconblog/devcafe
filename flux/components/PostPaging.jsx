var React = require('react');

module.exports = React.createClass({
 
  render() {

    var page = this.props.page;
    var total_count = this.props.total_count;
    if( !total_count )
      return;
    var page_size = this.props.page_size;

    var url = "/boards/" + this.props.board.id;

    // 11개, 10개일때 lastnum 은 2페이지
    // 10개, 10개일때 lastnum 은 1페이지
    var lastnum = parseInt(total_count / page_size);
    if( ( total_count % page_size ) > 0 ){
      lastnum++;
    }
    var startnum = 1;
    if( page > 10 ){
      startnum = ( page / 10 ) * 10;
    }

    var endnum = startnum + 9;

    if( endnum > lastnum ){
      endnum = lastnum;
    }

    var pageNumbers = [];
    for( var i = startnum; i <= endnum; i++ ){
      pageNumbers.push(
        React.createElement(
          'a',
          {
            style :
              {
                display:'inline-block',
                padding:'5px;'
              },
            href: url + '?p=' + i
          },
          i)
      );
    }

    return(
      <div className="post-paging">
        {pageNumbers}
      </div>
    );

  }

});
