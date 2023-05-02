import React, { useState } from "react";
import "semantic-ui-css/semantic.min.css";
import "bootstrap/dist/css/bootstrap.min.css";
import "./Parallax.css";
import { useMutation } from "@apollo/client";
import { ADD_CONTACT } from "../utils/mutations";
// if we want to import picture in src = {test}, from Image folder
// import test from "../Image/test.png";

function Contact() {
  const [formState, setFormState] = useState({
    name: "",
    email: "",
    message: "",
  });
  const [addContact, { error, data }] = useMutation(ADD_CONTACT);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormState({
      ...formState,
      [name]: value,
    });
  };
  const handleSubmit = async (e) => {
    e.preventDefault();
    console.log(formState);
    try {
      const { data } = await addContact({
        variables: { ...formState },
      });
    } catch (e) {
      console.error(e);
    }

    setFormState({
      name: "",
      email: "",
      message: "",
    });
  };
  // Send the form data to the server using fetch or Axios

  return (
    <div className="parallax">
      <div className="parallax-overlay">
        <h1
          style={{ marginTop: "100px", color: "#fafad2" }}
          className="hd-text text-center"
        >
          Shaping the Future of Business.
        </h1>

        {/* About us */}
        <div
          className="container"
          style={{ textAlign: "center", marginTop: "10%" }}
        >
          <div className="row">
            <div className="col-lg-4 contactCard">
              <div className="card w-60 h-75" style={{ width: "18rem;" }}>
                <a href='https://github.com/JonJon50'>
                  <img
                    src="https://media.licdn.com/dms/image/D5603AQEzlPHvPwJ_YQ/profile-displayphoto-shrink_800_800/0/1678838200855?e=1684368000&v=beta&t=rxvAwfDqAUfCO4R5uIlLPcz5c5ZXn2XVV0iR4iR-Ip8"
                    className="card-img-top"
                    alt="..."
                  />
                </a>
                <div className="card-body">
                  <p className="card-text" style={{ color: "white" }}>
                    John Hagens - "The most important thing is to try to inspire
                    peoeple so that they can be great in whatever they do." -
                    Kobe Bryant
                  </p>
                </div>
              </div>
            </div>
            <div
              className="col-lg-4 contactCard"
              style={{ fontSize: "50px", color: "white" }}
            >
              {" "}
              About Us
            </div>
            <div className="col-lg-4 contactCard">
              <div className="card w-60 h-75" style={{ width: "18rem;" }}>
                <a href="https://github.com/TheQuentinJones">
                  <img 
                    src="https://media.licdn.com/dms/image/C5603AQFcm8UdjN47dw/profile-displayphoto-shrink_800_800/0/1567959211712?e=1684368000&v=beta&t=mPzHaUVCQgirid2R1m2gP3VWUvSzdagApu3W-a2wd1E"
                    className="card-img-top"
                    alt="..."
                  />
                </a>
                <div className="card-body">
                  <p className="card-text" style={{ color: "white" }}>
                    Quentin Jones - "The best way to predict the future is to
                    invent it." - Alan Kay
                  </p>
                </div>
              </div>
            </div>
          </div>
          <div className="row">
            <div className="col-lg-4 contactCard">
              {" "}
              <div className="card w-60 h-75" style={{ width: "18rem;" }}>
                <a href="https://github.com/dhruvin0777">
                  <img
                    src="https://media.licdn.com/dms/image/D4E03AQES8bQcBDI4Jw/profile-displayphoto-shrink_800_800/0/1678889123672?e=1684368000&v=beta&t=fnFLSAQcQeEa38dNQ-3lpHVU4XiQv0_Mud3gvUS2PYM"
                    className="card-img-top"
                    alt="..."
                  />
                </a>
                <div className="card-body">
                  <p className="card-text" style={{ color: "white" }}>
                  Dhruvin Patel - "The best leaders are those most interested in surrounding 
                  themselves with assistants and associates smarter than they are." - John C. Maxwell
                  </p>
                </div>
              </div>
            </div>
            <div className="col-lg-4 contactCard">
              {" "}
              <div className="card w-60 h-75" style={{ width: "18rem;" }}>
                <a href="https://github.com/TrentLe">
                  <img
                    src="https://media.licdn.com/dms/image/D4E03AQG8avYkhn5YWQ/profile-displayphoto-shrink_800_800/0/1676060466939?e=1684368000&v=beta&t=3zCTl3w5cNTniZn3rORSgv3EiNFJWq6nJ3pazaG2zw0"
                    className="card-img-top"
                    alt="..."
                  />
                </a>
                <div className="card-body">
                  <p className="card-text" style={{ color: "white" }}>
                    {" "}
                    Trent Raeburn - "The only limitations we have are those we
                    place upon ourselves" -KL
                  </p>
                </div>
              </div>
            </div>
            <div className="col-lg-4 contactCard">
              {" "}
              <div className="card w-60 h-75" style={{ width: "18rem;" }}>
                <a href="https://github.com/Henrich77">
                  <img
                    src="https://media.licdn.com/dms/image/D5603AQHh1BhLTfM57g/profile-displayphoto-shrink_800_800/0/1671667372575?e=1684368000&v=beta&t=woLMI9TgiSG6xDMJsSCRKrSwwh7aH4yaQOaDujZjb0k"
                    className="card-img-top"
                    alt="..."
                  />
                </a>
                <div className="card-body">
                  <p className="card-text" style={{ color: "white" }}>
                    Henrich Tanis - "Success is not final, failure is not fatal: 
                    it is the courage to continue that counts." - Winston Churchill
                  </p>
                </div>
              </div>
            </div>
          </div>
        </div>

        {/* Contact information */}
        <div
          className="container mt-4 text-center"
          style={{ marginTop: "50px" }}
        >
          <h1 id="#" style={{ marginTop: "100px" }}>Contact Us</h1>
          <form onSubmit={handleSubmit}>
            <div className="form-group d-flex justify-content-center align-items-center flex-column">
              <label htmlFor="name" style={{ color: "#fafad2" }}>
                Name
              </label>
              <input
                type="text"
                className="form-control"
                id="name"
                value={formState.name}
                name="name"
                onChange={handleChange}
                required
                placeholder="Enter your name"
                style={{ width: "200px", fontSize: "1.2rem", padding: "10px" }}
              />
            </div>
            <div className="form-group d-flex justify-content-center align-items-center flex-column">
              <label htmlFor="email" style={{ color: "#fafad2" }}>
                Email
              </label>
              <input
                type="email"
                className="form-control"
                id="email"
                value={formState.email}
                name="email"
                onChange={handleChange}
                required
                placeholder="Enter your email"
                style={{ width: "200px", fontSize: "1.2rem", padding: "10px" }}
              />
            </div>
            <div className="form-group d-flex justify-content-center align-items-center flex-column">
              <label htmlFor="message" style={{ color: "#fafad2" }}>
                Message
              </label>
              <textarea
                className="form-control"
                id="message"
                name="message"
                value={formState.message}
                onChange={handleChange}
                required
                placeholder="Minimum of 10 characters..."
                style={{
                  width: "400px",
                  fontSize: "1.2rem",
                  padding: "10px",
                  height: "120px",
                }}
              />
            </div>
            <button
              type="submit"
              className="btn btn-primary"
              style={{
                borderRadius: "50px",
                padding: "10px 20px",
                backgroundColor: "#fafad2",
                color: "black",
              }}
            >
              DROP US A LINE
            </button>
          </form>
        </div>
        <p
          style={{
            marginLeft: "43%",
            marginTop: "20px",
            animation: "strobing 1s infinite",
          }}
        >
          Or Email us directly{" "}
          <a href="mailto:ginuwine104@gmail.com" style={{ color: "#fafad2" }}>
            HERE
          </a>
        </p>
      </div>
    </div>
  );
}

export default Contact;
