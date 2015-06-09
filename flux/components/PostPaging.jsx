var React = require('react');

module.exports = React.createClass({
 
  render() {

    if( !this.props.totalCount ) {
      return (false);
    }


    var page = this.props.page ? parseInt(this.props.page) : 1;
    var totalCount = this.props.totalCount;
    var pageSize = this.props.pageSize ? parseInt(this.props.pageSize) : 10;    // 한 페이지 당 게시글의 개수. default : 10
    var pageCount = this.props.pageCount ? parseInt(this.props.pageCount) : 10; // 페이지 개수. default : 10
    var url = this.props.url ? this.props.url : "/boards/" + this.props.board.id;

    // 총 게시글의 개수가 11개이고, 페이지 사이즈가 10개일때 lastNum 은 2가 된다.
    // 총 게시글의 개수가 10개이고, 페이지 사이즈가 10개일때 lastNum 은 1페이지까지가 된다.
    var lastNum = parseInt(totalCount / pageSize);
    if( ( totalCount % pageSize ) > 0 ){
      lastNum++;
    }

    // 3페이지의 startNum 은 1, 13페이지의 startNum 은 11, 10페이지의 startNum은 1
    //
    var startNum = parseInt(( page - 1 ) / pageCount ) * pageCount + 1;
    var endNum = startNum + (pageCount - 1);

    if( endNum > lastNum ){
      endNum = lastNum;
    }

    var PrevButton = false;
    var NextButton = false;

    if(startNum > pageCount){
      // 22 페이지에서 이전 페이지를 누르면 20페이지로 가야한다.
      PrevButton = <a href={url + '?p=' + (startNum - 1)}>&lt;&lt;</a>;
    }

    if( endNum < lastNum ){
      // 28 페이지에서 다음 페이지를 누르면 31페이지로 가야한다.
      NextButton =  <a href={url + '?p=' + ( endNum + 1 )}>&gt;&gt;</a>;
    }

    var pageNumbers = [];
    for( var i = startNum; i <= endNum; i++ ){
      pageNumbers.push(i);
    }

    return(
      <div className="post-paging">
        {PrevButton}
        {
          pageNumbers.map(function(num){
            var currentPageClass = num == page ? 'current' : '';
            return <a key={num} className={currentPageClass} href={url + '?p=' + num}>{num}</a>
          })
        }
        {NextButton}
      </div>
    );

  }

});
