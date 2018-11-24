import {
    EXECUTE_COMMAND_START,EXECUTE_COMMAND_SUCCESS,EXECUTE_COMMAND_FAIL, 
} from '../types'


export const sendMessageCommand = ({ userMessage }) => {
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

            setTimeout(()=>{
                dispatch({
                    type:EXECUTE_COMMAND_SUCCESS,
                    payload:{
                        message:{
                            messageText:"I'm offline right now.Sorry!",
                            agent:'bot'
                        },
                        processing:false
                    },
                })
            },2000)

        } catch(e){
            console.log(e)
            dispatch({
                type: EXECUTE_COMMAND_FAIL,
                payload: { error: e.message? e.message : 'An unexpected error occurred. Please try again.' }
            })
        }
    }
}