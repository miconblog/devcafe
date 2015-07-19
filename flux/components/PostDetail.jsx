var React = require('react');
var moment = require('moment');
var Jquery = require('jquery');
var Fluxxor = require('fluxxor');

var Comments = require('./Comments.jsx');

module.exports = React.createClass({

  // START - Fluxxor의 스토어를 사용할 경우 END 까지는 기본으로 추가해야한다.
  mixins: [
    Fluxxor.FluxMixin(React),
    Fluxxor.StoreWatchMixin('CommentStore')
  ],

  getStateFromFlux: function(){
    var flux = this.props.flux;
    flux.store("CommentStore").setState(this.props.post.comments);
    return flux.store("CommentStore").getState();
  },

  componentWillReceiveProps: function (nextProps) {
    this.setState(this.getStateFromFlux());
  },
  // END
 
  render() {

    var post = this.props.post;
    var board = post.board;
    var url = "/boards/" + this.props.post.board.id;
    var ModifyButton = false;

    if(this.props.post.isOwner){

      ModifyButton = <div className="ctrl-box">
        <a className="btn" href="#edit" onClick={this.handleEditPost}>편집</a>
        <a className="btn" href="#delete" onClick={this.handleDeletePost}>삭제</a>
      </div>;
    }

    return (
      <section id="post-detail">
        <header className="box">
          <div className="title">
            <h3><a href={url}> &lt; {board.name}</a></h3>
          </div>
          {ModifyButton}
        </header>
        <section>
          <header className="box article">
            <div className="title" dangerouslySetInnerHTML={{__html: post.title }} ></div> 
            <div className="username" dangerouslySetInnerHTML={{__html: post.username }} ></div> 
            <div className="datetime" dangerouslySetInnerHTML={{__html: moment(post.updatedAt).format("LLL") }} ></div> 
            <div className="readcount">조회 {post.readCount}</div>
            <div className="readcount">댓글 {this.state.comments.length}</div>
           </header>
          <article className="article">
            <div dangerouslySetInnerHTML={{__html: post.content.replace(/\n/g, '</br>') }} />
          </article>
        </section>
        <Comments flux={this.props.flux} user={this.props.user} post={this.props.post} comments={this.state.comments}/> 
      </section>
    );
    
  },

  handleEditPost(e){
    e.preventDefault();

    location.href = '/boards/' + this.props.post.board.id + '/' + this.props.post.id + '/edit';
  },

  handleDeletePost(e){ 
    e.preventDefault();

    var post = this.props.post;
    var board = post.board;

    var redirectUrl = "/boards/"+ board.id;
    var yes = confirm("정말로 삭제할까요?");

    if(!yes) {
      return;
    }

    Jquery.ajax({
      type: 'DELETE',
      url: '/api/posts/' + post.id
    }).done(function(res){
      if(res.result === "OK") {
        location.href = redirectUrl;
      }else{
        alert(res.error.message);
        location.href = redirectUrl;
      }
    });
  }

});
