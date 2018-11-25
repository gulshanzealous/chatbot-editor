import React from 'react'
import styled from 'styled-components'
import MonacoEditor from 'react-monaco-editor';

const RootStyle = styled.div`
    width:100%;
    height:100%;
    display:flex;
    flex-flow: column nowrap;
    justify-content:center;
    align-items:center;
`


class Editor extends React.Component{
    constructor(props) {
        super(props);
        this.state = {
          code: '// type your code...',
        }
      }
      editorDidMount = (editor, monaco) => {
        // console.log('editorDidMount', editor);
        editor.focus();
      }
      onChange = (newValue, e) => {
        // console.log('onChange', newValue, e);
      }
      render() {
        const code = this.state.code;
        const options = {
          selectOnLineNumbers: true
        };
        return (
            <RootStyle>
                <MonacoEditor
                    width="800"
                    height="600"
                    language="javascript"
                    theme="vs-dark"
                    value={code}
                    options={options}
                    onChange={this.onChange}
                    editorDidMount={this.editorDidMount}
                />
            </RootStyle>
          
        );
      }
}

export default Editor