import React from "react";
import Blog from './blog.jpg';

const Home = ()=>{
    return (
        <div>
        <div className="container" style={{marginTop :"1%"}}>
        <div className="jumbotron jumbotron-fluid">
        <div className="container">
            <h1 className="display-4" style={{textAlign:"center" ,color: "#563d7c"}}>Home Page for Blog</h1>
        </div>
        </div>
      <div className="shadow-lg p-3 mb-5 bg-white rounded" id ="home">
          <img src={Blog} alt="blog" />
      </div>    
      </div>
        </div>
        
    )
}

export default Home;