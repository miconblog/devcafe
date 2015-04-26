var React = require('react');

var ReactComponent = React.createClass({
  getInitialState() {
    return {
      title: this.props.title
    }
  },

  render() {

    console.log("=====> ", this.state, this.props)

    return (
      <div>
        <h1> Welcome to {this.state.title} & React </h1>
        <p>React Ready!!</p>
      </div>
    );
  }

});

module.exports = ReactComponent;