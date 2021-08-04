import React from 'react'
import { Route, Switch} from 'react-router-dom' //{} done if you want to import two things at once
import Home from './core/Home' //Importing our home component

const mainRouter = () => {
    console.log('made it to mainRouter')
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

export default mainRouter