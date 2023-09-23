import React, { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';
import { MdOutlineMessage } from "react-icons/md";
import "./thoughtList.scss"
import { CgMenuCheese } from "react-icons/cg";
import { FcLike } from "react-icons/fc";
import { FcLikePlaceholder } from "react-icons/fc";
import { TbShare3 } from "react-icons/tb";
import CommentList from '../CommentList';
import CommentForm from '../CommentForm';
import { useMutation } from '@apollo/client';
import { REMOVE_THOUGHT } from '../../utils/mutations';
import Auth from "../../utils/auth";

export default function SingleThought({
  thought,
  users,
  liked
}) {

  const [displayPic, setDisplayPic] = useState([])
  const [showComments, setShowComments] = useState(false)
  const [stockPic, setStockPic] = useState("")
  const [ loadingState, setLoadingState] = useState(false)

  useEffect(() => {
      const filteredUser = users.filter((user) => user.username === thought.thoughtAuthor)
      setDisplayPic(filteredUser[0]?.profilepicture)
      setLoadingState(true)
  }, [users, thought])

  useEffect(() => {
      setStockPic("https://i.ibb.co/znBQMM4/stockimageprofilepicture.png")  
  }, [loadingState])

  // REMOVE THOUGHT
  const [removeThought] = useMutation(REMOVE_THOUGHT);

  const handleDeleteThought = async (thoughtId) => {
    const token = Auth.loggedIn() ? Auth.getToken() : null;
    if (!token) {
      return false;
    }
    try {
      await removeThought({ variables: { thoughtId } });
      window.location.reload();
    } catch (error) {
      console.log(error);
    }
  };


  return (
    <div key={thought._id} className="container">
      <div className="user">
        <div className='userinfo'>
          <img src={displayPic ? displayPic : stockPic} alt="" />
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
        <CgMenuCheese />
      </div>
      <div className="content">
        <p>{thought.thoughtText}</p>
      </div>
      <div className='info'>
        <div className='item'>
          {liked ? < FcLike size='25px' /> : <FcLikePlaceholder size='25px' onClick={() => { < FcLike size='25px' /> }} />}
          15 likes
        </div>
        <div className='item'>
          <button onClick={() => setShowComments(!showComments)}
          >
            <MdOutlineMessage size='25px' />
            Comments
          </button>
        </div>
        <div className='item'>
          <TbShare3 size='25px' />
          Share
        </div>
        <button onClick={() => handleDeleteThought(thought._id)}>
          Delete
        </button>
      </div>
      {showComments && (<> <CommentList comments={thought.comments ?? []} thoughtId={thought._id} /> <CommentForm thoughtId={thought._id} /> </>)}
    </div>
  )
}
