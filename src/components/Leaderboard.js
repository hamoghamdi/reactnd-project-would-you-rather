import React, { Component } from 'react';
import { connect } from 'react-redux'
import { Redirect, withRouter } from 'react-router-dom'

class Leaderboard extends Component {
    render() {
        const { users, sortedUsersIds, authedUser } = this.props;
        console.log('USERS LEADERBOARD', Object.values(users))
        
        return (
          <div>
            {authedUser === null & users !== undefined ? <Redirect to='/' /> : (sortedUsersIds.map(userId => {
                const answers = users[userId].answers;
                const answersLength = Object.keys(answers).length;
                
                return (
                  <div key={users[userId].id}>
                    <img src={users[userId].avatarURL} className="avatar" alt=""/>
                    <p>name: {users[userId].name}</p>
                    <p>Answered questions: {answersLength}</p>
                    <p>Created questions: {users[userId].questions.length}</p>
                    <p>Score: {users[userId].score}</p>
                  </div>
                );
              }))}
            
          </div>
        );
    }
}

function mapStateToProps({users, authedUser}){

  console.log("users no score ", users)
  
  let scoredUsers = Object.values(users).map(user => {
    const answers = user.answers;
    const answersLength = Object.keys(answers).length;
    const score = answersLength + user.questions.length;

    user.score = score 
    return null
  })
  console.log("scored users " , scoredUsers)
  let sortedUsersIds = Object.keys(users).sort((a,b) => users[b].score - users[a].score)
  console.log("sorted users ", sortedUsersIds)

    return {
        users,
        sortedUsersIds,
        authedUser
    }

}
export default withRouter(connect(mapStateToProps)(Leaderboard));