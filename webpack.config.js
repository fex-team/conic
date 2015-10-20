module.exports = {
    entry: [
        './src/index.js'
    ],
    output: {
        path: __dirname + '/output/',
        publicPath: '/output/',
        filename: './src/index.js'
    },
    module: {
        loaders: [
            {
                test: /\.js?$/,
                exclude: /node_modules/,
                loaders: ['jsx', 'babel', 'path-class-loader']
            }, {
                test: /\.(scss|css)/,
                loader: 'style!css!autoprefixer!sass'
            }, {
                test: /\.(png|jpg)$/,
                exclude: /node_modules/,
                loader: 'url-loader'
            }, {
                test: /\.(woff|woff2|ttf|eot|svg)(\?v=[0-9]\.[0-9]\.[0-9])?$/,
                loader: 'url'
            }, {
                test: /\.json$/,
                exclude: /node_modules/,
                loader: 'json-loader'
            }
        ]
    }
}