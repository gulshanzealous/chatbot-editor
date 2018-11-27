import {
    EXECUTE_COMMAND_START, EXECUTE_COMMAND_SUCCESS, EXECUTE_COMMAND_FAIL,
    CREATE_NOTIFICATION
} from '../types'
import axios from 'axios'
const uuid = require('uuid/v4')

var safeEval = require('safe-eval')


export const sendMessageCommand = ({ userMessage, sourceCode, notificationCreator }) => {
    return async (dispatch) => {
        try {
            dispatch({
                type: EXECUTE_COMMAND_START
            })

            dispatch({
                type: EXECUTE_COMMAND_SUCCESS,
                payload: {
                    message: {
                        messageText: userMessage,
                        agent: 'user'
                    },
                    processing: true
                }
            })

            // query an api or execute something here

            setTimeout(async () => {
                try {
                    const context = {
                        process: process,
                        Window: Window,
                        fetch: function () { return fetch },
                        axios: axios
                    }
                    const evaluated = safeEval(sourceCode, context)
                    console.log(evaluated)
                    const resp = await evaluated(userMessage)
                    // console.log(resp.data.data.first_name)
                    dispatch({
                        type: EXECUTE_COMMAND_SUCCESS,
                        payload: {
                            message: {
                                messageText: resp,
                                agent: 'bot'
                            },
                            processing: false
                        },
                    })
                } catch (e) {
                    console.log(e)

                    dispatch({
                        type: CREATE_NOTIFICATION,
                        payload: {
                            notification: {
                                title: "Oops! SyntaxError.",
                                message: e.message ? e.message : "Syntax Error or Unresponsive API",
                                type: "danger",
                                id: uuid()
                            }
                        }
                    })
                    dispatch({
                        type: EXECUTE_COMMAND_FAIL,
                        payload: { error: e.message ? e.message : 'There seems to an error with your syntax or API is not responding..' }
                    })
                }
            }, 1000)

        } catch (e) {
            console.log(e)
            dispatch({
                type: CREATE_NOTIFICATION,
                payload: {
                    notification: {
                        title: "Oops! An error occurred.",
                        message: e.message ? e.message : "Something went wrong. Please try again.",
                        type: "danger",
                        id: uuid()
                    }
                }
            })
            dispatch({
                type: EXECUTE_COMMAND_FAIL,
                payload: { error: e.message ? e.message : 'An unexpected error occurred. Please try again.' }
            })
        }
    }
}