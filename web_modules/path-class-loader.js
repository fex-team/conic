module.exports = function (source, map) {
    this.cacheable && this.cacheable()

    var namespace = this.resourcePath.replace(/[\W\w]+(?=src\b)/, '').replace(/\.scss/, '')

    var nameArray = namespace.split('/')
    nameArray.pop()
    namespace = nameArray.join('-')

    // 豁免全局样式
    if (namespace !== 'src') {
        // 匹配 render ( <div
        source = source.replace(/(render:\s*function\s*\(\)\s*\{\s*\n\s*return\s*\(\s*\n\s*)<(\w*)>/g, function (text, $1, $2) {
            return $1 + '<div className="' + namespace + '">'
        })
    }

    this.callback(null, source, map)
};