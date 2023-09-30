import React, { useState, useEffect } from "react";

import { useApolloClient, useMutation } from "@apollo/client";

import { ADD_THOUGHT } from "../../utils/mutations";
import { QUERY_THOUGHTS, QUERY_ME } from "../../utils/queries";
import "./postbox.scss";

import Auth from "../../utils/auth";
// import { FiUpload } from "react-icons/fi";
// import Uploader from "../Uploader";

const ThoughtForm = ({ meInfo }) => {
 const client = useApolloClient()

  const [stockPic, setStockPic] = useState("")
  const [loadingState, setLoadingState] = useState(false)
  const [ myImage, setMyImage ] = useState("")
  const [thoughtText, setThoughtText] = useState("");
  
  const [characterCount, setCharacterCount] = useState(0);

  useEffect(() => {
    setMyImage(meInfo.me?.profilepicture)
    setLoadingState(true)
  }, [meInfo.me])

  useEffect(() => {
    setStockPic("https://i.ibb.co/znBQMM4/stockimageprofilepicture.png")
  }, [loadingState])


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

      await client.refetchQueries({
        include: 'all'
      })
      
    } catch (err) {
      console.error(err);
    }

    
  };

  const handleChange = (event) => {
    event.preventDefault()
    const { name, value } = event.target;

    if (name === "thoughtText" && value.length <= 280) {
      setThoughtText(value);
      setCharacterCount(value.length);
    }
  };

  return (
    <form onSubmit={handleFormSubmit}>
      <div className="postbox">
        <div className="container">
          <div className="top">
            <img
              src={myImage ? myImage : stockPic}
              alt=""
            />
            <input placeholder={`What's on your mind ?`} name='thoughtText' value={thoughtText} onChange={handleChange} />
          </div>
          <hr />

          <div className="bottom">
            <div className="lefty">
              <input type="file" id="file" style={{ display: "none" }} />
              <label htmlFor="file">
                <div className="item">
                  <img src={Image} alt="" />
                  <span>Add Image</span>
                  
                </div>
              </label>
              <span>Character Count: {characterCount}</span>
              <div className="item">

                <span></span>
              </div>
              <div className="item">
                {/* <FileUploader/> */}
                {/* <img src={Friend} alt="" /> */}
                <span></span>

              </div>
            </div>
            <div className="righty">
              <button type="submit">Post</button>
            </div>
            {error && <div className="">{`Reporting to the Hive...`}</div>}
          </div>
        </div>
      </div>
    </form>
  );
};

export default ThoughtForm;
