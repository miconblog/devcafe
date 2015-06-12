var React = require('react');

module.exports = React.createClass({
 
  render() {

    var url = "/boards/" + this.props.board.id;
    
    return (
      <section id="post-form">
        <form action={url} method="POST">
          <header>
            <h4 className="center">{this.props.board.name}</h4>
            <a href={url} className="btn left">취소</a>
            <input type="submit" className="btn right" value="저장" />
          </header>
          <div className="title">
            <input type="text" placeholder="제목" name="title" />
          </div>
          <div className="content">
            <textarea type="text" placeholder="내용" name="content"></textarea>
          </div>
          <div>
            <p>{this.props.message}</p>
          </div>
        </form>
      </section>
    );
    
  }

});
