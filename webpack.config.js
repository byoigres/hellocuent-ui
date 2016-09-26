var Webpack = require('webpack');
var HtmlWebpackPlugin = require('html-webpack-plugin');
var Clean = require('clean-webpack-plugin');
var ExtractTextPlugin = require('extract-text-webpack-plugin');
var DashboardPlugin = require('webpack-dashboard/plugin');
var path = require('path');

var BASE_PATH = __dirname;
var PROXY_TARGET = 'http://localhost:7001';

var webpackConfig = {
  name: 'front-ui',
  target: 'web',
  context: BASE_PATH,
  entry: {
    app: [
      'webpack-dev-server/client',
      'webpack/hot/only-dev-server',
      './src'
    ],
    vendor: [
      'react',
      'react-dom',
      'react-hot-loader',
      'redux',
      'react-redux',
      'react-router',
      'react-router-redux'
    ]
  },
  output: {
    path: path.join(BASE_PATH, 'build'),
    publicPath: '/',
    filename: '[name].js',
    sourceMapFilename: '[name].map.js'
  },
  resolve: {
    modulesDirectories: ['src', 'node_modules'],
    extensions: ['', '.js', 'json', '.jsx', '.scss', 'css'],
    alias: {
      'flexboxgrid': 'flexboxgrid/dist/flexboxgrid.css'
    }
  },
  module: {
    loaders: [
      {
        test: /\.jsx?$/,
        exclude: /node_modules/,
        loaders: ['react-hot', 'babel'],
        include: path.join(__dirname, 'src')
      },
      {
        test: /\.(css|scss)$/,
        //loaders: ['style', 'css?sourceMap&modules&localIdentName=[name]__[local]___[hash:base64:5]', 'sass']
        loaders: ['style', 'css?sourceMap&modules&localIdentName=[local]', 'sass']
      }
    ]
  },

  plugins: [
    new DashboardPlugin(),
    new Webpack.optimize.OccurenceOrderPlugin(),
    new Webpack.HotModuleReplacementPlugin(),
    new Webpack.NoErrorsPlugin(),
    new HtmlWebpackPlugin({
      template: './src/template.html',
      filename: 'index.html',
      title: 'Hellocuent',
      hash: false,
      inject: 'body'
    }),
    new Webpack.optimize.CommonsChunkPlugin({
      name: 'vendor',
      minChunks: Infinity
    }),
    new Clean([path.join(BASE_PATH, 'build')]),
    // new ExtractTextPlugin('[name].[hash].css'),
  ],
  devtool: 'eval',

  devServer: {
    contentBase: './src',
    historyApiFallback: true,
    host: 'localhost',
    hot: true,
    port: 3888,
    publicPath: '/',
    stats: {
      cached: true,
      cachedAssets: true,
      chunks: true,
      chunkModules: false,
      colors: true,
      hash: false,
      reasons: true,
      timings: true,
      version: false
    },
    proxy: {
      '/api/*': {
        target: PROXY_TARGET,
        secure: false,
      },
      '/static/*': {
        target: PROXY_TARGET,
        secure: false,
        bypass: function(req, res, proxyOptions) {
          if (/^\/public\/static\/[A-Za-z0-9\-]+\.css/.test(req.url)) {
            res.writeHead(200, { 'Content-Type': 'text/css' });
            res.write('// This is a fake CSS content... :)');
            res.end();
            return true;
          }
        },
      },
      '/images/*': {
        target: PROXY_TARGET,
        secure: false
      },
    }
  }

}
module.exports = webpackConfig;
