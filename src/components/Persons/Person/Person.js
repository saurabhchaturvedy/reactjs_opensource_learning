import React, { Component, Fragment } from "react";
import classes from "./Person.css";
import styled from "styled-components";
import Aux from "../../../hoc/Auxiliary";
import WithClass from "../../../hoc/WithClass";
import PropTypes from "prop-types";
import AuthContext from "../../../context/auth-context";

class Person extends Component {
  componentDidMount() {
    this.inputElement.focus();
  }

  render() {
    console.log("[Person.js] rendering...");
    return (<div> <AuthContext.Consumer>
          {(context) =>
            context.authenticated ? (
              <p> Authenticated ! </p>
            ) : (
              <p> Please Log In</p>
            )
          }
        </AuthContext.Consumer>
        <p key="k1" onClick={this.props.click}>
          {" "}
          I am {this.props.name} and i am {this.props.age} years old !
        </p>
        <p key="k2">{this.props.children}</p>
        <input
          key="k3"
          ref={(inputEl) => {
            this.inputElement = inputEl;
          }}
          type="text"
          onChange={this.props.changed}
          value={this.props.name}
        />
      </div>
    );
  }
}

Person.propTypes = {
  click: PropTypes.func,
  name: PropTypes.string,
  age: PropTypes.number,
  changed: PropTypes.func,
};

export default WithClass(Person, classes.Person);
