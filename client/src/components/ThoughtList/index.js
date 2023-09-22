import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import { MdOutlineMessage  } from "react-icons/md";
import "./thoughtList.scss"
 import { CgMenuCheese  } from "react-icons/cg";
 import {  FcLike  } from "react-icons/fc";
 import {  FcLikePlaceholder  } from "react-icons/fc";
 import { TbShare3 } from "react-icons/tb";
 import { REMOVE_THOUGHT } from "../../utils/mutations";

import { useMutation } from "@apollo/client";
// import { QUERY_USERS } from "../../utils/queries";

import Auth from "../../utils/auth";

import SingleThought from './SingleThought';


const ThoughtList = ({




  
  thoughts,
  title,
  showTitle = true,
  showUsername = true,
}) => 
{


  const liked = false ;
  const [commentOpen, setComment] = useState(false)

  if (!thoughts.length) {
    return <h3>No Thoughts Yet</h3>;
  }

  return (
    <div className='post'>
      {/* {showTitle && <h3>{title}</h3>} */}
      {thoughts &&
        thoughts.map((thought) => (
          <SingleThought thought={thought} key={thought._id} liked={liked} />
          // show comments on click
        ))}
    </div>
  );
};

export default ThoughtList;
