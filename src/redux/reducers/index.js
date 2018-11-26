import { combineReducers } from 'redux'

import MessageReducer from './MessageReducer'
import EditorReducer from './EditorReducer'


export default combineReducers({
    messageStore: MessageReducer,
    editorStore: EditorReducer
})

