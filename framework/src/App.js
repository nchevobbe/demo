import dom from "react-dom-factories";
import { connect } from "react-redux";
import { Component } from "react";

class App extends Component {
  componentDidUpdate() {
    this.props.dispatchLog(null);
  }

  render() {
    const {
      dispatchLog,
      log
    } = this.props;

    if (log === "trace") {
      console.trace();
    } else if (log === "exception") {
      setTimeout(() => {throw "fuuu"}, 100);
    } else if (log === "error") {
      console.log(new Error("uuuuurgh"));
    }

    return [
      dom.button({
        onClick: () => dispatchLog("trace")
      }, "trace"),
      dom.button({
        onClick: () => dispatchLog("exception")
      }, "exception"),
      dom.button({
        onClick: () => dispatchLog("error")
      }, "error object"),
    ];
  }
};

function mapStateToProps(state) {
  return {
    log: state.log
  };
}

function mapDispatchToProps(dispatch) {
  return {
    dispatchLog: data => dispatch({type: "LOG", data})
  }
}

export default connect(mapStateToProps, mapDispatchToProps)(App);