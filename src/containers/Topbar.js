import React from 'react'
import styled from 'styled-components'
import {withRouter} from 'react-router-dom'
import {connect} from 'react-redux'
import accountImage from '../images/accountImage.jpg'
import {MenuItemButton, MenuItemDropdown} from '../components'
import {initiateLogout, notifyLoggedIn} from '../redux/actions'

const RootStyle = styled.div`
    width:100%;
    height:100%;
    display:flex;
    border-width:0 0 2px 0px;
    border-style:solid;
    border-color:rgba(255,255,255,0.09);
`
const HeadingStyle = styled.div`
    flex:0 0 20%;
    font-size:1.5em;
    display:flex;
    justify-content:center;
    align-items:center;
    font-family:'AmericanTypewriter';
`

const MenuContainerStyle = styled.div`
    flex: 1 1 0%;
    margin:0 150px 0 0;
    font-size:1em;
    display:flex;
    justify-content:flex-end;
    align-items:center;
    font-family:'Quicksand';
`

class Topbar extends React.Component{
    constructor(props){
        super(props)
        this.state = {

        }
    }

    handleClickLearn = (e) => {
        e.preventDefault()
        // this.props.history.push('/learn-to-code')
    }

    handleClickDocs = (e) => {
        e.preventDefault()
        // this.props.history.push('/docs')
    }

    handleClickCoins = (e) => {
        e.preventDefault()
        // this.props.history.push('/coins')
    }

    handleClickCredits = (e) => {
        e.preventDefault()
        // this.props.history.push('/credits')
    }

    handleClickAuth = (e) => {
        // e.preventDefault()
        if(this.props.loggedIn){
            return this.props.initiateLogout()
        }
        this.props.notifyLoggedIn()
        // logout operation execution
        // this.props.history.push('/login')
    }

    render(){
        return (
            <RootStyle>
                <HeadingStyle>
                    Chatbot Playground
                </HeadingStyle>
                <MenuContainerStyle>
                    <MenuItemButton 
                        text={'Learn Chatbots'} 
                        onClick={this.handleClickLearn}
                        styleProps={{}}
                    />
                    <MenuItemButton 
                        text={'Docs'} 
                        onClick={this.handleClickDocs} 
                        styleProps={{}}
                    />
                    <MenuItemDropdown 
                        headerText={'Account'} 
                        headerImage={accountImage}
                        subHeaders={[
                            /* 
                            ADD ANY DROPDOWN ITEM HERE IF REQUIRED IN THE FOLLOWING FORMAT
                            */
                            {
                                text:'Coins',
                                onClick:this.handleClickCoins,
                                styleProps:{}
                            },
                            {
                                text:'Credits',
                                onClick:this.handleClickCredits,
                                styleProps:{}
                            },
                            {
                                text:`${this.props.loggedIn? 'Logout' : 'Login'}`,
                                onClick:this.handleClickAuth,
                                styleProps:{}
                            }

                        ]}
                        styleProps={{}}
                    />
                </MenuContainerStyle>
            </RootStyle>
        )
    }
}


const mapStateToProps = ({appStore}) => {
    const {loggedIn} = appStore
    return {loggedIn}
}

const mapActionsToProps = () => {
    return {
        initiateLogout, notifyLoggedIn
    }
}

export default withRouter(connect(mapStateToProps, mapActionsToProps())(Topbar))