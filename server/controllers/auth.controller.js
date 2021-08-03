import User from "../models/user.model"
import jwt from 'jsonwebtoken' //Since we're now working with authentication and authorization
import expressJwt from 'express-jwt'
import config from './../../config/config'

const signin = async (req, res) => {

    try{

        let user = await User.findOne({ "email": req.body.email }) //Searches for a user with a matching email 'findOne({attribute: value})
        if (!user){
            return res.status('401').json({
                error : "A user with this email could not be found."
            })
        }

        if (!user.authenticate(req.body.password)) { //Remember the method we defined as part of our user model
                return res.status('401').json({
                    error: "Email does not match with password."
                })
        }

        //If we make it through both of these if statements then that means the user's credentials are correct

        
        const token = jwt.sign({ _id: user._id}, config.jwtSecret) //Each user has an _id value and this is used to create our jwt token
        res.cookie('t', token, { expire: new Date() + 9999}) //Attaching this token as a cookie to the res JSON, setting an expiration date and naming it

        return res.json({
            token, //The json we send back contains our token as well as the user object which was just signed in
            user : {
                _id: user._id,
                name: user.name,
                email: user.email

            }
        })
        //Could also add the token into the header of the json file under Authorization label
    }
    catch (err) {
        return res.status('401').json({ error: "Could not sign in" })
    }

}

const signout = async (req, res) => {
    res.clearCookie("t") //clear the same cookie we gave earlier during the signin request

    //Does it matter if status is surrounded by single quotes???
    return res.status(200).json({
        message: "Successfully signed out"
    })
}

//To protect our read, update, and delete account routes, the server will have to run a controller which checks if the client
//making the request is actually authorized

const requireSignin = expressJwt({ //Checks if the incoming request has a valid JWT in its Authorization header. Otherwise throws an authentication error
    secret: config.jwtSecret,
    userProperty: 'auth',
    algorithms: ['HS256'] //Need to include this when instantiating an expressJwt
})

const hasAuthorization = async (req, res, next) => {
    const authorized = req.profile && req.auth && req.profile._id == req.auth._id
    //For a client to be authorized, the request most have a profile (from the loader getById), an authorization header (from requireSignin), and these two must have the _id.

    if (!authorized){
        return res.status('403').json({
            error: "User is not authorized"
        })
    }
    next()
}


export default {signin, signout, requireSignin, hasAuthorization}