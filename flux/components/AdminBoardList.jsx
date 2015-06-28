var React = require('react');
var moment = require('moment');
var Jquery = require('Jquery');
var _ = require('lodash');

module.exports = React.createClass({
  getInitialState() {

    return {
      openLayer: false,
      boards: this.props.boards,
      create: {
        name: '',
        id: '',
        boardType: 'C',
        companyName: '',
        companyId:''
      },
      duplicate: '',
      search:{
        keyword:'',
        result: []
      }

    }
  },

  render() {

    var TTypeBoard = false;
    var formData = this.state.create;
    var schData  = this.state.search;

    if ( formData.boardType === "T") {
      TTypeBoard = <div>
        <input type="text" placeholder="시작시간"/>
        <input type="text" placeholder="종료시간" />
      </div>
    }
    if ( formData.boardType === "C") {
      TTypeBoard = <div>
        <input type="text" placeholder="회사이름" 
          onChange={this.handleChangeCompanyNameSearch} value={formData.companyName} />
        <ul className="result">
        {schData.result.map(function(company, i){
          return <li key={company.id} tabIndex={0} 
            onClick={this.handleSelectCompany.bind(this, company)}
            onKeyDown={this.handleSelectCompany.bind(this, company)}>{company.name}</li>;
        }.bind(this))}
        </ul>
      </div>
    }


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
              <th>종류</th>
              <th className="center">생성날짜</th>
              <th className="center">마지막수정</th>
              <th></th>
            </tr>
          </thead>
          <tbody>
            
            {this.props.boards.map(function(board, i){
              
              var url = "/boards/"+ board.id;
              var BoardType;
              switch(board.type){
                case 'N':
                  BoardType = "일반";
                  break;
                case 'C':
                  BoardType = "회사";
                  break;
                case 'T':
                  BoardType = "시간제한";
                  break;
                case 'R':
                  BoardType = "생성요청";
                  break;
              }

              return <tr key={board.id}>
                <td>{i+1}</td>
                <td><a href={url}>{board.name}</a></td>
                <td className="center">{board.id}</td>
                <td className="center">{BoardType}</td>
                <td>{moment(board.createdAt).format("L")}</td>
                <td>{moment(board.updatedAt).format("LLL")}</td>
                <td><a href="#edit" onClick={this.handleDelete.bind(this, board)}>삭제</a></td>
              </tr>
            }.bind(this))}
            
          </tbody>
        </table>

        <div>
          <div>
            <input type="text" value={this.state.create.name} onChange={this.handleChagneBoardName} placeholder="이름" />
          </div>
          <div>
            <input type="text" value={this.state.create.id} onChange={this.handleChangeBoardIdSearch} placeholder="아이디"/>
            <span>{this.state.duplicate}</span>
          </div>
          <select onChange={this.handleChangeBoardType}>
            <option value="C">회사</option>
            <option value="N">일반</option>
            <option value="T">시간제한</option>
            <option value="R">생성요청</option>
          </select>
          {TTypeBoard}
          <div>
            <input type="button" value="생성" onClick={this.handleCreateBoard} />
          </div>
        </div>
      </section>
    );
  }, 

  // 게시판 아이디 중복 확인
  handleChangeBoardIdSearch(e){

    var form = this.state.create;
        form.id = e.target.value;
    this.setState({create:form});

    var keyword = e.target.value;
    if(keyword.length < 3){
      this.setState({duplicate: '3자 이상!'})
      return;
    }

    Jquery.ajax({
      type: 'GET',
      url: '/api/boards',
      data: {q: keyword}
    }).done(function(res){
      var message = ( 0 < res.length ) ? '중복된 아이디!!' : '사용가능!';
      this.setState({duplicate: message})

    }.bind(this));

  },

  // 자동 검색 추천
  handleChangeCompanyNameSearch(e){
    var keyword = e.target.value;
    var form = this.state.create;
        form.companyName = keyword;

    Jquery.ajax({
      type: 'GET',
      url: '/api/companys',
      data: {name: keyword}
    }).done(function(res){

      var search = {
        keyword: keyword,
        result: res
      };

      this.setState({
        search:search,
        create: form
      });
    }.bind(this));

  },

  handleSelectCompany(company, e){

    var form = this.state.create;
    var KEY_ENTER = 13;

    if(e.type === 'click' || e.keyCode === KEY_ENTER){

      form.companyName = company.name,
      form.companyId = company.id

      this.setState({
        search: {
          keyword:'',
          result: []
        },
        create: form
      })

    }

  },

  handleChagneBoardName(e){
    e.preventDefault();
    var form = this.state.create;
    form.name = e.target.value;

    this.setState({create:form});
  },

  handleChangeBoardType(e){
    e.preventDefault();

    this.setState({create:{
      boardType: e.target.value
    }});

  },

  handleCreateBoard(e){
    e.preventDefault();


    Jquery.ajax({
      type: 'POST',
      url: '/api/boards',
      data: this.state.create
    }).done(function(res){

      var boards = this.state.boards;
      boards.push(res);
      this.setState({boards:boards});
      
    }.bind(this));    

  },

  handleCreate(e){
    e.preventDefault();
    this.setState({openLayer:true});
  },

  handleDelete(board, e) {
    e.preventDefault();

    var yes = confirm('게시판을 지우면 관련글도 모두 지워집니다. \n정말로 삭제할까요?');

    if(yes){

      Jquery.ajax({
        type: 'DELETE',
        url: '/api/boards/' + board.id
      }).done(function(res){
        console.log(res);

        var boards = this.state.boards;
        var idx = _.findIndex(boards, function(board) {
          return board.id === res.id;
        });

        boards.splice(idx, 1);
        this.setState({boards:boards});

      }.bind(this));
    }

  }
});