import React, { useEffect, useState } from 'react'
import { useDispatch, useSelector } from 'react-redux';
import { editVacation, newVacation, resetVacation } from '../actionCreators' 

import DateFnsUtils from '@date-io/date-fns';
import { MuiPickersUtilsProvider, KeyboardDatePicker } from '@material-ui/pickers';
import { Box, Button, TextField } from '@material-ui/core';

export default function Addit({history}) {

    const user = useSelector(state=>state.user.data)
    const vList = useSelector(state=>state.vList)
    const vacationID = vList.vacation2edit
    const vacation = vList.data.find(v=>v.id == vacationID) || {
        id:vacationID,
        name:"",
        description:"",
        image_path:"",
        from_date:new Date(),
        to_date:new Date(),
        price:1,
        notes:""
    }
    const dispatch = useDispatch()

    useEffect(()=>{
        if (!localStorage.Project3Token) {
            history.push('/login')
        } 

        if (!user.is_admin){
            history.push('/vacations')
        }
        
        //console.log(vacationID, vacation)
        
        if (vList.editSucceded) {
            setErrMsg('Vacation was addited successfuly')
            setTimeout(()=>setErrMsg(""),2000)
            
        }
        if (vList.err) {
            setErrMsg(vList.err)
            setTimeout(()=>setErrMsg(""),2000)
        }
        
    },[user, vList])

    const [name, setName] = useState(vacation.name)
    const [description, setDescription] = useState(vacation.description )
    const [imagePath, setImagePath] = useState(vacation.image_path )
    const [startDate, setStartDate] = useState(vacation.from_date );
    const [endDate, setEndDate] = useState(vacation.to_date );
    const [price, setPrice] = useState(vacation.price )
    const [notes, setNotes] = useState(vacation.notes )

    const [errMsg, setErrMsg] = useState("")

    const closeAddit = async ()=>{
        if (vacationID) await dispatch(resetVacation())
        history.push('/vacations')
    }

    const addit = async ()=>{

        const v = {
            id:vacationID,
            name,
            description,
            image_path:imagePath.name,
            from_date:startDate,
            to_date:endDate,
            price,
            notes
        }
        
        if (!v.name){
            setErrMsg("Vacation name is required")
            return
        }

        if (v.to_date < new Date()){
            setErrMsg("Vacation date has already passed")
            return
        }

        if (v.to_date < v.from_date)
        {
            const dt = v.to_date
            v.to_date = v.from_date
            v.from_date = dt
        }
        //console.log(v)

        if (v.id) 
            await dispatch(editVacation(v, user.id))
        else
            await dispatch(newVacation(v, user.id))
    }
    
    return (
        <div>
            {/*Add + Edit = Addit*/}

            <Box display="flex" flexDirection="column" alignItems="center" justifyContent="space-between">
                <TextField required id="vname" label="Vacation name" defaultValue={vacation.name || ""} onChange={e=>setName(e.target.value)}/>
                <TextField 
                    required 
                    id="vdesc" 
                    label="Vacation Description (max. 255 chars)" 
                    multiline
                    rowsMax={10}
                    defaultValue={vacation.description || ""} 
                    onChange={e=>setDescription(e.target.value.substring(0, 255))}/>
                
                <label for="image_path">
                    <input type="file"
                        id="image_path" name="image_path"
                        accept="image/png, image/jpeg"
                        onChange={e=>setImagePath(e.target.files[0])}
                        style={{display:'none'}} />
                    <Button color="primary" variant="outlined" component="span"> Choose an image * </Button>
                    <br></br>(from /client/public/image directory)
                </label>
                <MuiPickersUtilsProvider utils={DateFnsUtils}>
                    <KeyboardDatePicker
                    disableToolbar
                    variant="inline"
                    format="dd/MM/yyyy"
                    margin="normal"
                    id="date-picker-start"
                    label="Start Date"
                    value={startDate}
                    onChange={setStartDate}
                    KeyboardButtonProps={{
                        'aria-label': 'change date',
                    }}
                    />
            
                    <KeyboardDatePicker
                    disableToolbar
                    variant="inline"
                    format="dd/MM/yyyy"
                    margin="normal"
                    id="date-picker-end"
                    label="End Date"
                    value={endDate}
                    onChange={setEndDate}
                    KeyboardButtonProps={{
                        'aria-label': 'change date',
                    }}
                    />
                </MuiPickersUtilsProvider>
                <TextField required id="price" label="price" type="number" defaultValue={vacation.price || 1}  onChange={e=>setPrice(e.target.value)}/>
                <TextField id="notes" label="any notes?" defaultValue={vacation.notes || ""} onChange={e=>setNotes(e.target.value)}/>
                <div>
                    <Button variant="outlined" size="medium" color="primary" onClick={addit}>Send</Button>
                    <Button variant="outlined" size="medium" color="primary"  onClick={closeAddit}>Close</Button>
                </div>
            </Box>
            <h3>{errMsg}</h3>
        </div>
    )
}
