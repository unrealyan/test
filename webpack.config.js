const path = require('path');
const webpack = require('webpack');
const HtmlWebpackPlugin = require('html-webpack-plugin');
const ExtractTextPlugin = require("extract-text-webpack-plugin");

module.exports = {
    entry: {
        main: ["babel-polyfill",'./src/index.jsx']
    },
    output: {
        path: path.resolve(__dirname, './target'),
        publicPath: "/",
        filename: '[name].[chunkhash].js'
    },
    devtool: 'source-map',
    resolve: {
        extensions: ['.js', '.jsx','css','less'],
    },
    module: {
        rules:[
            {
                test: /\.(js|jsx)$/,
                exclude: /node_modules/,
                use: [
                    {
                        loader: 'babel-loader',
                        query: {
                            presets: ['es2015', 'env', 'react','stage-0'],
                            plugins: ['transform-runtime',["import", {
                                "libraryName": "antd-mobile"
                            }
                            ]],
                            cacheDirectory: true
                        }
                    }
                ]
            },
            {
                test: /\.css$/,
                exclude: /node_modules/,
                use: ExtractTextPlugin.extract({
                    fallback: "style-loader",
                    use: ['css-loader']
                }),
            },
            {
                test: /\.less$/,
                exclude: /node_modules/,
                use: ExtractTextPlugin.extract({
                    fallback: "style-loader",
                    use: ['css-loader','postcss-loader', 'less-loader']
                })
            },
            {
                test: /\.(png|jpg|jpeg|gif)(\?[\s\S]+)?$/,
                exclude: /node_modules/,
                use: [
                    {
                        loader: 'file-loader',
                        options: {
                            name: '[name].[ext]',
                            publicPath: '/assets/',
                            outputPath: 'assets/'
                        },
                    }
                ]
            },
            {
                test: /\.(eot|woff|woff2|ttf|svg)(\?[\s\S]+)?$/,
                loader: 'url-loader',
                options: {
                    limit: 100,
                    name: '[name].[ext]',
                    publicPath: '/fonts/',
                    outputPath: 'fonts/'
                },
                exclude: /node_modules/,
            },
        ]
    },
    plugins: [
        new ExtractTextPlugin({ filename: 'css/[name].[chunkhash].css', disable: false, allChunks: true }),
        new HtmlWebpackPlugin({
            minify: false,
            // hash: prod,
            template: './index.html',
            chunks:['main'],
            filename: 'index.html'
        })
    ],
};
