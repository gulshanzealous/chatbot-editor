
import {deleteState} from '../localStorage'
import {LOGOUT_SUCCESS,LOGIN_SUCCESS, CREATE_NOTIFICATION} from '../types'
const uuid = require('uuid/v4')


export const initiateLogout = () => {
    return async (dispatch)=>{
        try{
            setTimeout(()=>{
                deleteState()
            },1000)
            dispatch({
                type: CREATE_NOTIFICATION,
                payload:{
                    notification:{
                        title:"Logout Success.", 
                        message: 'Come back soon!', 
                        type:"info",
                        id: uuid()
                    }
                }
            })
            dispatch({
                type: LOGOUT_SUCCESS
            })
        } catch(e) {
            console.log(e)
            dispatch({
                type: CREATE_NOTIFICATION,
                payload:{
                    notification:{
                        title:"Oops! Logout Error.", 
                        message: e.message ? e.message : "Couldn't logout. Please try again.", 
                        type:"danger",
                        id: uuid()
                    }
                }
            })
        }
    }
}

export const notifyLoggedIn = () => {
    return async (dispatch)=>{
        try{
            dispatch({
                type: CREATE_NOTIFICATION,
                payload:{
                    notification:{
                        title:"Login Success.", 
                        message: 'Welcome to AI playground!', 
                        type:"success",
                        id: uuid()
                    }
                }
            })
            dispatch({
                type: LOGIN_SUCCESS
            })
        } catch(e) {
            console.log(e)
            dispatch({
                type: CREATE_NOTIFICATION,
                payload:{
                    notification:{
                        title:"Oops! Login Error.", 
                        message: e.message ? e.message : "Couldn't login. Please try again.", 
                        type:"danger",
                        id: uuid()
                    }
                }
            })
        }
    }
}

export const createNotification = ({ title, message, type, container, duration }) => {
    return {
        type: CREATE_NOTIFICATION,
        payload:{
            notification:{
                title, message, type, container, duration,
                id: uuid()
            }
        }
    }
}