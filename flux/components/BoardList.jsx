var React = require('react');

var BoardList = React.createClass({
  getInitialState() {

    return {
      boards: this.props.boards
    }
  },

  render() {

    return (
      <div>
        <h4>내가 접근할수있는 게시판 목록</h4>
        {this.props.boards.map(function(board, i){
          var url = "/boards/"+ board.id;
          return <div key={board.id}><a href={url}>{i} {board.name}</a></div>
        })}

      </div>
    );
  }

});

module.exports = BoardList;