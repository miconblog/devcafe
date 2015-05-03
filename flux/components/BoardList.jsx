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
        <h4>Board List</h4>
        {this.props.boards.map(function(board, i){
          return <div key={board.id}>{board.id} {board.name} </div>
        })}

      </div>
    );
  }

});

module.exports = BoardList;