import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import { MdOutlineMessage  } from "react-icons/md";
import "./thoughtList.scss"
 import { CgMenuCheese  } from "react-icons/cg";
 import {  FcLike  } from "react-icons/fc";
 import {  FcLikePlaceholder  } from "react-icons/fc";
 import { TbShare3 } from "react-icons/tb";
import CommentList from '../CommentList';
import CommentForm from '../CommentForm';

export default function SingleThought({
    thought,
    liked
}) {

    
    const [showComments, setShowComments] = useState(false)

  return (
    <div key={thought._id} className="container">
            <div className="user">
              <div className='userinfo'>
              <img src='https://media.licdn.com/dms/image/C4E03AQG8hEqqWqj0AQ/profile-displayphoto-shrink_800_800/0/1549993870611?e=1684368000&v=beta&t=_rd0TrKAHnKrGGmgPpDO3xJIqshZi6c86pUtZq9r8X0' alt="" />
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
              {/* <img src='https://cdn.vox-cdn.com/thumbor/RaRYyCa8D-PrmpPMrBTOsIIkvEg=/0x0:2997x2398/1200x800/filters:focal(852x628:1330x1106)/cdn.vox-cdn.com/uploads/chorus_image/image/71761914/usa_today_19606912.0.jpg' alt="" /> */}
            </div>
            <div className='info'>
              <div className='item'>
              {liked ? < FcLike size='25px' /> : <FcLikePlaceholder size='25px' onClick={()=>{< FcLike size='25px' />}}/>}
              15 likes
              </div>
              <div  className='item'>
            <button onClick={() => setShowComments(!showComments)}
            >
              <MdOutlineMessage size='25px'/>
               Comments
            </button>
            </div>
            <div className='item'>
            <TbShare3 size='25px'/> 
            Share
            </div>
            </div>
            {showComments && ( <> <CommentList comments={thought.comments ?? []} thoughtId = {thought._id} /> <CommentForm thoughtId={thought._id}/> </>) }
          </div>
  )
}
