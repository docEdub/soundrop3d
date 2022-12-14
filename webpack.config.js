const CopyWebpackPlugin = require('copy-webpack-plugin');
const HtmlWebpackPlugin = require('html-webpack-plugin');
const path = require('path')

const externals = [
    {
        name: 'babylonjs',
        globalVarName: 'BABYLON',
        src: 'https://cdn.babylonjs.com/babylon.js',
    },
    {
        name: 'babylonjs-gui',
        globalVarName: 'BABYLON',
        src: 'https://cdn.babylonjs.com/gui/babylon.gui.min.js',
    },
    {
        name: 'babylonjs-loaders',
        globalVarName: 'BABYLON',
        src: 'https://cdn.babylonjs.com/loaders/babylonjs.loaders.min.js',
    }
]

module.exports = {
    devServer: {
        hot: false,
        static: './dist',
    },
    devtool: 'inline-source-map',
    entry: './src/app.js',
    externals: externals.reduce(
        (res, external) => ({
            ...res,
            [external.name]: external.globalVarName,
        }), {}
    ),
    output: {
        clean: true,
        filename: 'app.js',
        path: path.resolve(__dirname, 'dist'),
    },
    plugins: [
        new CopyWebpackPlugin({
            patterns: [
                { from: 'src/tone.wav' }
            ]
        }),
        new HtmlWebpackPlugin({
            externals: externals.reduce(
                (scripts, external) => (
                    `${scripts}<script src="${external.src}"></script>`
                ), ''
            ),
            template: path.resolve(__dirname, 'src', 'index.html'),
            title: 'soundrop3d',
        }),
    ],
    resolve: {
        fallback: {
            'fs': false,
            'path': false, // ammo.js seems to also use path
        }
    }
}
