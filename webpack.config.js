module.exports = {
    entry: './src/index.jsx',
    output: {
        publicPath: '/',
        path: __dirname + "/",
        filename: 'bundle.js'
    },
    devtool: 'source-map',
    module: {
        loaders: [{
            test: /\.(jsx|js)$/,
            loader: 'babel-loader',
            exclude: /node_modules/,
            query: {
                presets: ['es2015', 'react']
            }
        },
            {
                test: /\.css$/, // Only .css files
                loader: 'style!css' // Run both loaders
            },
            {
                test: /\.json$/,
                loader: 'json-loader'
            }]
    }
}