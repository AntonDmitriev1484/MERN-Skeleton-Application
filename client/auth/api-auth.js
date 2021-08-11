
//Signin method takes sign in data from the view component, and feeds it to our express server
//in the form of a POST request

//The response from the server will be returned to the component in a promise, which may provide the JWT if sign-in was successsful.

//NOTE: The view component (signin page) which calls this method, must store the return value of this function appropripriatley
//because the return value contains the JWT. We need the JWT properly stored, so that it can be used as a parameter for some
//of the user CRUD methods we wrote.
const signin = async (user) => {
    try {
        //Here we give the fetch method 'auth/signin' as a parameter because that is the url we're making the request from
        let response = await fetch('auth/signin/', {

            method: 'POST',
            headers: {
            'Accept': 'application/json',
            'Content-Type': 'application/json'},
            credentials: 'include', //not sure what purpose this line servers, need to double check code written for express auth router
            body: JSON.stringify(user)
        })
        return await response.json()
    }
    catch (err){
        console.log(err)
    }
}

const signout = async() => {
    try {
        let response = await fetch('auth/signout/', {method: 'GET'})
        return await response.json()
    } catch (err) {
        console.log(err)
    }
}

export {signout, signin}

//After writing api-auth.js and api-user.js, our front end React components have complete access to our express server API endpoints
//Now we need to integrate the functionality + information this access gives us with the proper front end React component views.