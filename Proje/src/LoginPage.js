import React,{Component} from 'react';
class LoginPage extends Component{

    constructor(props) {
        super(props);
        this.state = {
            username: '',
            password: '',
            hasLoginFailed: false,
            showSuccessMessage: false
        };
        this.handleChange = this.handleChange.bind(this);
        this.handleSubmit=this.handleSubmit.bind(this);

    }




    async handleSubmit() {

        fetch('/login', {
            method: 'POST',
            headers: {  'Content-Type': 'application/json',
                        "Access-Control-Allow-Methods": '["PUT", "GET", "POST"]',
                        "Access-Control-Allow-Origin":"*"},

            body: JSON.stringify({username:"emre",password:"sss"})
        })
            .then(res => res.text())
            .then(res => console.log(res))



    }

    handleChange(event) {
        console.log(event.target.value);
        this.setState(
            {
                [event.target.name]
                    : event.target.value
            }
        )
    }
        render() {
        return(
            <form onSubmit={this.handleSubmit}>
                <div className={"form-group"}>
                    <label htmlFor="exampleFormControlInput1">Username: </label>
                    <input type="text"
                            value={this.state.username} name={"username"} className="form-control" id="name" onChange={this.handleChange.bind(this)}/>
                </div>
                <div className={"form-group"}>
                    <label>Password:</label>
                    <input type="password"
                            value={this.state.password} name={"password"} className="form-control" id="exampleFormControlInput2" onChange={this.handleChange.bind(this)}/>
                </div>
                <button  id="btnSubmit" type="submit" className="btn btn-primary">Submit</button>
            </form>
        );

    }
}export default LoginPage;