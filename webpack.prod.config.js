var path = require('path');
var webpack = require('webpack');
var BundleTracker = require('webpack-bundle-tracker');
const ExtractTextPlugin = require('extract-text-webpack-plugin');
const UglifyJsPlugin = require('uglifyjs-webpack-plugin');

var config = require('./webpack.base.config.js');

config.output.path = path.resolve(__dirname, './static/assets/bundles/dist');
config.output.filename = "[name]-[hash].js";

// Add HotModuleReplacementPlugin and BundleTracker plugins
config.plugins = config.plugins.concat([
    new BundleTracker({filename: './webpack-stats-prod.json'}),
    // removes a lot of debugging code in React
    new webpack.DefinePlugin({
        'process.env': {
            'NODE_ENV': JSON.stringify('production')
        }
    }),

    // keeps hashes consistent between compilations
    new webpack.optimize.OccurrenceOrderPlugin(),

    // minifies your code
    new UglifyJsPlugin(),
    new ExtractTextPlugin('webpack-style-[hash].css')

]);

config.module.loaders.push(
    {
        test: /\.css$/, loader:
            ExtractTextPlugin.extract({
                use: [
                    {loader: 'css-loader', options: {minimize: true}}
                ]
            })
    }
);

module.exports = config;