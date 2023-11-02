import React from "react";
import "./thoughtList.scss";
import SingleThought from './SingleThought';

// import { QUERY_USERS } from "../../utils/queries";


const ThoughtList = ({
  thoughts,
  users,
  user,
  profileUsers,
}) => {

  if (!thoughts?.length) {
    return <div className="no-thoughts">
      <h3 >Nothing to see here!</h3>
    </div>;
  }

  return (
    <div className='post d-flex flex-column'>
      {thoughts &&
        thoughts.map((thought) => (
          <SingleThought thought={thought} users={users} user={user} key={thought._id} profileUsers={profileUsers}/>
        ))}
    </div>
  );
};

export default ThoughtList;
