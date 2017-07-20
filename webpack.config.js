const CopyWebpackPlugin = require("copy-webpack-plugin");
const StaticSiteGeneratorPlugin = require('static-site-generator-webpack-plugin');

const plugins = [
    new CopyWebpackPlugin([
        // {from: "bower_components", to: "bower_components"},
        {
            from: "node_modules/material-components-web/dist/material-components-web.css",
            to: "css/material-components-web.css"
        },
        {
            from: "src/public"
        }
    ]),
    new StaticSiteGeneratorPlugin({
        entry: "renderStatic",
        paths: [
            '/'
        ], locals: {
            // Properties here are merged into `locals`
            // passed to the exported render function
            // greet: 'Hello'
        }
    })
];

const config = {
    entry: {
        app: __dirname + "/src/ts/app.tsx",
        renderStatic: __dirname + "/src/render.tsx"
    },
    devtool: "source-map",
    output: {
        filename: "js/[name].js",
        path: __dirname + "/",
        libraryTarget: "umd"
    },
    module: {
        rules: [
            // {
            //     test: /\.js$/,
            //     exclude: /node_modules/,
            //     loader: "babel-loader"
            // },
            // {
            //     test: /\.scss$/i,
            //     exclude: /(node_modules|bower_components|public)/,
            //     loader: extractCSS.extract(["css-loader", "sass-loader"])
            // },
            // {
            //     test: /\.css$/,
            //     exclude: /(node_modules|bower_components|public)/,
            //     loader: "style-loader"
            // },
            {
                enforce: "pre",
                test: /\.tsx?$/,
                loader: "tslint-loader",
                exclude: /node_modules/
            },
            {
                test: /\.tsx?$/,
                loader: "awesome-typescript-loader",
                exclude: /node_modules/,
                options: {
                useBabel: true,
                useCache: false,
                }
            }
        ]
    },
    resolve: {
        alias: {
            // "react": "preact-compat",
            // "react-dom": "preact-compat",
        },
        extensions: [".js", ".ts", ".jsx", ".tsx"]
    },
    plugins: plugins
};

module.exports = config;
