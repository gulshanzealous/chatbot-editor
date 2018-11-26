import React from 'react'
import styled from 'styled-components'
import * as monaco from 'monaco-editor';
import {connect} from 'react-redux'
import { Editor, EditorStatusBar } from '../containers'
import {addTabToEditor, removeTabFromEditor, focusOnTabInEditor, saveRefToEditor, saveCodeToEditor, saveChanges} from '../redux/actions'

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

class EditorContainer extends React.Component {
    constructor(props) {
        super(props);
        this.state = {

        }
    }

    handleAddTab = () => {
        this.props.addTabToEditor()
    }

    handleCloseTab = ({ tabIdentifier }) => {
        this.props.removeTabFromEditor({ tabIdentifier })
    }

    handleFocusTab = ({ tabIdentifier }) => {
        this.props.focusOnTabInEditor({ tabIdentifier })
    }

    handleEditorRef = ({ editorRef, tabIdentifier }) => {
        // this.props.saveRefToEditor({ tabIdentifier, editorRef }) 
    }

    handleEditorChange = ({ newCode, tabIdentifier }) => {
        this.props.saveCodeToEditor({ tabIdentifier, newCode })
    }

    handleSaveChanges = () => {
        this.props.saveChanges({ tabIdentifier: this.props.activeTabIdentifier })
    }

    render() {
        const { tabs, activeTabIdentifier } = this.props
        const tabsLite = tabs.map(x => {
            return { identifier: x.identifier, title: x.title, saved: x.saved }
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
                        onSaveChanges={this.handleSaveChanges}
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

const mapStateToProps = ({ editorStore }) => {
    const { tabs, activeTabIdentifier } = editorStore
    return {
        tabs, activeTabIdentifier
    }
}

const mapActionsToProps = () => {
    return {
        addTabToEditor, removeTabFromEditor, focusOnTabInEditor, saveRefToEditor, saveCodeToEditor, saveChanges
    }
}

export default connect(mapStateToProps, mapActionsToProps())(EditorContainer)
