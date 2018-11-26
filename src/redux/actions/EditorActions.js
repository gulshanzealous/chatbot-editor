
import {
    EDITOR_TAB_ADD, EDITOR_TAB_CLOSE, EDITOR_TAB_FOCUS,
    EDITOR_SAVE_REF, EDITOR_SAVE_CODE, EDITOR_SAVE_CHANGES
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

export const saveRefToEditor = ({ tabIdentifier, editorRef }) => {
    return {
        type: EDITOR_SAVE_REF,
        payload:{
            tabIdentifier, editorRef
        }
    }
}

export const saveCodeToEditor = ({ tabIdentifier, newCode }) => {
    return {
        type: EDITOR_SAVE_CODE,
        payload:{
            tabIdentifier, newCode
        }
    }
}

export const saveChanges = ({ tabIdentifier }) => {
    return {
        type: EDITOR_SAVE_CHANGES,
        payload:{
            tabIdentifier
        }
    }
}