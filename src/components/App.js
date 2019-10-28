import React, { Component, Fragment } from "react";
import { BrowserRouter as Router, Route, Link, Switch } from "react-router-dom";
import '../App.css';
import { Nav, Navbar } from 'react-bootstrap'
import { connect } from 'react-redux'
import Dashboard from "./Dashboard";
import NewQuestion from "./NewQuestion";
import QuestionPage from './QuestionPage'
import Login from './Login'
import Leaderboard from './Leaderboard'
import { logOutUser } from '../actions/authedUser'
import AuthRoute from './AuthRoute'
import InvalidQuestionPage from "./InvalidQuestionPage";


class App extends Component {
logOut = () => {
  if(this.props.authedUser !== null)
    this.props.dispatch(logOutUser());
}

  render() {
    return (
      <Router>
        <Fragment>
          <Navbar bg="dark" variant="dark">
            <Navbar.Brand href="#home">Would You Rather?</Navbar.Brand>
            <Nav className="mr-auto">
              <Link to="/">
                <Nav.Item className="navs-links">Home</Nav.Item>
              </Link>
              <Link to="/add">
                <Nav.Item className="navs-links">New Question</Nav.Item>
              </Link>
              <Link to="/leaderboard">
                <Nav.Item className="navs-links">Leaderboard</Nav.Item>
              </Link>
              <Nav.Link className="navs-links" href="" onClick={this.logOut}>
                Log out
              </Nav.Link>
              <Navbar.Toggle />
              <Navbar.Collapse className="justify-content-end">
                <Navbar.Text className="navs-links">
                  Signed in as: {this.props.authedUser}
                </Navbar.Text>
              </Navbar.Collapse>
            </Nav>
          </Navbar>

          <Switch>
            <Route exact path="/login" render={() => <Login />} />
            <AuthRoute exact path="/" component={Dashboard} />
            <AuthRoute path="/add" render={() => <NewQuestion />} />
            <AuthRoute
              path="/questions/:question_id"
              component={QuestionPage}
            />
            <AuthRoute path="/leaderboard" render={() => <Leaderboard />} />
          </Switch>
        </Fragment>
      </Router>
    );
  }
}

function mapStateToProps( { authedUser } ){
  return {
    authedUser
  }
}
export default connect(mapStateToProps)(App);