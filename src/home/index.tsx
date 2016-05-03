import * as React from 'react'
import { Link } from 'react-router'

import './index.scss'

export default class Home extends React.Component<any, void> {
  render () {
    return (
      <div className="_namespace">
        <Link className="btn" to="/edit">编辑</Link>
      </div>
    )
  }
}