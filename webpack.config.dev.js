const webpack = require('webpack');
const merge = require('webpack-merge');
const DuplicatePackageCheckerPlugin = require('duplicate-package-checker-webpack-plugin');

const baseConfig = require('./webpack.config.base');

module.exports = merge(baseConfig, {
    devtool: 'source-map',
    mode: 'development',
    devServer: {
        port: 8000,
        disableHostCheck: true,
        headers: {
            'Access-Control-Allow-Origin': '*',
        },
    },
    plugins: [
        ...baseConfig.plugins,
        new webpack.NoEmitOnErrorsPlugin(),
        new webpack.NamedModulesPlugin(),
        new DuplicatePackageCheckerPlugin(),
    ],
});
