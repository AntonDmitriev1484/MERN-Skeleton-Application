import React, {useState, useEffect} from 'react'
import { makeStyles } from '@material-ui/core/styles'
import Paper from '@material-ui/core/Paper'
import List from '@material-ui/core/List'
import ListItem from '@material-ui/core/ListItem'
import ListItemAvatar from '@material-ui/core/ListItemAvatar'
import ListItemSecondaryAction from '@material-ui/core/ListItemSecondaryAction'
import ListItemText from '@material-ui/core/ListItemText'
import Avatar from '@material-ui/core/Avatar'
import IconButton from '@material-ui/core/IconButton'
import Typography from '@material-ui/core/Typography'
import ArrowForward from '@material-ui/icons/ArrowForward'
import Person from '@material-ui/icons/Person'
import {Link} from 'react-router-dom'
import {list} from './api-user.js'


const useStyles = makeStyles(theme => ({
    root: theme.mixins.gutters({
      padding: theme.spacing(1),
      margin: theme.spacing(5)
    }),
    title: {
      margin: `${theme.spacing(4)}px 0 ${theme.spacing(2)}px`,
      color: theme.palette.openTitle
    }
  }))
  
//React component which displays a list of users
export default function Users() {

    const classes = useStyles()
    const [users, setUsers] = useState([]) //useState is a React hook, it adds state to this function component
    //This is declaring a state variable, users, which can be updated by using setUsers
    //Invoking useState returns current state and a function which updates the state vlaue.

    useEffect(() => { //Using this hook in a function component lets us fetch data from our backend.
        const abortController = new AbortController() //Lets us abort DOM requests as necessary
        const signal = abortController.signal
        
        list (signal).then((data) => { //Here is where we call the API CRUD method, we use list('signal') passing in the signal from our abortController
            if (data && data.error) {
                console.log(data.error)
            }
            else{
                setUsers(data)
            }

        })
        return function cleanup(){
            abortController.abortController()
        }
    }
    , []) //Passing in an empty array makes this hook only runs upon mounting and unmounting the component, rather than after every render

    //Like any React component, we need to return an actual view to render
    return (
        <Paper className = {classes.root} elevation={4}>
            <Typography variant="h6" className={classes.title}>
                All Users
            </Typography>
            <List dense>
                {users.map((item, i) => { //Iterating over all items retreived from the database using the .map function, and variable 'i'
                    return <Link to={"/user/" + item._id} key={i}>
                                <ListItem button>
                                        <ListItemAvatar>
                                            <Avatar>
                                                <Person/>
                                            </Avatar>
                                        </ListItemAvatar>
                                        <ListItemText primary={item.name}/>
                                        <ListItemSecondaryAction>
                                            <IconButton>
                                                <ArrowForward/>
                                            </IconButton>
                                        </ListItemSecondaryAction>
                                </ListItem>
                            </Link>
                }
                )}
            </List>
        </Paper>
    )

}

// Understanding Hooks:

// import React, { useState } from 'react';

// function Example() {
//   // Declare a new state variable, which we'll call "count"
//   const [count, setCount] = useState(0);

//   return (
//     <div>
//       <p>You clicked {count} times</p>
//       <button onClick={() => setCount(count + 1)}>
//         Click me
//       </button>
//     </div>
//   );
// }

// By invoking useState to declare [count, setCount], you're basically associating these two variables
// together for the rest of the code. Meaning that using the setCount function will live update the count variable.
// So, the count variable is "hooked" to this function.

//useState() makes it so that, this hook variable is maintained despite re-renders (changes in state) of the frontend.
//Think of it as setting a static variable in the frontend, which despite re-loading javascript files
//will stay the same, as it gets managed by React.