import React from "react"
import { Grid, Paper, TextField, Button} from "@material-ui/core";
import Alert from "@material-ui/lab/Alert";
import { useState } from "react";
import { useDispatch} from "react-redux";
import { useNavigate, useLocation } from "react-router-dom";
import { authUser } from "../../redux/actions"; 
import useAuth from '../../hooks/useAuth';

export default function Auth(){
    const dispatch = useDispatch()
    const {setAuth, auth} = useAuth()
    const navigate = useNavigate();
    const location = useLocation();
    const from = location.state?.from?.pathname || '/home'
    const [user, setUser] = useState({
        email: '',
        pwd: ''
    })
    const [errorMsg, setErrorMsg] = useState('')

    function onChange(e){
        setUser({
            ...user,
            [e.target.name]: e.target.value
        })
    }

    async function submitUser (e){
        e.preventDefault();
        try{
            const response = await dispatch(authUser(user))
           
        if(response){
            const token = sessionStorage.getItem('userAuth');
            setAuth({token: token});
            navigate(from, {replace: true});
        }
        } catch(err){
            console.log(err)
            setErrorMsg(err)
        }
        setUser({
            email: '',
            pwd: ''
        })
    }

    return(
        <>
        <div style={{padding: 60}}>
            <Paper elevation={3}>
                <form id ="myForm" onSubmit={e => submitUser(e)}>
                    <Grid
                        container
                        spacing={3}
                        direction={'column'}
                        justifyContent={'center'}
                        alignItems={'center'}
                    >
                        <Grid item xs={6}>
                            <TextField label = 'Email' name='email' value={user.email} onChange={onChange}></TextField>
                        </Grid>
                        <Grid item xs={12}>
                            <TextField label= 'Password' name='pwd' value={user.pwd} type={'password'} onChange={onChange}></TextField>
                        </Grid>
                    

                        {errorMsg
                            ?   <Alert severity="error">
                                Wrong Email address or password - <strong>Check it out!</strong>
                                </Alert>
                            : null
                        }
                        <Grid item xs={12}>
                            <Button fullWidth type='submit'>Login</Button>
                        </Grid>
                    </Grid>
                </form>
            </Paper>
        </div>
        </>
    )
}