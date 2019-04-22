const React = require('react');
const Message = require ('./Message.jsx');
class MsgList extends React.Component {
    constructor(props) {
        super(props);
        this.deleteMessage = this.deleteMessage.bind(this);
        this.updateMessage = this.updateMessage.bind(this);
        this.deleteAllMessage = this.deleteAllMessage.bind(this);
        this.state = { name: " ",  
                        msg: " ",
                        updateId:"" }
    }
deleteAllMessage(messageId) {
   this.props.deleteAllMsgCallback(messageId);
}


deleteMessage(messageId) {
   this.props.deleteMsgCallback(messageId);
}

updateMessage(messageId){
    
  this.setState({updateId:messageId});
}

render(){
let tableheader; 
    if (this.props.userName == "Admin"){
        tableheader = (<th scope="col" className="w-50"><button className = "btn btn-danger" type="button"
        onClick={this.props.deleteAllMsgCallback}> Delete All</button></th>);
    }else{
        tableheader = ( <th scope="col" className="w-50"></th>);
    }

return (
        <table className="table table-striped table-bordered">
        <thead>
            <tr>
            <th scope="col" className="w-25">#</th>
            <th scope="col" className="w-25">Name</th>
            <th scope="col" className="w-50">Message</th>
            <th scope="col" className="w-50">Options</th>
            {tableheader}
            </tr>
        </thead>
        <tbody>
            {this.props.messages.map((messageId, index, key)=>
                <Message 
                message1 ={messageId}
                index1 = {index}
                key1={key}
                deleteMsgCallback={this.deleteMessage}
                deleteAllMsgCallback={this.deleteAllMessage}
                updateMsgCallback={this.updateMessage}
                userName={this.props.userName}
                updateId={this.state.updateId}
                saveMsgCallBack={this.props.updateMsgCallback}
                />
            )}
            </tbody>
            </table>
        );
    }
}

module.exports = MsgList