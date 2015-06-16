var React = require('react');
var Jquery = require('jquery');

module.exports = React.createClass({
 
  getInitialState() {
    return {

      title: this.props.post.title,
      content: this.props.post.content
    }
  },

  render() {

    var url = "/boards/" + this.props.board.id;
    var formUrl = url + '/' + this.props.post.id;
    
    return (
      <section id="post-form">
        <form action={formUrl} method="PUT" onSubmit={this.handleEditSubmit}>
          <header>
            <h4 className="center">{this.props.board.name}</h4>
            <input type="button" tabIndex="1" className="btn left" value="취소" onClick={this.handleEditCancle}/>
            <input type="submit" tabIndex="4" className="btn right" value="저장" />
          </header>
          <div className="title">
            <input type="text" tabIndex="2" placeholder="제목" name="title" onChange={this.handleChangeTitle} value={this.state.title} />
          </div>
          <div className="content">
            <textarea type="text" tabIndex="3" placeholder="내용" name="content" onChange={this.handleChangeContent} value={this.state.content}></textarea>
          </div>
          <div>
            <p>{this.props.message}</p>
          </div>
        </form>
      </section>
    );
    
  },

  handleChangeTitle(e){
    this.setState({title: e.target.value});
  },

  handleChangeContent(e){
    this.setState({content: e.target.value});
  },

  handleEditCancle(e){
    history.back();
  },

  handleEditSubmit(e){

    e.preventDefault();
    var redirectUrl = "/boards/"+ this.props.board.id + '/' + this.props.post.id;

    Jquery.ajax({
      type: 'PUT',
      url: '/boards/' + this.props.board.id + '/' + this.props.post.id,
      data: {
        title: this.state.title,
        content: this.state.content
      }
    }).done(function(res){
      if(res.result === "OK") {
        location.href = redirectUrl;
      }else{
        alert(res.error.message);
        location.href = redirectUrl;
      }
    })

  }

});
