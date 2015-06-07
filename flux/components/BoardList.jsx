var React = require('react');

module.exports = React.createClass({
  getInitialState() {

    return {
      boards: this.props.boards
    }
  },

  render() {

    if( this.props.boards ) {
      return (
        <div className="block">
          <h4>게시판 목록</h4>

          {this.props.boards.map(function(board, i){
            var url = "/boards/"+ board.id;
            return <div key={board.id}>{i+1} <a href={url}>{board.name}</a></div>
          })}

        </div>
      );
    } else {
      return (false);
    }
  }

});