const React = require('react');

class Login extends React.Component {
    constructor (props) {
        // initialize state
        super(props);
        this.state = {
            email: " ",
            password: " "
        };
        this.login = this.login.bind(this);
        this.handleText = this.handleText.bind(this);
        this.register = this.register.bind(this);
    }

    login(event){
        event.preventDefault();
        console.log(this.state.email);
        console.log(this.state.password);
        // Pass control to MsgBoard and send the email and pass the user entered
        this.props.loginCallback ({
            email: this.state.email,
            password: this.state.password
        });
    }

    handleText(event) {
        if(event.target.id === 'email') {
          this.setState({
            email: event.target.value
          });
        } else {
          this.setState({
            password: event.target.value
          });
        }
    }
    
    // Pass control to MsgBoard to deal with this
    register(event) {
        this.props.registerCallback()
    }

      render() {
        let loginFailText;
          
        if (this.props.loginFail) {
            loginFailText = <p className="card-text pt-1 text-danger">Failed Login Attempt.
            &nbsp; { this.props.loginAttempts } attempts remaining. </p>
        }

        return (
            <div className="card">
        <form onSubmit={this.login}>
            <br></br>
            <h3> Log in to post a Message </h3>
            <br></br>
            <div className="row">
                <label htmlFor="email" className="col-2 col-form-label">
                Email:
                </label>
                <input type = "email" className="col-3" id="email" placeholder="Enter email" onChange={this.handleText}></input>
               
                <label htmlFor="password" className="col-2 col-form-label">
                Password:
                </label>
                <input type = "password" className="col-3" id="password" placeholder="Enter password" onChange={this.handleText}></input>
                
                <div className="col-2">
                <button type="submit" className="btn btn-primary">
                Log In
                </button>
                </div>

            </div>
        </form> 
            {loginFailText}
            <div className="row">
                <label htmlFor="notRegistered"
                className="col-3 col-form-label">
                Not registered?
                </label>
                <div className="col-2">
                <button type="button" className="btn btn-outline-success" onClick={this.register}>
                Register
                </button>
                </div>
            </div>
            </div>
        ) 
    } 
} 

module.exports = Login;