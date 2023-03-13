import React, { useState } from "react";
import { Link } from "react-router-dom";
import { useMutation } from "@apollo/client";

import { ADD_THOUGHT } from "../../utils/mutations";
import { QUERY_THOUGHTS, QUERY_ME } from "../../utils/queries";
import "./postbox.scss";

import Auth from "../../utils/auth";
 import { FiUpload} from "react-icons/fi";

const ThoughtForm = () => {
  const [thoughtText, setThoughtText] = useState("");

  const [characterCount, setCharacterCount] = useState(0);

  const [addThought, { error }] = useMutation(ADD_THOUGHT, {
    update(cache, { data: { addThought } }) {
      try {
        const { thoughts } = cache.readQuery({ query: QUERY_THOUGHTS });

        cache.writeQuery({
          query: QUERY_THOUGHTS,
          data: { thoughts: [addThought, ...thoughts] },
        });
      } catch (e) {
        console.error(e);
      }

      // update me object's cache
      const { me } = cache.readQuery({ query: QUERY_ME });
      cache.writeQuery({
        query: QUERY_ME,
        data: { me: { ...me, thoughts: [...me.thoughts, addThought] } },
      });
    },
  });

  const handleFormSubmit = async (event) => {
    event.preventDefault();

    try {
      const { data } = await addThought({
        variables: {
          thoughtText,
          thoughtAuthor: Auth.getProfile().data.username,
        },
      });

      setThoughtText("");
      setCharacterCount(0);
    } catch (err) {
      console.error(err);
    }

    window.location.reload();
  };

  const handleChange = (event) => {
    const { name, value } = event.target;

    if (name === "thoughtText" && value.length <= 280) {
      setThoughtText(value);
      setCharacterCount(value.length);
    }
  };

  return (
    <div className="postbox">
        
          <div className="container">
            <div className="user">
            <div className="userinfo">
            <img src='https://deadline.com/wp-content/uploads/2022/12/Garcelle-Crop2_cred-Erick-Robinson.png?w=681&h=383&crop=1' alt="" />
            <form className="" onSubmit={handleFormSubmit}>
              <div className="">
                <input
                  name="thoughtText"
                  placeholder="Create new post..."
                  value={thoughtText}
                  className=""
                  style={{}}
                  onChange={handleChange}
                ></input>
              </div>
              <div className="info">
                <div className="item">
              <FiUpload/>
              <span>Upload</span>
              </div>
              <div className="item">
                <button className="" type="submit">
                  Post
                </button>
              </div>
              {error && <div className="">{`Reporting to the Hive...`}</div>}

            </div>
            </form>
            {/* <div>
              <FiUpload/>
            </div> */}
            </div>
            </div>
          </div>
        
     
    
    </div>
  );
};

export default ThoughtForm;
