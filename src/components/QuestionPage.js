import React, { Component } from 'react'
import { connect } from 'react-redux'
import { Container, Row, Col, Button, Image } from 'react-bootstrap'
import { handleAddAnswer } from '../actions/shared'

class QuestionPage extends Component {
    // recive the question id from dashboard component
    // check if authedUser already answerd, if not show the question // users[authedUser].answers.map usransr => if usransr !== props.qid ( show question ) // also recive the answers array??
    // else, show results 

    // map unaswered, else map answered 

    state = {
        checked: ''
    }
    handleChange =(e) =>{
        console.log('this is handle change', e.target.value)
        this.setState({checked: e.target.value})
    }
    handleSubmit = (e) => {
      e.preventDefault()
      // answer = { authedUser, qid, answer }
      let answer = this.state.checked
      const { authedUser, dispatch } = this.props
      const qid = this.props.questionID
      dispatch(handleAddAnswer({authedUser, qid, answer }))
    }
    render() {
        const {
          users,
          questions,
          questionID,
          authedUser,
          unanswered
        } = this.props;

        return (
          <div>
              <h3>This is the question page</h3>
            {users[authedUser] !== undefined
              ? unanswered.map(useranswr => {
                  if (useranswr === questionID) {
                    return (
                      <Container
                        key={questions[questionID].id}
                        className="poll-container"
                      >
                        <form onSubmit={this.handleSubmit}>
                          <Row>
                            <Col xs={4} md={2}>
                              <Image
                                src={
                                  users[questions[questionID].author].avatarURL
                                }
                                className="avatar"
                                roundedCircle
                              />
                            </Col>

                            <Col xs={6} md={4}>
                              <p>{questions[questionID].author} Asks</p>
                              <p> Would You Rather </p>
                              <label>
                                <input
                                  type="radio"
                                  name="optionOne"
                                  value="optionOne"
                                  onChange={this.handleChange}
                                  checked={this.state.checked === 'optionOne'}
                                />{" "}
                                {questions[questionID].optionOne.text}
                              </label>
                              <br />
                              OR
                              <br />
                              <label>
                                <input
                                  type="radio"
                                  name="optionTwo"
                                  value="optionTwo"
                                  onChange={this.handleChange}
                                  checked={this.state.checked === 'optionTwo'}
                                />{" "}
                                {questions[questionID].optionTwo.text}
                              </label>
                            </Col>
                          </Row>
                          <Row>
                            <Button
                              type="submit"
                              className="sign-in-btn"
                              variant="outline-dark"
                              size="lg"
                              block
                            >
                              Sumbit
                            </Button>
                          </Row>
                        </form>
                      </Container>
                    );
                  }
                })
              : null}
          </div>
        );
    }
}

function mapStateToProps({users, authedUser, questions}, { questionID}){

    let answered = [];
    if (users[authedUser] !== undefined) {
      answered = Object.keys(users[authedUser].answers);
    }
    let questionsIds = Object.keys(questions); // filter out what's already in answered
    let unanswered = questionsIds.filter(qid => !answered.includes(qid));

    return {
        questionID,
        users,
        answered,
        unanswered,
        authedUser,
        questions
    }
}
export default connect(mapStateToProps)(QuestionPage);