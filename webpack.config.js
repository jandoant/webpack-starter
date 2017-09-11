var path = require('path');
var webpack = require('webpack');

module.exports = {
    entry: "./src/js/app.js",
    output: {
        path: path.resolve(__dirname, 'build'), //assemble absolute output pathname
        filename: 'bundle.js',
        publicPath: '/build'
    },
    module: {
        rules: [{
            test: /\.css$/,
            use: ['style-loader', 'css-loader']
        }],
    },
    plugins: [
        new webpack.optimize.UglifyJsPlugin({
            //... options
        })
    ]
};