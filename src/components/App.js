import React, { Component } from "react";
import { BrowserRouter as Router, Route, Link, Switch, Redirect } from "react-router-dom";
import '../App.css';
import { Nav, Navbar } from 'react-bootstrap'
import { connect } from 'react-redux'
import Dashboard from "./Dashboard";
import NewQuestion from "./NewQuestion";
import QuestionPage from './QuestionPage'
import Login from './Login'
import Leaderboard from './Leaderboard'
import { logOutUser } from '../actions/authedUser'
class App extends Component {
logOut = () => {
  if(this.props.authedUser !== null)
    this.props.dispatch(logOutUser());
}

  render() {
    return (
      <div>
        <Router>
          <Navbar bg="dark" variant="dark">
            <Navbar.Brand href="#home">Would You Rather?</Navbar.Brand>
            <Nav className="mr-auto">
              <Link to="/">
                <Nav.Link href="#home">Home</Nav.Link>
              </Link>
              <Link to="/add">
                <Nav.Link href="#new-question">New Question</Nav.Link>
              </Link>
              <Link to="/leaderboard">
                <Nav.Link href="#leaderboard">Leaderboard</Nav.Link>
              </Link>
              <Nav.Link href="" onClick={this.logOut}>
                Log out
              </Nav.Link>
              <Navbar.Toggle />
              <Navbar.Collapse className="justify-content-end">
                <Navbar.Text>Signed in as: {this.props.authedUser}</Navbar.Text>
              </Navbar.Collapse>
            </Nav>
          </Navbar>

          <Switch>
            <Route
              exact
              path="/"
              render={() => {
                if (this.props.authedUser === null) return <Login />;
                else return <Dashboard />;
              }}
            />
            <Route
              path="/add"
              render={() => {
                if (this.props.authedUser === null) return <Redirect to="/" />;
                else return <NewQuestion />;
              }}
            />
            <Route path="/questions/:question_id" component={QuestionPage} />
            <Route
              path="/leaderboard"
              render={() => {
                if (this.props.authedUser === null) return <Redirect to="/" />;
                else return <Leaderboard />;
              }}
            />
          </Switch>
        </Router>
      </div>
    );
  }
}

function mapStateToProps( { authedUser } ){
  return {
    authedUser
  }
}
export default connect(mapStateToProps)(App);