const React = require('react')
const DragSource = require('../drag-source')
const DragSourceAbsolute = require('../drag-source-absolute')
const Component = require('../component')
const iconMap = require('../icon-map')
const ReactDOM = require('react-dom')
const HistoryStore = require('../../../../../stores/history-store')
const $ = require('jquery')

module.exports = React.createClass({
    getInitialState: function () {
        return {}
    },

    absoluteRef: function (ref) {
        this.absoluteInstance = ref
    },

    // 绝对定位矩形位置修改后
    // 在编辑区坐标系内生成新的自由矩形
    onAbsoluteChange: function (style) {
        let $absolute = $(ReactDOM.findDOMNode(this.absoluteInstance))
        let moveEndPosition = {
            left: $absolute.offset().left + style.position.value.left,
            top: $absolute.offset().top + style.position.value.top
        }
        let containerEdit = HistoryStore.getContainerEdit()
        let $container = $(ReactDOM.findDOMNode(containerEdit))

        // 转化成container内部坐标系，插入手机壳
        containerEdit.dropAbsolute({
            type: 'LayoutBoxAbsolute',
            existComponent: false,
            opts: {
                position: {
                    value: {
                        left: moveEndPosition.left - $container.offset().left,
                        top: moveEndPosition.top - $container.offset().top
                    }
                }
            }
        })
    },

    render: function () {
        return (
            <div namespace>
                <div className="container">
                    <DragSource type="LayoutBox">
                        <Component icon={iconMap.LayoutBox}>万能矩形</Component>
                    </DragSource>
                    <DragSourceAbsolute type="LayoutBoxAbsolute"
                                        left={0}
                                        top={0}
                                        ref={this.absoluteRef}
                                        onChange={this.onAbsoluteChange}>
                        <Component icon={iconMap.LayoutBoxAbsolute}>自由矩形</Component>
                    </DragSourceAbsolute>
                </div>
            </div>
        )
    }
})