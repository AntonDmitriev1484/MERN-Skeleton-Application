//Implements the server

import config from './../config/config' //We need 'const' from here
import app from './express' //We need our express instance 'app' from here

app.listen(config.port, (err) =>{ //Sets express to listen on config.port, if an error occurs and the site can't start, it'll log this error
    if (err){
        console.log(err)
    }
    console.info('Server start on port %s', config.port) //We set up config.port to be 3000

})
