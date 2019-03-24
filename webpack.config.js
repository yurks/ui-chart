const path = require('path');
const webpack = require('webpack');
const HtmlWebpackPlugin = require('html-webpack-plugin');
const MiniCssExtractPlugin = require("mini-css-extract-plugin");
const CopyWebpackPlugin = require('copy-webpack-plugin')
const OptimizeCSSAssetsPlugin = require('optimize-css-assets-webpack-plugin')
const autoprefixer = require('autoprefixer');

const PrettyBanner = require('pretty-banner')
const pkg = require('./package.json');

const isDevelopment = process.env.NODE_ENV !== 'production';

const plugins = [
  /** Since Webpack 4 */
  new webpack.LoaderOptionsPlugin({
    options: {
      handlebarsLoader: {}
    }
  }),
  new MiniCssExtractPlugin({
    filename: "[name].css",
    chunkFilename: "[id].css"
  }),
  new webpack.BannerPlugin({
    banner: PrettyBanner.code(pkg, !isDevelopment),
    raw: true,
    entryOnly: true
  })
];

if (isDevelopment) {
  plugins.push(
    new HtmlWebpackPlugin({
      title: 'My awesome service',
      template: './dev/index.html',
      minify: !isDevelopment && {
        html5: true,
        collapseWhitespace: true,
        caseSensitive: true,
        removeComments: true,
        removeEmptyElements: true
      },
    })
  )
}


module.exports = {
  entry: {
    'ui-chart': isDevelopment ? './dev/index.js' : './src/app.js',
} ,
  output: {
    path: path.resolve(__dirname, './dist'),
    libraryTarget: 'umd',
  },
  devtool: isDevelopment && "source-map",
  devServer: {
    port: 3000,
    open: true,
    contentBase: path.join(__dirname, "../src"),
  },
  module: {
    rules: [
      {
        test: /\.(js)$/,
        exclude: /node_modules/,
        use: ['babel-loader']
      },
      {
        test: /\.(scss|css)$/,
        use: [
          MiniCssExtractPlugin.loader,
          {
            loader: "css-loader",
            options: {
              sourceMap: false
            }
          },
          {
            loader: "postcss-loader",
            options: {
              autoprefixer: {
                browsers: ["last 2 versions"]
              },
              sourceMap: false,
              plugins: () => [
                autoprefixer
              ]
            },
          },
          {
            loader: "sass-loader",
            options: {
              sourceMap: false
            }
          }
        ]
      },
      {
        test: /\.(jpg|png|gif)$/,
        use: [
          {
            loader: "file-loader",
            options: {
              name: '[name].[ext]',
              outputPath: 'static/',
              useRelativePath: true,
            }
          },
          {
            loader: 'image-webpack-loader',
            options: {
              mozjpeg: {
                progressive: true,
                quality: 65
              },
              optipng: {
                enabled: true,
              },
              pngquant: {
                quality: '65-90',
                speed: 4
              },
              gifsicle: {
                interlaced: false,
              },
              webp: {
                quality: 75
              }
            }
          }
        ]
      }
    ]
  },
/*
  optimization: {
    minimizer: [
      new OptimizeCSSAssetsPlugin({
        cssProcessorPluginOptions: {
          preset: ['default', { discardComments: { removeAll: true } }],
        }
      })
    ],
  },
*/
  plugins: plugins
};
