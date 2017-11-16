var path = require('path');
var webpack = require('webpack');

var isProdBuild = process.argv.indexOf('-p') !== -1;

var envPlugin = new webpack.DefinePlugin({
  __DEBUG__: JSON.stringify(!isProdBuild),
  __RELEASE__: JSON.stringify(isProdBuild),
  'process.env.NODE_ENV': isProdBuild ? '"production"' : '"development"'
});

module.exports = {
  entry: {
    app: './src/index.js',
  },
  output: {
    filename: '[name].js',
    path: path.join(__dirname, 'app/assets'),
    publicPath: 'http://localhost:8080/assets' // Required for webpack-dev-server
  },
  resolve: {
    root: [
      __dirname
    ],
    extensions: ['', '.js', '.jsx', '.raw.less', '.sass']
  },
  node: {
    fs: "empty"
  },
  module: {
    loaders: [
      { test: /\.jsx?$/, loader: 'babel', exclude: /node_modules/ },
      { test: /\.raw\.less$/, loader: 'raw!less'},
      { test: /.sass$/, loader: 'style!css!sass'},
    ],
  },
  plugins: [envPlugin],
  devServer: {
    proxy: {
      '/*/$': {
        target: 'http://localhost:8888/index.html',
        ignorePath: true
      }
    }
  }
};
