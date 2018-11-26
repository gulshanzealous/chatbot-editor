
import {
    EDITOR_TAB_ADD, EDITOR_TAB_CLOSE, EDITOR_TAB_FOCUS,
    EDITOR_NOTIFY_UNSAVED, EDITOR_SAVE_CHANGES,
    LOGOUT_SUCCESS
} from '../types'

const mainJsBoilerCode = `
/* This is the starting point for your project.
* Start adding code here. Have fun. 
*/

function processMessage(message){
    // call an API or do some programming chops and return a 'AI' reply

    return "I'm offline right now.Sorry!"
}
`
const newTabBoilerCode = `
/* This is an empty Tab. 
* You can write code here if you want.
*/
`

const INITIAL_STATE = {
    tabs: [
        {
            identifier: 0,
            title: 'main.js',
            src: mainJsBoilerCode,
            lastSave:'auto',
            saved:true,
        },
        {
            identifier: 1,
            title: 'setup.js',
            src: newTabBoilerCode,
            lastSave:'auto',
            saved:true,
        },
    ],
    activeTabIdentifier: 0
}

const handler = {
    [EDITOR_TAB_ADD] : (state,action) => {
        const {tabIdentifier} = action.payload
        return {
            ...state,
            tabs: [
                ...state.tabs,
                {
                    identifier: tabIdentifier,
                    title: `file${state.tabs.length-1}.js`,
                    src:newTabBoilerCode,
                    lastSave:'auto',
                    saved:true,
                }
            ],
            activeTabIdentifier: tabIdentifier
        }
    },
    [EDITOR_TAB_CLOSE] : (state,action) => {
        const {tabIdentifier} = action.payload
        const tabIndex = state.tabs.findIndex(t => t.identifier === tabIdentifier)
        if (tabIndex < 0) {
            return
        }
        const prevTabId = state.tabs[tabIndex - 1].identifier
        const newActiveTabId = state.activeTabIdentifier === tabIdentifier ? prevTabId : state.activeTabIdentifier

        return {
            ...state,
            tabs: state.tabs.filter(x => x.identifier !== tabIdentifier),
            activeTabIdentifier: newActiveTabId
        }
    },
    [EDITOR_TAB_FOCUS] : (state,action) => {
        return {
            ...state,
            activeTabIdentifier: action.payload.tabIdentifier
        }
    },
    [EDITOR_NOTIFY_UNSAVED] : (state,action) => {
        const {isSaved, tabIdentifier} = action.payload
        return {
            ...state,
            tabs: state.tabs.map(tab => {
                if(tab.identifier === tabIdentifier){
                    return { ...tab, saved: isSaved }
                }
                return tab
            })
        }
    },
    [EDITOR_SAVE_CHANGES] : (state,action) => {
        const {tabIdentifier, newCode, lastSave} = action.payload

        return {
            ...state,
            tabs: state.tabs.map(tab => {
                if(tab.identifier === tabIdentifier){
                    return { ...tab, src: newCode ,saved: true, lastSave }
                }
                return tab
            })
        }
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

