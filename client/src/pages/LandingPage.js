import React from 'react';
import Login from "../components/Login/Login";
import Signup from "../components/Signup/Signup";
import styled from 'styled-components';
import {motion} from 'framer-motion'
import Left from '../components/left/left';
import './landing.scss'
import { Link } from 'react-router-dom';



const LandingPage = () => {
  const fadeLeft = {
    hidden: { opacity: 0, x: -100 },
    visible: { opacity: 1, x: 0 }
  };
  
    return (
    

      <section className='section'>
        <container className="containing">
          <div>
            <div className='columnLeft'
            >
             <h1> Welcome to the WorkHive</h1>
            </div>
            <p>
              Ready to join the Colony?
            </p>
            <Link to="/Login">
            <button style={{borderRadius:"30px", fontSize: "30px"}}>
              Login
            </button>
            </Link>
            <Link to="/SignUp">
            <button style={{borderRadius:"30px", fontSize: "30px"}}>
              Sign Up
            </button>
            </Link>
            

          </div>
          <div className='columnRight'>
          
            <img className='img1'src='https://user-images.githubusercontent.com/119962472/224432749-b7eb5349-2fda-4977-809c-3893df02b585.png' alt='hive'/>
           
          
           
            <img  className='img2' src='https://user-images.githubusercontent.com/119962472/225370717-35a6f9b7-562c-4726-9e76-d3aa7a9d6a58.png' alt='bee'/>
            <img  className='img3' src='https://user-images.githubusercontent.com/119962472/225370717-35a6f9b7-562c-4726-9e76-d3aa7a9d6a58.png' alt='bee'/>
            <img  className='img4' src='https://user-images.githubusercontent.com/119962472/225370717-35a6f9b7-562c-4726-9e76-d3aa7a9d6a58.png' alt='bee'/>



          
           

          </div>

        </container>

      </section>
    );
  };
  
  export default LandingPage;