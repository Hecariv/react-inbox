import React, { Component } from "react";
import { messages } from "./Messages"
import Toolbar from "./Toolbar"

class Message extends Component {
    constructor() {
        super()
        this.state = { messages }

    }

    starMessage = (currentMessage) => {
        let newArr = this.state.messages.map(msg => msg.id === currentMessage.id ? { ...msg, star: !msg.star } : msg)
        this.setState({ messages: newArr });
    }

    checkMessage = (currentMessage) => {
        const newArr = this.state.messages.map(msg => msg.id === currentMessage.id ? { ...msg, isSelected: !msg.isSelected } : msg);
        this.setState({ messages: newArr });
    }

    markAsRead = (list) => {
        const readMessages = list.filter(message => message.isSelected);
        const newArr = this.state.messages.map(msg => readMessages.includes(msg) ? { ...msg, isRead: true } : msg);
        this.setState({ messages: newArr });

    }

    markAsUnread = (list) => {
        const readMessages = list.filter(message => message.isSelected);
        const newArr = this.state.messages.map(msg => readMessages.includes(msg) ? { ...msg, isRead: false } : msg);
        this.setState({ messages: newArr });
    }

    deleteMessages = (list) => {
        const messagesToDelete = list.filter(message => message.isSelected);
        this.setState(prevState => ({ messages: prevState.messages.filter(msg => !messagesToDelete.includes(msg)) }));
    }

    addLabel = (label) => {
        const messageToLabel = this.state.messages.filter(message => message.isSelected).filter(message => !message.labels.includes(label));
        const newArr = this.state.messages.map(msg => messageToLabel.includes(msg) ? {...msg, labels : msg.labels.concat(label)} : msg) 
        this.setState({messages: newArr})
    }

    removeLabel = (labelToRemove) => {
        const messageToRemoveLabel = this.state.messages.filter(message => message.isSelected).filter(message => message.labels.includes(labelToRemove));
        const newArr = this.state.messages.map(msg => messageToRemoveLabel.includes(msg) ? {...msg, labels: msg.labels.filter(msg => !msg.includes(labelToRemove))} : msg)
        this.setState({messages: newArr})
    }

    changeMsgsStatus = (list) => {
        let newArr = []
        const messagesToSelect = list.filter(message => !message.isSelected)
        if (messagesToSelect.length === 0) {
            newArr = this.state.messages.map(msg => ({...msg, isSelected: false}))
        } else {
            newArr = this.state.messages.map(msg => messagesToSelect.includes(msg) ? {...msg, isSelected: true} : msg )
        }
        this.setState({messages: newArr})
    }

    render() {
        return (
            <div className="row">
                <Toolbar
                    messages={this.state.messages}
                    markAsRead={this.markAsRead}
                    markAsUnread={this.markAsUnread}
                    deleteMessages={this.deleteMessages} 
                    addLabel={this.addLabel}
                    removeLabel={this.removeLabel}
                    changeMsgsStatus={this.changeMsgsStatus}
                    showCompose={this.showCompose}
                />
                {this.state.messages.map(currentMessage =>
                    <div key={currentMessage.id} className={`row message ${currentMessage.isRead ? 'read' : 'unread'} ${currentMessage.isSelected ? 'selected' : ""}`}>
                        <div className="col-xs-1">
                            <div className="row">
                                <div className="col-xs-2">
                                    <input type="checkbox" onChange={() => this.checkMessage(currentMessage)} checked={currentMessage.isSelected ? true : false} />
                                </div>
                                <div className="col-xs-2">
                                    <i onClick={() => this.starMessage(currentMessage)} className={`star fa ${currentMessage.star ? 'fa-star' : 'fa-star-o'}`}></i>
                                </div>
                            </div>
                        </div>
                        <div className="col-xs-11">
                            {currentMessage.labels.map(label => <span className="label label-warning">{label}</span>)}
                            <a href="#">{currentMessage.message}</a>
                        </div>
                    </div>
                )}
            </div>

        );
    };
}

export default Message;