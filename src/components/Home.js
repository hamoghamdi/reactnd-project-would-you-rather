import React, { Component } from 'react';
import { connect } from 'react-redux'
import Dashboard from "./Dashboard";
import Login from "./Login";

class Home extends Component {
    render() {
        return (
          <div>
            {this.props.authedUser === null ? <Login /> : <Dashboard />}
          </div>
        );
    }
}

function mapStateToProps({ authedUser }) {
  return {
    authedUser
  };
}

export default connect(mapStateToProps)(Home);