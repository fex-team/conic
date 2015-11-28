module.exports = function (source, map) {
    this.cacheable && this.cacheable()

    var namespace = this.resourcePath.replace(process.cwd() + '/', '').replace(/\.(js|jsx)/, '')

    var nameArray = namespace.split('/')
    nameArray.pop()
    nameArray.shift()
    var nameStr = nameArray.join('-')

    // 匹配 namespace
    source = source.replace(/(__namespace)/g, function (text, $1) {
        return 'className="' + nameStr + '"'
    })

    this.callback(null, source, map)
}
