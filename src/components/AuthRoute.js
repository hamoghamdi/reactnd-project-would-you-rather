import React from 'react';
import { Redirect, Route, withRouter } from 'react-router-dom'
import { connect } from 'react-redux'

function AuthRoute({
  component: Component = null,
  render: Render = null,
  ...rest
}) {
  console.log("loggedIn ,,,,", rest.loggedIn);
  return (
    
    <Route
      {...rest}
      render={props => {
        if (rest.loggedIn) {
          console.log('loggedIn in if,,' , rest.loggedIn)
          if (Render !== null) {
            return Render(props);
          } else if (Component !== null) {
            return <Component {...props} />;
          } else {
            return null;
          }
        } else {
            console.log('AuthRoute location ', props.location)
            
          return (
            <Redirect
              to={{
                pathname: "/login",
                state: { from: props.location }
              }}
            />
          );
        }
      }}
    />
  );
}


function mapStateToProps ({authedUser}) {
  const loggedIn = authedUser 

    return {
        loggedIn 
    }

}

export default withRouter(connect(mapStateToProps)(AuthRoute));