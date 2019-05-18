const webpack = require('webpack');
const CleanWebpackPlugin = require('clean-webpack-plugin');
const CopyWebpackPlugin = require('copy-webpack-plugin');
const UglifyJsPlugin = require('uglifyjs-webpack-plugin');
const merge = require('webpack-merge');
const { join } = require('path');
const { BundleAnalyzerPlugin } = require('webpack-bundle-analyzer');

const baseConfig = require('./webpack.config.base');

const optionalPlugins = [process.env.BUNDLE_ANALYZER === 'true' ? new BundleAnalyzerPlugin() : null];

module.exports = merge(baseConfig, {
    mode: 'production',
    plugins: [
        ...baseConfig.plugins,
        new webpack.ProgressPlugin(),
        new webpack.optimize.OccurrenceOrderPlugin(),
        new CleanWebpackPlugin(),
        new webpack.optimize.ModuleConcatenationPlugin(),
        new CopyWebpackPlugin([{
            from: join(__dirname, 'src/main/index.html'),
            to: join(__dirname, 'dist', 'index.html'),
        }]),
        ...optionalPlugins.filter(Boolean),
    ],
    optimization: {
        minimizer: [
            new UglifyJsPlugin({
                sourceMap: true,
                uglifyOptions: {
                    mangle: true,
                    compress: {
                        conditionals: true,
                        unused: true,
                        comparisons: true,
                        sequences: true,
                        dead_code: true,
                        evaluate: true,
                        if_return: true,
                        join_vars: true,
                    },
                    output: {
                        comments: false,
                    },
                },
            }),
        ],
    },
});
