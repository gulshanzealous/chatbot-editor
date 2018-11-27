import React from 'react'
import styled from 'styled-components'
import { connect } from 'react-redux'
import { Playground, EditorContainer, Topbar, MonacoContainer } from '../containers'
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
    display:grid;
    grid-template-columns:1fr 1fr;
    grid-template-rows:1fr;
`

const EditorContainerStyle = styled.div`
    grid-column: 1/2 !important;
    grid-row:1/2;
    display:flex;
`

const PlaygroundContainerStyle = styled.div`
    grid-column:2/3 ;
    grid-row:1/2;
    display:flex;
    /* max-width:50% !important; */

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
                        {/* <EditorContainer notificationCreator={notificationCreator} /> */}
                        <MonacoContainer />
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
