const path= require('path');

module.exports={
    mode: 'development',
    entry: './src/app.js',
    output: {
        path: path.resolve(__dirname,'dist'),
        filename: 'bundle.js'
    },

    module: {
        rules: [
            {
                loader: 'babel-loader',
                test: /\.js$/,
                exclude: /node_modules/
            },
            {
                test: /\.scss$/,
                use: [
                    'style-loader',
                    'css-loader',
                    'sass-loader'
                ]
            }
        ]
    },

    devtool: 'cheap-module-eval-source-map',
    devServer: {
        contentBase: './dist',
        historyApiFallback: true
    }
}