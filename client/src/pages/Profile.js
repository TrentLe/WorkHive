import React, { useState } from 'react';
import { Navigate, useParams } from 'react-router-dom';
import { useQuery } from '@apollo/client';
import { useMutation } from '@apollo/client';

import ThoughtForm from '../components/ThoughtForm';
import ThoughtList from '../components/ThoughtList';
import RemoveUser from '../components/DeleteUser/DeleteUser';
import Auth from '../utils/auth';
import FollowButton from '../components/FollowButton';
import { QUERY_USER, QUERY_ME, QUERY_FOLLOWING } from '../utils/queries';
import { ADD_FOLLOW, REMOVE_FOLLOW } from '../utils/mutations';
import Left from '../components/left/left';

const Profile = ({ userId }) => {
  // use this to determine if `useEffect()` hook needs to run again
  const { username: userParam } = useParams();

  // if username is in the URL, execute the QUERY_USER query and return its data
  const { loading, data } = useQuery(userParam ? QUERY_USER : QUERY_ME, {
    variables: { username: userParam },
  });

  const targetUser = data?.user || {};
  const [followed, setFollowed] = useState(targetUser.followed || false);
  const [bio, setBio] = useState('');

  const handleBioChange = (event) => {
    setBio(event.target.value);
  };

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
    <div className="feed-container">
      <Left />
      <div className="">
        <div className="col-12 col-md-10 mb-5">
          <div>
            <h2 className="">
              Viewing {userParam ? `${user.username}'s` : 'your'} profile.
            </h2>
            <FollowButton userId={targetUser.id} followed={followed} />
            <div className="col-12 col-md-10 mb-5">
              <ThoughtList
                thoughts={user.thoughts}
                title={`${user.username}'s thoughts...`}
                showTitle={false}
                showUsername={false}
              />
            </div>
          </div>
          {!userParam && (
            <div
              className="col-12 col-md-10 mb-3 p-3"
              style={{ border: '1px dotted #1a1a1a' }}
            >
              <ThoughtForm />
              <h3>Biography:</h3>
              <textarea
                placeholder="Type your bio here..."
                value={bio}
                onChange={handleBioChange}
                rows={5}
              />
            </div>
          )}
        </div>
      </div>
    </div>
  );
};

export default Profile;
