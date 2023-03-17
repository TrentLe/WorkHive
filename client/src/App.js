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

import Signup from './components/Signup/Signup';




// import { DarkModeContext } from "./context/darkModeContext.js";
// import { useContext } from 'react';




// import { getMainDefinition } from '@apollo/client/utilities';
// import Left from './components/left/left';



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
// This where what I am not sure of starts <<<<<<<<<<<<<<<<<<<<<<<<<<<<<<< beginning
// Create an Apollo link for file uploads
// const uploadLink = createUploadLink({ uri: 'http://localhost:3001'})

// Split function is to send HTTP requests through the HTTP link
//with authentication headers, and file uploads through the upload link
// const link = split(
//   ({ query }) => {
//     const { kind, operation } = getMainDefinition(query);
//     return kind === 'OperationDefinition' && operation === 'mutation';
//   },
//   uploadLink,
//   authLink.concat(httpLink)  
// )
// This is where what I am not sure of ends <<<<<<<<<<<<<<<<<<<<<<<<<<<<<< end
const client = new ApolloClient({
  // Set up our client to execute the `authLink` middleware prior to making the request to our GraphQL API

  // link: authLink.concat(httpLink), <<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<< This was here before my edit! bring it back if this doesn't work!!
  link: authLink.concat(httpLink),
  cache: new InMemoryCache(),
});


function App() {
  // const { darkMode } = useContext(DarkModeContext);

  // const Layout = () => {
  //   return (
  //     <div className={`theme-${darkMode ? "dark" : "light"}`}>
  //       <Header />
  //       <div style={{ display: "flex" }}>
       
  //         <div style={{ flex: 6 }}>
           
  //         </div>
         
  //       </div>
  //     </div>
  //   );
  // };
  return (
    <ApolloProvider client={client}>
      <Router>
        <div className="flex-column justify-flex-start min-100-vh">
          <Header />
        
          <div className="">
            <Routes>


              <Route path="/LandingPage" element={<LandingPage />} />  
              <Route path="/Login" element={<Login/>} /> 
              <Route path="/Signup" element={<Signup/>} />          

              <Route path="/me" element={<Profile />} />
              <Route element={<AuthRequired />}>
                <Route path="/" element={<Home />} />
                <Route path="/meetup" element={<Meetup />} />
              </Route>
              <Route path="/profiles/:username" element={<Profile />} />
              <Route path="/thoughts/:thoughtId" element={<SingleThought />} />
              <Route path="/contact" element={<Contact />} />
              {/* <Route path="/uploader" element={<Uploader />} />              */}
              <Route path="/jobs" element={<JobListing />} />
                         
             
          
            </Routes>
          </div>
          
        </div>
      </Router>
    </ApolloProvider>
  );
}

export default App;

