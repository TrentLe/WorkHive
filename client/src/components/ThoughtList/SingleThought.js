import React, { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';
import { MdOutlineMessage } from "react-icons/md";
import "./thoughtList.scss"
import { CgMenuCheese } from "react-icons/cg";
import { TbShare3 } from "react-icons/tb";
import CommentList from '../CommentList';
import CommentForm from '../CommentForm';
import { useApolloClient, useMutation } from '@apollo/client';
import { REMOVE_THOUGHT } from '../../utils/mutations';
import LikeButton from '../LikeButton/LikeThoughtButton';
import DisplayPicture from '../DisplayPicture/DisplayPicture';
import Auth from "../../utils/auth";
// import LinkifyText from '../Linkify/Linkify';
import { useFilterUser } from '../../utils/CustomHooks';

export default function SingleThought({
  thought,
  users,
  user,
}) {
  const client = useApolloClient()

  const [showComments, setShowComments] = useState(false)
  const [ commentState, setCommentState ] = useState([])

  useEffect(() => {
    setCommentState(thought.comments)
  }, [thought])

  const thisUser = useFilterUser(users, user, thought)


  // REMOVE THOUGHT
  const [removeThought] = useMutation(REMOVE_THOUGHT);

  const handleDeleteThought = async (thoughtId) => {
    const token = Auth.loggedIn() ? Auth.getToken() : null;
    if (!token) {
      return false;
    }
    try {
      await removeThought({ variables: { thoughtId } });
      await client.refetchQueries({
        include: 'all'
      })
    } catch (error) {
      console.log(error);
    }
  };


  return (
    <div key={thought._id} className="container rounded-4 mb-3 p-4">
      <div className="user d-flex align-items-center justify-content-between">
        <div className='d-flex gap-3'>
          <DisplayPicture user={thisUser} />
          <div className='d-flex flex-column'>
            <Link
              to={`/profiles/${thought.thoughtAuthor}`}
              style={{ textDecoration: "none", color: "inherit" }}>
              <span>{thought.thoughtAuthor}</span>
            </Link>
            <span className="date">{thought.createdAt}</span>
          </div>
        </div>
        <CgMenuCheese />
      </div>
      <div className="mt-4 mb-4">
        {/* <LinkifyText text={thought.thoughtText} /> */}
        <p>{thought.thoughtText}</p>
      </div>
      <div className='info d-flex align-items-center gap-4'>
        <div className='item d-flex align-items-center gap-2 '>
          <LikeButton thought={thought} />
        </div>
        <div className='item'>
          <button className="btn btn-primary" onClick={() => setShowComments(!showComments)}
          >
            <MdOutlineMessage size='25px' />
            Comments
          </button>
        </div>
        <div className='item'>
          <TbShare3 size='25px' />
          Share
        </div>
        {Auth.getProfile().data.username === thought.thoughtAuthor ? (<button className="btn btn-outline-danger" onClick={() => handleDeleteThought(thought._id)}>
          Delete
        </button>) : ""}
      </div>
      {showComments && (<> <CommentList comments={commentState} thoughtId={thought._id} users={users} /> <CommentForm thoughtId={thought._id} /> </>)}
    </div>
  )
}
