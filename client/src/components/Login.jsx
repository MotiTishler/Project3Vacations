import React, { useEffect, useState } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { loginUser } from '../actionCreators'

import { TextField, Button, Typography, Box, AppBar } from '@material-ui/core'

export default function Login({history}) {
    const [name, setName] = useState("")
    const [username, setUsername] = useState("")
    const [password, setPassword] = useState("")
    const [errmsg, setErrMessage] = useState("")
    const [regMode, setRegMode] = useState(false)
    
    const dispatch = useDispatch()
    const curUser = useSelector(state=>state.user)

    useEffect(()=>{
        if (localStorage.Project3Token) {
            history.push('/vacations')
        } 
    },[])

    const handleLogin = async ()=>{
        await dispatch(loginUser(username, password))

        history.push('/vacations')
    }

    const handleReg = async ()=>{
        console.log('register')
        try{
            const res = await fetch('http://localhost:1000/user/register',
            {
                method:"POST",
                headers:{"Content-type":'application/json'},
                body: JSON.stringify({name, username, password})
            })
            const data = await res.json()
            if (data.err){
                setErrMessage(data.msg)
                setTimeout(()=>{
                    setErrMessage("")
                },2000)
            }else{
                setRegMode(false)
                setErrMessage("You are registered now. Please login.")  
            }

        }catch(err){
            console.log(err)
            setErrMessage(err)
            setTimeout(()=>{
                setErrMessage("")
            },2000)
        }

    }

    return (
        <div>
            <AppBar position="static">
                <Box textAlign ="center">
                    <Typography variant="h4">
                        Welcome to Blah Tours
                    </Typography>
                    <Typography variant="h5">
                        Excellent vacation for every occasion
                    </Typography>
                </Box>
            </AppBar>
            <Box display="flex" flexDirection="column" alignItems="center" justifyContent="space-around">
            {regMode? (
                <TextField required id="name" label="name" onChange={e=>setName(e.target.value)} />
            ):(<></>)}
            
            <TextField required id="username" label="username" onChange={e=>setUsername(e.target.value)} />

            <TextField required id="password" label="Password" type="password" onChange={e=>setPassword(e.target.value)}/>
            
            <Button variant="contained" color="primary" onClick={regMode? handleReg:handleLogin}>
                {regMode? "Register":"Login"}
            </Button>
            {
                regMode?
                (<p>Already have an account? <span className="click-span" onClick={()=>setRegMode(false)}> login here </span></p>):
                (<p>Don't have an account yet? <span className="click-span" onClick={()=>setRegMode(true)}> register now </span></p>)
            }
            <h4>{errmsg}</h4>
            </Box>
        </div>
    )
}
