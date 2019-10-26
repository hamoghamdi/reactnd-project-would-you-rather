import React, { Component } from 'react'
import { connect } from 'react-redux'
import { Container, Row, Col, Button, Image, ProgressBar } from 'react-bootstrap'
import { handleAddAnswer } from '../actions/shared'
import { Link, Redirect } from 'react-router-dom'

class QuestionPage extends Component {
    // recive the question id from dashboard component
    // check if authedUser already answerd, if not show the question // users[authedUser].answers.map usransr => if usransr !== props.qid ( show question ) // also recive the answers array??
    // else, show results 

    // map unaswered, else map answered 

    state = {
        checked: '',
        highlight: ''
    }
    handleChange =(e) =>{
        this.setState({checked: e.target.value})
    }
    handleSubmit = (e) => {
      e.preventDefault()
      // answer = { authedUser, qid, answer }
      let answer = this.state.checked
      const { authedUser, dispatch } = this.props
      const qid = this.props.match.params.question_id;
      dispatch(handleAddAnswer({authedUser, qid, answer }))
    }
    calcPercentage = (partial, total) => {
      return Math.floor((100 * partial) / total)
    }
    styleThis = (option) => {
      const { users, authedUser } = this.props;
      const { question_id } = this.props.match.params;
      if(users[authedUser].answers[question_id] === option)
        return {
          backgroundColor: "#f39c12"
        }
    }
    render() {
        const {
          users,
          questions,
          answered,
          authedUser,
          unanswered
        } = this.props;
        const { question_id } = this.props.match.params
        const totalVotes =
          questions[question_id].optionOne.votes.length +
          questions[question_id].optionTwo.votes.length 
          

        return (
          <div>
            <Link to="/">Back</Link>
            {users[authedUser] !== undefined ?
              unanswered.map(useranswr => {
                if (useranswr === question_id) {
                  return (
                    <Container
                      key={questions[question_id].id}
                      className="poll-container"
                    >
                      <form onSubmit={this.handleSubmit}>
                        <Row>
                          <Col xs={4} md={2}>
                            <Image
                              src={
                                users[questions[question_id].author].avatarURL
                              }
                              className="avatar"
                              roundedCircle
                            />
                          </Col>

                          <Col xs={6} md={4}>
                            <p>{questions[question_id].author} Asks</p>
                            <p> Would You Rather </p>
                            <label>
                              <input
                                type="radio"
                                name="optionOne"
                                value="optionOne"
                                onChange={this.handleChange}
                                checked={this.state.checked === "optionOne"}
                              />{" "}
                              {questions[question_id].optionOne.text}
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
                                checked={this.state.checked === "optionTwo"}
                              />{" "}
                              {questions[question_id].optionTwo.text}
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
              }) : (<Redirect to='/' />)}

            {users[authedUser] !== undefined ?
              answered.map(useranswr => {
                if (useranswr === question_id) {
                  return (
                    <Container
                      key={questions[question_id].id}
                      className="poll-container"
                    >
                      <Row>
                        <Col xs={4} md={2}>
                          <Image
                            src={users[questions[question_id].author].avatarURL}
                            className="avatar"
                            roundedCircle
                          />
                        </Col>

                        <Col xs={6} md={4}>
                          <p>{questions[question_id].author} Asks</p>

                          <p> Would You Rather </p>
                          <p>
                            <strong>Results</strong>
                          </p>
                          <p
                            className="option-pargh"
                            style={this.styleThis("optionOne")}
                          >
                            <strong>Option One:</strong>
                            {questions[question_id].optionOne.text}
                            <ProgressBar
                              variant="warning"
                              now={this.calcPercentage(
                                questions[question_id].optionOne.votes.length,
                                totalVotes
                              )}
                              label={`${this.calcPercentage(
                                questions[question_id].optionOne.votes.length,
                                totalVotes
                              )}%`}
                            />
                            votes:{" "}
                            {questions[question_id].optionOne.votes.length} out
                            of {totalVotes}
                          </p>

                          <p
                            className="option-pargh"
                            style={this.styleThis("optionTwo")}
                          >
                            <strong>Option Two:</strong>
                            {questions[question_id].optionTwo.text}
                            <ProgressBar
                              variant="warning"
                              now={this.calcPercentage(
                                questions[question_id].optionTwo.votes.length,
                                totalVotes
                              )}
                              label={`${this.calcPercentage(
                                questions[question_id].optionTwo.votes.length,
                                totalVotes
                              )}%`}
                            />
                            votes:{" "}
                            {questions[question_id].optionTwo.votes.length} out
                            of {totalVotes}
                          </p>
                        </Col>
                      </Row>
                      
                    </Container>
                  );
                }
              }) : (<Redirect to='/' />)}
          </div>
        );
    }
}

function mapStateToProps({users, authedUser, questions}, { question_id}){

    let answered = [];
    if (users[authedUser] !== undefined) {
      answered = Object.keys(users[authedUser].answers)
    }
    let questionsIds = Object.keys(questions).sort(
      (a, b) => questions[b].timestamp - questions[a].timestamp
    );  // filter out what's already in answered
    let unanswered = questionsIds.filter(qid => !answered.includes(qid));

    return {
        question_id,
        users,
        answered,
        unanswered,
        authedUser,
        questions
    }
}
export default connect(mapStateToProps)(QuestionPage);