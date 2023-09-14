import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import { useMutation } from '@apollo/client';
import { LOGIN_USER } from '../../utils/mutations';
import { auth, signInWithGoogle } from '../Firebase/Firebase';

import Auth from '../../utils/auth';
import "./login.scss"

const Login = (props) => {
  const [formState, setFormState] = useState({ email: '', password: '' });
  const [login, { error, data }] = useMutation(LOGIN_USER);  

  // update state based on form input changes
  const handleChange = (event) => {
    const { name, value } = event.target;

    setFormState({
      ...formState,
      [name]: value,
    });
  };
  // handle SignIn with Google
  const logInUsingGoogle = async () => {

    await signInWithGoogle()

    setFormState({
      email: localStorage.getItem("email"),
      password: localStorage.getItem("email"),
    })

    if (localStorage.getItem("email") && localStorage.getItem("name") && localStorage.getItem("profilePic")) {

      console.log(formState)

      try {
        console.log(formState)
        const { data } = await login({
          variables: { ...formState },
        })


        Auth.login(data.login.token)
       
      } catch (err) {
        console.error(err)
      }
    }
  }

  // submit form
  const handleFormSubmit = async (event) => {
    event.preventDefault();
    console.log(formState);
    try {
      const { data } = await login({
        variables: { ...formState },
      });

      Auth.login(data.login.token);
    } catch (e) {
      console.error(e);
    }

    // clear form values
    setFormState({
      email: '',
      password: '',
    });
  };

  return (

    //   <div className="login">
    //   <div className="carding">
    //     <div className="leftside">
    //       <h1>Hello World.</h1>
    //       <p>
    //         Lorem ipsum dolor sit amet consectetur adipisicing elit. Libero cum,
    //         alias totam numquam ipsa exercitationem dignissimos, error nam,
    //         consequatur.
    //       </p>
    //       <span>Don't you have an account?</span>
    //       <Link to="/register">
    //         <button>Register</button>
    //       </Link>
    //     </div>
    //     <div className="rightside">
    //       <h1>Login</h1>
    //       <form>
    //         <input type="text" placeholder="Username" />
    //         <input type="password" placeholder="Password" />
    //         <button onClick={handleFormSubmit}>Login</button>
    //       </form>
    //     </div>
    //   </div>
    // </div>
    <>
      <main className="flex-row justify-center mb-4">
        <div className="col-12 col-lg-10">
          <div className="card">
            <h4 className="card-header bg-dark text-light p-2">Login</h4>
            <div className="card-body">
              {data ? (
                <p>
                  Success! You may now head{' '}
                  <Link to="/">back to the homepage.</Link>
                </p>
              ) : (
                <div>
                  <form onSubmit={handleFormSubmit}>
                    <input
                      className="form-input"
                      placeholder="Your email"
                      name="email"
                      type="email"
                      value={formState.email}
                      onChange={handleChange}
                    />
                    <input
                      className="form-input"
                      placeholder="******"
                      name="password"
                      type="password"
                      value={formState.password}
                      onChange={handleChange}
                    />
                    <button
                      className="btn btn-block btn-primary"
                      style={{ cursor: 'pointer' }}
                      type="submit"
                    >
                      Submit
                    </button>
                  </form>
                  <button type="button" class="login-with-google-btn" onClick={logInUsingGoogle}>
                    Sign in with Google
                  </button>
                </div>
              )}

              {error && (
                <div className="my-3 p-3 bg-danger text-white">
                  {error.message}
                </div>
              )}
            </div>
          </div>
        </div>
      </main>
    </>
  );
};

export default Login;
