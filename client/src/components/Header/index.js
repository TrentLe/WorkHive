
import React from "react";
import { Link } from 'react-router-dom';
import { ImHome } from "react-icons/im";
import { ImBubble } from "react-icons/im";
import { ImUser } from "react-icons/im";
import { ImBell } from "react-icons/im";
import { ImSearch } from "react-icons/im";
import { ImContrast } from "react-icons/im";
import { IoIosKeypad } from "react-icons/io";
import { MdBedtime } from "react-icons/md";
import { MdBrightness7 } from "react-icons/md";
import { BsUiRadiosGrid } from "react-icons/bs";
import { UPDATE_USER } from "../../utils/mutations";
import { useMutation } from "@apollo/client";
import "./header.scss";
// import { useContext } from 'react';
// import { DarkModeContext } from "./context/darkModeContext.js";

import RemoveUser from "../DeleteUser/DeleteUser";
import Auth from "../../utils/auth";


const Header = () => {

  const logout = (event) => {
    event.preventDefault();
    Auth.logout();
    localStorage.removeItem('email');
    localStorage.removeItem('name');
    localStorage.removeItem('profilePic');
  };

  const [ setProfilePic, {error, info}] = useMutation(UPDATE_USER)
  

  const handleProfilePic = async () => {    

    const image = localStorage.getItem('profilePic')
    const theId = Auth.getProfile().data._id

    try {
      console.log(image)
      console.log(theId)

      await setProfilePic({ variables: {
        updateUserId: theId,
        profilepicture: image,
      }})
      
      console.log(Auth.getProfile())

    } catch (err) {
      console.error(err)
    }   
    
  }


  return (
    <div className="images">
      {Auth.loggedIn() ? (
        <>
          <header className="navbar">
            <div className="left-side">
              <Link to="/" style={{ textDecoration: 'none' }}>
                <span className='header'>WorkHive<img className='bee' src='https://user-images.githubusercontent.com/119962472/224432749-b7eb5349-2fda-4977-809c-3893df02b585.png' alt='bee'></img></span>
              </Link>
              <Link to="/" style={{ textDecoration: 'none' }}>
                <ImHome color="black" />
              </Link>
              <MdBedtime />
              <IoIosKeypad />
              <div className='searchbar'>
                <ImSearch />
                <input type='text' placeholder='Search'></input>
              </div>
            </div>
            <div className="right-side">
              <ImBell />
              <ImBubble />
              {/* <ImUser/> */}
            </div>
            <div className="images">
              <Link to="/me">

                {Auth.getProfile().data.token}

                <div className="dropdown">
                  <span><img src={localStorage.getItem("profilePic")} alt="" /></span>
                  <div className="dropdown-content">
                    <div>
                      {Auth.getProfile().data.username}
                    </div>
                    <button onClick={logout}>
                      Logout
                    </button>
                    <div>
                      <RemoveUser />
                    </div>
                    <button onClick={handleProfilePic}>Set Profile Picture</button>
                  </div>
                </div>
              </Link>
            </div>
          </header>
        </>
      ) : (
        <>
          {/* <Link to="/LandingPage" style={{textDecoration:"none", margin:'0vw 3vw 0vw 0vw'}}>
             
        </Link> */}
        </>
      )}
    </div>
  );


};

export default Header;
