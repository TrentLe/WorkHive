import React, { useState } from 'react';
import { Navigate, useParams } from 'react-router-dom';
import { useQuery } from '@apollo/client';
import { useMutation } from '@apollo/client';

import ThoughtForm from '../components/ThoughtForm';
import ThoughtList from '../components/ThoughtList';
// import Left from '../components/left/left';

import Auth from '../utils/auth';

import { QUERY_USER, QUERY_ME } from '../utils/queries';
import { ADD_FOLLOW } from '../utils/mutations';
import { QUERY_FOLLOWING } from '../utils/queries';
import { REMOVE_FOLLOW} from '../utils/mutations';
// import { QUERY_FOLLOWERS } from '../../utils/queries';

const FollowButton = ({ userId, following }) => {
  const [ isFollowing, setFollowing ] = useState(following);
  const [ addFollow ] = useMutation(ADD_FOLLOW);
  const [ removeFollower ] = useMutation(REMOVE_FOLLOW);

  const handleFollow = async () => {
    console.log('Function works ?');
    console.log(userId);
    if (isFollowing) {
      try {
        await removeFollower({
          variables: { userId },
        });
        setFollowing(false);
      } catch (e) {
        console.error(e);
      }
    } else {
      try {
        await addFollow({
          variables: { userId },
        });
        setFollowing(true);
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
const Profile = ({userID}) => {
  // use this to determine if `useEffect()` hook needs to run again
  const { username: userParam } = useParams();

  // if username is in the URL, execute the QUERY_USER query and return its data
  const { loading, data } = useQuery(userParam ? QUERY_USER : QUERY_ME, {
    variables: { username: userParam },
  });

  const user = data?.me || data?.user || {};
  // navigate to personal profile page if username is yours
  if (Auth.loggedIn() && Auth.getProfile().data.username === userParam) {
    return <Navigate to="/me" />;
  }

  if (loading) {
    return <div>Loading...</div>;
  }

  if (!user?.username) {
    return (
      <h4>
        You need to be logged in to see this. Use the navigation links above to
        sign up or log in!
      </h4>
    );
  }

  return (
    <div>
      
      <div className="">
        {/* <Left/> */}
        
        <h2 className="col-12 col-md-10 bg-dark text-light p-3 mb-5">
          Viewing {userParam ? `${user.username}'s` : 'your'} profile.
        </h2>

        <FollowButton userId={user._id} isFollowing={user.isFollowing} />

       
        <div className="col-12 col-md-10 mb-5">
          <ThoughtList
            thoughts={user.thoughts}
            title={`${user.username}'s thoughts...`}
            showTitle={false}
            showUsername={false}
          />
        </div>
        {!userParam && (
          <div
            className="col-12 col-md-10 mb-3 p-3"
            style={{ border: '1px dotted #1a1a1a' }}
          >
            <ThoughtForm />
          </div>
        )}
      </div>
    </div>
  );
};

export default Profile;
