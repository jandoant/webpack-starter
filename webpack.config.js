var path = require('path');


module.exports = {
    entry: "./src/js/app.js",
    output: {
        path: path.resolve(__dirname, 'build'),
        filename: 'bundle.js',
        publicPath: './dist'
    }
};