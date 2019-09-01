const path = require('path');
const HtmlWebpackPlugin = require('html-webpack-plugin');

module.exports = {
  entry: path.join(__dirname, '/src/index.tsx'),
  output: {
    filename: 'bundle.js',
    path: path.join(__dirname, '/dist'),
  },
  plugins: [
    new HtmlWebpackPlugin({
      filename: 'index.html',
      template: path.join(__dirname, '/src/index.html'),
      inject: true,
    }),
  ],
  module: {
    rules: [
      {
        test: /\.(j|t)sx?$/,
        // include: [resolve('../demo')],
        // use: ['babel-loader', 'ts-loader'],
        loader: 'babel-loader!ts-loader',
        exclude: /node_modules/,
      },
      {
        test: /\.(css|less)$/,
        use: [
          'style-loader',
          'css-loader',
          // 'postcss-loader',
          {
            loader: 'postcss-loader',
            options: {
              ident: 'postcss',
              plugins: () => [require('autoprefixer')()],
            },
          },
          {
            loader: 'less-loader',
            options: {
              javascriptEnabled: true,
            },
          },
        ],
      },
    ],
  },
  resolve: {
    extensions: ['.ts', '.tsx', '.js', 'jsx'],
  },
  devServer: {
    port: 5001,
    historyApiFallback: true,
    inline: true,
    hot: true,
  },
  devtool: 'source-map',
};
