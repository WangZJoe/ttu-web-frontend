const resolve = require('path').resolve
const webpack = require('webpack')
const HtmlWebpackPlugin = require('html-webpack-plugin')
const url = require('url')
const path = require('path')
const publicPath = ''
console.log(process.env.NODE_ENV);
module.exports = (options = {}) => ({
    entry: {
        vendor: './src/vendor',
        index: './src/main.js',
        login: './src/main.login.js'
    },
    output: {
        path: resolve(__dirname, 'dist'),
        filename: options.dev ? 'static/[name].js' : 'static/[name].js?[chunkhash]',
        chunkFilename: 'static/[id].js?[chunkhash]',
        publicPath: options.dev ? '/assets/' : publicPath
    },
    module: {
        rules: [{
            test: /\.vue$/,
            use: ['vue-loader']
        },
        {
            test: /\.js$/,
            use: ['babel-loader'],
            exclude: /node_modules/
        },
        {
            test: /\.(scss|css)$/,
            use: [{
                loader: "style-loader" // 将 JS 字符串生成为 style 节点
            }, {
                loader: "css-loader" // 将 CSS 转化成 CommonJS 模块
            }, {
                loader: "sass-loader" // 将 Sass 编译成 CSS
            }, {
                loader: 'postcss-loader'
            }]
        },
        {
            test: /\.(eot|svg|ttf|woff|woff2)(\?\S*)?$/,
            loader: 'file-loader'
        },
        {
            test: /\.(png|jpg|jpe`g|gif|eot|woff|woff2|svg|svgz)(\?.+)?$/,
            use: [{
                loader: 'url-loader',
                options: {
                    esModule: false,
                    limit: 2,
                    name: 'font/[name].[hash:7].[ext]',
                }
            }]
        }
        ]
    },
    plugins: [
        new webpack.optimize.CommonsChunkPlugin({
            names: ['vendor', 'manifest']
        }),
        new HtmlWebpackPlugin({
            filename: 'index.html',
            template: './public/index.html',
            favicon: path.resolve('./public/favicon.ico')
        }),
        new HtmlWebpackPlugin({
            filename: 'login.html',
            template: './public/login.html',
            favicon: path.resolve('./public/favicon.ico')
        }),
        new webpack.DefinePlugin({
            IS_DEV: JSON.stringify(true),
            curMode: JSON.stringify(process.env.NODE_ENV)
        })
    ],
    resolve: {
        alias: {
            '~': resolve(__dirname, 'src'),
            'src': resolve(__dirname, 'src')
        },
        extensions: ['.js', '.vue', '.json', '.css', '.scss']
    },
    devServer: {
        host: '127.0.0.1',
        port: 8080,
        proxy: {
            '/api/': {
                target: 'http://127.0.0.1:8002',
                // changeOrigin: true,
                // pathRewrite: {
                //   '^/api': ''
                // }
            }
        },
        historyApiFallback: {
            index: url.parse(options.dev ? '/assets/' : publicPath).pathname
        }
    },
    //source-map启动影响初始化速度
    // devtool: options.dev ? '#eval-source-map' : '#source-map'
})
