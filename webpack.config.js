var webpack = require('webpack')

module.exports = {
    entry: {
        app: [
            './src/index.js'
        ],
        vendor: [
            'react-dnd',
            'react-json-tree'
        ]
    },

    output: {
        path: __dirname + '/output/',
        publicPath: '/output/',
        filename: './index.js'
    },

    module: {
        loaders: [
            {
                test: /\.js?$/,
                exclude: /node_modules/,
                loaders: ['babel?presets[]=react,presets[]=es2015', 'html-path-loader']
            }, {
                test: /\.(scss|css)/,
                exclude: /node_modules/,
                loaders: ['style', 'css', 'autoprefixer', 'sass', 'css-path-loader']
            }, {
                test: /\.(scss|css)/,
                include: /node_modules/,
                loaders: ['style', 'css', 'autoprefixer', 'sass']
            }, {
                test: /\.(png|jpg)$/,
                exclude: /node_modules/,
                loader: 'url?limit=3000&name=img/[hash:8].[name].[ext]'
            }, {
                test: /\.(woff|woff2|ttf|eot|svg)(\?v=[0-9]\.[0-9]\.[0-9])?$/,
                loader: 'url'
            }, {
                test: /\.json$/,
                loader: 'json-loader'
            }
        ]
    },

    plugins: [
        new webpack.optimize.CommonsChunkPlugin("vendor", "vendor.js", Infinity)
    ]
}