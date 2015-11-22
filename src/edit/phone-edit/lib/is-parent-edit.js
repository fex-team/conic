module.exports = function (child, parent) {
    let nowChild = child
    let isParent = false

    while (nowChild.props.parent) {
        if (nowChild.props.parent === parent) {
            isParent = true
            break
        }

        nowChild = nowChild.props.parent
    }

    return isParent
}