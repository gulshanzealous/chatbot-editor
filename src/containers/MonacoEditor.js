import React from 'react'
import styled from 'styled-components'

const RootStyle = styled.div`
    flex: 1 1 0%;
    display:flex;
    height:100%;
`


class MonacoEditor extends React.PureComponent {


    componentDidMount() {
        this.props.setRootRef(this._node)


        // this.resizeEditor()
        // window.addEventListener("resize", this.resizeEditor)
    }


    componentDidUpdate(prevProps){
        if(this.props._model !== prevProps._model && this.props._model && this.props._editor){
            const model = this.props._model
            this.updateCode()

            this.startAutosave(15000)

            this._subscription = model.onDidChangeContent(() => {
                this.props.notifyChange({ tabIdentifier: this.props.identifier })
                // this.props.sendTabSaveState(model.getValue());
            });
        }

        if(this.props.value !== prevProps.value && this.props._model && this.props._editor){
            this.updateCode()
        }

        if (this.props.loggedIn === false && prevProps.loggedIn === true) {
            clearInterval(this.backgroundSaveTimer)
        }
        if (this.props.loggedIn === true && prevProps.loggedIn === false) {
            if (!this.backgroundSaveTimer) {
                this.startAutosave(15000)
            }
        }
    }

    startAutosave = (timeInMs) => {
        this.backgroundSaveTimer = setInterval((model,callback) => {
            callback(model.getValue())
        }, timeInMs,this.props._model ,this.props.onValueChange)
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
        // window.removeEventListener("resize", this.resizeEditor);
    }



    render() {
        // console.log(this.props.value)
        return (
            <RootStyle  ref={c => this._node = c} 
            />
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