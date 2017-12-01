const NODE_ENV = require('./build_helpers/nodeEnv')
const log = require('gutil-color-log')
log('blue', NODE_ENV)

const config = require('./build_helpers/config')

const buildFolder = config.paths.dist

const pkg = require('./package.json')
const version = pkg.version
const banner = pkg.name + ' v' + version

const HTMLCompressionPlugin = require('html-compression-webpack-plugin')
const Webpack = require('webpack')
const CleanWebpackPlugin = require('clean-webpack-plugin')
const ExtractTextPlugin = require('extract-text-webpack-plugin')
const HtmlWebpackPlugin = require('html-webpack-plugin')
const CopyWebpackPlugin = require('copy-webpack-plugin')
const WriteFileWebpackPlugin = require('write-file-webpack-plugin')
const UnminifiedWebpackPlugin = require('unminified-webpack-plugin')

const path = require('path')

const isDevMode = NODE_ENV === 'development'
const isProdMode = NODE_ENV === 'production'

const extractCSS = new ExtractTextPlugin({
  filename: '[name].min.css',
  allChunks: true
})

const setLocalhost = require('./build_helpers/setLocalhost')
setLocalhost()

module.exports = {
  context: path.resolve(__dirname, 'src'),
  entry: {
    'typoquotes/typoquotes': './typoquotes/index.js',
    'typoquotesmce/plugin': './tinymce/index.js', // tinymce plugin
    'libtest/libtest': './libtest/libtest.js', // vanilla js
    'test/test': './test/test.js'
  },
  output: {
    path: path.resolve(__dirname, buildFolder),
    filename: '[name].min.js'
  },
  resolve: {
    modules: [path.resolve(__dirname, 'src'), 'node_modules', 'bower_components']
  },
  module: {
    loaders: [
      {
        test: /\.js$/,
        exclude: /node_modules(?!\/webpack-dev-server)/,
        use: [
          {
            loader: 'babel-loader',
            options: {
              cacheDirectory: true
            }
          },
          {
            loader: 'string-replace-loader',
            query: {
              search: 'appVersionControlFlag',
              replace: `${version}`,
              flags: 'g'
            }
          }
        ]
      },
      {
        test: /prettydiff/,
        loader: 'script-loader'
      },
      {
        test: /\.(pug|jade)$/,
        use: [
          {
            loader: 'pug-loader'
          },
          {
            loader: 'string-replace-loader',
            query: {
              search: 'appVersionControlFlag',
              replace: `${version}`,
              flags: 'g'
            }
          }
        ]
      },
      {
        test: /\.(scss|css)$/,
        loader: extractCSS.extract({
          use: [
            {
              loader: 'css-loader',
              options: {
                sourceMap: true,
                minimize: isProdMode
              }
            },
            {
              loader: 'autoprefixer-loader'
            },
            {
              loader: 'postcss-loader',
              options: {sourceMap: true}
            },
            {
              loader: 'sass-loader',
              options: {
                sourceMap: true
              }
            }
          ]
        })
      },
      {
        test: /\.(png|jpg|jpeg|gif|ico|svg|ttf|woff|eot|woff2)$/,
        loader: 'file-loader',
        options: {
          name: '[path][name].[ext]',
          publicPath: '/'
        }
      }
    ]
  },
  plugins: [
    new Webpack.NoEmitOnErrorsPlugin(),
    new CleanWebpackPlugin(['dist']),
    extractCSS,
    new Webpack.BannerPlugin(`${banner}`),
    new Webpack.optimize.CommonsChunkPlugin({
      name: 'common',
      minChunks: 2,
      async: true
    }),
    new HtmlWebpackPlugin({
      template: 'libtest/index.pug',
      filename: 'libtest/index.html',
      inject: false,
      minify: {
        removeAttributeQuotes: false,
        collapseWhitespace: true,
        html5: true,
        minifyCSS: true,
        removeComments: true,
        removeEmptyAttributes: false
      },
      NODE_ENV: NODE_ENV
    }),
    new HtmlWebpackPlugin({
      template: 'test/index.pug',
      filename: 'test/index.html',
      inject: false,
      minify: {
        removeAttributeQuotes: false,
        collapseWhitespace: true,
        html5: true,
        minifyCSS: true,
        removeComments: true,
        removeEmptyAttributes: false
      },
      NODE_ENV: NODE_ENV
    }),
    new CopyWebpackPlugin([
      {
        from: path.resolve(__dirname, 'src/tinymce/index.js'),
        to: path.resolve(__dirname, buildFolder + '/typoquotesmce/index.js')
      },
      {
        from: path.resolve(__dirname, 'src/assets'),
        to: path.resolve(__dirname, buildFolder + '/assets')
      }
    ]),
    new Webpack.NoEmitOnErrorsPlugin(),
    new WriteFileWebpackPlugin(),
    new UnminifiedWebpackPlugin(),
    new Webpack.ContextReplacementPlugin(/node_modules\/moment\/locale/, /ru|en/),
    new Webpack.DefinePlugin({
      'process.env.NODE_ENV': JSON.stringify(NODE_ENV)
    })
  ],

  // support source maps
  devtool: isDevMode ? 'source-map' : 'false',
  watch: isDevMode,
  watchOptions: {
    aggregateTimeout: 100
  }
}

if (isDevMode) {
  module.exports.devServer = {
    host: config.server.localhost,
    contentBase: path.join(__dirname, buildFolder),
    port: config.server.port,
    historyApiFallback: {
      index: '/test'
    },
    noInfo: false,
    stats: {
      color: true
    }
  }
}
if (isProdMode) {
  module.exports.plugins.push(
    new Webpack.optimize.UglifyJsPlugin({
      include: /\.min\.js$/,
      compress: {
        drop_console: true,
        drop_debugger: true,
        unsafe: true
      },
      sourceMap: isDevMode
    })
  )
  module.exports.plugins.push(
    new HTMLCompressionPlugin()
  )
}
