const ReactDOM = require('react-dom')
const dispatcher = require('../dispatcher')
const EventEmitter = require('events').EventEmitter
const assign = require('object-assign')
const _ = require('lodash')
const editAction = require('../actions/edit-action')
const $ = require('jquery')

const CHANGE_EVENT = 'change'
const REVERSE_EVENT = 'reverseEvent'

let containerEdit
let $containerDom
let historys = []

// 当前操作位置（是倒序的，从上到下，0表示最后一次操作）
let currentIndex = 0

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

    emitReverse: function () {
        this.emit(REVERSE_EVENT)
    },

    addReverseListener: function (callback) {
        this.on(REVERSE_EVENT, callback)
    },

    removeReverseListener: function (callback) {
        this.removeListener(REVERSE_EVENT, callback)
    },

    get: function () {
        return historys
    },

    getCurrentIndex: function () {
        return currentIndex
    },

    removeAfterCurrent: function () {
        // 删除当前位置之后的所有历史纪录
        historys = historys.slice(0, historys.length - currentIndex)
        currentIndex = 0
    },

    getContainerEdit: function () {
        return containerEdit
    },

    get$ContainerEditDom: function () {
        return $containerDom
    }
})

HistoryStore.dispatchToken = dispatcher.register(function (action) {
    switch (action.type) {
    case 'addHistory':
        if (historys.length === 0) {
            historys.push({
                operateName: '空白',
                type: 'none'
            })
        }

        // 如果当前历史不是最新的，则删除之后的历史
        if (currentIndex !== 0) {
            HistoryStore.removeAfterCurrent()
        }

        historys.push(action.operate)
        HistoryStore.emitChange()
        break
    case 'setContainerEdit':
        containerEdit = action.edit
        $containerDom = $(ReactDOM.findDOMNode(containerEdit))
        break
    case 'revertHistory':
        currentIndex = action.end

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
                if (topToBottom) { // 撤销
                    // 忽略最后
                    if (index === action.end)return
                } else { // 还原
                    // 忽略第一个
                    if (index === action.start)return
                }

                let itemPosition = _.cloneDeep(item.position).reverse()
                let componentEdit = findByPosition(itemPosition)

                switch (item.type) {
                case 'update':
                    if (topToBottom) { // 撤销
                        componentEdit.updateSelf(item.optsBefore, null)
                    } else { // 还原
                        componentEdit.updateSelf(item.optsAfter, null)
                    }
                    break
                case 'add':
                    if (topToBottom) {
                        componentEdit.removeSelf()
                    } else {
                        // 在父级添加这个组件
                        let positionPrev = _.cloneDeep(item.position).reverse()
                        positionPrev.pop()
                        let componentEditContainer = findByPosition(positionPrev)

                        componentEditContainer.addChild({
                            name: item.componentName,
                            uniqueKey: item.uniqueKey,
                            opts: item.opts
                        })
                    }
                    break
                case 'delete':
                    if (topToBottom) {
                        // 在父级添加这个组件
                        let positionPrev = _.cloneDeep(item.position).reverse()
                        positionPrev.pop()
                        let componentEditContainer = findByPosition(positionPrev)

                        componentEditContainer.addChild({
                            name: item.componentName,
                            opts: item.optsBefore,
                            childs: item.childs,
                            uniqueKey: item.uniqueKey
                        })
                    } else {
                        componentEdit.removeSelf()
                    }
                    break
                case 'move':
                    let afterPosition = _.cloneDeep(item.afterPosition).reverse()
                    let afterComponentEdit = findByPosition(afterPosition)

                    let positionPrev = _.cloneDeep(item.position).reverse()
                    positionPrev.pop()
                    let componentEditContainer = findByPosition(positionPrev)

                    if (topToBottom) { // 撤销
                        // 删除移动后的
                        afterComponentEdit.removeSelf()
                        // 新建移动前的
                        componentEditContainer.addChild({
                            name: item.componentName,
                            opts: item.opts,
                            childs: item.childs,
                            uniqueKey: item.beforeUniqueKey
                        })
                    } else { // 还原
                        // 删除移动前的
                        componentEdit.removeSelf()
                        // 新建移动后的
                        afterComponentEdit.addChild({
                            name: item.componentName,
                            opts: item.opts,
                            childs: item.childs,
                            uniqueKey: item.uniqueKey
                        })
                    }
                    break
                }
            }
        })

        HistoryStore.emitReverse()
        break
    }
})

module.exports = HistoryStore