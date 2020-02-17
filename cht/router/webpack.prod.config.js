var webpack = require('webpack');
var HtmlWebpackPlugin = require('html-webpack-plugin');
var ExtractTextPlugin = require('extract-text-webpack-plugin');
var merge = require('webpack-merge');
var webpackBaseConfig = require('./webpack.config.js');

// 清理基本組態的外掛清單
webpackBaseConfig.plugins = [];

module.exports = merge(webpackBaseConfig, {
    output: {
        publicPath: '/dist/',
        // 將入口檔案更名為帶有 20 位 hash 值的唯一檔案
        filename: '[name].[hash].js'
    },
    plugins: [
        new ExtractTextPlugin({
            // 分析 css，並更名為帶有 20 位 hash 值的唯一檔案
            filename: '[name].[hash].css',
            allChunks: true
        }),
        // 定義目前 node 環境為生產環境
        new webpack.DefinePlugin({
            'process.env': {
                NODE_ENV: '"production"'
            }
        }),
        // 壓縮 js
        new webpack.optimize.UglifyJsPlugin({
            compress: {
                warnings: false
            }
        }),
        // 分析範本，並儲存入口 html 檔案
        new HtmlWebpackPlugin({
            filename: '../index_prod.html',
            template: './index.ejs',
            inject: false
        })
    ]
});