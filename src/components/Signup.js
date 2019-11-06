import React from "react";
import axios from 'axios';

class SignUp extends React.Component{
    constructor(props){
        super(props);
        this.state ={
            name : null,
            email: null,
            password : null,
            msg : null,
            creat_msg: null
            
        }

        this.handleSubmit = this.handleSubmit.bind(this);
        this.handleChange = this.handleChange.bind(this);

    }
        handleChange = (e)=>{
            const isCheckbox = e.target.type === "checkbox"
            this.setState({
                [e.target.name] : isCheckbox 
                ?e.target.value
                :e.target.value
            })
        }
        

        handleSubmit = (e)=>{
            e.preventDefault();
            var user ={
                name : this.state.name,
                email : this.state.email,
                password : this.state.password
            }
            if(this.state.name && this.state.email && this.state.password){
                axios.post('http://localhost:5000/register',user)
                .then((response)=>{
                    console.log(response)
                    if(response.data.message === 'User Already exist. Try something new'){
                        //console.log(response.data.message);
                        this.setState({
                            msg : response.data.message
                        })
                    }
                    if(response.data.message === 'User Created'){
                        //console.log(response.data.message);
                        this.setState({
                            creat_msg : response.data.message,

                        })
                        window.location = '/login'
                    }            
                })
            }        
        }

    render(){
        let { msg }  = this.state;  
        return (
            <div className="container" style={{marginTop :"2%"}}>
            <div className="jumbotron jumbotron-fluid">
            <div className="container">
                <h1 className="display-4" style={{textAlign:"center" ,color: "#563d7c"}}>SignUp Here</h1>
            </div>
            </div>
        <div className="shadow-lg p-3 mb-5 bg-white rounded">
                <form onSubmit = {this.handleSubmit}>
                <div className="form-row">
                    <div className="form-group col-md-12">
                    <label htmlFor="name">Name</label>
                    <input type="f_name" className="form-control" name="name" placeholder=" Name" onChange ={this.handleChange} />
                    </div>
                    <div className="form-group col-md-12">
                    <label htmlFor="name">Email</label>
                    <input type="email" className="form-control" name="email" placeholder="Email" onChange ={this.handleChange} />
                    <p style = {{color : "red"}}>{msg}</p>
                    </div>
                    <div className="form-group col-md-12">
                    <label htmlFor="name">Password</label>
                    <input type="password" className="form-control" name="password" placeholder="Password" onChange={this.handleChange} />
                    </div>
                </div>
                <button type="submit" className="btn btn-primary">Sign in</button>
                </form> 
        </div>    
        </div>
    )
}
    
}

export default SignUp;