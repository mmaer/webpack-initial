const SpriteLoaderPlugin = require('svg-sprite-loader/plugin');
const ExtractTextPlugin = require('extract-text-webpack-plugin');
const webpack = require('webpack');
const { resolve } = require('path');
const HtmlWebpackPlugin = require('html-webpack-plugin');

module.exports = {
    entry: {
        app: [
            './src/main/index',
        ],
    },
    output: {
        path: resolve(__dirname, 'dist'),
        filename: '[name].js',
    },
    plugins: [
        new webpack.DefinePlugin({
            'window.DEV_TOOLS_ENABLED': JSON.stringify(true),
            'process.env': {
                NODE_ENV: JSON.stringify('develop'),
            },
        }),
        new SpriteLoaderPlugin(),
        new HtmlWebpackPlugin({
            template: './src/main/index.html',
        }),
    ],
    module: {
        rules: [{
            test: /\.js$/,
            loader: 'babel-loader',
            include: resolve(__dirname),
            exclude: /node_modules/,
        }, {
            test: /\.*css$/,
            exclude: /node_modules/,
            use: [
                'css-hot-loader',
                'style-loader',
                'css-loader',
                'sass-loader',
            ],
        }, {
            test: /\.svg$/,
            use: [{
                loader: 'svg-sprite-loader',
                options: {
                    extract: true,
                },
            }, {
                loader: 'svgo-loader',
                options: {
                    plugins: [
                        { removeTitle: true },
                        { convertColors: { shorthex: false } },
                        { convertPathData: false },
                    ],
                },
            }],
        }, {
            test: /\.icons\.(js|json)$/,
            use: ExtractTextPlugin.extract({
                fallback: 'style-loader',
                use: ['css-loader', 'postcss-loader', 'sass-loader', 'webfonts-loader'],
            }),
        }, {
            test: /\.(png|jpg|eot|woff|woff2|ttf)$/,
            use: 'file-loader?',
        }, {
            test: /\.(txt)$/,
            use: 'raw-loader',
        }, {
            test: /\.html$/,
            use: 'raw-loader',
        }],
    },
    resolve: {
        extensions: ['.js', '.jsx', '.css', '.scss', '.json'],
    },
};
