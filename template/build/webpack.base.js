const path = require('path')
const page = require('../config')
const webpack = require('webpack')

page.entry = { app: './src/view/' + page.pageName + '/main.js' }
page.template = './src/view/' + page.pageName + '/template.html'

var postcss = [require('autoprefixer')({ browsers: page.browsers })]

process.env.BROWSERSLIST = page.browsers

module.exports = {
  entry: page.entry,
  output: {
    path: path.resolve(__dirname, '../dist/'+ page.pageName +'/static'),
    publicPath: page.absolutePath ? page.absolutePath + page.pageName + '/static/' : './static/',
    filename: '[name].js'
  },
  resolve: {
    extensions: ['', '.js', '.vue'],
    alias: {
      'src': path.resolve(__dirname, '../src')
    }
  },
  resolveLoader: {
    fallback: [path.join(__dirname, '../node_modules')]
  },
  module: {
    loaders: [
      {
        test: /\.vue$/,
        loader: 'vue'
      },
      {
        test: /\.js$/,
        loader: 'babel',
        exclude: /node_modules/
      },
      {
        test: /\.json$/,
        loader: 'json'
      },
      {
        test: /\.(png|jpg|gif|svg)$/,
        loader: 'url',
        query: {
          limit: 10000,
          name: '[name].[ext]?[hash:7]'
        }
      },
      // {
      //   test: /\.css$/,
      //   loaders: ['style', 'css', 'postcss']
      // }
    ]
  },
  postcss: postcss,
  vue: {
    loaders: {},
    postcss: postcss
  }
}
