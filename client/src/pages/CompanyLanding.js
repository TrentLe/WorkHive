import React from 'react';
import CompanyLogin from "../components/CompanyLogin/CompanyLogin";
import CompanySignup from "../components/CompanySignup/CompanySignup";
import { Link } from 'react-router-dom'

const CompanyLanding = () => {

  
    return (
      <main>
        <div className="container">
          <Link to='/LandingPage'><button>Signup or Login as an individual user</button></Link>
          <CompanyLogin/>        
          <CompanySignup/>
        </div>
      </main>
    );
  };
  
  export default CompanyLanding;