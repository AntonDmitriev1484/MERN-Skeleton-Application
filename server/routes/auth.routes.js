//Configures an express router for API endpoints which require authorization
import express from 'express'
import authControl from '../controllers/auth.controller.js'

/*
    /auth/signin
    Controller function:
        POST request to authenticate user information

    /auth/signout
    Controller function:
        GET request to clear the cookie containing the JWT given upon signin.

*/

const router = Express.router

router.route('/auth/signin').post(authControl.signin)

router.route('/auth/signout').get(authControl.signout)

export default router