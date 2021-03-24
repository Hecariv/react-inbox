import React, { Component } from "react";
import Toolbar from "./Toolbar"
import messagesReact from "./main"

class Message extends Component {
    constructor() {
        super()
        this.state = { messages: [] }

    }

    async componentDidMount() {
        const response = await fetch("http://localhost:8082/api/messages");
        const json = await response.json()
        this.setState({messages: json})
    }

    async postMessage(item) {
        const response = await fetch("http://localhost:8082/api/messages", {
            method: "POST",
            body: JSON.stringify(item),
            headers: {
                'Content-Type': 'application/json',
                'Accept': 'application/json',
            }
        })
        const message = await response.json() 
        this.setState({messages: [...this.state.messages, message]})

    }

    async patchReadMessages(ids) {
        const response = await fetch("http://localhost:8082/api/messages", {
            method:"PATCH",
            body: JSON.stringify({messageIds: ids, command: "read", read: true}),
            headers: {
                'Content-Type': 'application/json',
                'Accept': 'application/json',
            }
        })
        const updatedMessages = await response.json()
        this.setState({messages: [...this.state.messages, updatedMessages]})
    }

    async patchUnreadMessages(ids) {
        const response = await fetch("http://localhost:8082/api/messages", {
            method:"PATCH",
            body: JSON.stringify({messageIds: ids, command: "read", read: false}),
            headers: {
                'Content-Type': 'application/json',
                'Accept': 'application/json',
            }
        })
        const updatedMessages = await response.json()
        this.setState({messages: [...this.state.messages, updatedMessages]})
    }


    async patchStarredMessages(ids) {
        const response = await fetch(`http://localhost:8082/api/messages`, {
            method:"PATCH",
            body: JSON.stringify({messageIds: ids, "command": "star", "starred": true}),
            headers: {
                'Content-Type': 'application/json',
                'Accept': 'application/json',
            }
        })
        const updatedMessages = await response.json()
        this.setState({messages: [...this.state.messages, updatedMessages]})
    }




    starMessage = (currentMessage) => {
        console.log(currentMessage);
        let newArr = this.state.messages.map(msg => msg.id === currentMessage.id ? { ...msg, starred: true} : msg)
        this.setState({ messages: newArr });
        const ids = (newArr.filter(msg => msg.starred).map(msg => msg.id))
        this.patchStarredMessages(ids)
        console.log(ids);
    }

    checkMessage = (currentMessage) => {
        const newArr = this.state.messages.map(msg => msg.id === currentMessage.id ? { ...msg, selected: !msg.selected } : msg);
        this.setState({ messages: newArr });
    }

    markAsRead = (list) => {
        const readMessages = list.filter(message => message.selected);
        const newArr = this.state.messages.map(msg => readMessages.includes(msg) ? { ...msg, read: true } : msg);
        this.setState({ messages: newArr });
        const ids = (newArr.filter(msg => msg.read).map(msg => msg.id))
        this.patchReadMessages(ids)
    
    }

    markAsUnread = (list) => {
        const readMessages = list.filter(message => message.selected);
        const newArr = this.state.messages.map(msg => readMessages.includes(msg) ? { ...msg, read: false } : msg);
        this.setState({ messages: newArr });
        const ids = (newArr.filter(msg => !msg.read).map(msg => msg.id))
        this.patchUnreadMessages(ids)
    }

    deleteMessages = (list) => {
        const messagesToDelete = list.filter(message => message.selected);
        this.setState(prevState => ({ messages: prevState.messages.filter(msg => !messagesToDelete.includes(msg)) }));
    }

    addLabel = (label) => {
        const messageToLabel = this.state.messages.filter(message => message.selected).filter(message => !message.labels.includes(label));
        const newArr = this.state.messages.map(msg => messageToLabel.includes(msg) ? {...msg, labels : msg.labels.concat(label)} : msg) 
        this.setState({messages: newArr})
    }

    removeLabel = (labelToRemove) => {
        const messageToRemoveLabel = this.state.messages.filter(message => message.selected).filter(message => message.labels.includes(labelToRemove));
        const newArr = this.state.messages.map(msg => messageToRemoveLabel.includes(msg) ? {...msg, labels: msg.labels.filter(msg => !msg.includes(labelToRemove))} : msg)
        this.setState({messages: newArr})
    }

    changeMsgsStatus = (list) => {
        let newArr = []
        const messagesToSelect = list.filter(message => !message.selected)
        if (messagesToSelect.length === 0) {
            newArr = this.state.messages.map(msg => ({...msg, selected: false}))
        } else {
            newArr = this.state.messages.map(msg => messagesToSelect.includes(msg) ? {...msg, selected: true} : msg )
        }
        this.setState({messages: newArr})
    }

    messages

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
                    postMessage={this.postMessage}
                />
                {this.state.messages.map(currentMessage =>
                    <div key={currentMessage.id} className={`row message ${currentMessage.read ? 'read' : 'unread'} ${currentMessage.selected ? 'selected' : ""}`}>
                        <div className="col-xs-1">
                            <div className="row">
                                <div className="col-xs-2">
                                    <input type="checkbox" onChange={() => this.checkMessage(currentMessage)} checked={currentMessage.selected ? true : false} />
                                </div>
                                <div className="col-xs-2">
                                    <i onClick={() => this.starMessage(currentMessage)} className={`star fa ${currentMessage.starred ? 'fa-star' : 'fa-star-o'}`}></i>
                                </div>
                            </div>
                        </div>
                        <div className="col-xs-11">
                            {currentMessage.labels.map((label, key) => <span key={key} className="label label-warning">{label}</span>)}
                            <a href="#">{currentMessage.subject}</a>
                        </div>
                    </div>
                )}
                <button onClick={this.patchMessages}>Hi</button>
            </div>

        );
    };
}

export default Message;