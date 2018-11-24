import React from 'react'
import styled from 'styled-components'
import {connect} from 'react-redux'
import {OutputBox} from '../containers'
import {InputComponent} from '../components'
import {sendMessageCommand} from '../redux/actions'
import PerfectScrollbar from 'react-perfect-scrollbar'
import 'react-perfect-scrollbar/dist/css/styles.css';


const RootStyle = styled.div`
    width:100%;
    height:100%;
    border-width:0 0px 0px 1px;
    border-style:solid;
    border-color:rgba(255,255,255,0.09);
    display:flex;
    flex-flow:column nowrap;
    align-items:center;
`

const MainBoxStyle = styled.div`
    height:60%;
    width:65%;
    margin:12% 0 0 0;
    display:flex;
    flex-flow:column;
    justify-content:space-between;
`
const OutputBoxStyle = styled.div`
    flex:0 0 75%;
    overflow: hidden;
    box-shadow: 0 2px 4px 4px rgba(0, 0, 0, 0.08);
    background-color:#1f1f1f;

`
const TypingBoxStyle = styled.div`
    flex:0 0 15%;
`


class Playground extends React.Component{
    constructor(props){
        super(props)
    
        this.state = {
            containerHeight:0
        }
    }

    getBoxHeight = (height) => {
        if(this._scrollRef){
            this._scrollRef.scrollTop = height
        } else {
            this.setState({
                containerHeight: height
            })
        }
    }

    componentDidMount = () => {
        if(this._scrollRef){
            this._scrollRef.scrollTop = this.state.containerHeight
        }
    }

    componentDidUpdate = () => {
        if(this._scrollRef){
            this._scrollRef.scrollTop = this.state.containerHeight
        }
    }

    handleMessageSubmit = ({ command }) => {
        this.props.sendMessageCommand({ userMessage: command })
    }

    render(){

        return (
            <RootStyle>
                <MainBoxStyle>
                    <OutputBoxStyle >
                        <PerfectScrollbar containerRef={ref => this._scrollRef = ref} >
                            <OutputBox
                                messages={this.props.messages}
                                processing={this.props.processing}
                                processingError={this.props.processingError}
                                getBoxHeight={this.getBoxHeight}
                            />
                        </PerfectScrollbar>
                    </OutputBoxStyle>
                    <TypingBoxStyle>
                        <InputComponent
                            placeholder={'Type message here... '}
                            onSubmit={this.handleMessageSubmit}
                            stylePropsContainer={{
                                borderRadius:'4px'
                            }}
                            stylePropsInput={{
                                backgroundColor:'#1f1f1f',
                                borderRadius:'4px',
                                boxShadow: "0 2px 4px 4px rgba(0, 0, 0, 0.08)"
                            }}
                        />
                    </TypingBoxStyle>
                </MainBoxStyle>
            </RootStyle>
        )
    }
}

const mapStateToProps = ({messageStore}) => {
    const { messages,processing,processingError } = messageStore
    return {
        messages, processing, processingError
    }
}

const mapActionsToProps = () => {
    return {
        sendMessageCommand
    }
}

export default connect(mapStateToProps, mapActionsToProps())(Playground)
