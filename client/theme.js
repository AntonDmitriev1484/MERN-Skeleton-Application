//Defining a custom theme for our skeleton application in client/theme.js using createMuiTheme
//Exporting so that it can be used in App.js

import {createMuiTheme } from '@material-ui/core/styles'
import {pink } from '@material-ui/core/colors'

//createMuiTheme is just a fast way to set up a css theme for the entire react app

//Another object literal being created here and passed into createMuiTheme to produce a theme object

const theme = createMuiTheme({
    typography: {
      useNextVariants: true,
    },
    palette: {
      primary: {
      light: '#5c67a3',
      main: '#3f4771',
      dark: '#2e355b',
      contrastText: '#fff',
    },
    secondary: {
      light: '#ff79b0',
      main: '#ff4081',
      dark: '#c60055',
      contrastText: '#000',
    },
      openTitle: '#3f4771',
      protectedTitle: pink['400'],
      type: 'light'
    }
  })

  //the variables of this theme object literal will be available to all react components we build
  export default theme