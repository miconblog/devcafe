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
        <section id="board-list">
          {this.props.boards.map(function(board, i){
            var url = "/boards/"+ board.id;
            return <div key={board.id} className="list-item"><a href={url}>{board.name}</a></div>
          })}
        </section>
      );
    } else {
      return (false);
    }
  }

});