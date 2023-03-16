import React, {useState} from 'react';
import Login from "../components/Login/Login";
// import Signup from "../components/Signup/Signup";
import Modal from 'react-bootstrap/Modal';

import { Link } from 'react-router-dom';

// import styled from 'styled-components';
// import {motion} from 'framer-motion'
// import Left from '../components/left/left';
import './landing.scss'




const LandingPage = () => {
  const [showLoginModal, setShowLoginModal] = useState(false)
  
    return (

      <section className='section'>
        <div className="containing">
          <div>
            <div className='columnLeft'>
              <h1> Welcome to the WorkHive</h1>
            </div>
            <p>
              Ready to join the Colony?
            </p>
            {/* <Link to="/Login"> */}
              <button onClick={() => setShowLoginModal(true)} style={{borderRadius:"30px", fontSize: "30px"}}>
                Login
              </button>
            {/* </Link> */}
            <Link to="/SignUp">
              <button style={{borderRadius:"30px", fontSize: "30px"}}>
                Sign Up
              </button>
            </Link>
          </div>
          <div className='columnRight'>  
            <img className='img1' src='https://user-images.githubusercontent.com/119962472/224432749-b7eb5349-2fda-4977-809c-3893df02b585.png' alt='hive'/>
            <img className='img2' src='https://user-images.githubusercontent.com/119962472/225370717-35a6f9b7-562c-4726-9e76-d3aa7a9d6a58.png' alt='bee'/>
            <img className='img3' src='https://user-images.githubusercontent.com/119962472/225370717-35a6f9b7-562c-4726-9e76-d3aa7a9d6a58.png' alt='bee'/>
            <img className='img4' src='https://user-images.githubusercontent.com/119962472/225370717-35a6f9b7-562c-4726-9e76-d3aa7a9d6a58.png' alt='bee'/>
          </div>
        </div>

        <Modal show={showLoginModal} onHide={() => setShowLoginModal(false)}>
        <Modal.Body>
          <Login />
        </Modal.Body>
      </Modal>

      </section>
    );
}

export default LandingPage;
