/**
 * 최신 문서 참고
 * http://docs.sequelizejs.com/en/latest/
 */
'use strict';

var Board = require('../board/board.model');
var Post = require('../post/post.model');
var Company = require('../company/company.model');
var renderReact = require('../../libs/render-react');
var React = require('react'),
    BoardList = React.createFactory(require('../../../flux/components/BoardList.jsx')),
    PostMain = React.createFactory(require('../../../flux/components/PostMain.jsx'));


/**
 * 미들웨어로써 post 객체를 세션에 추가해 불필요한 코드 중복을 없앤다.
 * 최종 라우터에서 post 객체를 삭제할수도 있기 때문에 모델 인스턴스를 그대로 담아둔다.
 * 사용후에는 반드시 세션에 담아둔 post 객체를 제거하자.
 * 따라서 모델을 사용하고 싶다면 post.get(xxx) 형태로 써야한다.
 * post 객체의 유무도 미들웨어가 검증하기 때문에 라우터에서는 안심하고 써도 된다.
 */
exports.canAccess = function(req, res, next){

  var user    = req.session.user;
  var postId  = req.params.postId;

  Post.findOne({where: { id: postId } })
  .then(function(post) {

    if(!post){
      res.sendStatus(404);
      return;
    }
    
    req.session.post = post;
    req.session.post.isOwner = post.get('memberId') === user.id;
    next();

  });
};

exports.list = function(req, res){

  var board = req.session.board.get({plain:true});
  delete req.session.board;

  Post.findAll({ where: { boardId: req.params.boardId }})
  .then(function(posts){

    res.render('post', renderReact(PostMain, {
      board: board,
      type: 'list',
      posts: JSON.parse(JSON.stringify(posts))
    }));

  })

};

exports.show = function(req, res){
  
  var board     = req.session.board.get({plain:true});
  var post      = req.session.post.get({plain:true});
  post.isOwner  = req.session.post.isOwner;

  delete req.session.post;
  delete req.session.board;

  res.render('post', renderReact(PostMain, {
    board: board,
    type: 'detail',
    post: post
  }));

};

exports.create = function(req, res){

  var title   = req.body.title;
  var content = req.body.content;
  var user    = req.session.user;
  var board   = req.session.board.get({plain:true});
  
  delete req.session.board;

  if( !title || !content) {
    res.render('post', renderReact(PostMain, {
      board: board,
      type: 'create',
      message: '제목과 내용은 비어있으면 안됩니다.'
    }));
    return;
  }

  Post.create({
    title: title,
    content: content,
    username: user.name,
    boardId: board.id,
    memberId: user.id
  })
  .then(function(){

    res.redirect("/boards/" + board.id);
  
  });
  
}

exports.delete = function(req, res){

  var post = req.session.post;
  
  delete req.session.post;
  delete req.session.board;


  if( !post.isOwner ){
    res.status(401).json({ error: '작성자외엔 삭제할 수 없습니다.' });
    return;
  }

  post.destroy().then(function(){
    res.json({result:'OK'});  
  });

}


exports.form = function(req, res){

  var board = req.session.board.get({plain:true});
  delete req.session.board;

  res.render('post', renderReact(PostMain, {
    board: board,
    type: 'create'
  }));

}