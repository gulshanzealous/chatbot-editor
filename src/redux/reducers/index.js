import { combineReducers } from 'redux'

import AppReducer from './AppReducer'
import MessageReducer from './MessageReducer'
import EditorReducer from './EditorReducer'


export default combineReducers({
    appStore: AppReducer,
    messageStore: MessageReducer,
    editorStore: EditorReducer
})

