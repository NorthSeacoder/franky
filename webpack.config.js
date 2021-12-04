const path = require('path');

module.exports = {
    entry: './src/index.js',
    target: 'node',
    output: {
        filename: 'index.js',
        libraryTarget: 'commonjs2',
        path: path.resolve(__dirname, 'dist'),
        chunkFilename: 'feature-[name].js'
    },
    externals: {
        vscode: 'commonjs vscode'
    },
    resolve: {
        alias: {
            '@common': path.resolve(__dirname, 'src/common/'),
            '@extentions': path.resolve(__dirname, 'src/extentions/'),
            '@': path.resolve(__dirname, 'src/')
        }
    }
};
