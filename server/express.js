import express from 'express'
import bodyParser from 'body-parser'
import cookieParser from 'cookie-parser'
import compress from 'compression'
import cors from 'cors'
import helmet from 'helmet'


const app = express() //instantiates an express app
//Configuring this express instance to use some of the dependencies we've added in with yarn

//Since express is middleware framework
//the dependencies that we're adding help abstract the requests going back and forth between front and back end
//this makes our front-back end communication as simple as just 
//looking at the body of exchanged JSON or http comms

app.use(bodyParser.json())
app.use(bodyParser.urlencoded({extend: true}))

app.use(cookieParser())
app.use(compress())
app.use(cors())
app.use(helmet())

//Now we've configured our middleware to easily accept http requests



export default app