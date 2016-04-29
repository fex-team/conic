import React from 'react'
const classNames = require('classnames')

const defaultJson = require('../phone-edit/default.json')

import './index.scss'
import './animate.scss'
import './loading.scss'

export default class Container extends React.Component {
    constructor (props) {
        super(props);

        this.state = {
            // 操作页面中当前选中对象
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
                      top
                  </div>

                  <div className={sdClass}>
                      left
                  </div>

                  <div className={rdClass}>
                      right
                  </div>

                  <div className={mnClass}>
                      center

                      <div className="phone-out">
                          <div className="phone">

                          </div>
                      </div>
                  </div>
                  <div className={ftClass}>
                      footer
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


module.exports = Container