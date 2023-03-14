import React from 'react';
import { useQuery } from '@apollo/client';
import ThoughtList from '../components/ThoughtList';
// import Stories from '../components/stories'

import { QUERY_THOUGHTS } from '../utils/queries';
import "./home.scss"
import Left from '../components/left/left';
import Right from '../components/right/right';


const Home = () => {
  const { loading, data } = useQuery(QUERY_THOUGHTS);
  const thoughts = data?.thoughts || [];

  return (
    <main>
      <nav>

      {/* <Header/> */}
      </nav>
      <div className="feed-container">
        <Left/>
        
          {loading ? (
            <div>Loading...</div>
          ) : (
            <ThoughtList
              thoughts={thoughts}
              // title="Some Feed for Thought(s)..."
            />
          )}
      
        <Right />
      </div>
    </main>
  );
};

export default Home;
