var React = require('react');

module.exports = React.createClass({
 
  render() {

    var url = "/boards/" + this.props.board.id;
    var formUrl = url + "/newpost";
    
    return (
      <div>
        <h4><a href={url}> &lt; {this.props.board.name} 목록으로</a></h4>
        <form action={formUrl} method="POST">
          <div>
            <input type="text" placeholder="제목" name="title" />
          </div>
          <div>
            <textarea type="text" placeholder="내용" name="content"></textarea>
          </div>
          <div>
            <input type="button" value="취소" />
            <input type="submit" value="저장" />
          </div>
          <div>
            <p>{this.props.message}</p>
          </div>
        </form>
      </div>
    );
    
  }

});
