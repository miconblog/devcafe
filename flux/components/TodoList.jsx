var React = require('react');
var moment = require('moment');
var Fluxxor = require('fluxxor');

module.exports = React.createClass({
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

    if( !this.props.isShow ) {
      return (false);
    }

    var todos = this.state.todos;

    return (
      <div>
        <h3>클라이언트 렌더링 테스트를 위한 TODO App</h3>
        <ul>
          {Object.keys(todos).map(function(id){
            return <li key={id}> <span>{todos[id].text}</span> </li>
          })}
        </ul>
        <form onSubmit={this.onSubmitForm}>
          <input type="text" size="30" placeholder="New Todo" value={this.state.newTodoText} onChange={this.handleTodoTextChange} />
          <input type="submit" value="추가" />
        </form>
      </div>
    );
  },

  handleTodoTextChange: function(e) {
    this.setState({newTodoText: e.target.value})
  },

  onSubmitForm: function(e) {
    e.preventDefault();

    if( this.state.newTodoText.trim() ) {
      this.getFlux().actions.addTodo(this.state.newTodoText);
    }
  }

});
