import React from 'react';
import SingleComment from './SingleComment';

const CommentList = ({ comments = [], thoughtId, users, profileUsers }) => {

  if (comments.length === 0) {
    return (<>
    <h6 className='mt-3'> no comments yet! </h6>

   </>
   )            
  }

  return (
    <>  

      <div className="flex-row my-4">
        {comments &&
          comments.map((comment) => (

            <SingleComment comment={comment} thoughtId={thoughtId} users={users} profileUsers={profileUsers} />

          ))}
      </div>
    </>
  );
};

export default CommentList;