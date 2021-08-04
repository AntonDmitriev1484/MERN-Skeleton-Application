//Top level React component

import React from 'react'
import MainRouter from './MainRouter'
import {BrowserRouter} from 'react-router-dom'
import {ThemeProvider} from '@material-ui/styles'
import theme from './theme'
import {hot} from 'react-hot-loader'

const App = () => {
    //Main router tag needs to be given items from BrowserRouter and ThemeProvider in order to work
    //MainRouter houses all custom views in the react application, these rely on ThemeProvider and are coordinated with BrowserRouter

    //ThemeProvider gives MainRouter access to Material-UI theme. This ThemeProvider gets our theme.js file as an argument.
        //So MainRouter will have access to ThemeProvider, and ThemeProvider will make our theme.js available to all components in MainRouter
    console.log ('made it to app')
    //BrowserRouter enables frontend routing to different views with React Router.
    return (
        <BrowserRouter>
            <ThemeProvider theme = {theme}>
                <MainRouter/> 
            </ThemeProvider>
        </BrowserRouter>


    )

}

//NOTE THE PARENTHESE AROUND APP INSTEAD OF BRACKETS
export default hot(module)(App) //exporting App so that it can be used within our main.js file
//Marking the app component as hot enables live re-loading of all react components during development

//Won't have to change main or app much after they're created, all changes will be in MainRouter and component files
