import React, { useState } from 'react';
import 'semantic-ui-css/semantic.min.css';
import 'bootstrap/dist/css/bootstrap.min.css';
import './Parallax.css';

function Contact() {
  const [name, setName] = useState('');
  const [email, setEmail] = useState('');
  const [message, setMessage] = useState('');

  const handleSubmit = (e) => {
    e.preventDefault();
    console.log(`Name: ${name}, Email: ${email}, Message: ${message}`);
    // Send the form data to the server using fetch or Axios
  };

  return (
    <div className="parallax">
      <div className="parallax-overlay">
      <h1 style={{ marginTop: '100px' }} className="hd-text text-center">Shaping the Future of Business.</h1>

        <div className="container mt-4 text-center" style={{ marginTop: "50px" }}>
        <h2 style={{ marginTop: '100px'}}>Contact Us</h2>
          <form onSubmit={handleSubmit}>
            <div className="form-group d-flex justify-content-center align-items-center flex-column">
              <label htmlFor="name" style={{ color: "#fafad2" }}>Name</label>
              <input
                type="text"
                className="form-control"
                id="name"
                value={name}
                onChange={(e) => setName(e.target.value)}
                required
                style={{ width: "200px", fontSize: "1.2rem", padding: "10px" }}
              />
            </div>
            <div className="form-group d-flex justify-content-center align-items-center flex-column">
              <label htmlFor="email" style={{ color: "#fafad2" }}>Email</label>
              <input
                type="email"
                className="form-control"
                id="email"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                required
                style={{ width: "200px", fontSize: "1.2rem", padding: "10px" }}
              />
            </div>
            <div className="form-group d-flex justify-content-center align-items-center flex-column">
              <label htmlFor="message" style={{ color: "#fafad2" }}>Message</label>
              <textarea
                className="form-control"
                id="message"
                value={message}
                onChange={(e) => setMessage(e.target.value)}
                required
                style={{ width: "200px", fontSize: "1.2rem", padding: "10px", height: "150px" }}
              />
            </div>
            <button type="submit" className="btn btn-primary" style={{ borderRadius: '50px', padding: '10px 20px', backgroundColor: '#fafad2', color: 'black' }}>
              DROP US A LINE
            </button>
          </form>
        </div>
      </div>
    </div>
  );
}

export default Contact;
