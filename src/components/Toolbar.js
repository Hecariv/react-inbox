import React, { Component } from "react"

class Toolbar extends Component {
    constructor(props) {
        super(props)
        this.state = {}
        
    }

    unreadMgs = () => {
        const counter = 0;
        const unreadMessages = this.props.messages.map(msg => {
            if (!msg.isRead) {
                counter++
            }
            unreadMessages = counter;
        })
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




    render() {
        const isDisabled = this.props.messages.find(msg => msg.isSelected) ? false : true
        return (
            <div className="row toolbar">
                <div className="col-md-12">
                    <p className="pull-right">
                        <span className="badge badge">{this.props.messages.filter(msg => !msg.isRead).length}</span>
                        unread messages
                    </p>

                    <button className="btn btn-default">
                        <i className="fa fa-square-o"></i>
                    </button>

                    <button disabled={isDisabled} onClick={this.markAsRead} className="btn btn-default">
                        Mark As Read
                    </button>

                    <button disabled={isDisabled} onClick={this.markAsUnread} className="btn btn-default">
                        Mark As Unread
                    </button>

                    <select disabled={isDisabled} className="form-control label-select">
                        <option>Apply label</option>
                        <option value="dev">dev</option>
                        <option value="personal">personal</option>
                        <option value="gschool">gschool</option>
                    </select>

                    <select disabled={isDisabled} className="form-control label-select">
                        <option>Remove label</option>
                        <option value="dev">dev</option>
                        <option value="personal">personal</option>
                        <option value="gschool">gschool</option>
                    </select>

                    <button disabled={isDisabled} onClick={this.deleteMessages} className="btn btn-default">
                        <i className="fa fa-trash-o"></i>
                    </button>
                </div>
            </div>

        )
    }
}

export default Toolbar;
