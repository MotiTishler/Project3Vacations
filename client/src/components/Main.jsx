import React, { useEffect } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { getVacations, fetchSuccess } from '../actionCreators'
import VacationCard from './VacationCard'
import Header from './Header'

import { Grid } from '@material-ui/core'

export default function Main({history}) {

    const user = useSelector(state=>state.user)
    const vacs = useSelector(state=>state.vList)
    const dispatch = useDispatch()
    
    const getUserVacations = async ()=>{
        // get vacations from DB through server, and set them at global state
        if (!localStorage.Project3Token) history.push('/login')
        
        await dispatch(getVacations(user.data.id))
        
    }

    const verify = require('jsonwebtoken').verify
    const myVerify = (encString, key)=>{
        return new Promise((resolve, reject)=>{
            verify(encString, key, (err,decoded)=>{
                if (err) {
                    reject(err)
                }else{
                    resolve(decoded)
                }
            })
        })
    }

    const token2state = async ()=>{
        // this function extracts the user's data from token and send it to global state

        const myKey = "2711*is*THE*challange"
        // advanced: get key from .env
        const u = await myVerify(localStorage.Project3Token, myKey)
        await dispatch(fetchSuccess(u)) 
    }

    useEffect(()=>{

        (async ()=>{
            if (localStorage.Project3Token) {
                
                if (!Object.keys(user.data).length) 
                    // user has token on localStorage but doesn't have data on global state
                    // occures when user has closed the browser without loging out
                    // so, first set user's data in global state. (global state 'user' will be changed , therefore useEffect will run again)
                    await token2state()
                else
                    await getUserVacations()
            
            }else{
                // No token. No user. Plaese login...
                history.push('/login')
            }
    })()
    },[user])

    
    return (
        <div>
            
            <Header myPush={history.push}/>
            
            <Grid container >
                {
                    vacs.data.map((vacation,index)=>(<VacationCard vacation={vacation} key={index} myPush={history.push}/>))
                }         
            </Grid>
            
        </div>
    )
}
