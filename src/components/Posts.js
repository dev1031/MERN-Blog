import React from 'react';
import axios from 'axios';
import auth from './auth-helper'

class Posts extends React.Component{
    constructor(props){
        super(props);
        this.state = {
            topic : '',
            about : '',
            _id : ''        
        }

        this.handleChange = this.handleChange.bind(this);
        this.handleSubmit = this.handleSubmit.bind(this);

    }

    handleChange = (e)=>{
        this.setState({
            [e.target.name] : e.target.value
        })
    }

    handleSubmit = (e) =>{
        e.preventDefault();
        const jwt = auth.isAuthenticated();
        var post = {
            topic: this.state.topic,
            about: this.state.about,
            _id :  jwt.data.authData._id ,

        }
        //console.log(post._id)
        axios.post('http://localhost:5000/posts' , post )
        .then((response)=>{
            //console.log(response)
            this.setState({
                topic : '',
                about : ''
            })
        })
    }

    render(){
        return(
            <div>
            <form onSubmit = {this.handleSubmit}>
                <div className="form-group">
                    <label htmlFor="Topic" style ={{"color":"orange"}}><h4>Enter the Topic</h4></label>
                    <input type="text" className="form-control" name = "topic" value = {this.state.topic} placeholder="Topic...."  onChange = {this.handleChange} required/>
                </div> 
                <div className="form-group">
                    <label htmlFor="About"style ={{"color":"orange"}}><h4>Write About It</h4></label>
                    <textarea className="form-control" rows="3" name = "about" value = {this.state.about} placeholder ="Write here...." onChange ={this.handleChange} required />
                </div>
                <button type="submit" className="btn btn-danger" >Post</button>

                </form>
            </div>
        )
    }
}

export default Posts;