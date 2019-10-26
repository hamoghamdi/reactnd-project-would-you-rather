import React, { Component } from 'react';
import { connect } from 'react-redux'

class Leaderboard extends Component {
    render() {
        const { users } = this.props
        console.log('USERS LEADERBOARD', Object.values(users))
        
        return (
          <div>
            {users !== undefined && Object.values(users).map(user =>{
                    const answers = user.answers
                    const answersLength = Object.keys(answers).length
                    const score = answersLength + user.questions.length;
                    return (
                      <div key={user.id}>
                        <img
                          src={user.avatarURL}
                          className="avatar"
                          
                        />
                        <p>name: {user.name}</p>
                        <p>Answered questions: {answersLength}</p>
                        <p>Created questions: {user.questions.length}</p>
                        <p>Score: {score}</p>
                      </div>
                    );
                })}
          </div>
        );
    }
}

function mapStateToProps({users}){
    return {
        users
    }

}
export default connect(mapStateToProps)(Leaderboard);