/// <reference path='../typings/main.d.ts'/>

import * as React from 'react'
import * as ReactDOM from 'react-dom'
import routes from './router.tsx'

import 'antd/lib/index.css'
import 'font-awesome/css/font-awesome.css'
import 'codemirror/lib/codemirror.css'
import 'codemirror/theme/material.css'

import './reset.scss'

ReactDOM.render(
  routes,
  document.getElementById('react-dom')
)