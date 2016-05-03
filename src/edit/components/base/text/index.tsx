import * as React from 'react'
import * as _ from 'lodash'

let defaultStyle = {
  wordBreak: 'break-all'
}

interface TextProps {
  name: string,
  desc: string,
  defaultOpts: {
    base: {
      value: {
        text: {
          value: string,
          edit: string,
          desc: string
        },
        title: string,
        edit: string
      },
      style: {
        value: {
          margin: number,
          padding: number,
          color: string,
          fontSize: string
        },
        edit: string
      }
    }
  }
}

export default class Text extends React.Component<TextProps, any> {
  render () {
    return (
      <div className="_namespace">
        helloworld
      </div>
    )
  }
}