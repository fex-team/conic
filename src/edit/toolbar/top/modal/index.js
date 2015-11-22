const React = require('react')
const Modal = require('antd/lib/modal')

module.exports = React.createClass({
    getInitialState: function () {
        return {
            visible: false
        }
    },

    handleOk: function () {
        this.setState({
            visible: false
        })
    },

    handleCancel: function () {
        this.setState({
            visible: false
        })
    },

    render: function () {
        return (
            <Modal title="第一个 Modal"
                   visible={this.state.visible}
                   onOk={this.handleOk}
                   onCancel={this.handleCancel}>
                <p>对话框的内容</p>

                <p>对话框的内容</p>
                <p>对话框的内容</p>
                <p>对话框的内容</p>
                <p>对话框的内容</p>
                <p>对话框的内容</p>
                <p>对话框的内容</p>
                <p>对话框的内容</p>
                <p>对话框的内容</p>
                <p>对话框的内容</p>
                <p>对话框的内容</p>
                <p>对话框的内容</p>
                <p>对话框的内容</p>
                <p>对话框的内容</p>
                <p>对话框的内容</p>
                <p>对话框的内容</p>

                <p>对话框的内容</p>
            </Modal>
        )
    }
})