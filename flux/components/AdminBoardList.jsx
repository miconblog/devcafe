var React = require('react');

module.exports = React.createClass({
  getInitialState() {

    return {
      boards: this.props.boards
    }
  },

  render() {

    return (
      <div className="block">

        <table>
          <caption>게시판 목록</caption>
          <thead>
            <tr>
              <th>No.</th>
              <th>이름</th>
              <th>아이디</th>
              <th>타입</th>
              <th>시작시간</th>
              <th>종료시간</th>
              <th>생성시간</th>
              <th>마지막수정</th>
            </tr>
          </thead>
          <tbody>
            
            {this.props.boards.map(function(board, i){
              var url = "/boards/"+ board.id;
              return <tr key={board.id}>
                <td>{i+1}</td>
                <td><a href={url}>{board.name}</a></td>
                <td>{board.id}</td>
                <td>{board.type}</td>
                <td>{board.openAt}</td>
                <td>{board.closeAt}</td>
                <td>{board.createAt}</td>
                <td>{board.updateAt}</td>

              </tr>
            })}
            
          </tbody>
        </table>

      </div>
    );
  }

});