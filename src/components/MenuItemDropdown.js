import React from 'react'
import styled, {css} from 'styled-components'
import {MenuItemButton} from '../components'
 
const RootStyle = styled.div`
    height:100%;
    z-index:10;
    cursor:pointer;
`

const HeaderStyle = styled.div`
    padding:0 30px;
    width:150px;
    height:100%;
    display:flex;
    justify-content:space-around;
    align-items:center;
    &:hover{
        background-color:#252525;
    }
    ${props => props.isSubHeader && css`
        border-width:0 1px 1px 1px;
        border-style:solid;
        border-color:rgba(255,255,255,0.09);
        &:hover{
            background-color:#252525;
        }
    `}
`

const HeaderImageStyle = styled.div`
    height:30px;
    width:30px;
`

const HeaderTextStyle = styled.div`

`

const HeaderCaretStyle = styled.div`
    font-size:1.5em;
    padding:0 0 10px 0;
`

class MenuItemDropdown extends React.Component{
    constructor(props){
        super(props)
        this.state = {
            open:false
        }
    }

    handleClickDropdown = () => this.setState((prevState) => {
        return { open: !prevState.open }
    })

    handleCloseDropdown = () => this.setState({ open:false })

    render(){
        return (
            <RootStyle style={{ ...this.props.styleProps }} onClick={this.handleClickDropdown} onMouseLeave={this.handleCloseDropdown} >
                <HeaderStyle>
                    <HeaderImageStyle>
                        <img src={this.props.headerImage} alt={'account'} style={{ display:'flex', height:'100%', width:'100%', borderRadius:'20px' }} />
                    </HeaderImageStyle>
                    <HeaderTextStyle>
                        {this.props.headerText}
                    </HeaderTextStyle>
                    <HeaderCaretStyle>
                        &#8964;
                    </HeaderCaretStyle>
                </HeaderStyle>
                {
                    this.state.open &&
                    this.props.subHeaders &&
                    this.props.subHeaders.length &&
                    this.props.subHeaders.map((item,i) => (
                        <HeaderStyle key={i} isSubHeader={true} >
                            <MenuItemButton
                                text={item.text} 
                                onClick={item.onClick} 
                                styleProps={{ 
                                    ...item.styleProps,

                                }}
                                
                            />
                        </HeaderStyle>
                    ))
                }
            </RootStyle>
        )
    }
}

export default MenuItemDropdown