import React from 'react'
import styled from 'styled-components'
import * as monaco from 'monaco-editor';
import { connect } from 'react-redux'
import {  EditorStatusBar, MonacoEditor } from '../containers'
import { addTabToEditor, removeTabFromEditor, focusOnTabInEditor, autoSaveCodeToEditor, saveChanges, sendTabSaveState, saveNewModel } from '../redux/actions'
const uuid = require('uuid/v1')

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

const EditorStyle = styled.div`
    height:100%;
    width:100%;
    display:flex;
    overflow-y:hidden;
`

class MonacoContainer extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            editorReady:false,
            modelReferences:[

            ]
        }
    }

    componentDidMount(){
        
    }

    handleRootRef = (_nodeRef) => {
        const options= {
            theme: "vs-dark",
            selectOnLineNumbers: true,
            minimap: {
                enabled: false
            },
        }
        // console.log(options)
        this._editor = monaco.editor.create(_nodeRef, options);

        let allModels = []
        this.props.tabs.forEach(tab => {
            const value = tab.src
            const language = "javascript"
            const path = null

            const model =  monaco.editor.createModel(value, language, path)
            allModels.push({
                model,
                id: model.id
            })
            this.handleNewModel({ tabIdentifier: tab.identifier, model: model.id })
        })

        this._editor.focus()

        this.setState({
            editorReady: true,
            modelReferences: allModels
        })

    }

    componentWillUnmount(){
        this._editor && this._editor.dispose();
    }

    componentDidUpdate(prevProps) {
        if(this.props.loggedIn === false && this.props.loggedIn !== prevProps.loggedIn){
            // this._editor && this._editor.dispose();
        }
        if(this.props.loggedIn === true && this.props.loggedIn !== prevProps.loggedIn){

        }
    }

    handleNewModel = ({ tabIdentifier, model }) => {
        this.props.saveNewModel({ tabIdentifier, model })
    }

    handleAddTab = () => {
        const newId = uuid()
        this.props.addTabToEditor({ tabIdentifier: newId })

        const value = "new tab"
        const language = "javascript"
        const path = null

        const model =  monaco.editor.createModel(value, language, path)
        this.handleNewModel({ tabIdentifier: newId, model: model.id })

        this.setState({
            modelReferences: [...this.state.modelReferences, { model: model, id: model.id }]
        })
    }

    handleCloseTab = ({ tabIdentifier }) => {
        this.props.removeTabFromEditor({ tabIdentifier })

        const relevantTab = this.props.tabs.find(t => t.identifier === tabIdentifier)

        if(this._editor && relevantTab.modelId){
            const activeModelFound = this.state.modelReferences.find(t => t.id === relevantTab.modelId)
            if(!activeModelFound){
                return
            }
            this._editor.getModel(activeModelFound.model).dispose();

            this.setState({
                modelReferences: this.state.modelReferences.filter(x => x.id !== relevantTab.modelId)
            })
        }

    }

    handleFocusTab = ({ tabIdentifier }) => {
        const activeTab = this.props.tabs.find(t => t.identifier === this.props.activeTabIdentifier)
        let activeModel = null
        if(this._editor && activeTab.modelId){
            const activeModelFound = this.state.modelReferences.find(t => t.id === activeTab.modelId)
            if(activeModelFound){
                activeModel = activeModelFound.model
                const liveValue = activeModel.getValue()
                this.handleSaveChangesAuto(liveValue)
            }
        }

        this.props.focusOnTabInEditor({ tabIdentifier })
    }

    handleSaveChangesAuto = (value) => {
        const { activeTabIdentifier } = this.props
        this.props.autoSaveCodeToEditor({ tabIdentifier: activeTabIdentifier, newCode: value })
    }

    handleSaveChangesManual = () => {
        // const { activeTabIdentifier } = this.props
        // const { editorRef } = this.state

        // const liveValue = editorRef.getValue()
        // this.props.saveChanges({ tabIdentifier: activeTabIdentifier, newCode: liveValue })
    }


    render() {
        const { tabs, activeTabIdentifier, loggedIn } = this.props
        const tabsLite = tabs.map(x => {
            return { identifier: x.identifier, title: x.title, saved: x.saved, lastSave: x.lastSave }
        })
        const activeTab = tabs.find(t => t.identifier === activeTabIdentifier)
        let activeModel = null
        if(this._editor && activeTab.modelId){
            const modelFound = this.state.modelReferences.find(t => t.id === activeTab.modelId)
            if(modelFound){
                activeModel = modelFound.model
                this._editor.setModel(activeModel)
            }
        }
        // console.log(activeTab.src)

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

                <EditorStyle>
                    <MonacoEditor
                        setRootRef={this.handleRootRef}
                        _editor={this._editor}
                        _model={activeModel}
                        value={activeTab.src}
                        onValueChange={this.handleSaveChangesAuto}
                    />
                </EditorStyle>
    
            </RootStyle>

        );
    }
}

const mapStateToProps = ({ editorStore, appStore }) => {
    const { tabs, activeTabIdentifier } = editorStore
    const { loggedIn } = appStore
    return {
        tabs, activeTabIdentifier,
        loggedIn
    }
}

const mapActionsToProps = () => {
    return {
        addTabToEditor, removeTabFromEditor, focusOnTabInEditor, autoSaveCodeToEditor, saveChanges, sendTabSaveState, saveNewModel
    }
}

export default connect(mapStateToProps, mapActionsToProps())(MonacoContainer)
