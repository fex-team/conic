// 根据edit生成树状json配置
function getTree(edit, info, index) {
    info.childs = _.cloneDeep(edit.state.childs, function (value, name) {
        if (name === 'childs') {
            return value;
        }
    })
    info.component = edit
    info.index = index
    info.uniqueKey = edit.props.uniqueKey
    edit.childInstance.getChildsEdit && edit.childInstance.getChildsEdit().map((item, index)=> {
        getTree(item, info.childs[index], index)
    })
}

module.exports = getTree