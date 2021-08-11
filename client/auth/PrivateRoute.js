
//Will allow us to declare protected routes for the frontend to restrict view access based on user auth.

import React, { Component } from 'react'
import { Route, Redirect } from 'react-router-dom'
import auth from './auth-helper'

const PrivateRoute = ({ component: Component, ...rest }) => (
  <Route {...rest} render={props => (
    auth.isAuthenticated() ? (
      <Component {...props}/>
    ) : (
      <Redirect to={{
        pathname: '/signin',
        state: { from: props.location }
      }}/>
    )
  )}/>
)

export default PrivateRoute

//Components rendered within PrivateRoute will only load when the user is authenticated
//hence why we have a ternary operator involving auth.isAuthenticated()

//For example, we will load components which need restricted access, like a user profile page, through a PrivateRoute