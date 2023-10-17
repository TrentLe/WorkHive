import React from "react";
import "semantic-ui-css/semantic.min.css";
import "bootstrap/dist/css/bootstrap.min.css";
import "./Parallax.css";
import ContactForm from "../components/ContactForm/ContactForm";

function Contact() {

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
          <ContactForm />
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
