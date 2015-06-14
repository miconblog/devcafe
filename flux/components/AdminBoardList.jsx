var React = require('react');
var moment = require('moment');

module.exports = React.createClass({
  getInitialState() {

    return {
      boards: this.props.boards
    }
  },

  render() {

    return (
      <section className="container">
        <header>
          <a href="#" className="btn" onClick={this.handleCreate}>게시판 생성</a>
        </header>
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
              <th></th>
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
                <td>{board.openAt ? moment(board.openAt).format("LLL"): '-' }</td>
                <td>{board.closeAt ? moment(board.closeAt).format("LLL"): '-' }</td>
                <td>{moment(board.createAt).format("LLL")}</td>
                <td>{moment(board.updateAt).format("LLL")}</td>
                <td><a href="#edit" onClick={this.handleEdit}>수정</a></td>
              </tr>
            }.bind(this))}
            
          </tbody>
        </table>

      </section>
    );
  }, 

  handleCreate(e){
    e.preventDefault();
  },

  handleEdit(e) {
    e.preventDefault();

  }
});