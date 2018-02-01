const webpack = require('webpack');
const Uglify = require('uglifyjs-webpack-plugin');
const path = require('path');

const plugins = [];
let devtool;
let envType = process.env.NODE_ENV;

if(envType == 'production') {
	console.log('Webpack building for ' + envType);
	devtool = 'source-map';

	const nodeEnvPlugin = new webpack.DefinePlugin({
		'process.env': {'NODE_ENV': JSON.stringify('production')}
	});

	plugins.push(nodeEnvPlugin);
	plugins.push(new Uglify());
}
else {
	console.log('Webpack building for development');
	devtool = 'eval-source-map';
}



const webpackConfig = {
	context: __dirname,
	entry: './src/js/app.jsx',
	devtool: devtool,
	output: {
		path: path.join(__dirname, 'public/js'),
		filename: 'bundle.js'
	},

	resolve: {
		extensions: ['.js','.json','.jsx']
	},

	stats: {
		colors:true,
		reasons: true,
		chunks: true
	},

	plugins:plugins,

	module: {
		rules: [
			{
				enforce: 'pre',
				test: /\.jsx?$/,
				loader: 'eslint-loader',
				exclude: '/node_modules'
			},
			{
				test: /\.jsx?$/,
				loader: 'babel-loader',
				exclude:'/node_modules'
			}
		]
	}
}





module.exports = webpackConfig;
