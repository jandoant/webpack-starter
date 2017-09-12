var path = require('path');
var ExtractTextPlugin = require('extract-text-webpack-plugin');
var HtmlWebpackPlugin = require('html-webpack-plugin');
var CleanWebpackPlugin = require('clean-webpack-plugin');

var extractPlugin = new ExtractTextPlugin({
    filename: 'main.css'
});

var htmlPlugin = new HtmlWebpackPlugin({
    template: 'src/index.html'
});

var cleanPlugin = new CleanWebpackPlugin(['build']);




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
                    use: [{
                            loader: 'css-loader' //  interprets @import and url() like import/require() and will resolve them.
                        },
                        {
                            loader: 'postcss-loader', // postcss loader so we can use autoprefixer
                            options: {
                                config: {
                                    path: 'postcss.config.js'
                                }
                            }
                        },
                        {
                            loader: 'sass-loader' // compiles Sass to CSS
                        }
                    ],
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
        htmlPlugin,
        cleanPlugin
    ]
};