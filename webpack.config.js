module.exports = {
    entry: [
        './index.js'
    ],
    output: {
        path: __dirname + '/output/',
        publicPath: '/output/',
        filename: 'index.js'
    },
    module: {
        loaders: [
            {
                test: /\.js?$/,
                exclude: /node_modules/,
                loaders: ['jsx', 'babel',require('./auto-path-class')]
            }, {
                test: /\.(scss|css)/,
                loader: 'style!css!autoprefixer!sass'
            }, {
                test: /\.(png|jpg)$/,
                exclude: /node_modules/,
                loader: 'url-loader'
            }, {
                test: /\.woff$/,
                loader: "url?limit=10000&minetype=application/font-woff"
            }, {
                test: /\.ttf$/,
                loader: "file"
            }, {
                test: /\.eot$/,
                loader: "file"
            }, {
                test: /\.svg$/,
                loader: "file"
            }
        ]
    }
}