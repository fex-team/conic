const dispatcher = require('../dispatcher')
const EventEmitter = require('events').EventEmitter
const assign = require('object-assign')
const _ = require('lodash')
const editAction = require('../actions/edit-action')

const CHANGE_EVENT = 'change'

let containerEdit
let historys = []

// 根据位置查找edit（如果找不到，则找到尽可能接近的父级元素）
function findByPosition(position) {
    let componentEdit = containerEdit
    if (!_.isEmpty(position)) { // 不是根节点
        position.map((uniqueKey)=> {
            componentEdit.childInstance.getChildsEdit().map((eachChildEdit)=> {
                if (uniqueKey === eachChildEdit.props.uniqueKey) {
                    componentEdit = eachChildEdit
                }
            })
        })
    }
    return componentEdit
}

var HistoryStore = assign({}, EventEmitter.prototype, {
    emitChange: function () {
        this.emit(CHANGE_EVENT)
    },

    addChangeListener: function (callback) {
        this.on(CHANGE_EVENT, callback)
    },

    removeChangeListener: function (callback) {
        this.removeListener(CHANGE_EVENT, callback)
    },

    get: function () {
        return historys
    }
})

HistoryStore.dispatchToken = dispatcher.register(function (action) {
    switch (action.type) {
    case 'addHistory':
        historys.push(action.operate)
        HistoryStore.emitChange()
        break
    case 'setContainerEdit':
        containerEdit = action.edit
        break
    case 'revertHistory':
        // 取消选中组件
        setTimeout(function () {
            editAction.selectComponent(null)
        })

        // 操作顺序
        let topToBottom = true
        let newHistorys = _.cloneDeep(historys)

        if (action.start < action.end) {
            // 倒序历史树
            newHistorys.reverse()
        } else {
            topToBottom = false
            action.start = historys.length - action.start - 1
            action.end = historys.length - action.end - 1
        }

        newHistorys.map((item, index)=> {
            if (index >= action.start && index <= action.end) { // 在恢复范围内
                let componentEdit = findByPosition(item.position)

                if (topToBottom) { // 撤销
                    // 忽略最后
                    if (index === action.end)return
                } else { // 还原
                    // 忽略第一个
                    if (index === action.start)return
                }

                switch (item.type) {
                case 'update':
                    if (topToBottom) { // 撤销
                        componentEdit.UpdateChildren(item.optsBefore, null)
                    } else { // 还原
                        componentEdit.UpdateChildren(item.optsAfter, null)
                    }
                    break
                case 'add':
                    if (topToBottom) {
                        componentEdit.removeSelf()
                    } else {
                        // 在父级添加这个组件
                        componentEdit.addChild({
                            name: item.componentName,
                            uniqueKey: item.uniqueKey
                        })
                    }
                    break
                case 'delete':
                    if (topToBottom) {
                        // 在父级添加这个组件
                        componentEdit.addChild({
                            name: item.componentName,
                            opts: item.optsBefore,
                            uniqueKey: item.uniqueKey
                        })
                    } else {
                        componentEdit.removeSelf()
                    }
                    break
                case 'move':
                    break
                }
            }
        })
        break
    }
})

module.exports = HistoryStore