var React = require('react');
var moment = require('moment');
var Jquery = require('jquery');

var Comments = require('./Comments.jsx');

module.exports = React.createClass({
 
  render() {

    var post = this.props.post;
    var url = "/boards/" + this.props.board.id;
    var ModifyButton = false;

    // '(', post.commentCount, ')',
    // post.username,' - ' , moment(post.updatedAt).format("LLL")

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
            <h3><a href={url}> &lt; {this.props.board.name}</a></h3>
          </div>
          {ModifyButton}
        </header>
        <section>
          <header className="box article">
            <div className="title" dangerouslySetInnerHTML={{__html: post.title }} ></div> 
            <div className="username" dangerouslySetInnerHTML={{__html: post.username }} ></div> 
            <div className="datetime" dangerouslySetInnerHTML={{__html: moment(post.updatedAt).format("LLL") }} ></div> 
            <div className="readcount">조회 {post.readCount}</div>
          </header>
          <article className="article">
            <div dangerouslySetInnerHTML={{__html: post.content.replace(/\n/g, '</br>') }} />
          </article>
        </section>
        <Comments flux={this.props.flux} user={this.props.user} post={this.props.post} board={this.props.board}/> 
      </section>
    );

    // <footer>
    //   <div className="title">좋아요{post.likeCount}</div>
    // </footer>
    // <section>
    //   <div>
    //     댓글이 들어갈 자리
    //   </div>
    // </section>
    
  },

  handleEditPost(e){
    e.preventDefault();

    location.href = '/boards/' + this.props.board.id + '/' + this.props.post.id + '/edit';
  },

  handleDeletePost(e){ 
    e.preventDefault();

    var post = this.props.post;
    var redirectUrl = "/boards/"+ this.props.board.id;
    var yes = confirm("정말로 삭제할까요?");

    if(!yes) {
      return;
    }

    Jquery.ajax({
      type: 'DELETE',
      url: '/boards/' + this.props.board.id + '/' + post.id
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
