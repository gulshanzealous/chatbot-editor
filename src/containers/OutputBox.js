import React from 'react'
import styled, { css } from 'styled-components'
import accountImage from '../images/accountImage.jpg'
import botImage from '../images/bot.png'
import loaderGif from '../images/loader.gif'

const RootStyle = styled.div`
    align-self:center;
    max-width:100%;
    border-radius:4px;
    display:flex;
    flex-direction: column;
`

const ChatboxStyle = styled.div`
    min-height:25px;
    /* width:100%; */
    margin:10px 0;
    padding:0 10px;
    display:flex;
    ${props => props.isBot && css`
        justify-content:flex-end;
    `}
`

const ImageStyle = styled.img`
    height:30px;
    width:30px;
    border-radius:20px;
    margin:10px 20px;
    ${props => props.isBot && css`
        order:1;
    `}
`

const MessageStyle = styled.div`
    display:flex;
    padding:0 15px;
    /* max-width:50%; */

    flex-flow:row wrap;
    align-items:center;
    background-color:#404040;
    border-radius:8px;

`

const TextStyle = styled.div`
    font-family:'Quicksand';
    color:#d3d3d3;


`

const DummyStyle = styled.div`
    flex:0 0 20px !important;
    /* width:100%; */
    margin:30px 0;
`

class OutputBox extends React.Component {
    constructor(props) {
        super(props)
        this._containerRef = React.createRef()
        this.state = {

        }
    }

    componentDidMount() {
        this.triggerScroll()
    }

    componentDidUpdate(prevProps) {
        if (this.props.processing !== prevProps.processing) {
            this.triggerScroll()
        }
        if (this.props.messages.length !== prevProps.messages.length) {
            this.triggerScroll()
        }
    }

    triggerScroll = () => {
        const scrollHeight = this._containerRef.current.scrollHeight || 600
        const dummyBoxHeight = 60
        this.props.takeScrollToBottom(scrollHeight + dummyBoxHeight)
    }


    render() {
        return (
            <RootStyle ref={this._containerRef}>
                {
                    !!this.props.messages &&
                    !!this.props.messages.length &&
                    this.props.messages.map((msg, i) => {
                        const isBot = msg.agent === 'bot'
                        const givenValue = msg.messageText
                        let text = 'Invalid response.'
                        if(givenValue){
                            if(typeof givenValue !== 'string'){
                                text = JSON.stringify(givenValue)
                            } else {
                                text = givenValue
                            }
                        }
                        return (
                            <ChatboxStyle key={i} isBot={isBot} >
                                <ImageStyle
                                    alt={isBot ? 'Bot' : 'User'}
                                    src={isBot ? botImage : accountImage} isBot={isBot}
                                />
                                <MessageStyle>
                                    <TextStyle>
                                        {text}
                                    </TextStyle>
                                </MessageStyle>
                            </ChatboxStyle>
                        )
                    })
                }
                <DummyStyle >
                    {
                        this.props.processing ?
                            <ChatboxStyle isBot={true} >
                                <ImageStyle src={botImage} isBot={true} />
                                <MessageStyle>
                                    <TextStyle>
                                        <img alt='Bot' src={loaderGif} style={{ height: '20px', width: '45px', padding: 0, backgroundColor: "inherit" }} />
                                    </TextStyle>
                                </MessageStyle>
                            </ChatboxStyle>
                            :
                            null
                    }
                </DummyStyle>
            </RootStyle>
        )
    }
}

export default OutputBox
