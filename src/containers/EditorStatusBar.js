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
            isStatusBarHovering:false,
            showSaveStatus: false
        }
    }

    componentDidUpdate(prevProps){
        const { tabs, activeTabIdentifier } = this.props
        const focusedTab = tabs.find(t => t.identifier === activeTabIdentifier)
        const lastSaveAgent = focusedTab.lastSave

        if(this.props.tabs !== prevProps.tabs){
            const isAutoSaved = lastSaveAgent === 'auto' ? true : false
            if(isAutoSaved){
                this.setState({
                    showSaveStatus:true
                },()=>{
                    setTimeout((self)=>{
                        self.setState({ showSaveStatus: false })
                    },1500,this)
                })
            }
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

    handleActionButtonClick = () => {
        this.props.onSaveChanges()
    }

    render() {
        const { tabs, activeTabIdentifier } = this.props
        const focusedTab = tabs.find(t => t.identifier === activeTabIdentifier)
        const isSaved = focusedTab.saved
        // const lastSaveAgent = focusedTab.lastSave

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
                {
                    this.state.showSaveStatus?
                    <div style={{ fontSize:'0.8em', alignSelf:'center', opacity:'0.6', padding:'0 10px 0 0' }} >
                        autosaved
                    </div>
                    :
                    null
                }
                <ActionsContainerStyle>
                    {
                        isSaved?
                        <IconButton
                            isActive={false}
                            text={'Sync Changes'}
                            icon={'refresh'}
                            onClick={null}
                            styleProps={{
                                backgroundColor:"#282828",
                                color:"#fff",
                                opacity:'0.6'
                            }}
                        />
                        :
                        <IconButton 
                            isActive={true}
                            text={'Sync Changes'}
                            icon={'refresh'}
                            onClick={this.handleActionButtonClick}
                            styleProps={{
                                backgroundColor:"#447",
                                color:"#fff",
                                cursor:"pointer"
                            }}
                        />
                    }
                </ActionsContainerStyle>
            </RootStyle>
        );
    }
}

export default EditorStatusBar
