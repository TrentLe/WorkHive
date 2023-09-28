import "./left.scss";
// import Auth from "../../utils/auth";
import { CiYoutube } from "react-icons/ci";
import { CiMail } from "react-icons/ci";
// import { FiUsers } from "react-icons/fi";
import { GoCalendar } from "react-icons/go";
// import { GoBriefcase } from "react-icons/go";
import { CiStreamOn } from "react-icons/ci";
import { Link } from "react-router-dom";

import PopupCalendar from "../Calendar/index"

import { RiFundsBoxFill } from "react-icons/ri";
//  import { BsFillCalendarMonthFill} from "react-icons/bs"
import { MdGroups2 } from "react-icons/md";
import { FcCalendar } from "react-icons/fc";
import { FcBriefcase } from "react-icons/fc";
import { BsFillPersonCheckFill, BsFillPersonFill } from "react-icons/bs";




const Left = () => {
  return (
    //     <div className='left-side'>
    //     <div className='container'>
    //         <div className='menu'>
    //         <h3>hello I am a sidebar hopefully I work</h3>
    //             <div className='info'>

    //             </div>
    //         </div>
    //     </div>
    // </div>
    <div className="left">
      <div className="container">
        <div className="menu">
          <div className="info"></div>
          <div className="icon">

            <GoCalendar className="icon" />


            <span>Calendar</span>
            <PopupCalendar />


            <FcCalendar style={{ fontSize: "2rem", color: '#FFD02E' }} />
            <span>Calender</span>

          </div>
          <div className="icon">
            <MdGroups2 style={{ fontSize: "2rem", color: '#FFD02E' }} />
            <span>Groups</span>
          </div>
          <div className="icon">
            <FcBriefcase style={{ fontSize: "2rem", }} />
            <span>Jobs</span>
          </div>
        </div>
        <hr />
        <div className="menu">
          <span>Your shortcuts</span>
          <div>
            <Link to="/userlist" >
              <BsFillPersonFill style={{ color: '#FFD02E', fontSize: '2rem' }} />
              <span>Explore Users</span>
            </Link>
          </div>
          <div className="icon">
            <BsFillPersonCheckFill style={{ color: '#FFD02E', fontSize: '2rem' }} />
            <span>Following</span>
          </div>
          {/* <div className="icon">
            <span>Gaming</span>
          </div>
          <div className="icon">
            <span>Gallery</span>
          </div> */}
          <div className="icon">
            <CiYoutube style={{ fontSize: '2rem', color: "red" }} />
            <span>Videos</span>
          </div>
          <div className="icon">
            <Link to="/contact">
              <CiMail style={{ fontSize: '2rem' }} />
            </Link>
            <span>Contact Us</span>
          </div>
        </div>
        <hr />
        <div className="menu">
          <span>Others</span>

          <div className="icon">
            <RiFundsBoxFill style={{ color: '#FFD02E', fontSize: "2rem" }} />
            <span>Fundraisers</span>
          </div>
          <div className="icon">
            <Link to={"/meetup"}>
              <CiStreamOn style={{ color: 'blue', fontSize: "2rem" }} />
            </Link>

            <span>Interviews</span>
          </div>
          <div className="icon">

          </div>
        </div>
      </div>
    </div>
  );
};

export default Left;
