import React, { Component } from "react"


class Toolbar extends Component {
    constructor(props) {
        super(props)
        this.state = { show: false }

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

    showCompose = () => {
        console.log(this.state);
        this.setState({ show: !this.state.show })

    }

    postMessage() {
        const item = { subject: this.state.subject, body: this.state.body }
        this.props.postMessage(item)
    }

    onChange = (e) => {
        this.setState(prevState => ({ ...prevState, [e.target.name]: e.target.value }))
        console.log(this.state);
    }


    render() {
        const isDisabled = this.props.messages.find(msg => msg.selected) ? false : true
        const selectedMsgs = this.props.messages.filter(msg => msg.selected);
        const msgs = selectedMsgs && (selectedMsgs.length === this.props.messages.length) ?
            "fa fa-check-square-o" : (selectedMsgs.length === 0) ? "fa fa-square-o" : "fa fa-minus-square-o"

        return (
            <div>
                <div className="row toolbar">
                    <div className="col-md-12">
                        <p className="pull-right">
                            <span className="badge badge">{this.props.messages.filter(msg => !msg.read).length}</span>
                        unread messages
                    </p>
                        <a onClick={this.showCompose} className="btn btn-danger">
                            <i className={`fa fa-${this.state.show === true ? 'minus' : 'plus'}`}></i>
                        </a>
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

                </div>
                {this.state.show &&
                    <form className="form-horizontal well">
                        <div className="form-group">
                            <button onClick={this.showCompose}></button>
                            <div className="col-sm-8 col-sm-offset-2">
                                <h4>Compose Message</h4>
                            </div>
                        </div>
                        <div className="form-group">
                            <label htmlFor="subject" className="col-sm-2 control-label">Subject</label>
                            <div className="col-sm-8">
                                <input onChange={this.onChange} type="text" className="form-control" id="subject" placeholder="Enter a subject" name="subject"></input>
                            </div>
                        </div>
                        <div className="form-group">
                            <label htmlFor="body" className="col-sm-2 control-label">Body</label>
                            <div className="col-sm-8">
                                <textarea onChange={this.onChange} name="body" id="body" className="form-control"></textarea>
                            </div>
                        </div>
                        <div className="form-group">
                            <div className="col-sm-8 col-sm-offset-2">
                                <input onClick={() => this.postMessage()} defaultValue="Send" className="btn btn-primary"></input>
                            </div>
                        </div>
                    </form>
                }



            </div>

        )
    }
}

export default Toolbar;
