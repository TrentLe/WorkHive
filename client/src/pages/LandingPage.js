import React from 'react';
import Login from "../components/Login/Login";
import Signup from "../components/Signup/Signup";
import { Link } from 'react-router-dom';

const LandingPage = () => {

  
    return (
      <main>
        <div className="container">
          <Link to='/companylanding'><button>Signup or Login as a Compny</button></Link>
          <Login/>        
          <Signup/>
        </div>
      </main>
    );
  };
  
  export default LandingPage;