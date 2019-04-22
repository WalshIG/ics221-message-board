const React = require("react");


 class Message extends React.Component {
    constructor(props) {
        super(props);
        this.handleDeleteButton = this.handleDeleteButton.bind(this);
        this.handleDeleteAllButton = this.handleDeleteAllButton.bind(this);
        this.handleUpdateButton = this.handleUpdateButton.bind(this);
        this.handletext = this.handletext.bind(this);
        this.handleCancel = this.handleCancel.bind(this);
        this.handleSave = this.handleSave.bind(this);
        this.state = { 
            msg: this.props.message1,
            index: this.props.index1
           
        }
    }
 
   // handle delete event handler 
    handleDeleteButton(event) {
        event.preventDefault();
        this.props.deleteMsgCallback({"_id":event.target.value});
     } 
  //handle update event handler 
    handleUpdateButton(event){
        event.preventDefault();  
        this.setState({msg: this.props.message1});
        this.props.updateMsgCallback(event.target.value);
    }

    //handle delete all handler
    handleDeleteAllButton(event){
        event.preventDefault();
        this.props.deleteAllMsgCallback({"_id":event.target.value});
  }

    handletext(event){
      this.setState({newMsg: event.target.value});
      this.props.message1.msg=event.target.value;

  }

  //handle cancel
  handleCancel(){
       console.log(this.state.oldMsg);
       this.props.message1.msg=this.state.oldMsg;
       this.props.updateMsgCallback("");
  }

  //handle save
  handleSave(event){
      let newMsg = {_id:event.target.value,
                    msg: this.props.message1.msg};
      this.props.saveMsgCallBack(newMsg);
      this.props.updateMsgCallback("");
  }

        render() {
            if (this.props.message1.name == this.props.userName){
                if ( this.props.message1._id===this.props.updateId){
                    return(
                    <tr className="message" key={this.state.msg._id}>
                        <td>{this.props.index1 + 1}</td>
                        <td>{this.props.message1.name}</td>
                        <td><input type="text" value={this.props.message1.msg} onChange={this.handletext}></input></td>
                        <td><button className = "btn btn-secondary" type="button" value={this.props.message1._id}
                        onClick={this.handleCancel} > Cancel </button></td>
                        <td><button className = "btn btn-success" type="button" value={this.props.message1._id} 
                        onClick={this.handleSave} > Save </button> </td>
                    </tr>
                    );
                } 
                else{
                    return(                       
                        <tr className="message" key={this.state.msg._id}>
                            <td>{this.props.index1 + 1}</td>
                            <td>{this.props.message1.name}</td>
                            <td>{this.props.message1.msg}</td>
                            <td><button className = "btn btn-danger" type="button" value={this.props.message1._id}
                             onClick={this.handleDeleteButton}> Delete </button></td>
                            <td><button className = "btn btn-warning" type="button" value={this.props.message1._id}
                             onClick={this.handleUpdateButton} > Edit </button> </td>
                        </tr>
                    );
                }
            } else {
                return(
                    <tr className="message" key={this.state.msg._id}>
                    <td>{this.props.index1 + 1}</td>
                    <td>{this.props.message1.name}</td>
                    <td colSpan="3">{this.props.message1.msg}</td>
                </tr>
                );
            }
        } 
    }         
            
module.exports = Message


