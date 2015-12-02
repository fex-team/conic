const React = require('react')
const JSONTree = require('react-json-tree')

const theme = {
    scheme: 'mocha',
    base00: '#272822',
    base01: '#383830',
    base02: '#49483e',
    base03: '#75715e',
    base04: '#a59f85',
    base05: '#f8f8f2',
    base06: '#f5f4f1',
    base07: '#f9f8f5',
    base08: '#f92672',
    base09: '#fd971f',
    base0A: '#f4bf75',
    base0B: '#a6e22e',
    base0C: '#a1efe4',
    base0D: '#66d9ef',
    base0E: '#ae81ff',
    base0F: '#cc6633'
}

const getItemString = (type, data, itemType, itemString) => (<span> {itemType} {itemString}</span>)

const json = {
    a: {
        b: 1
    },
    c: [1, 2, 3]
}

module.exports = React.createClass({
    getInitialState: function () {
        return {
            value: this.props.value
        }
    },

    componentWillReceiveProps: function (nextProps) {
        if (this.state.item !== nextProps.item) {
            this.setState({
                value: nextProps.value
            })
        }
    },

    onChange: function (event) {
        let newItem = this.state.item
        newItem.value = event.target.value

        this.setState({
            item: newItem
        }, function () {
            this.props.onChange(this.state.item, {
                name: `修改 ${this.state.item.desc} 为 ${this.state.item.value}`
            })
        })
    },

    render: function () {
        return (
            <div className="ant-form-item">
                <label htmlFor="control-input"
                       className="col-8">{this.props.title}</label>

                <div className="col-14">
                    <JSONTree data={json}
                              theme={theme}
                              getItemString={getItemString}/>
                </div>
            </div>
        )
    }
})