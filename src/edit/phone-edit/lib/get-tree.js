const _ = require('lodash')

// 根据edit生成树状json配置
function getTree(edit, info) {
    console.log(edit)
    info.opts = edit.state.customOpts
    info.childs = _.cloneDeep(edit.state.childs)
    //info.component = edit
    info.uniqueKey = edit.props.uniqueKey
    edit.childInstance.getChildsEdit && edit.childInstance.getChildsEdit().map((item, index)=> {
        getTree(item, info.childs[index])
    })
}

module.exports = getTree