//Makes full-stack dev process more seamless
//Express app should also load our Webpack middleware for the fronten
//This compile method will take our Express app and configure it to use webpack middleware.

import config from './../config/config.js'
import webpack from 'webpack'
import webpackMiddleware from 'webpack-dev-middleware'
import webpackHotMiddleware from 'webpack-hot-middleware'
import webpackConfig from './../webpack.config.client.js'

//Lambda function which accepts an express app parameter
const compile = (app) => {
    if (config.env === "development"){
        const compiler = webpack(webpackConfig)
        const middleware = webpackMiddleware(
            compiler, 
            {publicPath: webpackConfig.output.publicPath}
            )
        app.use(middleware)
        //webpack now uses the values set in our webpack.config.client.js
        app.use(webpackHotMiddleware(compiler))
        //Enables hot-reloading from server side changes
    }

}
export default {compile}