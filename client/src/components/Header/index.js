
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

import RemoveUser from "../DeleteUser/DeleteUser";
import Auth from "../../utils/auth";

const Header = () => {

const logout = (event) => {
  event.preventDefault();
  Auth.logout();   
};
  
return (
  <div className="images">
    {Auth.loggedIn() ? (
       <>
         <header className="navbar">
           <div className="left-side">
             <Link to="/" style={{textDecoration:'none'}}>
               <span className='header'>WorkHive<img className='bee' src='https://user-images.githubusercontent.com/119962472/224432749-b7eb5349-2fda-4977-809c-3893df02b585.png' alt='bee'></img></span>
             </Link>
             <Link to="/" style={{textDecoration:'none'}}>
               <ImHome color="black"/>
             </Link>
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
             {/* <ImUser/> */}
           </div>
           <div className="images">    
             <Link to="/me">

              {Auth.getProfile().data.token}

               <div className="dropdown">
                  <span><img src='https://media.licdn.com/dms/image/C4E03AQG8hEqqWqj0AQ/profile-displayphoto-shrink_800_800/0/1549993870611?e=1684368000&v=beta&t=_rd0TrKAHnKrGGmgPpDO3xJIqshZi6c86pUtZq9r8X0' alt="" /></span>
                  <div className="dropdown-content">
                    <div>
                      {Auth.getProfile().data.username}
                    </div>
                    <button  onClick={logout}>
                      Logout
                    </button> 
                    <div>
                    <RemoveUser />
                    </div>                   
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
