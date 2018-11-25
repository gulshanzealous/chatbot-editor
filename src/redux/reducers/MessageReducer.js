

import {
    EXECUTE_COMMAND_START,EXECUTE_COMMAND_SUCCESS,EXECUTE_COMMAND_FAIL, 
    LOGOUT_SUCCESS
} from '../types'


const messages = [
    {
        messageText:'hello',
        agent:'user'
    },
    {
        messageText:'hi there! I am caroline.',
        agent:'bot'
    },
    {
        messageText:'I am jason',
        agent:'user'
    },
    {
        messageText:'Nice to meet you Jason. Ask me anything.',
        agent:'bot'
    },
    {
        messageText:'Which galaxy do we live in?',
        agent:'user'
    },
    {
        messageText:'Milky Way',
        agent:'bot'
    },
    {
        messageText:'hello',
        agent:'user'
    },
    {
        messageText:'hi there! I am caroline.',
        agent:'bot'
    },
    {
        messageText:'I am jason',
        agent:'user'
    },
    {
        messageText:'Nice to meet you Jason. Ask me anything.',
        agent:'bot'
    },
    {
        messageText:'Which galaxy do we live in?',
        agent:'user'
    },
    {
        messageText:'Milky Way',
        agent:'bot'
    },
]

const INITIAL_STATE = {
    messages:messages,
    processing:false,
    processingError:''
}

const handler = {
    [EXECUTE_COMMAND_START] : (state) => {
        return { ...state, processingError:null, processing: true }
    },
    [EXECUTE_COMMAND_SUCCESS] : (state,action) => {
        return { ...state, processingError:null, processing: action.payload.processing, messages: [...state.messages, action.payload.message] }
    },
    [EXECUTE_COMMAND_FAIL] : (state,action) => {
        return { ...state, processingError: action.payload.error, processing: false }
    },
    [LOGOUT_SUCCESS] : () => {
        return INITIAL_STATE
    }
}


export default (state=INITIAL_STATE,action) => {
    if(handler[action.type]){
        return handler[action.type](state,action)
    }
    return state
} 

