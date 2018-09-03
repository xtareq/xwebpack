
const path = require('path')
const CleanWebpackPlugin = require('clean-webpack-plugin');
const UglifyJsPlugin = require("uglifyjs-webpack-plugin");
const OptimizeCSSAssetsPlugin = require("optimize-css-assets-webpack-plugin");
const HtmlWebpackPlugin = require('html-webpack-plugin');
const devMode = process.env.NODE_ENV !== 'production'
const MiniCssExtractPlugin = require("mini-css-extract-plugin");
// the path(s) that should be cleaned
let pathsToClean = [
    'dist',
    'build'
  ]
   
  // the clean options to use
  let cleanOptions = {
    root:     '/dist',
    exclude:  ['shared.js'],
    verbose:  true,
    dry:      false
  }


module.exports = {
    entry:"./src/main.js",
    output:{
        path:path.resolve(__dirname,"dist"),
        filename: '[name].bundle.js'
    },
    devServer:{
        contentBase:path.join(__dirname , "dist")
       
    },
    optimization: {
      splitChunks: {
        chunks: 'all',     
        cacheGroups: {
        styles: {
          name: 'styles',
          test: /\.s?css$/,
          chunks: 'all',
          minChunks: 1,
          reuseExistingChunk: true,
          enforce: true,
        },
      },

      },
   
      },
      plugins:[
        new CleanWebpackPlugin(pathsToClean, cleanOptions),
        new HtmlWebpackPlugin({
            template:path.join(__dirname,"src/index.html"),
        }),
        new MiniCssExtractPlugin({
            // Options similar to the same options in webpackOptions.output
            // both options are optional
            filename: devMode ? '[name].css' : '[name].[hash].css',
            chunkFilename: devMode ? '[id].css' : '[id].[hash].css',
          })
    ],
    module:{
        rules:[
            {
                test:/\.js$/,
                use:{
                   loader:'babel-loader',
                   options:{
                    presets: ['@babel/preset-env']

                   }
                }
            },
            {
                test: /\.(sa|sc|c)ss$/,
                use: [
                  devMode ? 'style-loader' : MiniCssExtractPlugin.loader,
                  'css-loader',
                  'sass-loader',
                  'resolve-url-loader',
                'sass-loader?sourceMap'
                ],
              }
        ],
/*         loaders: [
            {
              test   : /\.css$/,
              loaders: ['style-loader', 'css-loader', 'resolve-url-loader']
            }, {
              test   : /\.scss$/,
              loaders: ['style-loader', 'css-loader', 'resolve-url-loader', 'sass-loader?sourceMap']
            }
          ] */
    },

}