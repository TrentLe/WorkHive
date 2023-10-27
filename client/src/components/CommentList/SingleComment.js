import React from 'react'
import Auth from '../../utils/auth'
import { useApolloClient, useMutation } from '@apollo/client';
import { REMOVE_COMMENT } from '../../utils/mutations';
import DisplayPicture from '../DisplayPicture/DisplayPicture';
import { useFilterUser } from '../../utils/CustomHooks';
import './SingleComment.css'


const SingleComment = ({ comment, thoughtId, users, user, thought, profileUsers }) => {
  const client = useApolloClient()

  const thisUser = useFilterUser(users, user, thought, comment, profileUsers)

  const [removeComment] = useMutation(REMOVE_COMMENT);

  const handleDeleteComment = async (commentId) => {
    const token = Auth.loggedIn() ? Auth.getToken() : null;
    if (!token) {
      return false;
    }
    try {
      await removeComment({ variables: { thoughtId, commentId } });
      await client.refetchQueries({
        include: 'all'
      })
    } catch (error) {
      console.log(error);
    }
  };
  return (
    <>

      <div key={comment._id} className="col-12 mb-2">
        <div className="pb-3 ps-3 bg-dark text-light rounded-5">
          <h5 className="card-header">
            <DisplayPicture user={thisUser} />
            {comment.commentAuthor} commented {" "}
            <span style={{ fontSize: '0.825rem' }}>
              on {comment.createdAt}
            </span>
          </h5>

          <p className="card-body">{comment.commentText}</p>

          {Auth.getProfile().data.username === comment.commentAuthor ? (<button className="btn btn-outline-danger" onClick={() => handleDeleteComment(comment._id)}>
            Delete
          </button>) : ""}
        </div>
      </div>

    </>
  )
}

export default SingleComment