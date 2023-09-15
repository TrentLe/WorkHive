import React from 'react';
import { useQuery } from '@apollo/client';
import ThoughtList from '../components/ThoughtList';
// import Stories from '../components/stories'

import { QUERY_THOUGHTS, QUERY_USERS } from '../utils/queries';
import "./home.scss"
import Left from '../components/left/left';
import Right from '../components/right/right';


const Home = () => {
  const query1 = useQuery(QUERY_THOUGHTS);
  const query2 = useQuery(QUERY_USERS)
  console.log(query1.data)
  console.log(query2.data)

  const thoughts = query1.data?.thoughts || [];
  const users = query2.data?.users || [];

  return (
    <main>
      <nav>

      {/* <Header/> */}
      </nav>
      <div className="feed-container">
        <Left/>
        
          {query1.loading ? (
            <div>Loading...</div>
          ) : (
            <ThoughtList
              thoughts={thoughts}
              users={users}
              // title="Some Feed for Thought(s)..."
            />
          )}
      
        <Right />
      </div>
    </main>
  );
};

export default Home;
