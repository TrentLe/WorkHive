import React, { useState } from "react";
import { useMutation } from "@apollo/client";
import { useQuery } from "@apollo/client";
import { ADD_FOLLOW, REMOVE_FOLLOW } from "../../utils/mutations";
import { QUERY_USER, QUERY_ME } from "../../utils/queries";


const FollowButton = ({ userId, following }) => {
    const [ isFollowing, setFollowing ] = useState([following]);
    const [ addFollow ] = useMutation(ADD_FOLLOW);
    const [ removeFollower ] = useMutation(REMOVE_FOLLOW);

    const { data } = useQuery(QUERY_USER, {
        variables: { userId: userId },
    });

  
    const user = data?.user || {};
  
    const handleFollow = async () => {
      console.log('Function works ?');
      console.log(userId);
  // if user is not following, follow them
        if (!isFollowing) {
            try {
                await addFollow({
                    variables: { userId: userId },
                });
                setFollowing(true);
            } catch (e) {
                console.error(e);
            }
        } else {
            try {
                await removeFollower({
                    variables: { userId: userId },
                });
                setFollowing(false);
            } catch (e) {
                console.error(e);
            }
        }
    };
  
    return (
      <button className="btn ml-auto" onClick={handleFollow}>
        {isFollowing ? 'Unfollow' : 'Follow'}
      </button>
    );
    };

export default FollowButton;