const path = require("path");
const nodeExt = require("webpack-node-externals");

module.exports = {
    entry: {
        main: './src/index.ts'
    },
    mode: 'development',
    target: 'node',
    module: {
        rules: [
            {
                test: /\.tsx?$/,
                use: 'ts-loader',
                exclude: /node_modules/
            }
        ],
    },
    resolve: {
        extensions: ['.ts', '.js']
    },
    output: {
        path: path.resolve(__dirname, 'build'),
        filename: '[name].js',
    },
    externals: [nodeExt()],
};