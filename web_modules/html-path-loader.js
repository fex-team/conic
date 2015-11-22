module.exports = function (source, map) {
    this.cacheable && this.cacheable()

    var namespace = this.resourcePath.replace(/[\W\w]+(?=src\b)/, '').replace(/\.scss/, '')

    var nameArray = namespace.split('/')
    nameArray.pop()
    namespace = nameArray.join('-')

    // 豁免全局样式
    if (namespace !== 'src') {
        // 匹配 namespace
        source = source.replace(/(namespace)/g, function (text, $1) {
            return 'className="' + namespace + '"'
        })
    }

    this.callback(null, source, map)
}