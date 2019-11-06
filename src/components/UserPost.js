import React from 'react';
import axios from 'axios';

class UserPost extends React.Component{
    constructor(props){
        super(props);

        this.state = {
            user_posts :[]
        }
    }
    componentDidMount(){
        axios.get('http://localhost:5000/posts')
        .then((response)=>{
            //console.log(response)
            if(response.data.response.length >1 ){
                this.setState({
                    user_posts : response.data.response
                })
            }
            
        })
    }

    render(){
        let {user_posts} = this.state;
        //console.log(user_posts)
        let user_post_list = user_posts.map((post)=>{
            return (
                <div className="shadow p-3 mb-5 bg-white rounded" key = {post._id}>
                <div className ="container"> 
                    <div>
                    <h1 className="display-8" style ={{"color" :"purple" }}>{post.topic}</h1>
                    </div>
                    <div>
                     <h6 style ={{"color":"blue"}}>{(new Date(post.createdAt)).toDateString()}</h6>   
                    </div>
                </div>
                <hr className="my-4" />
                  <p className="lead">{post.about}</p>
                </div>
            )
        }) 
        return(
            <div>
                {user_post_list}
            </div>
        )
    }
}

export default UserPost