//Home page
//Will be rendered when the user visits the root
//Composed with Material-UI components

import React from 'react'
import { makeStyles } from '@material-ui/core/styles'
import Card from '@material-ui/core/Card'
import CardContent from '@material-ui/core/CardContent'
import CardMedia from '@material-ui/core/CardMedia'
import Typography from '@material-ui/core/Typography'
import unicornbikeImg from './../assets/images/unicornbike.jpg'

//STYLE DECLARATIONS

const useStyles = makeStyles(theme => ({
    card: {
        maxWidth: 600,
        margin: 'auto',
        marginTop: theme.spacing(5)
    },
    title: {
        padding:`${theme.spacing(3)}px ${theme.spacing(2.5)}px ${theme.spacing(2)}px`,
        color: theme.palette.openTitle
      },
      media: {
        minHeight: 400
      }
}))

//These object literals will get automatically injected into this react component,
// using the hook returned by makeStyles()

//These generated styles will be used to style elements in the component

//Material-UI uses JSS, so it abstracts more complex css-html objects, and uses javascript to stylize elements

//COMPONENT DEFINITION
function Home() {
    console.log("made it to home component")
    const classes = useStyles()
    //Note parentheses are used when returning html
    return (
        <Card className = {classes.card}>
            <Typography variant="h6" className={classes.title}>
                <CardMedia className={classes.media} 
                    image={unicornbikeImg} 
                    title="Unicorn Bicycle"/>
                <CardContent>
                    <Typography variant="body2" component="p">
                        Welcome to the MERN Skeleton home page.
                    </Typography>
                </CardContent>

            </Typography>
        </Card>

    )
}
//This exported component, can now be used for composition with other components

export default Home()