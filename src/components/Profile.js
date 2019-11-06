import React from "react";
import axios from 'axios';
import auth from './auth-helper';
import {Link} from 'react-router-dom'
import Posts from './Posts'
import UserPost from './UserPost'

class Profile extends React.Component{
    constructor(props){
        super(props);
        this.state = {
            user : null,
            token : null,
            users: []
        }
    }

    componentDidMount(){
           const jwt = auth.isAuthenticated();
           //console.log(jwt)
           this.setState({
               user :jwt.data.authData.email ,
               token :jwt.data.token
           })
           axios.get('http://localhost:5000/users')
           .then((response)=>{
            //console.log(response)
               this.setState({
                   users:response.data.response
               })
           })
        }
        render(){
           let {user ,users} = this.state;
           let userList = users.filter((admin)=> admin.email !== user).map((other_user)=>{
               return (
                   <div className="constainer"key = {other_user._id}>
                   <div className="border border-primary mb-1">
                   <div className="media">
                        <img style ={{"height":"50px"}} src="https://lh3.googleusercontent.com/8Vw-7MAm558750a4M55fiOlUf7lP2cYnFuqSWynrygIiyEEiQQDa_xxHKYOX83L0UD2T" className="align-self-center mr-3"  alt="..."/>
                        <div className="media-body">
                            <p className="mb-0">{other_user.name}</p>
                            <p className="mb-0">{other_user.email}</p>
                        </div>
                        </div>
                   </div>
                   </div>
               )
           })
            return(
                <div>
                    <div className = "row">
                    <div className="col-sm-3 col-md-6 col-lg-2">
                    <div className="shadow-lg p-0 mb-0 bg-white rounded">
                <div className="alert alert-light" role="alert">
                    <h1 style ={{textAlign :"center"}}>Profile</h1>
                    </div>
                </div>
                <div className="shadow-lg p-3 mb-5 bg-white rounded">
                <div className="card">
                    <img style={{"paddingLeft":"0px"}} className ="rounded-circle" src="data:image/jpeg;base64,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" alt="..." />
                    <div className="card-body">
                        <h5 className="card-title">{user}</h5>
                        <Link to="#" className="btn btn-primary">Edit Profile</Link>
                    </div>
                    </div>
                    </div>
                </div>
                <div className="col-sm-3 col-md-6 col-lg-7">
                <div className="shadow-lg p-0 mb-0 bg-white rounded">
                <div className="alert alert-light" role="alert">
                    <h1 style ={{textAlign :"center"}}>Posts</h1>
                    <Posts />
                </div>
                </div>
                <UserPost />
                </div>
                <div className="col-sm-3 col-md-6 col-lg-3">
                <div className="shadow-lg p-0 mb-0 bg-white rounded">
                <div className="alert alert-light" role="alert">
                    <h1 style ={{textAlign :"center"}}>Users</h1>
                </div>
                </div>
                    {userList}      
                </div>
                </div>
                </div>
            )
    }
}


export default Profile