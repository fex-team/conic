var webpack = require('webpack')
var path = require('path')

var config = {
    addVendor: function (name, path) {
        this.resolve.alias[name] = path;
        this.module.noParse.push(new RegExp('^' + name + '$'));
    },

    devtool: 'eval-source-map',

    entry: [
        'webpack-dev-server/client?http://localhost:8090',
        'webpack/hot/only-dev-server',
        './src/index.js'
    ],

    output: {
        path: __dirname + '/output/',
        publicPath: '/output/',
        filename: 'index.js'
    },

    resolve: {
        alias: {}
    },

    module: {
        loaders: [
            {
                test: /\.js?$/,
                exclude: /node_modules/,
                loaders: ['jsx', 'react-hot', 'babel', 'path-class-loader']
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
                loader: 'url'
            }, {
                test: /\.(woff|woff2|ttf|eot|svg)(\?v=[0-9]\.[0-9]\.[0-9])?$/,
                loader: 'url'
            }, {
                test: /\.json$/,
                loader: 'json-loader'
            }
        ],
        noParse: []
    },

    plugins: [
        new webpack.DefinePlugin({
            'process.env.NODE_ENV': '"development"'
        }),
        new webpack.HotModuleReplacementPlugin(),
        new webpack.NoErrorsPlugin()
    ]
}

var node_modules = __dirname + '/node_modules'
config.addVendor('flux', node_modules + '/flux/dist/flux.min.js')
config.addVendor('react-dnd', node_modules + '/react-dnd/dist/ReactDnD.min.js')
config.addVendor('react-color', node_modules + '/react-color/build/bundle.js')
config.addVendor('react-router', node_modules + '/react-router/umd/ReactRouter.min.js')
config.addVendor('jquery', node_modules + '/jquery/dist/jquery.min.js')

module.exports = config