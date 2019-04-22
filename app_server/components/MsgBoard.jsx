"use strict";

const React = require('react');
const MsgList = require('./MsgList.jsx');
const NewMsg = require('./NewMsg.jsx');
const Login = require('./Login.jsx');
const Registration = require('../../client_side/Registration.jsx');
class MsgBoard extends React.Component {
    constructor(props) {
        super(props)
        this.addMessage = this.addMessage.bind(this);
        this.deleteMessage = this.deleteMessage.bind(this);
        this.deleteAllMessage = this.deleteAllMessage.bind(this);
        this.updateMessage = this.updateMessage.bind(this);
        this.login = this.login.bind(this);
        this.register = this.register.bind(this);
        this.addNewUser = this.addNewUser.bind(this);
        this.state = { 
            messages: this.props.messages,
            loginForm: true,
            loginAttempts: 3,
            loginFail: false,
            registrationForm: false,
            registrationFail:false,
            userCredentials: {
                email: '',
                password: ''
            }
         }
    }

    addMessage(message) {
        const basicString = this.state.userCredentials.email + ':'   
        + this.state.userCredentials.password;
        
        fetch(`${process.env.API_URL}/msgs`, {   
            method: "POST",
            headers: {
                "Content-Type": "application/json",
                "Authorization": "Basic " + btoa(basicString)

            },
            body: JSON.stringify(message)
        })
            .then(response => this.handleHTTPErrors(response))
            .then(result => result.json()) 
            .then(result => {
                this.setState({
                    messages:       
                    [result].concat(this.state.messages)
                });
            })
            .catch(error => {
                console.log(error);
            });
    }
    updateMessage(messageId) {
        console.log(messageId._id);
         const basicString = this.state.userCredentials.email + ':'   
         + this.state.userCredentials.password;
         
         fetch(`${process.env.API_URL}/msgs/${messageId._id}`, { 
             method: "PUT",
             headers: {
                 "Content-Type": "application/json",
                 "Authorization": "Basic " + btoa(basicString)
             },
             body: JSON.stringify(messageId)
         })
         .then(response => {
             if(response.status === 204){
                 let newMessages = this.state.messages.filter( msg =>{
                     if(msg._id == messageId._id){
                         msg.msg= messageId.msg;
                         return msg;
                     } return msg;
                 });
                 console.log(newMessages);
                 this.setState({
                     messages: newMessages
                 });
             }
         })

         .catch(error => {
             console.log(error);
         });
     }

    deleteMessage(messageId) {
         console.log(messageId._id);
         const basicString = this.state.userCredentials.email + ':'   
         + this.state.userCredentials.password;
         
         fetch(`${process.env.API_URL}/msgs/${messageId._id}`, { 
             method: "DELETE",
             headers: {
                 "Content-Type": "application/json",
                 "Authorization": "Basic " + btoa(basicString)
    
             },
         })
         .then(response => {
             if(response.status === 204){
                 let newMessages = this.state.messages.filter( msg =>{
                     if(msg._id == messageId._id){
                         return null;

                     } return msg;
                 });
                 console.log(newMessages);
                 this.setState({
                     messages: newMessages
                 });
             }
         })
         .catch(error => {
             console.log(error);
         });
     }
   
    deleteAllMessage(){
        const basicString = this.state.userCredentials.email + ':'   
        + this.state.userCredentials.password;
        
        fetch(`${process.env.API_URL}/msgs`, { 
            method: "DELETE",
            headers: {
                "Content-Type": "application/json",
                Authorization: "Basic " + btoa(basicString)

            },
            
        })
        .then(response => this.handleHTTPErrors(response))
        .then(result => result.json("Successfully deleted all messages")) 
        .then(result => {
            this.setState({
                messages: 
                []
            });
        })
        .catch(error => {
            console.log(error);
        });
    }

    register(){
        this.setState({
            registrationForm: true
        });
    }

    login(userCredentials) {
        const basicString = userCredentials.email + ':' + userCredentials.password;   
        fetch(`${process.env.API_URL}/users/login`, {
            method: 'GET',
            headers: {
                'Authorization': 'Basic ' + btoa(basicString)     
            }   
        })   
        .then(response=> {
            // No more login attempts, throw an error
            if (this.state.loginAttempts === 0) throw'locked out';
            //  credentials accepted
            if (response.status === 200) {
                this.setState({
                    userCredentials: userCredentials,
                    loginForm: false,
                    loginFail: false       
                }); 
                return response;    
            } else {
                // Credentials are wrong
                this.setState((state) => {
                    return ({
                        loginFail: true,
                        loginAttempts: state.loginAttempts - 1         
                    });       
                });     
            }   
        })
        .then(result => result.json())
        .then(result => {
            this.setState({
                userID: result._id,
                userName : result.username
            });
           
        })   
        .catch(error => {
            console.log(error);   
        })
     }
     
     addNewUser(userDetails) {   
         fetch(`${process.env.API_URL}/users`, {
             method: 'POST',
             headers: {'Content-Type': 'application/json'     
            },body: JSON.stringify(userDetails)   
        })   
        .then(response=> {
            if (response.status === 201) {
                // User successfully registered
                // disable the Registration Form
                this.setState({
                    registrationForm: false,
                    registrationFail: false       
                });     
            } else {
                // Some Error or User already exists
                this.setState({
                    registrationFail: true       
                });     
            }   
        })   
        .catch(error => {
            console.log(error)
        });
    }

    handleHTTPErrors(response) {
        if (!response.ok) throw Error(response.status + ': ' + response.statusText);
        return response;
    }
    componentDidMount() {
        fetch(`${process.env.API_URL}/msgs`, {
            method: 'GET',
            headers: {
                'Content-Type': 'application/json'
            },
        })
            .then(response => this.handleHTTPErrors(response))
            .then(response => response.json())
            .then(result => {
                this.setState({
                    messages: result
                });
            })
            .catch(error => {
                console.log(error);
            });
    }

    render() {  
        if (this.state.registrationForm) {
            let failedRegistration;
            if (this.state.registrationFail) {     
                failedRegistration =
                    <p className = "text-danger"> User already Registered or Registration Error. </p>   
                }
                return (
                    <div>
                        <Registration registerNewUserCallback = {this.addNewUser}/>       
                        {failedRegistration}
                        </div>   
                        ) 
                    } else {  

                    let form;  
                    if (this.state.loginForm) {    
                        form = <Login registerCallback={this.register}
                        loginCallback={this.login}
                        userName={this.state.username}
                        loginFail={this.state.loginFail}
                        loginAttempts={this.state.loginAttempts}    
                        />  
                    } else {   
                        console.log("User name is"+this.state.userName); 
                        form = <NewMsg addMsgCallback = {this.addMessage} userName={this.state.userName} /> 
                    }  
                    return (
                    <div>      
                        {form}
                        <MsgList messages = 
                        {this.state.messages}
                        deleteMsgCallback={this.deleteMessage}
                        updateMsgCallback={this.updateMessage}
                        userName={this.state.userName}
                        deleteAllMsgCallback={this.deleteAllMessage}
                    />
                    </div>
                    );
                }
            }
        }
module.exports = MsgBoard

