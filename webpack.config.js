const Webpack = require('webpack');

// Webpack Plugins
const HtmlWebpackPlugin = require('html-webpack-plugin');
const Clean = require('clean-webpack-plugin');
// const ExtractTextPlugin = require('extract-text-webpack-plugin');
const PostcssImport = require('postcss-import');
const PostcssNext = require('postcss-cssnext');
const DashboardPlugin = require('webpack-dashboard/plugin');
const path = require('path');
const vendorDeps = require('./package').dependencies;

const BASE_PATH = __dirname;
const PROXY_TARGET = 'http://localhost:7001';

// const IS_DEBUG = process.env.NODE_ENV !== 'production';

const postcssOptions = {
  plugins: () => [
    PostcssImport,
    /* eslint new-cap: 0*/
    PostcssNext({
      browsers: ['last 2 versions', '> 5%'],
    }),
  ],
};

const webpackConfig = {
  name: 'front-ui',
  target: 'web',
  context: BASE_PATH,
  entry: {
    app: [
      'webpack-dev-server/client',
      'webpack/hot/only-dev-server',
      './src',
    ],
    vendor: Object.keys(vendorDeps),
  },
  output: {
    path: path.join(BASE_PATH, 'build'),
    publicPath: '/',
    filename: '[name].js',
    sourceMapFilename: '[name].map.js',
  },
  resolve: {
    modules: [
      'node_modules',
    ],
    alias: {
      styles: path.resolve(__dirname, './src/styles'),
      components: path.resolve(__dirname, './src/components'),
    },
    extensions: ['.js', 'json', '.css'],
  },
  module: {
    rules: [
      {
        test: /\.jsx?$/,
        exclude: /node_modules/,
        use: [
          'react-hot-loader',
          'babel-loader',
        ],
        include: path.join(__dirname, 'src'),
      },
      {
        test: /\.css$/,
        use: [
          'style-loader',
          {
            loader: 'css-loader',
            options: {
              importLoaders: 1,
              modules: true,
              localIdentName: '[local]',
            },
          },
          {
            loader: 'postcss-loader',
            options: postcssOptions,
          },
        ],
      },
    ],
  },
  plugins: [
    new DashboardPlugin(),
    new Webpack.HotModuleReplacementPlugin(),
    // new Webpack.NoEmitOnErrorsPlugin(),
    new HtmlWebpackPlugin({
      template: './src/template.html',
      filename: 'index.html',
      title: 'Hellocuent',
      hash: false,
      inject: 'body',
    }),
    new Webpack.optimize.CommonsChunkPlugin({
      name: 'vendor',
      minChunks(module) {
        // this assumes your vendor imports exist in the node_modules directory
        return module.context && module.context.indexOf('node_modules') !== -1;
      },
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
      version: false,
    },
    proxy: {
      '/api/*': {
        target: PROXY_TARGET,
        secure: false,
      },
      '/static/*': {
        target: PROXY_TARGET,
        secure: false,
        bypass: function bypass(req, res/* , proxyOptions*/) {
          if (/^\/public\/static\/[A-Za-z0-9-]+\.css/.test(req.url)) {
            res.writeHead(200, { 'Content-Type': 'text/css' });
            res.write('// This is a fake CSS content... :)');
            res.end();
            return true;
          }
          return false;
        },
      },
      '/images/*': {
        target: PROXY_TARGET,
        secure: false,
      },
    },
  },
};

module.exports = webpackConfig;
