import React from 'react'
import Auth from '../../utils/auth'
import { useApolloClient, useMutation } from '@apollo/client';
import { REMOVE_COMMENT } from '../../utils/mutations';

const SingleComment = ({ comment, thoughtId }) => {
  const client = useApolloClient()

  console.log(comment)

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

      <div key={comment._id} className="col-12 mb-3 pb-3">
        <div className="p-3 bg-dark text-light">
          <h5 className="card-header">
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