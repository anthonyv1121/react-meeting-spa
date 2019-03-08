import React, { Component } from "react";
import { withRouter } from "react-router-dom";

class Navigate extends Component {
  constructor(props) {
    super(props);
    this.state = {};
  }
  componentDidMount() {
    setTimeout(() => {
      this.props.history.push({
        pathname: this.props.to
      });
      this.props.onComplete();
    }, 3000);
  }
  render() {
    return (
      <div className="text-center mt-4">
        <span className="text-secondary font-weight-bold pl-1">
          {this.props.children}
        </span>
      </div>
    );
  }
}

export default withRouter(Navigate);
