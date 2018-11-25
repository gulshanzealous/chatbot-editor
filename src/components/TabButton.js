import React from 'react'
import styled, {css} from 'styled-components'

const RootStyle = styled.div`
    height:100%;
    padding:0px 0px 0 0px;
    cursor:pointer;
    display:flex;
    align-items:center;
    border-radius:5px 5px 0 0;
    border-width:1px 1px 1px 1px;
    border-style:solid;
    border-color:rgba(255,255,255,0.09);
    z-index:100;
    background-color:#161616;
    ${props => props.isTabActive && css`
        border-color: rgba(255,255,255,0.09) rgba(255,255,255,0.09) transparent rgba(255,255,255,0.09);
        padding:0px 0 1px 0px;
        background-color:"#171717";
    `}
`

const TitleStyle = styled.div`
    flex: 1 1 0%;
    padding:0 15px;
    height:100%;
    display:flex;
    justify-content:center;
    align-items:center;
`
const IconContainerStyle = styled.div`
    font-size:1.1em;
    padding:0 10px 0 0px;
    height:100%;
    display:flex;
    justify-content:center;
    align-items:center;
`

const IconStyle = styled.span`

`

class TabButton extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            
        }
    }

    handleClose = () => {
        this.props.onClickClose({
            tabIdentifier: this.props.tabIdentifier
        })
    }

    handleFocus = () => {
        this.props.onClickTab({
            tabIdentifier: this.props.tabIdentifier
        })
    }

    render() {
        return (
            <RootStyle isTabActive={this.props.isTabActive} style={{ ...this.props.styleProps }} >
                <TitleStyle  onClick={this.handleFocus} >
                    {this.props.title}
                </TitleStyle>
                {
                    this.props.showIcon?
                    <IconContainerStyle onClick={this.handleClose} >
                        <IconStyle>
                            &times;
                        </IconStyle>
                    </IconContainerStyle>
                    :
                    null
                }
            </RootStyle>

        );
    }
}

export default TabButton