//This is the entry point for rendering the complete react app

//We import the 'root' view, or top level read component that contains the whole frontend,
//and render it into a div which has 'root' as its id.

import React from 'react'
import render from 'react-dom'
import App from './App'
console.log ('made it to main')
render(<App/>, document.getElementById('root'))

//In this case, app will be our top level react component
//it will be presented with id = 'root'

//Our template.js has a div with the id 'root'
//now the <App/> will be rendered within this div