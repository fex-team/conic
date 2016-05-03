import * as React from 'react'
import * as classNames from 'classnames'

import './index.scss'
import './animate.scss'
import './loading.scss'

interface EditorProps {

}

interface EditorState {
  selection: {},
  mode: string,
  loading: boolean,
  tree: boolean,
  editKey: number,
  previewKey: number
}

export default class Editor extends React.Component<EditorProps, EditorState> {
  constructor (props: EditorProps) {
    super(props)

    this.state = {
      selection: {},

      // 页面模式
      mode: 'edit',

      // 是否加载完毕
      loading: false,

      tree: null,

      editKey: 0,
      previewKey: 0
    }
  }


  render () {
    let sdClass = classNames({
      'g-sd': true,
      'g-sd-enter': this.state.mode === 'edit',
      'g-sd-leave': this.state.mode === 'preview'
    })

    let rdClass = classNames({
      'g-rd': true,
      'g-rd-enter': this.state.mode === 'edit',
      'g-rd-leave': this.state.mode === 'preview'
    })

    let ftClass = classNames({
      'g-ft': true,
      'g-ft-enter': this.state.mode === 'edit',
      'g-ft-leave': this.state.mode === 'preview'
    })

    let mnClass = classNames({
      'g-mn': true,
      'g-mn-leave': this.state.mode === 'preview'
    })

    let children
    if (this.state.loading) {
      children = (
        <div className="loading">
          <i className="fa fa-refresh fa-spin"></i>
        </div>
      )
    } else {
      children = (
        <div>
          <div className="g-hd">

          </div>

          <div className={sdClass}>

          </div>

          <div className={rdClass}>

          </div>

          <div className={mnClass}>


            <div className="phone-out">
              <div className="phone">

              </div>
            </div>
          </div>
          <div className={ftClass}>

          </div>
        </div>
      )
    }

    return (
      <div className="_namespace"
           style={{height:'100%'}}>
        {children}
      </div>
    )
  }
}