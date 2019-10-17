import React, { Component } from 'react';
import { Tabs, Tab, Container, Col, Row, Image, Button } from 'react-bootstrap'
import { connect } from 'react-redux'

class Dashboard extends Component {
render() {
    console.log('QUESTIONS ' , this.props.questions)
    console.log("USERS ", this.props.users);
    console.log("AUTHED USER ", this.props.authedUser);

    const { questions, users, answered, unanswered } = this.props

    return (
      <div>
        <Tabs defaultActiveKey="unaswered" id="uncontrolled-tab-example">
          <Tab eventKey="unaswered" title="Unaswered">
            {/* loop through answered, .map, access questions, get the author and option one */}
            {unanswered.map(answr => {
              if (questions[answr] !== undefined) {
                return (
                  <Container
                    key={questions[answr].id}
                    className="poll-container"
                  >
                    <Row>
                      <Col xs={4} md={2}>
                        <Image
                          src={users[questions[answr].author].avatarURL}
                          className="avatar"
                          roundedCircle
                        />
                      </Col>
                      <Col xs={6} md={4}>
                        <p>{questions[answr].author} Asks</p>
                        <p> Would You Rather </p>
                        <p>.. {questions[answr].optionOne.text} .. or</p>
                      </Col>
                    </Row>
                    <Row>
                      <Button
                        className="sign-in-btn"
                        variant="outline-dark"
                        size="lg"
                        block
                      >
                        View Poll
                      </Button>
                    </Row>
                  </Container>
                );
              }
            })}
          </Tab>
          <Tab eventKey="answered" title="Answered">
            {/* loop through unanswered, .map, access questions, get the author and option one */}
            {answered.map(answr => {
              if (questions[answr] !== undefined) {
                return (
                  <Container
                    key={questions[answr].id}
                    className="poll-container"
                  >
                    <Row>
                      <Col xs={4} md={2}>
                        <Image
                          src={users[questions[answr].author].avatarURL}
                          className="avatar"
                          roundedCircle
                        />
                      </Col>
                      <Col xs={6} md={4}>
                        <p>{questions[answr].author} Asks</p>
                        <p> Would You Rather </p>
                        <p>.. {questions[answr].optionOne.text} .. or</p>
                      </Col>
                    </Row>
                    <Row>
                      <Button
                        className="sign-in-btn"
                        variant="outline-dark"
                        size="lg"
                        block
                      >
                        View Poll
                      </Button>
                    </Row>
                  </Container>
                );
              }
            })}
          </Tab>
        </Tabs>
      </div>
    );
}
}
function mapStateToProps({ authedUser, users, questions }) {
  let answered = [];
  if (users[authedUser] !== undefined) {
    answered = Object.keys(users[authedUser].answers);
  }
  console.log("answers !!!!!!!!!!!!!", answered);
  let questionsIds = Object.keys(questions) // filter out what's already in answered
  let unanswered = questionsIds.filter(qid => !answered.includes(qid))

  console.log("questions >>>>>>>>>>>>>>>", questionsIds);
  console.log("un answered filtered <<<<<<<<<<<<<<<", unanswered);

  return {
    users,
    answered,
    unanswered,
    questions
  };
}
export default connect(mapStateToProps)(Dashboard);