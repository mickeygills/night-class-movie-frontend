import React from "react";
import { Link } from "react-router-dom";

import "./Home.css";

function Home() {
  return (
    <div className="home-container">
      <div className="home-container-div">
        <h1>Welcome to the best movie search app in the history of mankind</h1>
        <p>
          Sign up to see this <Link to="/sign-up">Sign up</Link>
        </p>
      </div>
    </div>
  );
}

export default Home;
