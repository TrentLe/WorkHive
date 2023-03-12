
import React from "react";
import { Link } from 'react-router-dom';

import { ImHome } from "react-icons/im";
import { ImBubble } from "react-icons/im";
import { ImUser} from "react-icons/im";
import { ImBell } from "react-icons/im";
import { ImSearch} from "react-icons/im";
import { ImContrast } from "react-icons/im";
import { IoIosKeypad } from "react-icons/io";
import { MdBedtime  } from "react-icons/md";
import { MdBrightness7} from "react-icons/md";
 import { BsUiRadiosGrid } from "react-icons/bs";
import "./header.scss";

// import { useContext } from 'react';
// import { DarkModeContext } from "./context/darkModeContext.js";








import Auth from "../../utils/auth";

const Header = () => {

  // const { toggle, darkMode} = useContext(DarkModeContext);
  
  const logout = (event) => {
    event.preventDefault();
    Auth.logout();
  };
  
  return (
    <header className="navbar">
      <div className="left-side">
        <Link to="/" style={{textDecoration:'none'}}>
          <span className='header'>WorkHive<img className='bee' src='https://user-images.githubusercontent.com/119962472/224432749-b7eb5349-2fda-4977-809c-3893df02b585.png' alt='bee'></img></span>
        </Link>
        <Link to="/" style={{textDecoration:'none'}}>
          <ImHome color="black"/>
        </Link>
        {/* {darkMode ? (
          <MdBedtime onClick={toggle} />
        ) : (
          <MdBrightness7 onClick={toggle} />
        )} */}
        <MdBedtime/>
        <IoIosKeypad/>
       
        <div className='searchbar'>
          <ImSearch/>
          <input type='text' placeholder='Search'></input>
        </div>

      </div>
      <div className="right-side">
        <ImBell/>
        <ImBubble/>
        <ImUser/>

      </div>

      <div className="">
        {Auth.loggedIn() ? (
          <>
            <Link to="/me">
              {Auth.getProfile().data.username}
            </Link>
            <button  onClick={logout}>
              Logout
            </button>
          </>
        ) : (
          <>
            <Link to="/login">
              Login
            </Link>
            <Link to="/signup">
              Signup
            </Link>
          </>
        )}
      </div>
    </header>
  );
};

export default Header;
