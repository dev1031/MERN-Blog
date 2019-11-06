import React from 'react'
import mern from './mern.jpg'
import mern2 from './mern2.jpg'
import mern3 from './mern3.jpg'

class Mernhome extends React.Component{
    render(){
        return( 
            <div className="container">
                <h1 style={{"text-align": "center","fontFamily":" Helvetica"}}>MERN - Blog</h1>
                <img src={mern2} alt="..." style= {{ "height" :"500px","margin":"10% 10% 10% 10%" }} />
            </div>
        )
    }
}

export default Mernhome;