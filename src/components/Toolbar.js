import React, { Component } from "react"
import Compose from "./Compose"

class Toolbar extends Component {
    constructor(props) {
        super(props)
        this.state = {}

    }


    markAsRead = () => {
        this.props.markAsRead(this.props.messages)
    }

    markAsUnread = () => {
        this.props.markAsUnread(this.props.messages)
    }

    deleteMessages = () => {
        this.props.deleteMessages(this.props.messages)
    }

    addLabel = (e) => {
        this.props.addLabel(e.target.value)
    }
    removeLabel = (e) => {
        this.props.removeLabel(e.target.value)
    }

    changeMsgsStatus = () => {
        this.props.changeMsgsStatus(this.props.messages)
    }

    render() {
        const isDisabled = this.props.messages.find(msg => msg.isSelected) ? false : true
        const selectedMsgs = this.props.messages.filter(msg => msg.isSelected);
        const msgs = selectedMsgs&&(selectedMsgs.length === this.props.messages.length) ?
            "fa fa-check-square-o" : (selectedMsgs.length === 0) ? "fa fa-square-o" :  "fa fa-minus-square-o"

        return (
            <div className="row toolbar">
                <div className="col-md-12">
                    <p className="pull-right">
                        <span className="badge badge">{this.props.messages.filter(msg => !msg.isRead).length}</span>
                        unread messages
                    </p>
                    <button onClick={this.changeMsgsStatus} className="btn btn-default">
                        <i className={msgs}></i>
                    </button>

                    <button disabled={isDisabled} onClick={this.markAsRead} className="btn btn-default">
                        Mark As Read
                    </button>

                    <button disabled={isDisabled} onClick={this.markAsUnread} className="btn btn-default">
                        Mark As Unread
                    </button>

                    <select onChange={this.addLabel} disabled={isDisabled} className="form-control label-select">
                        <option>Apply label</option>
                        <option value="dev">dev</option>
                        <option value="personal">personal</option>
                        <option value="gschool">gschool</option>
                    </select>

                    <select onChange={this.removeLabel} disabled={isDisabled} className="form-control label-select">
                        <option>Remove label</option>
                        <option value="dev">dev</option>
                        <option value="personal">personal</option>
                        <option value="gschool">gschool</option>
                    </select>

                    <button disabled={isDisabled} onClick={this.deleteMessages} className="btn btn-default">
                        <i className="fa fa-trash-o"></i>
                    </button>
                </div>
                <Compose />
            </div>

        )
    }
}

export default Toolbar;
