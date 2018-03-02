var path = require('path');
var BundleTracker = require('webpack-bundle-tracker');
const ExtractTextPlugin = require('extract-text-webpack-plugin');

var config = require('./webpack.base.config.js');

config.entry = {
    'app': [
        './static/assets/js/index'
    ]
};

config.output.path = path.resolve(__dirname, './static/assets/bundles/deve/');

config.plugins = config.plugins.concat([
    new BundleTracker({filename: './webpack-stats.json'}),
    new ExtractTextPlugin('webpack-style.css'),
]);

// Add a loader for JSX files with react-hot enabled
config.module.loaders.push(
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