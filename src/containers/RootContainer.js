import React from 'react'
import styled from 'styled-components'
import { connect } from 'react-redux'
import { Playground, EditorContainer, Topbar } from '../containers'
import NotificationSetup from '../config/NotificationSetup'

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


class Layout extends React.Component {
    constructor(props) {
        super(props)

        this.state = {
            notificationCreator:null
        }
    }

    saveNotificationHandler = (notificationCreator) => {
        this.setState({ notificationCreator })
    }


    render() {
        const { notificationCreator } = this.state
        return (
            <RootStyle>

                <TopbarStyle>
                    <Topbar notificationCreator = {notificationCreator} />
                </TopbarStyle>

                <ContentContainerStyle>
                    <EditorContainerStyle>
                        <EditorContainer notificationCreator={notificationCreator} />
                    </EditorContainerStyle>
                    <PlaygroundContainerStyle>
                        <Playground notificationCreator={notificationCreator} />
                    </PlaygroundContainerStyle>
                </ContentContainerStyle>

                <NotificationSetup sendNotificationCreator={this.saveNotificationHandler} />

            </RootStyle>
        )
    }
}

const mapStateToProps = (store) => {
    return {}
}

const mapActionsToProps = () => {
    return {
        
    }
}

export default connect(mapStateToProps, mapActionsToProps())(Layout)
