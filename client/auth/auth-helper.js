//To manage auth state in the frontend (manage the JWT token provided by the server)
//the frontend needs to store, retrieve, and delete the auth credentials that are received from the server
//on successful signin and signout.
//We can use the browser's sessionsStorage as how we store the JWT auth credentials


import { signout } from './api-auth.js'

const authHelp = {
//Authenticate stores our credentials in browser sessionsStorage
//after ensuring that window is defined (that the code is running in a browser)

//The passed in callback function, 'cb', allows the component where signin lambda got called, to define actions which should take place
//after a successful sign in.
// For example, the call back could redirect you to the home page
authenticate(jwt, cb) {
    if (typeof window !== "undefined") {
        sessionsStorage.setItem('jwt', JSON.stringify(jwt))
    }
    cb() //call back function

},


//Helps us determine whether or not the user is signed in from the frontend.
//We can call this function before the user does something which calls an api access method.

//This method will either return the stored credentials, providing them to our front end CRUD methods
//or it will return false, if the user has not yet signed in. Enabling the our react frontend to prompt the user to sign in
//without first needing to have a request to the API be rejected 
isAuthenticated() {
    if (typeof window == "undefined"){
        return false
    }

    if (sessionStorage.getItem('jwt')){
        return JSON.parse(sessionStorage.getItem('jwt'))
    }
    else {
        return false
    }
    
},

//Deleting credentials
//On signout, we want to clear our webtoken from session storage

clearJWT(cb) {
    if (typeof window !== "undefined"){
        sessionStorage.removeItem('jwt')
    }
    cb()
    signout().authenticate((data) => {
        document.cookie ="t=; expires=Thu, 01 Jan 1970 00:00:00 UTC; path=/;"
    })
}
}


//NOTE: For some reasons these functions are defined as though they are within a single object literal
//Rather than using lambda functions
export default authHelp