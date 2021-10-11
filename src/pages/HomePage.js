import React, {useEffect} from "react";
import "../css/homePage.scss";
import HeroBanner from "../assets/Images/hero-banner.jpg";
import { Link } from "react-router-dom";
import icon1 from "../assets/Images/icons/icon1.jpg";
import icon2 from "../assets/Images/icons/icon2.jpg";
import icon3 from "../assets/Images/icons/icon3.jpg";
import icon4 from "../assets/Images/icons/icon4.jpg";
import icon6 from "../assets/Images/icons/icon6.jpg";
import icon7 from "../assets/Images/icons/icon7.jpg";
import icon8 from "../assets/Images/icons/icon8.jpg";
import icon9 from "../assets/Images/icons/icon9.jpg";
import icon10 from "../assets/Images/icons/icon10.jpg";
const HomePage = ({history}) => {
  useEffect(() => {
    if(localStorage.getItem("authenticatedUser")) history.push("/jobs");
  }, [])
  return (
    <div className="homeContainer">
      <div className="heroContainer">
        <div className="hero_banner">
          <div className="heading">
            <h2 className="heading1">Welcome to</h2>
            <h2 className="heading2">
              My<span>Jobs</span>
            </h2>
            <Link to="/register">
              <button>Get Started</button>
            </Link>
          </div>
          <div className="hero_image">
            <img src={HeroBanner} alt="hero_banner" />
          </div>
        </div>
      </div>
      <div className="dataContainer">
        <div className="jobsContainer">
          <h4>Why us</h4>
          <div className="jobs">
            <div className="jobs-data">
              <h3>Get more visibility</h3>
              <p>
                Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do
                eiusmod tempor incididunt.
              </p>
            </div>
            <div className="jobs-data">
              <h3>Organize your candidates</h3>
              <p>
                Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do
                eiusmod tempor incididunt ut labore et dolore magna aliqua.
              </p>
            </div>
            <div className="jobs-data">
              <h3>Verify their abilities</h3>
              <p>
                Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do
                eiusmod tempor incididunt ut labore.
              </p>
            </div>
          </div>
        </div>
        <div className="logoContainer">
          <h4>companies who trust us</h4>
          <div className="row-logo-1">
            <img className="logo" src={icon1} alt="logo1" />
            <img className="logo" src={icon2} alt="logo2" />
            <img className="logo" src={icon3} alt="logo3" />
            <img className="logo" src={icon4} alt="logo4" />
            <img className="logo" src={icon6} alt="logo6" />
          </div>
          <div className="row-logo-2">
            <img className="logo" src={icon7} alt="logo7" />
            <img className="logo" src={icon8} alt="logo8" />
            <img className="logo" src={icon9} alt="logo9" />
            <img className="logo" src={icon10} alt="logo10" />
          </div>
        </div>
      </div>
    </div>
  );
};

export default HomePage;