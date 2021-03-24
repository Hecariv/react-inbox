import React, { Component } from "react";
import Toolbar from "./Toolbar"


class Message extends Component {
    constructor(props) {
        super(props)
        this.state = { messages: [] }

        this.postMessage = this.postMessage.bind(this)
        this.deleteMsgs = this.deleteMsgs.bind(this)

    }

    async componentDidMount() {
        const response = await fetch("http://localhost:8082/api/messages");
        const json = await response.json()
        this.setState({messages: json})
    }

    async addDevLabel(ids) {
        const response = await fetch("http://localhost:8082/api/messages", {
            method:"PATCH",
            body: JSON.stringify({messageIds: ids, command: "addLabel", "label": "dev"}),
            headers: {
                'Content-Type': 'application/json',
                'Accept': 'application/json',
            }
        })
        const updatedMessages = await response.json()
        this.setState({messages: updatedMessages})
    }

    async removePersonalLabel(ids) {
        const response = await fetch("http://localhost:8082/api/messages", {
            method:"PATCH",
            body: JSON.stringify({messageIds: ids, command: "removeLabel", "label": "personal"}),
            headers: {
                'Content-Type': 'application/json',
                'Accept': 'application/json',
            }
        })
        const updatedMessages = await response.json()
        this.setState({messages: updatedMessages})
    }

    async removeGschoolLabel(ids) {
        const response = await fetch("http://localhost:8082/api/messages", {
            method:"PATCH",
            body: JSON.stringify({messageIds: ids, command: "removeLabel", "label": "gschool"}),
            headers: {
                'Content-Type': 'application/json',
                'Accept': 'application/json',
            }
        })
        const updatedMessages = await response.json()
        this.setState({messages: updatedMessages})
    }

    async removeDevLabel(ids) {
        const response = await fetch("http://localhost:8082/api/messages", {
            method:"PATCH",
            body: JSON.stringify({messageIds: ids, command: "removeLabel", "label": "dev"}),
            headers: {
                'Content-Type': 'application/json',
                'Accept': 'application/json',
            }
        })
        const updatedMessages = await response.json()
        this.setState({messages: updatedMessages})
    }

    async addPersonalLabel(ids) {
        const response = await fetch("http://localhost:8082/api/messages", {
            method:"PATCH",
            body: JSON.stringify({messageIds: ids, command: "addLabel", "label": "personal"}),
            headers: {
                'Content-Type': 'application/json',
                'Accept': 'application/json',
            }
        })
        const updatedMessages = await response.json()
        this.setState({messages: updatedMessages})
    }

    async addGschoolLabel(ids) {
        const response = await fetch("http://localhost:8082/api/messages", {
            method:"PATCH",
            body: JSON.stringify({messageIds: ids, command: "addLabel", "label": "gschool"}),
            headers: {
                'Content-Type': 'application/json',
                'Accept': 'application/json',
            }
        })
        const updatedMessages = await response.json()
        this.setState({messages: updatedMessages})
    }

    async postMessage (item) {
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
        this.setState({messages: updatedMessages})
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
        this.setState({messages: updatedMessages})
    }


    async patchStarredMessages(ids) {
        const response = await fetch("http://localhost:8082/api/messages", {
            method:"PATCH",
            body: JSON.stringify({"messageIds": ids, "command": "star", "star": true}),
            headers: {
                'Content-Type': 'application/json',
                'Accept': 'application/json',
            }
        })
        const updatedMessages = await response.json()
        this.setState({messages: updatedMessages})
    }

    async deleteMsgs(ids) {
        const response = await fetch("http://localhost:8082/api/messages", {
            method:"PATCH",
            body: JSON.stringify({"messageIds": ids, "command": "delete"}),
            headers: {
                'Content-Type': 'application/json',
                'Accept': 'application/json',
            }
        })
        const updatedMessages = await response.json()
        console.log(updatedMessages);
        this.setState({messages: updatedMessages})
    }




    starMessage = (currentMessage) => {
        let newArr = this.state.messages.map(msg => msg.id === currentMessage.id ? { ...msg, starred: true} : msg)
        const ids = (newArr.filter(msg => msg.starred).map(msg => msg.id))
        this.patchStarredMessages(ids)

    }

    checkMessage = (currentMessage) => {
        const newArr = this.state.messages.map(msg => msg.id === currentMessage.id ? { ...msg, selected: !msg.selected } : msg);
        this.setState({ messages: newArr });
    }

    markAsRead = (list) => {
        const readMessages = list.filter(message => message.selected);
        const newArr = this.state.messages.map(msg => readMessages.includes(msg) ? { ...msg, read: true } : msg);
        const ids = (newArr.filter(msg => msg.read).map(msg => msg.id))
        this.patchReadMessages(ids)
    
    }

    markAsUnread = (list) => {
        const readMessages = list.filter(message => message.selected);
        const newArr = this.state.messages.map(msg => readMessages.includes(msg) ? { ...msg, read: false } : msg);

        const ids = (newArr.filter(msg => !msg.read).map(msg => msg.id))
        this.patchUnreadMessages(ids)
    }

    deleteMessages = (list) => {
        const messagesIdToDelete = list.filter(message => message.selected).map(msg => msg.id); 
        this.deleteMsgs(messagesIdToDelete) 
        
    }

    addLabel = (label) => {
        const messageToLabel = this.state.messages.filter(message => message.selected).filter(message => !message.labels.includes(label));
        const newArr = this.state.messages.map(msg => messageToLabel.includes(msg) ? {...msg, labels : msg.labels.concat(label)} : msg)
        const devLabels = newArr.filter(msg => msg.labels.includes("dev")).map(msg => msg.id)
        const personalLabels = newArr.filter(msg => msg.labels.includes("personal")).map(msg => msg.id)
        const gschoolLabels = newArr.filter(msg => msg.labels.includes("gschool")).map(msg => msg.id)

        this.addDevLabel(devLabels)
        this.addGschoolLabel(gschoolLabels)
        this.addPersonalLabel(personalLabels)
       
    }

    removeLabel = (labelToRemove) => {
        const messageToRemoveLabel = this.state.messages.filter(message => message.selected).filter(message => message.labels.includes(labelToRemove));
        const devLabels = messageToRemoveLabel.filter(msg => msg.labels.includes("dev")).map(msg => msg.id)
        const personalLabels = messageToRemoveLabel.filter(msg => msg.labels.includes("personal")).map(msg => msg.id)
        const gschoolLabels = messageToRemoveLabel.filter(msg => msg.labels.includes("gschool")).map(msg => msg.id)
        if (labelToRemove === "dev") {
            this.removeDevLabel(devLabels)
        } else if (labelToRemove === "personal") {
            this.removePersonalLabel(personalLabels)
        } else if (labelToRemove === "gschool") {
            this.removeGschoolLabel(gschoolLabels)
        } 
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
                            {currentMessage.labels.map((label, key) => <span key={key} className="label label-warning">{label}</span>) }
                            <a href="#">{currentMessage.subject}</a>
                        </div>
                    </div>
                )}
            </div>

        );
    };
}

export default Message;