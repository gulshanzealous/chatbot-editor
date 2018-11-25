import React from 'react'
import styled from 'styled-components'
import {IconButton, TabButton} from '../components'


const RootStyle = styled.div`
    width:100%;
    height:100%;
    font-family:'Quicksand';
    display:flex;
    justify-content:space-between;
`
const TabsContainerStyle = styled.div`
    flex:1 1 0%;
    display:flex;
    margin:10px 10px 1px 20px;
`

const ActionsContainerStyle = styled.div`
    flex:0 0 180px;
    align-self: center;
    margin:5px 40px 5px 0;
`

class EditorStatusBar extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            isStatusBarHovering:false
        }
    }

    handleClickClose = ({ tabIdentifier }) => {
        this.props.onCloseTab({ tabIdentifier })
    }

    handleClickAdd = () => {
        this.props.onAddTab()
    }

    handleClickTab = ({ tabIdentifier }) => {
        this.props.onFocusTab({ tabIdentifier })
    }

    handleMouseEnter = () => {
        this.setState({
            isStatusBarHovering:true
        })
    }
    handleMouseLeave = () => {
        this.setState({
            isStatusBarHovering:false
        })
    }

    render() {
        const { tabs, activeTabIdentifier, isFocusedTabUnsaved } = this.props
        return (
            <RootStyle onMouseEnter={this.handleMouseEnter} onMouseLeave={this.handleMouseLeave} >
                <TabsContainerStyle>
                    {
                        tabs &&
                        tabs.length &&
                        tabs.map((tab, i) => {
                            const isTabActive = activeTabIdentifier === tab.identifier ? true : false
                            return(
                                <TabButton
                                    isTabActive={isTabActive}
                                    title={tab.title}
                                    key={i}
                                    showIcon={i !== 0 ? true : false}
                                    tabIdentifier={tab.identifier}
                                    onClickTab={this.handleClickTab}
                                    onClickClose={this.handleClickClose}
                                    styleProps={{
                                        backgroundColor:`${isTabActive}? "#171717":"#161616"`,
                                        color:"#fff",
                                        alignItems:'flex-end'
                                    }}
                                />
                            )
                        })
                    }
                    <TabButton
                        title='&#43;'
                        onClickTab={this.handleClickAdd}
                        styleProps={{
                            backgroundColor:"#171717",
                            color:"#fff",
                            alignItems:'flex-end',
                            fontWeight:600,
                            fontSize:'1.1em',
                            border:'none',
                            padding:"0 1px"
                        }}
                    />
                </TabsContainerStyle>
                <ActionsContainerStyle>
                    {
                        isFocusedTabUnsaved || "isFocusedTabUnsaved"?
                        <IconButton 
                            isActive={true}
                            text={'Apply Changes'}
                            icon={'refresh'}
                            styleProps={{
                                backgroundColor:"#447",
                                color:"#fff",
                                cursor:"pointer"
                            }}
                        />
                        :
                        <IconButton
                            isActive={false}
                            text={'Apply Changes'}
                            icon={'refresh'}
                            styleProps={{
                                backgroundColor:"#282828",
                                color:"#fff",
                                opacity:'0.6'
                            }}
                        />
                    }
                </ActionsContainerStyle>
            </RootStyle>
        );
    }
}

export default EditorStatusBar
