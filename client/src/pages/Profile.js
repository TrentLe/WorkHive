import React from 'react';
import { Navigate, useParams } from 'react-router-dom';
import { useQuery } from '@apollo/client';
// import { useMutation } from '@apollo/client';

// import ThoughtForm from '../components/ThoughtForm';
import ThoughtList from '../components/ThoughtList';
// import RemoveUser from '../components/DeleteUser/DeleteUser';
import Auth from '../utils/auth';
// import FollowButton from '../components/FollowButton';
import { QUERY_USER, QUERY_ME, QUERY_USERS } from '../utils/queries';
// import { ADD_FOLLOW, REMOVE_FOLLOW } from '../utils/mutations';
import Left from '../components/left/left';
import Right from '../components/right/right';

const Profile = () => {
  // use this to determine if `useEffect()` hook needs to run again
  const { username: userParam } = useParams();

  // if username is in the URL, execute the QUERY_USER query and return its data
  const query1 = useQuery(userParam ? QUERY_USER : QUERY_ME, {
    variables: { username: userParam },
  });

  const query2 = useQuery(QUERY_USERS)

  const user = query1.data?.me || query1.data?.user || {};

  const users = query2.data?.users

  // navigate to personal profile page if username is yours
  if (Auth.loggedIn() && Auth.getProfile().data.username === userParam) {
    return <Navigate to="/me" />;
  }

  if (query1.loading) {
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

    <>
      <h2 className="text-center">
        You are viewing {userParam ? `${user.username}'s` : 'your'} profile.
      </h2>
      <div>
        <div>
          <div>
            <p>Bio</p>
            <p>{user.bio}</p>
          </div>
          <div>
            
          </div>
        </div>
        <div className="d-inline-flex">

          <Left />

          <ThoughtList
            user={user}
            profileUsers={users}
            thoughts={user.thoughts}
            title={`${user.username}'s thoughts...`}
            displayPic={user.profilepicture}
            showTitle={false}
            showUsername={false}
          />

          {query1.loading ? (<div>Loading...</div>) : (!userParam ? (
            <Right
              me={user}
            />
          ) : (

            <Right
              user={user}
            />

          ))}

        </div>
      </div>
    </>
  );
};

export default Profile;
