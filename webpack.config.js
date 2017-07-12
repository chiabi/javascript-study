const webpack = require('webpack');
module.exports = {
    entry: {
        app: ['a.js', 'b.js'],
    },
    output: {
        path: '/dist',
        filename: '[name].js',
        publicPath: '/',
    },
    module: {
        rules: [{
        test: /\.jsx?$/,
        loader: 'babel-loader',
        options: {
            presets: [
                'env', {
                    targets: {node: 'current'}, // 노드일 경우만
                    modules: 'false'
                },
                'react',
                'stage-0'
                ],
            },
            exclude: ['/node_modules'],
        }],
    },
    plugins: [
        new webpack.LoaderOptionsPlugin({
            minimize: true,
        }),
        new webpack.optimize.ModuleConcatenationPlugin(),
        new webpack.optimize.UglifyJsPlugin({
            sourceMap: true,
            compress: {
                warnigs: true,
            },
        }),
        new webpack.DefinePlugin({
            // 아래 EnvironmentPlugin처럼 할 수도 있다.
            'process.env.NODE_ENV': JSON.stringify('production'), 
        }),
        // 요즘은 위의 DefinePlugin보다 이렇게 하는 추세이다.
        new webpack.EnvironmentPlugin(['NODE_ENV']),
    ],
    resolve: {
        modules: ['node_modules'],
        extensions: ['.js', '.json', '.jsx', '.css'],
    },
}