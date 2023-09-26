import React from "react";
import "./thoughtList.scss";
import SingleThought from './SingleThought';

// import { QUERY_USERS } from "../../utils/queries";


const ThoughtList = ({
  thoughts,
  users,
  user,
  title,
  displayPic,
  showTitle = true,
  showUsername = true,
}) => {

  if (!thoughts.length) {
    return <div className="no-thoughts">
      <h3 >Nothing to see here!</h3>
    </div>;
  }

  return (
    <div className='post'>
      {/* {showTitle && <h3>{title}</h3>} */}
      {thoughts &&
        thoughts.map((thought) => (
          <SingleThought thought={thought} users={users} user={user} key={thought._id} />
          // show comments on click
        ))}
    </div>
  );
};

export default ThoughtList;
