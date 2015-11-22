// 根据edit生成树状json配置
function getTreeCopy(edit, info) {
    info.opts = edit.state.customOpts
    info.childs = edit.state.childs
    edit.childInstance.getChildsEdit && edit.childInstance.getChildsEdit().map((item, index)=> {
        getTreeCopy(item, info.childs[index])
    })
}

module.exports = getTreeCopy