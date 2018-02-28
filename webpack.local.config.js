var path = require('path');
var webpack = require('webpack');
var BundleTracker = require('webpack-bundle-tracker');
const ExtractTextPlugin = require('extract-text-webpack-plugin');

var config = require('./webpack.base.config.js');

// Use webpack dev server

config.entry = {
    'app': [
        'react-hot-loader/patch',
        'webpack-dev-server/client?http://localhost:3000',
        'webpack/hot/only-dev-server',
        './static/assets/js/index'
    ]
};

config.output.publicPath = 'http://localhost:3000/static/assets/bundles/deve/';
config.output.path = path.resolve(__dirname, './static/assets/bundles/deve/');

// Add HotModuleReplacementPlugin and BundleTracker plugins
config.plugins = config.plugins.concat([
    new BundleTracker({filename: './webpack-stats.json'}),
    new webpack.HotModuleReplacementPlugin(),
    new webpack.NoEmitOnErrorsPlugin(),
    new ExtractTextPlugin('webpack-style.css'),
    new webpack.NamedModulesPlugin(),
]);

// Add a loader for JSX files with react-hot enabled
config.module.loaders.push(
    {test: /\.jsx$/, loader: 'babel-loader', exclude: /node_modules/},
    {
        test: /\.css$/,
        loader:
            ExtractTextPlugin.extract({
                use: [
                    {loader: 'css-loader'}
                ]
            })
    }
);

module.exports = config;