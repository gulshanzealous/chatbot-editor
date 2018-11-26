import React from 'react'
import styled from 'styled-components'
import * as monaco from 'monaco-editor';
import { connect } from 'react-redux'
import { Editor, EditorStatusBar } from '../containers'
import { addTabToEditor, removeTabFromEditor, focusOnTabInEditor, autoSaveCodeToEditor, saveChanges, sendTabSaveState } from '../redux/actions'

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
            editorRef: {}
        }
    }


    handleAddTab = () => {
        this.props.addTabToEditor()
    }

    handleCloseTab = ({ tabIdentifier }) => {
        this.props.removeTabFromEditor({ tabIdentifier })
    }

    handleFocusTab = ({ tabIdentifier }) => {
        this.handleSaveChangesAuto()
        this.props.focusOnTabInEditor({ tabIdentifier })
    }

    handleEditorRef = ({ editorRef }) => {
        this.setState({
            editorRef
        })
    }

    notifyTabSaveState = ({ tabIdentifier, isSaved }) => {
        this.props.sendTabSaveState({ tabIdentifier, isSaved: false })
    }

    handleSaveChangesAuto = () => {
        const { activeTabIdentifier } = this.props
        const { editorRef } = this.state

        const liveValue = editorRef.getValue()
        this.props.autoSaveCodeToEditor({ tabIdentifier: activeTabIdentifier, newCode: liveValue })
    }

    handleSaveChangesManual = () => {
        const { activeTabIdentifier } = this.props
        const { editorRef } = this.state

        const liveValue = editorRef.getValue()
        this.props.saveChanges({ tabIdentifier: activeTabIdentifier, newCode: liveValue })
    }

    render() {
        const { tabs, activeTabIdentifier, loggedIn } = this.props
        const tabsLite = tabs.map(x => {
            return { identifier: x.identifier, title: x.title, saved: x.saved, lastSave: x.lastSave }
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
                        onSaveChanges={this.handleSaveChangesManual}
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
                            loggedIn={loggedIn}
                            identifier={activeEditor.identifier}
                            editorRef={this.state.editorRef}
                            setMonacoRef={this.handleEditorRef}
                            onDirtyState={this.notifyTabSaveState}
                            onSaveChanges={this.handleSaveChangesAuto}
                        />
                    }
                </EditorContainerStyle>
            </RootStyle>

        );
    }
}

const mapStateToProps = ({ editorStore, appStore }) => {
    const { tabs, activeTabIdentifier, editorRef } = editorStore
    const { loggedIn } = appStore
    return {
        tabs, activeTabIdentifier, editorRef,
        loggedIn
    }
}

const mapActionsToProps = () => {
    return {
        addTabToEditor, removeTabFromEditor, focusOnTabInEditor, autoSaveCodeToEditor, saveChanges, sendTabSaveState
    }
}

export default connect(mapStateToProps, mapActionsToProps())(EditorContainer)
