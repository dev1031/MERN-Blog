import React from "react";
import axios from 'axios';
import auth from './auth-helper';

class  Login extends React.Component {
    constructor(props){
        super(props);
        this.state ={
            error : null,
            user_pro : null
        }

        this.handleChange = this.handleChange.bind(this);
        this.handleSubmit = this.handleSubmit.bind(this);

    }

    handleChange = (e)=>{
        //console.log(e);
        this.setState({
            [e.target.name] : e.target.value
        })
    }

    handleSubmit =(e)=>{
        e.preventDefault();
        //console.log(this.state)
        var user = {
            email : this.state.email ,
            password : this.state.password
        }
        //console.log(user.email);
        if(user.email && user.password ){
            axios.post('http://localhost:5000/login' , user)
            .then((response)=>{
                //console.log(response);
                if(response.data.message.length >1 && response.data.token.length>1){
                    //console.log(response.data.message);
                    let parse_data = response.config.data;
                    let user_data = JSON.parse(parse_data)
                    //console.log(user_data);
                    this.setState({
                        user_pro : Object.entries(user_data)
                    })
                    axios.get('http://localhost:5000/verifyUser',{
                        headers: {
                            'Accept': 'application/json',
                            'Content-Type': 'application/json',
                            'Authorization': 'Bearer ' + response.data.token
                          }
                        })
                        .then((docs)=>{
                            console.log(docs)
                            auth.authenticate(docs , ()=>{
                                this.setState({
                                    error : null
                                })
                            })

                            if(docs.data.token){
                                window.location = 'profile'
                            }
                        })
                }
                if(response.data.message === 'Auth Failed'){
                    this.setState({
                        error: 'Auth Failed'
                    })
                }
            })
        }
    }
    
    render(){   
        let {error} = this.state; 
        //console.log('this is ' ,this.state.user_pro)   
    return (
        <div className="container" style={{marginTop :"2%"}}>
        <div className="jumbotron jumbotron-fluid">
            <div className="container">
                <h1 className="display-4" style={{textAlign:"center" ,color: "#563d7c"}}>LogIn Here </h1>
            </div>
        </div>
       <div className="shadow-lg p-3 mb-5 bg-white rounded">
        <form onSubmit = {this.handleSubmit}>
            <div className="form-group">
                <label htmlFor="exampleInputEmail1">Email address</label>
                <input type="email" className="form-control" name = "email" aria-describedby="emailHelp" placeholder="Enter email" onChange = {this.handleChange}/>
            </div>
            <div className="form-group">
                <label htmlFor="exampleInputPassword1">Password</label>
                <input type="password" className="form-control" name = "password" placeholder="Password" onChange = {this.handleChange}/>
            </div>
                <div style={{marginTop : "2px"}}>{error}</div>
            <button type="submit" className="btn btn-primary" >Submit</button>
        </form>
      </div>    
      </div>
    )
    }
}

export default Login;