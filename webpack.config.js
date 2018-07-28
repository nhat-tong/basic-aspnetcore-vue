const path = require('path');
const webpack = require('webpack');
const ExtractTextPlugin = require('extract-text-webpack-plugin');
const bundleOutputDir = './wwwroot/dist';

module.exports = (env) => {

    const isDevBuild = !(env && env.prod);
    console.log('Build environment: ' + (isDevBuild ? 'development' : 'production'));

    return {
        entry: {
            app: './ClientApp/main.ts'
        },
        output: {
            path: path.join(__dirname, bundleOutputDir),
            publicPath: '/dist/',
            filename: '[name].js'
        },
        module: {
            rules: [
                {
                    test: /\.ts$/,
                    loader: 'ts-loader',
                    options: {
                        appendTsSuffixTo: [/\.vue$/]
                    },
                    exclude: /node_modules/
                },
                {
                    test: /\.vue$/,
                    loader: 'vue-loader',
                },
                {
                    test: /\.css$/,
                    use: ExtractTextPlugin.extract({
                        use: ['css-loader', 'sass-loader'],
                        fallback: 'style-loader'
                    })
                },
                {
                    test: /\.(png|jpg|gif|svg|ttf|woff|woff2|eot|ico)$/,
                    loader: 'file-loader',
                    options: {
                        name: '[name].[ext]?[hash]'
                    }
                }
            ]
        },
        resolve: {
            extensions: ['.js', '.ts', '.vue'],
            alias: {
                'vue': 'vue/dist/vue.common.js'
            }
        },
        devServer: {
            historyApiFallback: true,
            noInfo: true,
            overlay: true
        },
        plugins: [
            new webpack.ProvidePlugin({ $: 'jquery', jQuery: 'jquery' }), // Maps these identifiers to the jQuery package (because Bootstrap expects it to be a global variable)
            new webpack.DefinePlugin({ // TODO
                'process.env': {
                    NODE_ENV: JSON.stringify(isDevBuild ? '"development"' : '"production"')
                }
            }),
            new webpack.optimize.CommonsChunkPlugin({
                name: 'common',
                minChunks: 2
            }),
            new ExtractTextPlugin({
                allChunks: true,
                disable: isDevBuild,
                filename: "[name].css",
            }),
        ].concat(isDevBuild ? [
            new webpack.SourceMapDevToolPlugin({
                filename: '[file].map', // Remove this line if you prefer inline source maps
                moduleFilenameTemplate: path.relative(bundleOutputDir, '[resourcePath]') // Point sourcemap entries to the original file locations on disk
            })
        ] : [
            new webpack.optimize.UglifyJsPlugin({
                sourceMap: true,
                compress: {
                    warnings: false
                }
            }),
            new webpack.LoaderOptionsPlugin({
                minimize: true
            })
        ])
    }
};