import React from 'react'
import styled from 'styled-components'
import { Editor, EditorStatusBar } from '../containers'

const RootStyle = styled.div`
    width:100%;
    height:100%;
    display:flex;
    flex-flow: column nowrap;
    justify-content:center;
    align-items:center;
`
const TabContainerStyle = styled.div`
    flex:0 0 45px;
    width:100%;    
    border-width:0 0 2px 0px;
    border-style:solid;
    border-color:rgba(255,255,255,0.09);
    display:flex;
`
const EditorContainerStyle = styled.div`
    flex:1 1 0%;
    width:100%;
`

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

class EditorContainer extends React.Component {
    constructor(props) {
        super(props);
        this._monacoRef = React.createRef()
        this.state = {
            tabs: [
                {
                    identifier: 0,
                    title: 'main.js',
                    src: mainJsBoilerCode,
                    ref: React.createRef()
                },
                {
                    identifier: 1,
                    title: 'app.js',
                    src: newTabBoilerCode,
                    ref: React.createRef()
                },

            ],
            activeTabIdentifier: 0
        }
    }

    handleAddTab = () => {
        // this._monacoRef.create({
        //     language:"javascript"
        // });
        this.setState(prevState => {
            const newId = Date.now()
            return {
                tabs: [
                    ...prevState.tabs,
                    {
                        identifier: newId,
                        title: 'file.js',
                        src:newTabBoilerCode,
                        ref: React.createRef()
                    }
                ],
                activeTabIdentifier: newId
            }
        })

        // this._monacoRef.createModel(
        //     'model.js',
        //     'javascript'
        // )
    }

    handleCloseTab = ({ tabIdentifier }) => {
        const tabIndex = this.state.tabs.findIndex(t => t.identifier === tabIdentifier)
        if (tabIndex < 0) {
            return
        }
        const prevTabId = this.state.tabs[tabIndex - 1].identifier
        const newActiveTabId = this.state.activeTabIdentifier === tabIdentifier ? prevTabId : this.state.activeTabIdentifier

        this.setState({
            tabs: this.state.tabs.filter(x => x.identifier !== tabIdentifier),
            activeTabIdentifier: newActiveTabId
        })
    }

    handleFocusTab = ({ tabIdentifier }) => {
        this.setState({
            activeTabIdentifier: tabIdentifier
        })
    }

    handleEditorRef = ({ editorRef, identifier }) => {
        console.log(editorRef)

        this.setState(prevState => {
            return {
                tabs: prevState.tabs.map(tab => {
                    if(tab.identifier === identifier){
                        return { ...tab, ref: editorRef }
                    }
                    return tab
                })
            }
        })
    }

    handleEditorChange = ({ newValue, identifier }) => {
        this.setState(prevState => {
            return {
                tabs: prevState.tabs.map(tab => {
                    if(tab.identifier === identifier){
                        return { ...tab, src: newValue }
                    }
                    return tab
                })
            }
        })
    }

    render() {
        const { tabs, activeTabIdentifier } = this.state
        const tabsLite = tabs.map(x => {
            return { identifier: x.identifier, title: x.title }
        })
        const activeEditor = tabs.find(t => t.identifier === activeTabIdentifier)

        return (
            <RootStyle>
                <TabContainerStyle>
                    <EditorStatusBar
                        tabs={tabsLite}
                        activeTabIdentifier={activeTabIdentifier}
                        onAddTab={this.handleAddTab}
                        onCloseTab={this.handleCloseTab}
                        onFocusTab={this.handleFocusTab}
                    />
                </TabContainerStyle>
                <EditorContainerStyle>
                    {
                        activeEditor &&
                        <Editor
                            width="850"
                            height="100%"
                            code={activeEditor.src}
                            options={{}}
                            identifier={activeEditor.identifier}
                            setEditorValue={this.handleEditorChange}
                            setMonacoRef={this.handleEditorRef}
                        />
                    }

                </EditorContainerStyle>
            </RootStyle>

        );
    }
}

export default EditorContainer