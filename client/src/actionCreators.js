/*=====================
// user actions
=====================*/
const fetchRequest = ()=>({
    type:'FETCH_REQUEST'
})

 export const fetchSuccess = ans=>({
    type:'FETCH_SUCCESS',
    payload:ans
})

 const fetchFailed = err=>({
    type:'FETCH_FAILED',
    payload:err
})

const logout = ()=>({
    type:'LOGOUT'
})

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

export const loginUser =  (username, pwd)=>{
    return async (dispatch)=>{
        try{
            await dispatch(fetchRequest)
            const res = await fetch('http://localhost:1000/user/login',{
                method:"POST",
                headers:{"Content-type":'application/json'},
                body: JSON.stringify({username, password:pwd})
            })
            const data = await res.json()
            if (data.err){
                await dispatch(fetchFailed(data.err))
            }else{

                //extract user's data from token 
                const myKey = "2711*is*THE*challange"
                // advanced: get key from .env.
                const u = await myVerify(data.token, myKey)
                
                //set token at localStorage and user's data at global state
                localStorage.setItem("Project3Token", data.token)
                await dispatch(fetchSuccess(u))
            }

        }catch(err){
            await dispatch(fetchFailed(err))
        }
    }
}

export const logoutUser = ()=>{
    return async (dispatch)=>{
        try{
            dispatch(logout())
        }catch(err){
            dispatch(fetchFailed(err))
        }
    }
}



/*=====================
//vacations actions
=====================*/
const fetchVacationsRequest = ()=>({
    type:'VACATIONS_REQUEST'
})

 const fetchVacationsSuccess = ans=>({
    type:'VACATIONS_SUCCESS',
    payload:ans
})

 const fetchVacationsFailed = err=>({
    type:'VACATIONS_FAILED',
    payload:err
})

export const getVacations = (userID)=>{
    return async (dispatch)=>{
        try{
            await dispatch(fetchVacationsRequest)
            const res = await fetch(`http://localhost:1000/vacation/${userID}`)
            const data = await res.json()
            if (data.err){
                await dispatch(fetchVacationsFailed(data.err))
            }else{
                await dispatch(fetchVacationsSuccess(data.vacs))
            }
        }catch(err){
            await dispatch(fetchVacationsFailed(err))
        }
    }
}

export const follow = (userID, vacID) => (doFollowAndUnfollow(userID, vacID, true))
export const unfollow = (userID, vacID) => (doFollowAndUnfollow(userID, vacID, false))
export const doFollowAndUnfollow = (userID, vacID, flag)=>{
    return async (dispatch)=>{
        try{
            await dispatch(fetchVacationsRequest)
            const res = await fetch('http://localhost:1000/vacation/follow',{
                method:flag? "POST":"DELETE",
                headers:{"Content-type":'application/json'},
                body: JSON.stringify({userID, vacID})
            })
            const data = await res.json()
            if (data.err){
                await dispatch(fetchVacationsFailed(data.err))
            }else{
                await dispatch(getVacations(userID))                
            }
        }catch(err){
            await dispatch(fetchVacationsFailed(err))
        }
    }
}

const resetVacationsRequest = ()=>({
    type:'RESET_VACATION'
})

export const editVacationsRequest= id=>({
    type:'EDIT_VACATION',
    payload:id
})

const editVacationsSuccess= ()=>({
    type:'EDIT_VACATION_SUCCEESS'
})

export const editVacation = (vacation, userID) => (editInsertVacation(vacation, userID, true))
export const newVacation = (vacation, userID) => (editInsertVacation(vacation, userID, false))
export const editInsertVacation = (vacation, userID, flag)=>{
    return async dispatch=>{
        try{
            await dispatch(editVacationsRequest(vacation.id))
            const route = flag? 'http://localhost:1000/vacation/update':'http://localhost:1000/vacation/new'
            const res = await fetch(route,{
                method: flag? "PUT":"POST",
                headers:{"Content-type":'application/json'},
                body: JSON.stringify({...vacation, userID})
            })
            const data = await res.json()
            if (data.err){
                console.log('got error from server')
                await dispatch(fetchVacationsFailed(data.msg))
            }else{
                await dispatch(editVacationsSuccess())
                //await dispatch(getVacations(userID))                
            }
        }catch(err){
            console.log(err)
        }
    }
}

export const resetVacation = ()=>{
    return async dispatch =>{
        try{
            await dispatch(resetVacationsRequest())
        }catch(err){
            await dispatch(fetchVacationsFailed(err))
        }
    } 
}

export const deleteVacation = (vacID, userID, isActive)=>{
    return async dispatch => {
        try{
            await dispatch(fetchVacationsRequest)
            const res = await fetch('http://localhost:1000/vacation',{
                method:"PUT",
                headers:{"Content-type":'application/json'},
                body: JSON.stringify({vacID, isActive, userID})
            })
            const data = await res.json()
            if (data.err){
                await dispatch(fetchVacationsFailed(data.err))
            }else{
                await dispatch(getVacations(userID))
                //await dispatch(editVacationsSuccess())                
            }
        }catch(err){
            await dispatch(fetchVacationsFailed(err))
        }
    }
}

