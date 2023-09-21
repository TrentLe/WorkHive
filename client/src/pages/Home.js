import React from 'react';
import { useQuery } from '@apollo/client';
import ThoughtList from '../components/ThoughtList';
// import Stories from '../components/stories'
import { QUERY_THOUGHTS, QUERY_USERS, QUERY_ME } from '../utils/queries';
import "./home.scss"
import Left from '../components/left/left';
import Right from '../components/right/right';



const Home = () => {
  const query1 = useQuery(QUERY_THOUGHTS);
  const query2 = useQuery(QUERY_USERS)
  const query3 = useQuery(QUERY_ME)

  const thoughts = query1.data?.thoughts || [];
  const users = query2.data?.users || [];
  const me = query3.data?.me || [];

  console.log(me)

  if (query1.loading || query2.loading || query3.loading) {
    <div>Loading...</div>
  }

  return (
    <>
      <h2 className="text-center">
        You are viewing the live feed. Tell us something cool!
      </h2>
      <div className="feed-container">
        <Left />

        {query1.loading ? (
          <div>Loading...</div>
        ) : (
          <ThoughtList
            thoughts={thoughts}
            users={users}
          // title="Some Feed for Thought(s)..."
          />
        )}
        {query3.loading || query2.loading || query1.loading ? (
          <div>Loading...</div>
        ) : (
          <Right
            me={me}
            user={me}
          />
        )}



      </div>
    </>
  );
};

export default Home;
