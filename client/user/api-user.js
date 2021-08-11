

//These method will probably be attached to different buttons on a React component
//This will enable us to send the data from the React component
//to our express server

//Making a new user
const create = async (user) => {
    try {
        let response = await fetch('api/users/', {
            //Contents of the static html form are passed in as 'user'
            //Compresses them into a json
            //Sends them as a post url to our express server from the provided url

            //Turns them into a json response
            method: 'POST',
            headers: {
                'Accept': 'application/json',
                'Content-Type': 'application/json',
            },
            body: JSON.stringify(user)
            
        })
        return await response.json()
    } catch (err) {
        console.log(err)
    }
}

/*These methods are set up to be asynchronous, and they are a good example of javascript promises

First the response variable waits to make contact with the backend

Then our code waits on a response from the express server

The server's response is returned as a promise from this lambda function, to whatever React component uses it
*/


//Listing users
//The returned promise, if resolved successfully will give the component which calls this method, an array containing user objects which were retrieved from the database.
const list = async (signal) => { //Not sure what this signal parameter does
    try {
        let response = await fetch('/api/users/', {
            //This fetch method sends a GET request to our express server
            //from the provided url

            method: 'GET', 
            signal: signal,
        })
        return await response.json()
    } catch (err){
        console.log(err)
    }


}

//Reading a user profile
const read = async (params, credentials, signal) => { //Since we're calling these in a react component, we will be able to pass values into the 'params' variable
    try {
        //Doing a get request from /api/users/ to retreive user information, this should trigger our auth system, before actually providing this data
        //therefore credentials is needed as a paramter so that this method can use web tokens

        //Need to concatenate userId to our request url in order to use any methods on our express server which
        // have a prerequesite of loading the user (calling the userById method)
        let response = await fetch('/api/users/' + params.userId, {
            method: 'GET',
            signal: signal,
            headers: {
                'Accept': 'application/json',
                'Content-Type': 'application/json',
                //Remember, in order to properly utilize our JWT auth setup we need to manually attach the token in our credentials variable at the header
                'Authorization': 'Bearer '+ credentials.t //.t gets our token from the credentials parameter
            }

        })
        
        return await response.json()
    }
    catch (err){
        console.log(err)
    }
}

//Updating a user's data

//Difference between signal and user as a parameter?
const update = async (params, credentials, user) => {
    try {
        let response = await fetch ('/api/users/' + params.userId, {
            method: 'PUT',
            headers: {
                'Accept': 'application/json',
                'Content-Type': 'application/json',
                'Authorization': 'Bearer '+ credentials.t 

            },
            body: JSON.stringify(user) //Why do we have to stringify the user contents here? I could just be forgetting how the server methods work.
        })
        return await response.json()

    }
    catch (err) {
        console.log(err)
    }
}

//Deleting a user
const remove = async (params, credentials) => {
    try {
        let response = await fetch('/api/users/'+params.userId, {
            method: 'DELETE',
            headers: {
                'Accept': 'application/json',
                'Content-Type': 'application/json',
                'Authorization': 'Bearer '+credentials.t
            }
        })
        return await response.json()
    }
    catch (err){
        console.log(err)
    }

}

export {create, list, read, remove, update}
//Didnt do export default to avoid confusing these with the corresponding server CRUD methods?