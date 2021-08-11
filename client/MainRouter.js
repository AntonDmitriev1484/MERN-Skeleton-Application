import React from 'react'
import { Route, Switch} from 'react-router-dom' //{} done if you want to import two things at once
import Home from './core/Home' //Importing our home component
import Users from './user/Users'
import Signup from './user/Signup'

//Technically also a React component so make sure to capitalize
const MainRouter = () => {
    console.log('made it to mainrouter')
    //Here we're basically just declaring the components which correspond to each url
    //As we build the app, more Routes will get bound to components within the <Switch> tags
    return (
        <div>
            <Switch>
                <Route exact path ="/" component = {Home}/>
                <Route exact path ="/users" component = {Users}/>
                <Route exact path ="/signup" component = {Signup}/>
            </Switch>
        </div>
)
}

//Notice how we can write a new url path to each component.
//For example, even though signup is a POST request from /api/users
//we mapped it to the url path /signup

//This is possible because the CRUD methods we call to give each component functionality
//are already set up to make the correct requests from the correct URL.
//For example, signup uses the create(user) method from api-user.js
//which performs a fetch request from /api/users, and specifies the method to be 'POST' in the request header

export default MainRouter

//DONT BE A STUPID DUMBFUCK, AND USE BRACKETS ON AN EXPORT, JUST TO BE QUIRKY AND GET COMPLETLEY DERAILED
//TRYING TO DEBUG THE DAMN WEBSITE

//Brackets around an export or import are for NAMED exports and imports, which are different from normal exports and imports.