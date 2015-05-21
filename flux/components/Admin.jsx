var React = require('react');
var Fluxxor = require('fluxxor');

// 하위 컴포넌트
var SignInOut = require('./SignInOut.jsx');
var BoardList = require('./BoardList.jsx');


var Home = React.createClass({
  mixins: [
    Fluxxor.FluxMixin(React),
    Fluxxor.StoreWatchMixin('TodoStore')
  ],

  getStateFromFlux: function(){

    var flux = this.props.flux
    return flux.store("TodoStore").getState();
  },

  /** 
   * Component Life Cycle Method
   */
  componentWillReceiveProps: function (nextProps) {
    this.setState(this.getStateFromFlux());
  },

  componentDidMount() {
    console.log("Home componentDidMount:", this.props)

  },

  getInitialState() {
    return {
      newTodoText: this.props.title
    }
  },

  render() {
    var todos = this.state.todos;

    return (
      <div>
        <h1> Admin Home </h1>
        <SignInOut path={this.props.path} message={this.props.message} email={this.props.email}/>
        <div>
          <BoardList boards={this.props.boards} />
          <form onSubmit={this.onSubmitForm}>
            <input type="text" size="30" placeholder="New Todo" value={this.state.newTodoText} onChange={this.handleTodoTextChange} />
            <input type="submit" value="추가" />
          </form>
        </div>
      </div>
    );
  },

  handleTodoTextChange(e) {
    this.setState({newTodoText: e.target.value})
  },

  onSubmitForm(e) {
    e.preventDefault();

    if( this.state.newTodoText.trim() ) {
      this.getFlux().actions.addTodo(this.state.newTodoText);
    }
  }

});

module.exports = Home;