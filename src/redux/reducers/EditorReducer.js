
import {
    EDITOR_TAB_ADD, EDITOR_TAB_CLOSE, EDITOR_TAB_FOCUS,
    EDITOR_NOTIFY_UNSAVED, EDITOR_SAVE_CHANGES, SAVE_NEW_MODEL,
    LOGOUT_SUCCESS
} from '../types'

const mainJsBoilerCode = `
/* This is the starting point for your project.
* Start adding code here. Have fun. 
*/

async function processMessage(message){
    // call an API or do some programming chops and return a 'AI' reply

    const res = await axios.get("https://reqres.in/api/users/1")
    const name = res.data.data.first_name
    return "Hi! I am "+ name + ". My responses are limited."

    // return "I'm offline right now.Sorry!"
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
            modelId:null,
            src: mainJsBoilerCode,
            lastSave:'auto',
            saved:true,
            modelIdOptions:{
                language:'javascript',
                path:''
            }
        },
        {
            identifier: 1,
            title: 'setup.js',
            modelId:null,
            src: newTabBoilerCode,
            lastSave:'auto',
            saved:true,
            modelOptions:{
                language:'javascript',
                path:''
            }
        },
    ],
    editorOptions:{
        theme: "vs-dark",
            selectOnLineNumbers: true,
            minimap: {
                enabled: false
        },
    },
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
    [SAVE_NEW_MODEL]: (state,action) => {
        const {model, tabIdentifier} = action.payload
        return {
            ...state,
            tabs: state.tabs.map(tab => {
                if(tab.identifier === tabIdentifier){
                    return { ...tab, modelId: model }
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

