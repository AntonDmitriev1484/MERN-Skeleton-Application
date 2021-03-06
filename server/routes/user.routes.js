//The routes file contains access to all API endpoints
//These routes are configured using the Express router
//Then they are added into our Express instance in express.js

/*
    /api/users
    Controller function:
        list users with GET http
        create new user with POST http
    
    /api/users/:userId
    Controller funciton:
        Fetch a user with GET
        Updating a user with PUT
        Deleting a user with DELETE

*/

import express from 'express'
import userCtrl from '../controllers/user.controller'
import authCtrl from '../controllers/auth.controller'

const router = express.Router()

router.route('/api/users')
.get(userCtrl.list)
.post(userCtrl.create)


router.route('/api/users/:userId') //We add in authCtrl controllers here, because we want to block off access to these API endpoints unless the client is authorized
.get(authCtrl.requireSignin, userCtrl.read)
.put(authCtrl.requireSignin, authCtrl.hasAuthorization, userCtrl.update)
.delete(authCtrl.requireSignin, authCtrl.hasAuthorization, userCtrl.remove, authCtrl.signout)

router.param('userId', userCtrl.userById)
//Whenever there is a request which has the :userId parameter in it, 
//the app will execute the userById function, which fetches the user data, and loads it
//into a Express request object. Before sending it to the next controller function.

/* So for example:
If I send a get request from /api/users/:userId

first userById will get called, and load the user model into a JSON req object

then this same JSON req object will get passed into the lambda function associated with .get(), userCtrl.read
*/

//61097c43519d334cc04baa6b
//eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJfaWQiOiI2MTA5N2M0MzUxOWQzMzRjYzA0YmFhNmIiLCJpYXQiOjE2MjgwMjAxMzl9.TDYZfG50GL4qGKGt7SZJmrMMXYJxAxKBCJnyXMvgEh8


//"6109a14be5d3951104a22931" Joe
//"6109998a77d6af30d8528b44" betty


export default router

//Associates our user controller with each specific http request