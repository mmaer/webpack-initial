module.exports = () => ({
    presets: [
        [
            // eslint-disable-next-line global-require
            require('@babel/preset-env'),
            {
                modules: process.env.RUN_MODE === 'es' ? false : 'commonjs',
            },
        ],
    ],
});
