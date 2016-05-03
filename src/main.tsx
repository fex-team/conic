/// <reference path='../typings/main.d.ts'/>

import * as React from 'react'
import * as ReactDOM from 'react-dom'
import routes from './router.tsx'
import { createStore, combineReducers, applyMiddleware } from 'redux'
import { Provider } from 'react-redux'
import { Router, Route, browserHistory } from 'react-router'
import { syncHistoryWithStore, routerReducer } from 'react-router-redux'

import './common.ts'

import './reset.scss'

ReactDOM.render(
  routes,
  document.getElementById('react-dom')
)