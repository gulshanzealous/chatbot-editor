import React from 'react'
import styled from 'styled-components'
import * as monaco from 'monaco-editor';

const RootStyle = styled.div`
    flex: 1 1 0%;
    height:100%;
`


class MonacoEditor extends React.Component {
    
    componentDidMount() {
        this.props.setRootRef(this._node)
    }

    componentDidUpdate(prevProps){
        if(this.props._model !== prevProps._model && this.props._model && this.props._editor){
            const model = this.props._model
            // console.log(model)
            // console.log(this.props)
            // console.log(this.props._editor)
            this.updateCode()

            this._subscription = model.onDidChangeContent(() => {
                this.props.onValueChange(model.getValue());
            });
        }

        if(this.props.value !== prevProps.value && this.props._model && this.props._editor){
            this.updateCode()
        }
    }

    updateCode = () => {
        const { value } = this.props;
        // console.log(value)
        const options= {
            theme: "vs-dark",
            selectOnLineNumbers: true,
            minimap: {
                enabled: false
            },
        }
        this.props._editor.updateOptions(options);
        
        const model = this.props._model
        
        if (value !== model.getValue()) {
            model.pushEditOperations(
            [],
            [
                {
                range: model.getFullModelRange(),
                text: value,
                },
            ]
            );
        }
    }

    componentWillUnmount() {
        this._subscription && this._subscription.dispose();
    }

    render() {
        return (
            <RootStyle ref={c => this._node = c} />
        )
    }
}

export default MonacoEditor








// import React from 'react'
// import styled from 'styled-components'
// import * as monaco from 'monaco-editor';

// const RootStyle = styled.div`
//     width:100%;
//     height:100%;
//     display:flex;
//     flex-flow: column nowrap;
//     justify-content:center;
//     align-items:center;
// `


// class MonacoEditor extends React.Component {
    
//     componentDidMount() {
//         const { path, value, language, options } = this.props;
//         const model = monaco.editor.createModel(value, language, path);
//         this._editor = monaco.editor.create(this._node, options);
//         this._editor.setModel(model);
//         this._editor.focus()

//         this._subscription = model.onDidChangeContent(() => {
//             this.props.onValueChange(model.getValue());
//         });
//     }

//     componentDidUpdate(prevProps) {
//         const { path, value, language, onValueChange, options } = this.props;
      
//         this._editor.updateOptions(options);
      
//         const model = this._editor.getModel();
      
//         if (value !== model.getValue()) {
//           model.pushEditOperations(
//             [],
//             [
//               {
//                 range: model.getFullModelRange(),
//                 text: value,
//               },
//             ]
//           );
//         }
//       }

//     componentWillUnmount() {
//         this._editor && this._editor.dispose();
//     }

//     render() {
//         return (
//             <RootStyle>
//                 <RootStyle ref={c => this._node = c} />
//             </RootStyle>
//         )
//     }
// }

// export default MonacoEditor