const webpack = require('webpack');
const path = require('path');

module.exports = {
    entry: [
        'webpack-hot-middleware/client',
        './client/client.js'
        ],
    output: {
       path: path.resolve('./dist'),
       filename: 'bundle.js',
       publicPath: '/'
    },
    plugins: [
        new webpack.optimize.OccurenceOrderPlugin(),
        new webpack.HotModuleReplacementPlugin(),
        new webpack.NoErrorsPlugin()
    ],
    module: {
        loaders: [
            {
                test: /\.js$/,
                loader: 'babel-loader',
                exclude: /node_modules/,
                query: {
                    presets: ['react', 'es2015', 'react-hmre']
                },
            },
            { test: /\.css$/, loader: 'style-loader!css-loader' },
            { test: /\.less$/, loader: 'style-loader!css-loader!less-loader' }
            
        ]
    }
};
