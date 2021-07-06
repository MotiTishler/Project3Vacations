/*====================
// User reducer
====================*/
const emptyUser = {}

const initialState = {
    loading:false,
    data:emptyUser,//data:[],
    err:''
}

export const userReducer = (state = initialState, action)=>{
    switch (action.type){
        case 'FETCH_REQUEST':
            return {
                ...state,
                loading:true,
                err:''
            }
        case 'FETCH_SUCCESS':
            return {
                loading:false,
                data:action.payload,
                err:''
            }
        case 'FETCH_FAILED':
            return {
                ...state,
                loading:false,
                err:action.payload
            }
        case 'LOGOUT':
            return{
                ...state,
                data:emptyUser
            } 
        default:
            return state
    }
}



/*====================
// Vacations reducer
====================*/
const initialVState = {
    loading:false,
    editSucceded:false,
    data:[],
    vacation2edit:0,
    err:''
}

export const vacationsReducer = (state=initialVState, action)=>{
    switch (action.type){
        case 'VACATIONS_REQUEST':
            return {
                ...state,
                loading:true,
                editSucceded:false,
                err:''
            }
        case 'VACATIONS_SUCCESS':
            return {
                ...state,
                loading:false,
                data:action.payload,
                err:''
            }
        case 'VACATIONS_FAILED':
            return {
                ...state,
                loading:false,
                err:action.payload
            }
        case 'EDIT_VACATION':
            return {
                ...state,
                loading:true,
                err:'',
                vacation2edit:action.payload
            }
        case 'EDIT_VACATION_SUCCEESS':
            return {
                ...state,
                loading:false,
                editSucceded:true
            }
        case 'RESET_VACATION':
        return {
            ...state,
            loading:false,
            vacation2edit:0,
            editSucceded:false
            }
        default:
            return state
    }
}