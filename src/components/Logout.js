import React from 'react'
import axios from 'axios'
import auth from './auth-helper'

class Logout extends React.Component{
    componentDidMount(){
        auth.signout(()=>{
            axios.get('http://localhost:5000/logout')
            .then(()=>{
                //console.log(response)
                window.location = 'login'
            })
        })
    }
    render(){
        return(
            <div></div>
        )
    }
}


export default Logout 
