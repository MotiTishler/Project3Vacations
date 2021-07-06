import React, { useEffect, useState } from 'react'
import { useSelector } from 'react-redux'

import Button from '@material-ui/core/Button';
import {Bar} from 'react-chartjs-2';

export default function Reports({history}) {
    
    const user = useSelector(state=>state.user.data)
    const [fList, setList] = useState([])
    const [errmsg, setErrMessage] = useState("")

    useEffect(()=>{
        // No token. No user. please login...
        if (!localStorage.Project3Token) {
            history.push('/login')
        } 

        // admin. only!
        if (!user.is_admin){
            history.push('/vacations')
        } 
        
        getFollowed()
    },[user])

    const back = ()=>{
        history.push('/vacations')
    }

    const getFollowed = async ()=>{
        // get data from DB through server
        try{
            const res = await fetch('http://localhost:1000/report')
            const data = await res.json()
            if (data.err){
                setErrMessage(data.msg)
                setTimeout(()=>{
                    setErrMessage("")
                },2000)
            }else{
                setList(data.data)
                console.log(data.data)
            }

        }catch(err){
            console.log(err)
        }
    }
    
    const chartData = {
        labels: fList.map(v=>v.name), //[],
        datasets:[{
            label:"Followers",
            backgroundColor:'navy',
            borderColor:'navy',
            borderWidth:3,
            data:fList.map(v=>v.vac_count), //[]
        }]
    }
    const options = {
        title:{
            display:true,
            text:"Users Favorite Vacations",
            fontSize:18
        }
    }

    
    return (
        <div>
            
            <Button variant="contained" size="medium" color="primary" onClick={back}>Back</Button>
            {
                fList.length? 
                (<Bar data={chartData} options={options} />)
                :
                (errmsg? errmsg:"No data yet")
            }
        </div>
    )
}
