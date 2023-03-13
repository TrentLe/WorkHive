import React from 'react';
import { Link } from 'react-router-dom';
import { MdOutlineMessage  } from "react-icons/md";
import "./thoughtList.scss"
 import { CgMenuCheese  } from "react-icons/cg";
 import {  FcLike  } from "react-icons/fc";
 import {  FcLikePlaceholder  } from "react-icons/fc";
 import { TbShare3 } from "react-icons/tb";

import Auth from "../../utils/auth";

const ThoughtList = ({


  
  thoughts,
  title,
  showTitle = true,
  showUsername = true,
}) => {

  const liked = false ;
  if (!thoughts.length) {
    return <h3>No Thoughts Yet</h3>;
  }

  return (
    <div className='post'>
      {/* {showTitle && <h3>{title}</h3>} */}
      {thoughts &&
        thoughts.map((thought) => (
          <div key={thought._id} className="container">
            <div className="user">
              <div className='userinfo'>
              <img src='https://deadline.com/wp-content/uploads/2022/12/Garcelle-Crop2_cred-Erick-Robinson.png?w=681&h=383&crop=1' alt="" />
              <div className='postdetails'>
              <Link
                to={`/profiles/${thought.thoughtAuthor}`}
                style={{ textDecoration: "none", color: "inherit" }}>
                  <span>{thought.thoughtAuthor}</span>
                  </Link>
                  <span className="date">{thought.createdAt}</span>
              {/* {showUsername ? (
                <Link
                  className=""
                  to={`/profiles/${thought.thoughtAuthor}`}
                >
                  {thought.thoughtAuthor} <br />
                  <span style={{ fontSize: '1rem' }}>
                     {thought.createdAt}
                  </span>
                </Link>
              ) : (
                <>
                  <span style={{ fontSize: '1rem' }}>
                  {thought.createdAt}
                  </span>
                </>
              )} */}
              </div>
              </div>
              <CgMenuCheese/>
            </div>
            <div className="content">
              <p>{thought.thoughtText}</p>
              <img src='https://images.squarespace-cdn.com/content/v1/5403e5dbe4b04db10d1d362b/1606158340808-NBB1M20E984MM9XHV733/Samuel-Ramsey_For-The-Wild_Image1.jpg?format=500w' alt="" />
            </div>
            <div className='info'>
              <div className='item'>
              {liked ? < FcLike size='25px' /> : <FcLikePlaceholder size='25px' onClick={()=>{< FcLike size='25px' />}}/>}
              15 likes
              </div>
              <div  className='item'>
            <Link
             
              to={`/thoughts/${thought._id}`}
            >
              <MdOutlineMessage size='25px'/>
               Comments
            </Link>
            </div>
            <div className='item'>
            <TbShare3 size='25px'/> 
            Share
            </div>
            </div>
          </div>
        ))}
    </div>
  );
};

export default ThoughtList;
