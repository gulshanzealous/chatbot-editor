import React from 'react'
import styled from 'styled-components'

const RootStyle = styled.div`
    padding:0 50px;
    height:100%;
    cursor:pointer;
    display:flex;
    justify-content:center;
    align-items:center;

    &:hover{
        background-color:#252525;
    }
`


class MenuItemButton extends React.Component{
    constructor(props){
        super(props)
        this.state = {

        }
    }

    render(){
        return (
            <RootStyle style={{ ...this.props.styleProps }} onClick={this.props.onClick} >
                {this.props.text}
            </RootStyle>
        )
    }
}

export default MenuItemButton