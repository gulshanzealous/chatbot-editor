import React from 'react'
import styled from 'styled-components'

const RootStyle = styled.div`
    width:100%;
    height:100%;
    display:flex;
`
const InputStyle = styled.input`
    width:100%;
    height:100%;
    padding:0 40px;
    font-size:1.1em;
    border:none;
    font-family:'Quicksand';

    &:active{
        outline:none
    }
    &:focus{
        outline:none;
    }
`

class InputComponent extends React.Component{
    constructor(props){
        super(props)
        this.state = {
            command:''
        }
    }

    handleChange = (e) => {
        const { name, value } = e.target
        this.setState({
            [name]: value
        })
    }

    handleKeyPress = (e) => {
        if(e.key === 'Enter'){
            this.props.onSubmit && this.props.onSubmit({ command: this.state.command})
            this.setState({ command:'' })
        }
    }

    render(){
        return (
            <RootStyle style={{ ...this.props.stylePropsContainer }} >
                <InputStyle 
                    style={{ ...this.props.stylePropsInput }}
                    value={this.state.command}
                    placeholder={this.props.placeholder}
                    name='command' 
                    onChange={this.handleChange}
                    onKeyPress={this.handleKeyPress}
                />
            </RootStyle>
        )
    }
}

export default InputComponent