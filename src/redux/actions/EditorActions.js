
import {
    EDITOR_TAB_ADD, EDITOR_TAB_CLOSE, EDITOR_TAB_FOCUS,
    EDITOR_NOTIFY_UNSAVED, EDITOR_SAVE_CHANGES,
    // CREATE_NOTIFICATION
} from '../types'


export const addTabToEditor = () => {
    return {
        type: EDITOR_TAB_ADD,
        payload:{
            tabIdentifier: Date.now()
        }
    }
}

export const removeTabFromEditor = ({ tabIdentifier }) => {
    return {
        type: EDITOR_TAB_CLOSE,
        payload:{
            tabIdentifier
        }
    }
}

export const focusOnTabInEditor = ({ tabIdentifier }) => {
    return {
        type: EDITOR_TAB_FOCUS,
        payload:{
            tabIdentifier
        }
    }
}

export const autoSaveCodeToEditor = ({ tabIdentifier, newCode }) => {
    return {
        type: EDITOR_SAVE_CHANGES,
        payload:{
            tabIdentifier, newCode, lastSave:'auto'
        }
    }
}

export const saveChanges = ({ tabIdentifier, newCode }) => {
    return {
        type: EDITOR_SAVE_CHANGES,
        payload:{
            tabIdentifier, newCode, lastSave: 'manual'
        }
    }
}

export const sendTabSaveState = ({ tabIdentifier, isSaved }) => {
    return {
        type: EDITOR_NOTIFY_UNSAVED,
        payload:{
            isSaved, tabIdentifier
        }
    }
}