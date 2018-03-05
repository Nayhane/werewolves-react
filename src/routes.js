import React, { Component } from 'react'
import { Route } from 'react-router-dom'

import {
  Lobby,
  //Game,
  SignIn,
  SignUp,
  UserPage,
  wakkerdamMessagePage,
  sluimervoortMessagePage
} from './containers'

export default class Routes extends Component {
  render() {
    return (
      <div>
        <Route exact path="/" component={Lobby} />
        <Route path="/sign-in" component={SignIn} />
        <Route path="/sign-up" component={SignUp} />
        <Route path="/readmessage" component={UserPage} />
        <Route path="/readmessage/Wakkerdam" component={wakkerdamMessagePage} />
        <Route path="/readmessage/Sluimervoort" component={sluimervoortMessagePage} />
      </div>
    )
  }
}
