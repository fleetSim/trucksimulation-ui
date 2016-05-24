var path = require("path");
var webpack = require("webpack");
var HtmlWebpackPlugin = require('html-webpack-plugin');

// start webpack in production mode by inlining the node env: `NODE_ENV=production webpack -p` (linux) or set NODE_ENV=production&&webpack -p (windows)
var isProd = process.env.NODE_ENV == "production";
console.log(isProd ? "PRODUCTION BUILD" : "DEVELOPMENT BUILD");

var commonEntry = [ 'font-awesome-webpack', './app.js'];

const PORT = 9000;
/**
 * Output
 * Reference: http://webpack.github.io/docs/configuration.html#output
 * Should be an empty object if it's generating a test build
 * Karma will handle setting it up for you when it's a test build
 */
var output = {
    // Absolute output directory
    path: __dirname + '/dist',
    // Output path from the view of the page
    // Uses webpack-dev-server in development
    publicPath: isProd ? '/' : 'http://localhost:' + PORT + '/',
    // Filename for entry points. Only adds hash in build mode
    filename: isProd ? '[name].[hash].js' : '[name].bundle.js',
    // Filename for non-entry points. Only adds hash in build mode
    chunkFilename: isProd ? '[name].[hash].js' : '[name].bundle.js'
};

var plugins = [
    new HtmlWebpackPlugin({
        template: './public/index.html',
        inject: 'body'
    })
];

if (isProd) {
    plugins.push(
        new webpack.NoErrorsPlugin(), // Only emit files when there are no errors
        new webpack.optimize.UglifyJsPlugin(), // http://webpack.github.io/docs/list-of-plugins.html#uglifyjsplugin
        new CopyWebpackPlugin([{
            from: __dirname + '/public' // Copy assets from the public folder: https://github.com/kevlened/copy-webpack-plugin
        }])
    )
}


module.exports = {
    debug : !isProd,
    devtool : isProd ? 'source-map' : 'eval-source-map', // see http://webpack.github.io/docs/configuration.html#devtool
    entry: commonEntry,
    output: output,
    plugins: plugins,
    devServer: {
        port: PORT,
        contentBase: './public',
        stats: 'minimal',
        proxy: {
            '/api/*': {
                target: 'http://127.0.0.1:8080',
                secure: false
            },
            '/eventbus/*': {
                target: 'http://127.0.0.1:8080',
                secure: false,
                ws: true
            }
        }
    },
    jshint: {
        esversion: 6
    },
    module : {
        preLoaders: [
            {
                test: /\.js$/, // include .js files
                exclude: /node_modules/, // exclude any and all files in the node_modules folder
                loader: "jshint-loader"
            }
        ],
        loaders : [
            { test: /\.js?$/, exclude: /node_modules/, loader: 'babel-loader' },
            { test: /\.(css|less)$/,    loader: 'style-loader!css-loader!less-loader' },
            { test: /\.hbs$/,    loader: 'handlebars-loader?helperDirs[]=' + __dirname + '/src/app/modules/commons/templateHelpers' },
            // loaders for webfonts
            { test: /\.woff(2)?(\?v=[0-9]\.[0-9]\.[0-9])?$/, loader: "url-loader?limit=10000&minetype=application/font-woff" },
            { test: /\.(ttf|eot|svg)(\?v=[0-9]\.[0-9]\.[0-9])?$/, loader: "file-loader" }
          //  { test:require.resolve('openlayers'), loader:"imports?define=>false" } // workaround for openlayers issue as in https://github.com/openlayers/ol3/issues/3162
        ]
    },
    resolve : {
        root: [path.resolve('./modules')]
    }
};