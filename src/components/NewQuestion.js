import React, { Component } from 'react'
import { Card, Container, Row, Button } from 'react-bootstrap'
import { connect } from 'react-redux'
import { handleAddQuestion } from '../actions/shared'
import { Redirect } from 'react-router-dom'

class NewQuestion extends Component {
  state = {
    optionOneText: "",
    optionTwoText: "",
    toDashbord: false
  };
  handleChange = (e) => {
    switch(e.target.placeholder){
      case "option one":
        this.setState({optionOneText: e.target.value })
        break;
      case "option two":
        this.setState({ optionTwoText: e.target.value })
    }
  }
  handleSubmit = (e) => {
    e.preventDefault()
    // {optionOneText, optionTwoText, author}
    const { optionOneText, optionTwoText } = this.state
    const author = this.props.authedUser

    this.props.dispatch(handleAddQuestion({ optionOneText, optionTwoText, author }));
    this.setState({toDashbord: true})
  };
  render() {
    let { optionOneText, optionTwoText, toDashbord } = this.state;
    return (
      <Container className="sign-in-card">
        <Row className="justify-content-md-center">
          <Card id="sign-in-card">
            <Card.Header as="h5">New poll question</Card.Header>
            <Card.Body>
              <Card.Title></Card.Title>
              <form onSubmit={this.handleSubmit}>
                <Card.Text>Would You Rather ..</Card.Text>
                <input
                  placeholder="option one"
                  value={optionOneText}
                  onChange={this.handleChange}
                />
                <Card.Text>OR</Card.Text>
                <input
                  placeholder="option two"
                  value={optionTwoText}
                  onChange={this.handleChange}
                />

                <Button
                  type="submit"
                  className="sign-in-btn"
                  variant="outline-dark"
                  size="lg"
                  block
                >
                  Submit
                </Button>
              </form>
            </Card.Body>
          </Card>
        </Row>
        {toDashbord && <Redirect to='/' />}
      </Container>
    );
  }
}

function mapStateToProps({authedUser}){
  return {
    authedUser
  }
}
export default connect(mapStateToProps)(NewQuestion);