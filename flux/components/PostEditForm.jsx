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
      <div>
        <h4><a href={url}> &lt; {this.props.board.name} 목록으로</a></h4>
        <form action={formUrl} method="PUT" onSubmit={this.handleEditSubmit}>
          <div>
            <input type="text" placeholder="제목" name="title" onChange={this.handleChangeTitle} value={this.state.title} />
          </div>
          <div>
            <textarea type="text" placeholder="내용" name="content" onChange={this.handleChangeContent} value={this.state.content}></textarea>
          </div>
          <div>
            <input type="button" value="취소" onClick={this.handleEditCancle}/>
            <input type="submit" value="저장" />
          </div>
          <div>
            <p>{this.props.message}</p>
          </div>
        </form>
      </div>
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
