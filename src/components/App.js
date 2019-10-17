import React, { Component } from "react";
import '../App.css';
import { Card, Button, Container, Row } from 'react-bootstrap'
import { connect } from 'react-redux'
import { handleInitialData } from '../actions/shared'
import Dashboard from "./Dashboard";
import NewQuestion from "./NewQuestion";
import QuestionPage from './QuestionPage'

class App extends Component {
  state = {
    selectedUser: ""
  };
  handleChange = event => {
    console.log("event ", event.target.value);
    const selectedUser = event.target.value;
    this.setState(() => {
      return { selectedUser };
    });
  };
  handleSignin = () => {
    const authedId = this.state.selectedUser 
    if(authedId !== '' || authedId !== 'unselected')
      this.props.dispatch(handleInitialData(authedId));
    
  };
  render() {
    console.log('authed user ', this.props.authedUser)
    return (
      <div>
        {this.props.authedUser === null ? (
          <Container className="sign-in-card">
            <Row className="justify-content-md-center">
              <Card id="sign-in-card">
                <Card.Header as="h5">
                  Welcome to Would You Rather App!
                </Card.Header>
                <Card.Body>
                  <Card.Title>Please sign in to continue</Card.Title>
                  <Card.Text></Card.Text>
                  <Card.Img src="../react-redux.svg.med.png" />
                  <div className="select">
                    <select
                      name="slct"
                      id="slct"
                      onChange={e => this.handleChange(e)}
                      defaultValue={this.selectedUser}
                    >
                      <option value="unselected">Choose a username</option>
                      <option value="sarahedo">sarahedo</option>
                      <option value="tylermcginnis">tylermcginnis</option>
                      <option value="johndoe">johndoe</option>
                    </select>
                  </div>
                  <Button
                    onClick={this.handleSignin}
                    className="sign-in-btn"
                    variant="outline-dark"
                    size="lg"
                    block
                  >
                    Sign in
                  </Button>
                </Card.Body>
              </Card>
            </Row>
          </Container>
        ) : (
          <div>
            <NewQuestion />
            <Dashboard />
            <QuestionPage questionID="vthrdm985a262al8qx3do" />
          </div>
        )}
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
// connect mapstateToProps {authedUser