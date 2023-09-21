import React, { useState } from "react";
import { Link } from "react-router-dom";
import { MdOutlineMessage } from "react-icons/md";
import "./thoughtList.scss";
import { CgMenuCheese } from "react-icons/cg";
import { FcLike } from "react-icons/fc";
import { FcLikePlaceholder } from "react-icons/fc";
import { TbShare3 } from "react-icons/tb";

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

  const liked = false;
  // const [commentOpen, setComment] = useState(false);
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
    <div className="post">
      {/* {showTitle && <h3>{title}</h3>} */}
      {thoughts &&
        thoughts.map((thought) => (

          <div key={thought._id} className="container">
            <div className="user">
              <div className="userinfo">
                <img
                  src={authorMap.get(thought.thoughtAuthor) || displayPic}
                  alt=""
                />
                <div className="postdetails">
                  <Link
                    to={`/profiles/${thought.thoughtAuthor}`}
                    style={{ textDecoration: "none", color: "inherit" }}
                  >
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
              {/* <img
                src="https://cdn.vox-cdn.com/thumbor/RaRYyCa8D-PrmpPMrBTOsIIkvEg=/0x0:2997x2398/1200x800/filters:focal(852x628:1330x1106)/cdn.vox-cdn.com/uploads/chorus_image/image/71761914/usa_today_19606912.0.jpg"
                alt=""
              /> */}
            </div>
            <div className="info">
              <div className="item">
                {liked ? (
                  <FcLike size="25px" />
                ) : (
                  <FcLikePlaceholder
                    size="25px"
                    onClick={() => {
                      <FcLike size="25px" />;
                    }}
                  />
                )}
                15 likes
              </div>
              <div className="item">
                <Link to={`/thoughts/${thought._id}`}>
                  <MdOutlineMessage size="25px" />
                  Comments
                </Link>
              </div>
              <div className="item">
                <TbShare3 size="25px" />
                Share
              </div>
              <button onClick={() => handleDeleteThought(thought._id)}>
                Delete
              </button>
            </div>
          </div>


          // show comments on click

        ))}
    </div>
  );
};

export default ThoughtList;
