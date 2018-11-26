import React from 'react'
import { connect } from 'react-redux'
import ReactNotification from "react-notifications-component";
import "react-notifications-component/dist/theme.css";

class NotificationSetup extends React.Component {
    constructor(props) {
        super(props);
        this._notificationDOMRef = React.createRef();
        this.state = {
            
        }
    }

    componentDidMount(){
        this.props.sendNotificationCreator(this.addNotification)
    }

    componentDidUpdate(prevProps){
        if(!prevProps.notification && this.props.notification){
            const { title, message, type, container, duration } = this.props.notification
            this.addNotification({ title, message, type, container, duration })
        }
        if(this.props.notification && prevProps.notification && this.props.notification.id !== prevProps.notification.id){
            const { title, message, type, container, duration } = this.props.notification
            this.addNotification({ title, message, type, container, duration })
        }
    }

    // success, danger, default, info, warning - types
    addNotification = ({ title, message, type, container, duration }) => {
        // console.log(this._notificationDOMRef)
        this._notificationDOMRef.current.addNotification({
            title: title || "Awesomeness",
            message: message || "Awesome Notifications!",
            type: type || "success",
            insert: "top",
            container: container || "top-right",
            animationIn: ["animated", "fadeIn"],
            animationOut: ["animated", "fadeOut"],
            dismiss: { duration: duration || 2000 },
            dismissable: { click: true }
        });
    }

    render() {
        return (
            <div>
                <ReactNotification ref={this._notificationDOMRef} />
            </div>
        );
    }
}


const mapStateToProps = ({ appStore }) => {
    const { notifications } = appStore
    const notification = notifications[notifications.length-1]
    return {
        notification : notification ? notification : null
    }
}

const mapActionsToProps = () => {
    return {}
}

export default connect(mapStateToProps, mapActionsToProps())(NotificationSetup)
