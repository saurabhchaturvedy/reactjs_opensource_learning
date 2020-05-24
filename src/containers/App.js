import React, { Component, Fragment } from "react";
import classes from "./App.css";
import Persons from "../components/Persons/Persons";
import Cockpit from "../components/Cockpit/Cockpit";
import WithClass from "../hoc/WithClass";
import AuthContext from "../components/context/auth-context";


class App extends Component {
  constructor(props) {
    super(props);
    console.log("[App.js] contructor");
  }
  state = {
    persons: [
      { id: 123, name: "saurabh", age: 29 },
      { id: 124, name: "annu", age: 28 },
      { id: 125, name: "shailesh", age: 26 },
    ],
    showPersons: false,
    showCockpit: true,
    changeCounter: 0,
    authenticated: false
  };

  static getDerivedStateFromProps(props, state) {
    console.log("[App.js] getDerivedStateFromProps" + props);
    return state;
  }

  deletePersonHandler = (personIndex) => {
    const persons = [...this.state.persons];
    persons.splice(personIndex, 1);
    this.setState({ persons: persons });
  };

  // componentWillMount()
  // {
  //   console.log('[App.js] componentWillMount() executed...');
  // }

  componentDidMount() {
    console.log("[App.js] componentDidMount() exceuted...");
  }

  shouldComponentUpdate(nextProps, nextState) {
    console.log("[App.js] shouldComponentUpdate()");
    return true;
  }

  componentDidUpdate() {
    console.log("[App.js] componentDidUpdate()...");
  }

  loginHandler = () => {

    this.setState({authenticated:true})
  }

  changeNameHandler = (event, id) => {
    const personIndex = this.state.persons.findIndex((person) => {
      return person.id === id;
    });


    

    const person = { ...this.state.persons[personIndex] };
    person.name = event.target.value;
    const persons = [...this.state.persons];
    persons[personIndex] = person;
    this.setState((prevState, props) => {
      return {
        persons: persons,
        changeCounter: prevState.changeCounter + 1,
      };
    });
  };

  togglePersonsHandler = () => {
    const doesShow = this.state.showPersons;
    this.setState({ showPersons: !doesShow });
  };
  render() {
    console.log("[App.js] render() method...");
    const style = {
      backgroundColor: "#fhae45",
      font: "inherit",
      padding: "8px",
      border: "1px solid blue",
      cursor: "cursor",
    };

    let persons = null;

    if (this.state.showPersons) {
      persons = (
        <div>
          <Persons
            persons={this.state.persons}
            clicked={this.deletePersonHandler}
            changed={this.changeNameHandler}
            isAuthenticated = {this.state.authenticated}
          />
        </div>
      );
    }

    return (
      <Fragment>
        <button
          onClick={() => {
            this.setState({ showCockpit: false });
          }}
        >
          Remove Cockpit
        </button>
        <AuthContext.Provider value={{authenticated: this.state.authenticated, login:this.loginHandler}}>
        {this.state.showCockpit === true ? (
          <Cockpit
            showPersons={this.state.showPersons}
            personsLength={this.state.persons.length}
            style={style}
            clicked={this.togglePersonsHandler}
            title={this.props.title}
            login={this.loginHandler}
          />
        ) : null}
        {persons}
        </AuthContext.Provider>
      </Fragment>
      
    );
  }
}

export default WithClass(App, classes.App);
