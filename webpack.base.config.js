var path = require('path');
module.exports = {
    context: __dirname,
    entry: {
        'app': './static/assets/js/index'
    },
    output: {
        path: path.resolve(__dirname, './static/assets/bundles/'),
        filename: "[name].js"
    },
    plugins: [],
    module: {
        loaders: [
            {
                test: /\.jsx$/,
                loader: 'babel-loader',
                options: {
                    presets: ['env']
                },
                exclude: '/node_modules/'
            },
            {
                test: /\.json$/,
                loader: 'json-loader'
            },
            {
                test: /\.(gif|ttf|eot|svg|woff2?)$/,
                loader: 'url-loader?name=[name].[ext]'
            },
        ]
    },
    resolve: {
        extensions: ['.js', '.jsx']
    }
};