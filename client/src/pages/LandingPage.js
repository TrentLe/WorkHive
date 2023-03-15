import React from 'react';
import Login from "../components/Login/Login";
import Signup from "../components/Signup/Signup";

import { Link } from 'react-router-dom';

import styled from 'styled-components';
import {motion} from 'framer-motion'



const Section = styled.section`
height:100vh;
display:flex;
justify-content:center;
align-items:center;
background-color:black;

`;

const Container = styled.div`
display:grid;
grid-template-column: 1fr 1fr;
height: 100vh;
padding: 3rem calc ((100vwv - 1300px)/2);

@media screen and (max-width:768px) {
  grid-grid-template-columns: 1fr;
}`;


const LandingPage = () => {

  
    return (

      <main>
        <div className="container">
          <Link to='/companylanding'><button>Signup or Login as a Compny</button></Link>

          <Login/>        
          <Signup/>
        </container>
      </section>
    );
  };
  
  export default LandingPage;