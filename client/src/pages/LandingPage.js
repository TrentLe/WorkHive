import React from 'react';
import Login from "../components/Login/Login";
import Signup from "../components/Signup/Signup";

const LandingPage = () => {

  
    return (
      <main>
        <div className="container">
          <Login/>        
          <Signup/>
        </div>
      </main>
    );
  };
  
  export default LandingPage;