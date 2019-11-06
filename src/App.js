import React from 'react';
import {BrowserRouter as Router,Switch,Route} from "react-router-dom";
import Navbar from './components/Navbar';
import Home from './components/Home';
import SignUp from './components/Signup'
import Login from './components/Login'
import Profile from './components/Profile'
import Logout from './components/Logout'
import Mernhome from './components/Mernhome'

class App extends React.Component{
  render(){
    return (
      <div>
        <Router>
        <Navbar />
        <Switch>
          <Route exact path="/home" component = {Home} />
          <Route exact path="/signup" component = {SignUp} />
          <Route exact path="/login" component = {Login} />
          <Route exact path ="/profile" component = {Profile} />
          <Route exact path = "/logout" component = {Logout} />
          <Route exact path ="/" component = {Mernhome} />
        </Switch>
      </Router>
      </div>
    );
  }

}

export default App;
