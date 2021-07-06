import React from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { logoutUser } from '../actionCreators'

import { AppBar, Button, Toolbar, Typography } from '@material-ui/core'

export default function Header({myPush}) {
    const user = useSelector(state=>state.user.data)
    const dispatch = useDispatch()

    const onLogout = async ()=>{

        localStorage.removeItem("Project3Token")
        await dispatch(logoutUser())
        myPush('/login')
        
    }

    return (
        <div>
            <AppBar position="static">
                <Toolbar>
                <div>
                    <Typography variant="h5">
                        Hello {user.name} and welcome to Blah Tours
                    </Typography>
                    <Typography variant="h6">
                        Excellent vacation for every occasion
                    </Typography>
                </div>
                <div> 
                    {user.is_admin? (
                        <>
                            <Button color="inherit" onClick={()=>myPush('/edit')}>Add Vacation</Button>
                            <Button color="inherit" onClick={()=>myPush('/reports')}> Reports</Button>
                        </>
                    ):(null)}
                    <Button color="inherit" onClick={onLogout}>LOGOUT</Button>
                </div>
                </Toolbar>
            </AppBar>
        </div>
    )
}
