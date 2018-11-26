import {deleteState} from '../localStorage'
import {LOGOUT_SUCCESS} from '../types'

export * from './MessageActions'
export * from './EditorActions'

export const initiateLogout = () => {
    deleteState()
    return {
        type: LOGOUT_SUCCESS
    }

}
