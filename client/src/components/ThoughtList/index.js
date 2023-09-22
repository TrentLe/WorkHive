import React, { useState } from "react";
import { Link } from "react-router-dom";
import { MdOutlineMessage } from "react-icons/md";
import "./thoughtList.scss";
import { CgMenuCheese } from "react-icons/cg";
import { FcLike } from "react-icons/fc";
import { FcLikePlaceholder } from "react-icons/fc";
import { TbShare3 } from "react-icons/tb";
import SingleThought from './SingleThought';
import Auth from "../../utils/auth";

import { REMOVE_THOUGHT } from "../../utils/mutations";

import { useMutation } from "@apollo/client";
// import { QUERY_USERS } from "../../utils/queries";


const ThoughtList = ({
  thoughts,
  users,
  title,
  displayPic,
  showTitle = true,
  showUsername = true,
}) => {

  // MY QUERY
  const authorMap = new Map()

  if (users) {


    const authorArr = thoughts.map(thought => thought.thoughtAuthor)

    authorArr.forEach(author => {
      for (let i = 0; i < users.length; i++) {
        if (author === users[i].username) {
          authorMap.set(author, users[i].profilepicture)
        }
      }
    }
    )
  }

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

  if (!thoughts.length) {
    return <div className="no-thoughts"><h3 >No Thoughts Yet</h3></div>;
  }

  return (
    <div className='post'>
      {/* {showTitle && <h3>{title}</h3>} */}
      {thoughts &&
        thoughts.map((thought) => (
          <SingleThought thought={thought} key={thought._id} />
          // show comments on click
        ))}
    </div>
  );
};

export default ThoughtList;
