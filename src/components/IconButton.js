import React from 'react'
import styled from 'styled-components'

const RootStyle = styled.div`
    width:100%;
    height:100%;
    padding:3px 0;
    border-radius:2px;
    cursor:pointer;
    display:flex;
    justify-content:space-evenly;
    align-items:center;
`

const IconContainer = styled.div`
    font-size:1.3em;
`
const TextContainer = styled.div`
`

class IconButton extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            
        }
    }

    handleClick = (e) => {
        e.preventDefault()
        this.props.onClick && this.props.onClick()
    }

    render() {
        const icon = this.props.icon === 'refresh' ? null : this.props.icon
        return (
            <RootStyle style={{ ...this.props.styleProps }} isActive={this.props.isActive} 
                onClick={this.handleClick}
            >
                {
                    icon?
                    <IconContainer>
                        {icon}
                    </IconContainer>
                    :
                    <IconContainer>
                        &#8635;
                    </IconContainer>
                }
                <TextContainer>
                    {
                        this.props.text
                    }
                </TextContainer>
            </RootStyle>

        );
    }
}

export default IconButton