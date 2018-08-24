const webpack = require('../webpack.config')
const fs = require('fs')
const path = require('path')
const https = require('https')

module.exports = {
    ...webpack,
    output: {
        publicPath: "https://localhost:9001/",
        path: path.join(__dirname, '../dist'),
        filename: '[name].bundle.js',
        chunkFilename: '[name].bundle.js',
    },
    devtool: "source-map",
    devServer: {
        compress: true,
        port: 9001,
        https: true,
        headers: {
            'Access-Control-Allow-Origin': '*'
        }
    }
}