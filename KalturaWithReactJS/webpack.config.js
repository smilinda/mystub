var config = {
	entry: './App.jsx',

	output: {
		path: './',
		filename: 'app.js'
	},

	devServer: {
		inline: true,
		port: 8181
	},

	module: {
		loaders: [{
			test: /\.jsx?$/,
			exclude: /node_modules/,
			loader: 'babel',

			query: {
				presets: ['es2015', 'react']
			}
		}]
	}
}
module.exports = config;