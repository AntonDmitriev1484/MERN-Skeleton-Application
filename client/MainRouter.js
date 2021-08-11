import React from 'react'
import { Route, Switch} from 'react-router-dom' //{} done if you want to import two things at once
import Home from './core/Home' //Importing our home component
//import Users from './user/users'

//Technically also a React component so make sure to capitalize
const MainRouter = () => {
    console.log('made it to mainrouter')
    //Here we're basically just declaring the components which correspond to each url
    //As we build the app, more Routes will get bound to components within the <Switch> tags
    return (
        <div>
            <Switch>
                <Route exact path ="/" component = {Home}/>
                
            </Switch>
        </div>
)
}

export default MainRouter

//DONT BE A STUPID DUMBFUCK, AND USE BRACKETS ON AN EXPORT, JUST TO BE QUIRKY AND GET COMPLETLEY DERAILED
//TRYING TO DEBUG THE DAMN WEBSITE

//Brackets around an export or import are for NAMED exports and imports, which are different from normal exports and imports.