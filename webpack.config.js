var path = require('path');
var ExtractTextPlugin = require('extract-text-webpack-plugin');
var HtmlWebpackPlugin = require('html-webpack-plugin');

var extractPlugin = new ExtractTextPlugin({
    filename: 'main.css'
});

var htmlPlugin = new HtmlWebpackPlugin({
    template: 'src/index.html'
});

module.exports = {
    entry: './src/js/app.js',
    output: {
        path: path.resolve(__dirname, 'build'),
        filename: 'bundle.js',

    },
    module: {
        rules: [
            //Transpile Javascript ES6 to ES5 
            {
                test: /\.js$/,
                use: [{
                    loader: 'babel-loader',
                    options: {
                        presets: ['es2015']
                    }
                }]
            },
            //Transpile SCSS to CSS  
            {
                test: /\.(scss|sass)$/,
                use: extractPlugin.extract({
                    use: ['css-loader', 'sass-loader']
                })
            },
            //HTML-loader
            {
                test: /\.html$/,
                use: ['html-loader']
            },
            //Image-Loader
            {
                test: /\.(jpg|jpeg|png|gif)$/,
                use: [{
                    loader: 'file-loader',
                    options: {
                        name: '[name].[ext]',
                        outputPath: 'img/',
                    }
                }]
            }
        ]
    },
    plugins: [
        extractPlugin,
        htmlPlugin
    ]
};