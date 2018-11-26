import React from 'react'
import styled from 'styled-components'

const RootStyle = styled.div`
    width:100%;
    height:100%;
    display:flex;
    flex-flow: column nowrap;
    justify-content:center;
    align-items:center;
`


class MyComponent extends React.Component {
    constructor(props) {
        super(props);
        this.state = {

        }
    }


    render() {
        return (
            <RootStyle>
            </RootStyle>

        );
    }
}

export default MyComponent