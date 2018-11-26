import React from 'react'
import styled from 'styled-components'
import MonacoEditor from 'react-monaco-editor';
import throttle from 'lodash/throttle'

const RootStyle = styled.div`
    width:100%;
    height:100%;
    display:flex;
    margin:15px 0 0 0;
`

class Editor extends React.Component {
    constructor(props) {
        super(props);
        this._containerRef = React.createRef()
        this.state = {
            editorHeight: '0',
            editorWidth: '0'
        }
    }

    componentDidMount() {
        this.resizeEditor()
        window.addEventListener("resize", this.resizeEditor)
    }

    editorDidMount = (editor, monaco) => {
        editor.setValue(this.props.code)
        this.props.setMonacoRef({ editorRef: editor })
        this.startAutosave(15000)
        editor.focus()
    }

    startAutosave = (timeInMs) => {
        this.backgroundSaveTimer = setInterval((callback) => {
            callback()
        }, timeInMs, this.props.onSaveChanges)
    }

    componentDidUpdate(prevProps) {
        if (this.props.loggedIn === false && prevProps.loggedIn === true) {
            clearInterval(this.backgroundSaveTimer)
            this.props.editorRef.setValue("")
        }
        if (this.props.loggedIn === true && prevProps.loggedIn === false) {
            this.props.editorRef.setValue(this.props.code)
            if (!this.backgroundSaveTimer) {
                this.startAutosave(5000)
            }
        }
        if (this.props.identifier !== prevProps.identifier) {
            this.props.editorRef.setValue(this.props.code)
        }
    }

    componentWillUnmount() {
        clearInterval(this.backgroundSaveTimer)
        window.removeEventListener("resize", this.resizeEditor);
    }

    resizeEditor = () => {
        if (this._containerRef) {
            const { editorHeight, editorWidth } = this.getContainerDimensions()
            this.setState({ editorHeight, editorWidth })
        }
    }

    getContainerDimensions = () => {
        const editorHeight =
            this._containerRef.current.clientHeight ?
                (this._containerRef.current.clientHeight - 20).toString()
                :
                '600'
        const editorWidth = this._containerRef.current.clientWidth ? this._containerRef.current.clientWidth : '800'
        return { editorHeight, editorWidth }
    }

    handleChange = throttle((newCode, e) => {
        if (this.props.code !== newCode) {
            this.props.onDirtyState({ tabIdentifier: this.props.identifier, isSaved: false })
        }
    }, 1000)

    render() {
        const { options } = this.props
        const { editorHeight, editorWidth } = this.state
        return (
            <RootStyle ref={this._containerRef} id="container" >
                <MonacoEditor
                    width={editorWidth}
                    height={editorHeight}
                    language="javascript"
                    theme="vs-dark"
                    // defaultValue={code}
                    options={{
                        selectOnLineNumbers: true,
                        minimap: {
                            enabled: false
                        },
                        language: "javascript",
                        wordBasedSuggestions: true,
                        snippetSuggestions: true,
                        ...options
                    }}
                    onChange={this.handleChange}
                    editorDidMount={this.editorDidMount}
                />
            </RootStyle>
        )
    }
}

export default Editor