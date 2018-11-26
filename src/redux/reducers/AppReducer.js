import {LOGOUT_SUCCESS,  LOGIN_SUCCESS,CREATE_NOTIFICATION} from '../types'

const INITIAL_STATE = {
    notifications:[],
    loggedIn:true
}

const handler = {
    [CREATE_NOTIFICATION] : (state,action) => {
        return { 
            ...state, 
            notifications:[
                ...state.notifications,
                action.payload.notification
            ]
        }
    },
    [LOGIN_SUCCESS] : (state) => {
        return {
            ...state,
            loggedIn: true
        }
    },
    [LOGOUT_SUCCESS] : (state) => {
        return {
            ...state,
            loggedIn: false
        }
    }
}


export default (state=INITIAL_STATE,action) => {
    if(handler[action.type]){
        return handler[action.type](state,action)
    }
    return state
} 

