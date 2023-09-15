import React from 'react';
import {
  ApolloClient,
  InMemoryCache,
  ApolloProvider,
  createHttpLink,
} from '@apollo/client';
// import { split } from '@apollo/client/link/core'
// import { createUploadLink }  from 'apollo-upload-client'
import { setContext } from '@apollo/client/link/context';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';



// Import pages and components
import Home from './pages/Home';
// import Signup from './components/Signup/Signup';
// import Login from './components/Login/Login';
import LandingPage from './pages/LandingPage';
import Login from './components/Login/Login';
import SingleThought from './pages/SingleThought';
import Profile from './pages/Profile';
import Header from './components/Header';
import Contact from './pages/Contact';
import Meetup from './pages/Meetup';
import AuthRequired from './components/AuthRequired/AuthRequired';
import JobListing from './pages/Jobs';
import ProfileEditor from './pages/ProfileEditor/ProfileEditor';

import Signup from './components/Signup/Signup';
import './App.css'


// Construct our main GraphQL API endpoint
const httpLink = createHttpLink({
  uri: '/graphql',
});

// Construct request middleware that will attach the JWT token to every request as an `authorization` header
const authLink = setContext((_, { headers }) => {
  // get the authentication token from local storage if it exists
  const token = localStorage.getItem('id_token');
  // return the headers to the context so httpLink can read them
  return {
    headers: {
      ...headers,
      authorization: token ? `Bearer ${token}` : '',
    },
  };
});

const client = new ApolloClient({
  // Set up our client to execute the `authLink` middleware prior to making the request to our GraphQL API  
  link: authLink.concat(httpLink),
  cache: new InMemoryCache(),
});


function App() {
  function LoginWithHeader() {
    return (
      <>
        <Header />
        <Login />
      </>
    );
  }

  return (
    <ApolloProvider client={client}>
      <Router>
        <div className="flex-column justify-flex-start min-100-vh">
          <Header />
        
          <div className="">
            <Routes>


              <Route path="/LandingPage" element={<LandingPage />} />  
           
              
              <Route path="/Login" element={<LoginWithHeader />} />
               
              <Route path="/Signup" element={<Signup/>} />          

              
              <Route element={<AuthRequired />}>
                <Route path="/" element={<Home />} />
                <Route path="/meetup" element={<Meetup />} />
                <Route path="/me" element={<Profile />} />                
              </Route>
              <Route path="/profiles/:username" element={<Profile />} />
              <Route path="/thoughts/:thoughtId" element={<SingleThought />} />
              <Route path="/contact" element={<Contact />} />
              {/* <Route path="/uploader" element={<Uploader />} />              */}
              <Route path="/jobs" element={<JobListing />} />
              <Route path="/ProfileEditor" element={<ProfileEditor />} />  
             
          
            </Routes>
          </div>
          
        </div>
      </Router>
    </ApolloProvider>
  );
}

export default App;

