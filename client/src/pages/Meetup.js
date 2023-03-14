import React from "react";
import "semantic-ui-css/semantic.min.css";
import Left from "../components/left/left";

function Meetup() {
  return (
    <div style={{ textAlign: "center" }}>

      <h1>' ONLINE JOB FAIR! '</h1>
    
      <div style={{ display: "flex" }}>
        <div
          style={{
            flex: 1,
            fontFamily: "Comic Sans MS",
            fontSize: "60px",
            
          }}
        >
          <p style={{ backgroundColor: "#fafad2", borderRadius: "20px" }}>
            Welcome to our online job fair meetup! We're excited to connect job
            seekers with potential employers in a virtual setting. With the
            convenience of online access, job seekers can easily explore career
            opportunities, connect with recruiters, and even interview for their
            dream job - all from the comfort of their own home. Our event is
            designed to be a safe, accessible, and efficient way to find job
            opportunities, network with industry professionals, and take the
            next step in your career.{" "}
          </p>


          <img
            src="https://cdn.vectorstock.com/i/1000x1000/20/51/job-proposal-abstract-concept-vector-33672051.webp"
            alt="On the spot interview"
            style={{ maxWidth: "100%", height: "auto", 
            clipPath: "inset(0px 0px 60px 0px)", marginTop: "30%" }}
          />
        </div>

        <div style={{ flex: 1 }}>
          <iframe
            width="560"
            height="315"
            src="https://www.youtube.com/embed/ox0ofe28YuU"
            title="YouTube video player"
            frameborder="0"
            allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; web-share"
            allowfullscreen
            autoplay
          ></iframe>
          <p style={{ fontSize: "30px", fontFamily: "Courier New", 
          marginTop: "25%", backgroundColor: "#fafad2", borderRadius: "100px"}}>
            ` Join the online social media revolution today and take your career to the next level! `</p>
        </div>
      </div>

        <hr />

      <div style={{ alignItems: "center", marginTop: "3px" }}>
        <div style={{ flex: 1, margin: "10px" }}>
          
          <h1 style={{ fontFamily: "Marker Felt, sans-serif" }}>
            ' ONLINE INTERVIEWS ON THE SPOT! '
          </h1>
          <img
  src="https://hs-marketing-contentful.imgix.net/https%3A%2F%2Fimages.ctfassets.net%2Fp15sglj92v6o%2F5v2ZmCnMGWrlijhzQu71kp%2Fdfb7161399697588d92bc68c9fbaf4db%2Fvideo-interview-placement.jpeg?ixlib=gatsbySourceUrl-2.1.1&auto=format%2C%20compress&w=720&h=482&s=dea394097ea96104389c1528641a6fd5"
  alt="On the spot interview"
  style={{ maxWidth: "100%", height: "auto", border: "20px solid #fafad2", boxShadow: "5px 5px 5px rgba(211, 211, 211, 8.5)" }}
/>
        </div>
        <img src="https://esapet.org/wp-content/uploads/2020/01/ChatWithUs-300x300-1.png" width="150" height="150" />

        
        <div
          style={{ display: "flex", fontFamily: "Comic Sans MS", marginTop: "7%",
          }}
        ></div>
        
        <div style={{ textAlign: "center", margin: "20px" }}>
        <h1>' ON THE SPOT INTERVIEWS! '</h1></div>
        <div style={{ display: "flex", fontFamily: "Comic Sans MS" }}>
          <div style={{ flex: 1 }}>
            <iframe
              width="560"
              height="315"
              src="https://www.youtube.com/embed/5qRT8Yy8H6o?start=59"
              title="YouTube video player"
              frameborder="0"
              allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; web-share"
              allowfullscreen
              autoplay
            ></iframe>
            <p style={{ marginTop: "12%", fontSize: "30px", fontFamily: "Courier New", backgroundColor: "#fafad2", borderRadius: "100px"}}>
              "Remember, every day is a new opportunity to achieve your dreams and become the best version of yourself. 
            Stay positive, work hard, and believe in yourself, and you'll be amazed at what you can accomplish!"</p>
          </div>
          
          <div
    style={{
      flex: 1,
      marginLeft: "20px",
      borderLeft: "1px solid #ccc",
      paddingLeft: "20px",
    }}
  >
            <p style={{ backgroundColor: "#fafad2", borderRadius: "20px"  }}>
              Online interviews provide many benefits for both job seekers and
              employers. With the ability to conduct interviews remotely through
              Work Hive, the hiring process becomes more flexible, efficient and
              cost-effective.
            </p>
            <img
            src="https://cdn.vectorstock.com/i/1000x1000/55/92/smiling-confident-businessman-male-character-wear-vector-44275592.webp"
            alt="On the spot interview"
            style={{ maxWidth: "100%", height: "auto", clipPath: "inset(0px 0px 60px 0px)" }}
          />
          </div>
        </div>
      </div>
    </div>
  );
}

export default Meetup;
