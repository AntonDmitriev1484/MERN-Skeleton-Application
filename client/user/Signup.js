

import Card from '@material-ui/core/Card'
import CardContent from '@material-ui/core/CardContent'
import React, {useState, useEffect} from 'react'
import { makeStyles } from '@material-ui/core/styles'
import CardActions from '@material-ui/core/CardActions'
import Button from '@material-ui/core/Button'

import Typography from '@material-ui/core/Typography'

import TextField from '@material-ui/core/TextField'
import { create } from './api-user.js'

const useStyles = makeStyles(theme => ({
    card: {
      maxWidth: 600,
      margin: 'auto',
      textAlign: 'center',
      marginTop: theme.spacing(5),
      paddingBottom: theme.spacing(2)
    },
    error: {
      verticalAlign: 'middle'
    },
    title: {
      marginTop: theme.spacing(2),
      color: theme.palette.openTitle
    },
    textField: {
      marginLeft: theme.spacing(1),
      marginRight: theme.spacing(1),
      width: 300
    },
    submit: {
      margin: 'auto',
      marginBottom: theme.spacing(2)
    }
  }))

export default function Signup() {

    const classes = useStyles()
    const [values, setValues] = useState({
        //Sets up an object literal as an initialized parameter for the useState() hook
        name: '',
        password: '',
        email: '',
        open: false,
        error: ''
    })

    const handleChange = name => event => (
      //values is our hook variable, to change it, we need to call setValues
            setValues({ ...values, [name]: event.target.value })
        //What does ... do???
    )

    const clickSubmit = () => {
        //Because of the 'const' scope, we are able to create a user object literal
        // by accessing the fields of our values hook

        const user = {
            name: values.name || undefined,
            email: values.email || undefined,
            password: values.password || undefined
        }

        //console.log(data)
        create(user).then((data) => { //Calling our create api-user CRUD method
            //this 'data' object, should be the JSON response returned by our server
            if (data.error){
                setValues({ ...values, error: data.error })
            }
            else {
                setValues({ ...values, open: true})
            }
        })
    }

    return(
        <div>
            <Card className={classes.title}>
                <CardContent>
                    <Typography variant="h6" className={classes.title}>
                        Sign Up
                    </Typography>
                    <TextField id="name" label="Name"
                        className = {classes.textField}
                        value = {values.name} onChange={handleChange('name')}
                        margin = "normal" />
                   <br/>
                   <TextField id="email" type="email" label="Email"
                        className={classes.textField}
                        value={values.email} onChange={handleChange('email')}
                        margin ="normal"/>
                    <br/>
                    <TextField id="password" type="password" label="Password" className={classes.textField} value={values.password} onChange={handleChange('password')} margin="normal"/>
                    <br/> {
                        values.error && (<Typography component="p" color="error">
                        <Icon color="error" className={classes.error}>error</Icon>
                        {values.error}</Typography>)
                    }
                </CardContent>
                <CardActions>
                    <Button color="primary" variant="contained" onClick={clickSubmit}>Submit Information</Button> 
                </CardActions>
            </Card>
        </div>
    )
    //Line 103 runs our clickSubmit method
    //Since values was set up as a hook earlier, for it to be changed by our view component
    //each field in the React view, must contain a method call to our handleChange() method
    //this in turn calls our setValues() method, which is associated with our 'values' hook

    //Finally, once the user feels they are ready
    //All fields in 'values' are up to date.
    //Now all we have to do is call the clickSubmit function when they use the button
    //Since our values hook is defined in scope across this entire signup function
    //all clickSubmit has to do, is create a new user object from values
    //then pass this user object literal to the CRUD method we wrote in api-auth.js 
   



}