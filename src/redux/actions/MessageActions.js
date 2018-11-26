import {
    EXECUTE_COMMAND_START,EXECUTE_COMMAND_SUCCESS,EXECUTE_COMMAND_FAIL, 
} from '../types'

var safeEval = require('safe-eval')


export const sendMessageCommand = ({ userMessage, sourceCode }) => {
    return async(dispatch) => {
        try{
            dispatch({
                type:EXECUTE_COMMAND_START
            })

            dispatch({
                type:EXECUTE_COMMAND_SUCCESS,
                payload:{
                    message:{
                        messageText: userMessage,
                        agent:'user'
                    },
                    processing:true
                }
            })

            // query an api or execute something here

            setTimeout(()=>{
                const evaluated = safeEval(sourceCode)
                const resp = evaluated(userMessage)
                console.log(resp)
                dispatch({
                    type:EXECUTE_COMMAND_SUCCESS,
                    payload:{
                        message:{
                            messageText: resp,
                            agent:'bot'
                        },
                        processing:false
                    },
                })
            },1000)

        } catch(e){
            console.log(e)
            dispatch({
                type: EXECUTE_COMMAND_FAIL,
                payload: { error: e.message? e.message : 'An unexpected error occurred. Please try again.' }
            })
        }
    }
}