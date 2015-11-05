
// 根据edit生成树状json配置
function getTree(edit, info) {
    info.opts = edit.state.customOpts
    info.childs = edit.state.childs
    info.component = edit
    info.uniqueKey = edit.props.uniqueKey
    edit.childInstance.getChildsEdit && edit.childInstance.getChildsEdit().map((item, index)=> {
        getTree(item, info.childs[index])
    })
}

module.exports = getTree;