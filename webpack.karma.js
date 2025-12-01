const path = require('path');

module.exports = {
  mode: 'development',
  module: {
    rules: [
      { test: /\.(js|jsx)$/, exclude: /node_modules/, use: { loader: 'babel-loader' } },
      { test: /\.css$/i, use: ['style-loader', 'css-loader'] },
      { test: /\.(png|jpe?g|gif|svg)$/i, type: 'asset/resource' },
      { test: /\.(woff2?|ttf|eot)$/i, type: 'asset/inline' } // evita errores ENOENT con fuentes
    ]
  },
  resolve: { extensions: ['.js', '.jsx'] },
  output: { path: path.resolve(__dirname, 'dist'), filename: 'bundle.js' }
};