import React from 'react'
import styled from 'styled-components'
import { Playground, EditorContainer, Topbar } from '../containers'
// import {connect} from 'react-redux'

const RootStyle = styled.div`
    display:flex;
    flex-flow: column nowrap;
    background-color:#161616;
    color:#fff;
    width:100%;
    height:100vh;
`

const TopbarStyle = styled.div`
    height:60px;
`

const ContentContainerStyle = styled.div`
    width:100%;
    height:100%;
    display:flex;
`

const EditorContainerStyle = styled.div`
    flex:0 0 45%;
`

const PlaygroundContainerStyle = styled.div`
    flex:0 0 54.9%;
`


class Layout extends React.Component{
    constructor(props){
        super(props)
        this.state = {

        }
    }

    render(){
        return (
            <RootStyle>
                <TopbarStyle>
                    <Topbar />
                </TopbarStyle>
                <ContentContainerStyle>
                    <EditorContainerStyle>
                        <EditorContainer />
                    </EditorContainerStyle>
                    <PlaygroundContainerStyle>
                        <Playground />
                    </PlaygroundContainerStyle>
                </ContentContainerStyle>
            </RootStyle>
        )
    }
}

// const mapStateToProps = (store) => {

// }

// const mapActionsToProps = () => {
//     return {}
// }

// export default connect(Layout)(mapStateToProps, mapActionsToProps())

export default Layout