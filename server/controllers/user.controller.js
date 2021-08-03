
//Contains definitions of all controller methods.
import User from "../models/user.model"
import extend from 'lodash/extend'
import errorHandler from './../helpers/dbErrorHandler.js'
// server\helpers\dbErrorHandler.js

//Where do these (req, res) parameters get filled in from???


const create = async (req, res) => { //create is a lambda function
    //async, we need to specify that this function is asynchronous, so that we can use the 'await' keyword
    const user = new User(req.body) //Creates a new user using the body of the JSON object received in the http POST request from our front end
    try {
        await user.save() //Saving this model object to our database
        //We use 'await' because we can only save once mongoose has finished validating everything
        //See pg. 77 for more detail

        return res.status(200).json({
            message: "Successfully signed up!"
        })
    }
    catch (err){
        return res.status(400).json({
            error: errorHandler.getErrorMessage(err)
        })
    }
}

//THIS CODE ISN'T THE PROBLEM

const list = async (req, res) => {
    try {
        let users = await User.find().select('name email updated created')
        //User.find() parentheses are left empty because this will cause mongoose to bring up a list of all users
        //await because again, we need to let mongoose do validation
        //.select('name email updated created'), so mongoose will only return the name, email, updated, created fields of each user document stored

        res.json(users)
        //The response is this list of user information stored as a json

    } catch (err){
        return res.status(400).json({
            error: errorHandler.getErrorMessage(err)
        })

    }

}

//Read, Update, and Delete operations require mongoose to query a specific user. These functions are Loading functions

//Loading function, responds automatically to the :userId parameter
//adds additional information into the json file before sending it along to other controller methods
const userById = async (req, res, next, id) => {

   try{
       let user = await User.findById(id) //this 'id' variable comes from whatever string is at :userId
       if (!user){
           return res.status(400).json()({
               error: "User not found"
           })
       }
       
       req.profile = user //The user information gets loaded into the req JSON object's profile (not body)
       next() //Moves onto the next function at this api endpoint, passing along the req JSON object
   }
    catch (err){
        return res.status(400).json({
            error: "Couldn't retreive user"
        })
    }
}

const read = async (req, res) => {
    //The req object here will come from userById
    //Also since we've already loaded the user, no exceptions need to be handled

    let user = req.profile
    user.hashed_password = undefined //Setting these two fields as undefined for security
    user.salt = undefined
    return res.json(user)

}

const update = async (req, res) => {

    try {
        let user = req.profile
    user = extend(user, req.body) //From lodash
    //This merges our loaded user object (stored in the req JSON's profile), with the changes requested in the req JSON's body of the http request
    user.updated = Date.now() //update the access field
    await user.save() //Let mongoose validate and save the user object once more

    user.hashed_password = undefined //Clean the user object of sensitive data
    user.salt = undefined
    return res.json(user) //Return it to the user as a response json

    }
    catch (err) {

        return res.status(400).json({
            error: errorHandler.getErrorMessage(err)
          })
    }
    
}

const remove = async (req, res) => {
    try {
        let user = req.profile
        user = await user.remove() //Here we let mongoose validate, and then remove() the user object from the database
        user.hashed_password = undefined
        user.salt = underfined
        return res.json(user)

    }
    catch (err){
        return res.status(400).json({
            error: errorHandler.getErrorMessage(err)
        })
    }
}

export default {create, userById, read, list, remove, update} //Have to export all of the lambda functions under default

// import User from '../models/user.model'
// import extend from 'lodash/extend'
// import errorHandler from './../helpers/dbErrorHandler'

// const create = async (req, res) => {
//   const user = new User(req.body)
//   try {
//     await user.save()
//     return res.status(200).json({
//       message: "Successfully signed up!"
//     })
//   } catch (err) {
//     return res.status(400).json({
//       error: errorHandler.getErrorMessage(err)
//     })
//   }
// }

// /**
//  * Load user and append to req.
//  */
// const userByID = async (req, res, next, id) => {
//   try {
//     let user = await User.findById(id)
//     if (!user)
//       return res.status('400').json({
//         error: "User not found"
//       })
//     req.profile = user
//     next()
//   } catch (err) {
//     return res.status('400').json({
//       error: "Could not retrieve user"
//     })
//   }
// }

// const read = (req, res) => {
//   req.profile.hashed_password = undefined
//   req.profile.salt = undefined
//   return res.json(req.profile)
// }

// const list = async (req, res) => {
//   try {
//     let users = await User.find().select('name email updated created')
//     res.json(users)
//   } catch (err) {
//     return res.status(400).json({
//       error: errorHandler.getErrorMessage(err)
//     })
//   }
// }

// const update = async (req, res) => {
//   try {
//     let user = req.profile
//     user = extend(user, req.body)
//     user.updated = Date.now()
//     await user.save()
//     user.hashed_password = undefined
//     user.salt = undefined
//     res.json(user)
//   } catch (err) {
//     return res.status(400).json({
//       error: errorHandler.getErrorMessage(err)
//     })
//   }
// }

// const remove = async (req, res) => {
//   try {
//     let user = req.profile
//     let deletedUser = await user.remove()
//     deletedUser.hashed_password = undefined
//     deletedUser.salt = undefined
//     res.json(deletedUser)
//   } catch (err) {
//     return res.status(400).json({
//       error: errorHandler.getErrorMessage(err)
//     })
//   }
// }

// export default {
//   create,
//   userByID,
//   read,
//   list,
//   remove,
//   update
// }
