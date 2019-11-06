import React from "react";
import { Link } from "react-router-dom";
import auth from './auth-helper';

const style ={
    backgroundColor :"#563d7c"

}

const Navbar = () =>{
    return(
        <div>
        <div className="shadow-lg">
        <nav className="navbar navbar-expand-lg" style ={style}>
            <Link className="navbar-brand" to ="/" style ={{color: "#ffe484"}}>MERN-Blog</Link>
            <button className="navbar-toggler" type="button" data-toggle="collapse" data-target="#navbarNav" aria-controls="navbarNav" aria-expanded="false" aria-label="Toggle navigation">
                <span className="navbar-toggler-icon"></span>
            </button>
            <div className="collapse navbar-collapse" id="navbarNav">
                <ul className="navbar-nav">
                <li className="nav-item active">
                    <Link  className="nav-link" to="/home" style ={{color: "#ffe484"}}>Home <span className="sr-only">(current)</span></Link>
                </li>
                    { !auth.isAuthenticated() && (
                        <li className="nav-item">
                        <Link className="nav-link" to="/login" style ={{color: "#ffe484"}}>Login</Link>
                        </li>
                        )
                    }
                    { !auth.isAuthenticated() && (

                    <li className="nav-item">
                        <Link className="nav-link" to="/signup" style ={{color: "#ffe484"}}>Signup</Link>
                    </li>
                    )
                    }
                {
                    auth.isAuthenticated() && (
                        <li className="nav-item">
                    <Link className="nav-link" to="/logout" style ={{color: "#ffe484"}}>Logout</Link>
                        </li>
                        )
                }
                
                </ul>
            </div>
        </nav>
        </div>
        </div>
    )
}


export default Navbar;