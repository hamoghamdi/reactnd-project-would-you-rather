import React, { Component } from 'react';
import { Tabs, Tab, Container, Col, Row, Image, Button } from 'react-bootstrap'
import { connect } from 'react-redux'
import { Link } from 'react-router-dom'

class Dashboard extends Component {
render() {

    const { questions, users, answered, unanswered } = this.props
    // answered.sort((a, b) => questions[b].timestamp - questions[a].timestamp); 

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
                          <Link to={`/questions/${questions[answr].id}`}>View Poll</Link>
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
                        <Link to={`/questions/${questions[answr].id}`}>
                          View Poll
                        </Link>
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
  let unsortedAnswered = [];
  console.log("authedUser", authedUser);
  console.log('questions', questions)
 
  if ( questions !== null && users[authedUser] !== undefined) {
    unsortedAnswered = Object.keys(users[authedUser].answers);
  }

  let questionsIds = Object.keys(questions).sort(
    (a, b) => questions[b].timestamp - questions[a].timestamp
  ); 
  
  let answered = questionsIds.filter(qid => unsortedAnswered.includes(qid));
  console.log("after filter & sort ", answered);
  console.log("after filter & sort unsorted", unsortedAnswered);


  // filter out what's already in answered
  let unanswered = questionsIds.filter(qid => !unsortedAnswered.includes(qid));

  console.log("un answered ordered <<<<<<<<<<<<<<<", unanswered);

  return {
    users,
    answered,
    unanswered,
    questions
  };
}
export default connect(mapStateToProps)(Dashboard);

// .map(ansrId =>{
//         questions.filter(qusId => qusId === ansrId);
//     }) 