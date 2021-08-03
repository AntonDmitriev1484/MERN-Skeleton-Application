import express from 'express'
import bodyParser from 'body-parser'
import cookieParser from 'cookie-parser'
import compress from 'compression'
import cors from 'cors'
import helmet from 'helmet'
import Template from './../template'

import userRoutes from './routes/user.routes.js'
import authRoutes from './routes/auth.routes.js'

//HOW JS imports work
// Template now refers to the default export from our template js file
// ./template means look for template in 'server'
// ./../template means look for template one layer higher, in the project file

const app = express() //instantiates an express app
//Configuring this express instance to use some of the dependencies we've added in with yarn

//Since express is middleware framework
//the dependencies that we're adding help abstract the requests going back and forth between front and back end
//this makes our front-back end communication as simple as just 
//looking at the body of exchanged JSON or http comms

app.use(bodyParser.json())
app.use(bodyParser.urlencoded({extended: true}))

app.use(cookieParser())
app.use(compress())
app.use(cors())
app.use(helmet())

//Now we've configured our middleware to easily accept http requests

// app.get('/', Template) Almost correct
// '/' is the string which represents the root, any request with / means root, -> serve the template.js
app.get('/', (req, res) => { res.status(200).send(Template())}) //A lambda function, automatically sends the Template.js html 
                                                                //as a JSON response when localhost:3000 is reached

app.use('/', userRoutes) //Configures our express app to use the routes we defined with Express router, going from localhost:3000
app.use('/', authRoutes)

//Auth error handling for express JWT
app.use((err, req, res, next) => {
    if (err.name === 'UnauthorizedError'){

        res.status(401).json({"error": err.name + ": " + err.message})
    }
    else if (err) {
        res.status(401).json({"error": err.name + ": " + err.message})
        console.log(err)
    }
})
export default app