import * as React from 'react'
import { Router, Route } from 'react-router'

import Home from './home/index.tsx'
import Editor from './edit/toolbar/index.tsx'

export default (
  <Router>
    <Route path="/" component={Home}></Route>
    <Route path="/edit" component={Editor}></Route>
  </Router>
)