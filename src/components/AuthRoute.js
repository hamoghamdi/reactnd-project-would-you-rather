import React from 'react';
import { Redirect, Route } from 'react-router-dom'
import { connect } from 'react-redux'

function AuthRoute({
  component: Component = null,
  render: Render = null,
  ...rest
}) {
  return (
    <Route
      {...rest}
      render={props => {
        if (rest.loggedIn) {
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
                pathname: "/",
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

    return {
        loggedIn: authedUser !== null 
    }

}

export default connect(mapStateToProps)(AuthRoute)