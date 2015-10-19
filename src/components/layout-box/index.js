var React = require('react')
require('./index.scss')

let layoutBox = React.createClass({
    getDefaultProps: function () {
        return {
            name: 'layout-box',
            desc: '万能矩形',
            opts: {
                text: {
                    value: 'Default Text',
                    edit: 'text',
                    desc: '随便写的'
                },
                flex: {
                    edit: 'flex',
                    value: {
                        flexDirection: 'row',
                        flexWrap: 'nowrap',
                        justifyContent: 'flex-start',
                        alignItems: 'stretch'
                    }
                }
            }
        }
    },

    getInitialState: function () {
        return {state: 'state'}
    },

    render: function () {
        return (
            <div>
                <div className="container"
                     style={this.props.opts.flex.value}>
                    {this.props.opts.text.value}
                </div>
            </div>
        )
    }
})

module.exports = layoutBox;