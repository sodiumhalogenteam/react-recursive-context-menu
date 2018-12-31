import React, { Component } from "react";
import PropTypes from "prop-types";

class Button extends Component {
  render() {
    const { clickHandler, text } = this.props;
    return <button onClick={clickHandler}>{text}</button>;
  }
}

Button.propTypes = {};

export default Button;
