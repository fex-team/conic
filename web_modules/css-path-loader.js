module.exports = function (source, map) {
    this.cacheable && this.cacheable()
    var namespace = this.resourcePath.replace(/[\W\w]+(?=src\b)/, '').replace(/\.scss/, '')

    var nameArray = namespace.split('/')
    nameArray.pop()
    namespace = nameArray.join('-')

    // 豁免全局样式
    if (namespace !== 'src') {
        source = '.' + namespace + '{' + source + '}'
    }

    this.callback(null, source, map)
};