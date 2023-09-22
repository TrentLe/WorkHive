import React from 'react';
import CommentForm from '../CommentForm';



const CommentList = ({ comments = [] },{thoughtId}) => {
  console.log()

  if (comments.length === 0) {
    return (<>
    <h3> no comments yet! </h3>
    {/* <CommentForm thoughtId={thoughtId}/>  */}
   </>
   )
              
   

  }
console.log(thoughtId)
  return (
    <>
      {/* <h3 className="p-5 display-inline-block" style={{ borderBottom: '1px dotted #1a1a1a' }} >
        Comments

      </h3> */}
      

      <div className="flex-row my-4">
        {comments &&
          comments.map((comment) => (
            <div key={comment._id} className="col-12 mb-3 pb-3">
              <div className="p-3 bg-dark text-light">
                <h5 className="card-header">
                  {comment.commentAuthor} commented{' '}
                  <span style={{ fontSize: '0.825rem' }}>
                    on {comment.createdAt}
                  </span>
                </h5>

                <p className="card-body">{comment.commentText}</p>
                <p> {thoughtId}</p>
              </div>
            </div>
          ))}
      </div>

      {/* <div>
            <div>
              <div>
                <p className="card-body">{comment.commentText}</p>                
              </div>             
            </div>
          ))}
      </div>       */}

    </>
  );
};

export default CommentList;
