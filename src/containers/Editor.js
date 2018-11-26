import React from 'react'
import styled from 'styled-components'
import MonacoEditor from 'react-monaco-editor';


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
        window.addEventListener("resize", this.resizeEditor);
    }

    componentWillUnmount() {
        window.removeEventListener("resize");
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

    editorDidMount = (editor, monaco) => {
        this.props.setMonacoRef({ editorRef: monaco, tabIdentifier: this.props.identifier })
        editor.focus();
    }

    handleChange = (newCode, e) => {
        this.props.setEditorValue({ newCode, tabIdentifier: this.props.identifier })
    }

    render() {
        const { code, options } = this.props
        const { editorHeight, editorWidth } = this.state
        return (
            <RootStyle ref={this._containerRef} id="container" >
                <MonacoEditor

                    width={editorWidth}
                    height={editorHeight}
                    language="javascript"
                    theme="vs-dark"
                    value={code}
                    options={{
                        selectOnLineNumbers: true,
                        minimap: {
                            enabled: false
                        },
                        language: "javascript",
                        suggest: {
                            filterGraceful: true,
                            localityBonus: true
                        },
                        wordBasedSuggestions: true,
                        snippetSuggestions: true,
                        ...options
                    }}
                    onChange={this.handleChange}
                    editorDidMount={this.editorDidMount}
                />
            </RootStyle>

        );
    }
}

export default Editor