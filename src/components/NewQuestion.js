import React, { Component } from 'react'
import { Card, Container, Row, Button } from 'react-bootstrap'

class NewQuestion extends Component {
    state ={
        optionOne: '',
        optionTwo: ''
    }
    handleChange = () =>{

    }

    render() {
        let { optionOne, optionTwo } = this.state
        return (
          <Container className="sign-in-card">
            <Row className="justify-content-md-center">
              <Card id="sign-in-card">
                <Card.Header as="h5">New poll question</Card.Header>
                <Card.Body>
                  <Card.Title></Card.Title>
                  <form>
                    <Card.Text>Would You Rather ..</Card.Text>
                    <input
                      placeholder="option one"
                      value={optionOne}
                        onChange={this.handleChange}
                    />
                    <Card.Text>OR</Card.Text>
                    <input
                      placeholder="option two"
                      value={optionTwo}
                      onChange={this.handleChange}
                    />

                    <Button
                      type="submit"
                      className="sign-in-btn"
                      variant="outline-dark"
                      size="lg"
                      block
                    >
                      Sumbit
                    </Button>
                  </form>
                </Card.Body>
              </Card>
            </Row>
          </Container>
        );
    }
}

export default NewQuestion;