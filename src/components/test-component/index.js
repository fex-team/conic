var React = require('react')

module.exports = React.createClass({
    getDefaultProps: function () {
        return {
            name: '捣乱的',
            opts: {
                text: {
                    value: 'Default Text',
                    edit: 'text',
                    desc: '随便写的'
                },
                // 关注
                aaa: {
                    value: '123123',
                    edit: 'text',
                    desc: '推土机'
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
                <div className="container">
                    {this.props.opts.text.value}
                </div>
            </div>
        )
    }
})