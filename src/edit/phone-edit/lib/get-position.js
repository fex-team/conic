// 根据edit生成位置数组
function getPosition(edit, positionArray) {
    if (edit.props.parent) {
        positionArray.push(edit.props.uniqueKey)
        getPosition(edit.props.parent, positionArray)
    }
}
module.exports = getPosition