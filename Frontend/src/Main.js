import React, { useContext } from "react";
import Header from "./comps/header/Header";
import "./Main.css";
import MainImg from "./Assets/med_img.jpg";
import ServiceImg from "./Assets/services.png";
import ServiceLogo from "./Assets/med.png";
import Button from "react-bootstrap/Button";
import Carousels from "./comps/carousel/Carousel";
import Footer from "./comps/footer/Footer";
import { Link } from "react-router-dom";
import { UserContext } from "./hooks/UserContext";

function Main() {
  const { logged } = useContext(UserContext);

  return (
    <>
      <Header landing={true} />

      <div className="main_container">
        <div className="info">
          <h3>
            Quality Treatment for <span>Nustians</span>
          </h3>
          <p>
            NUST Medical Centre, present within premises of NUST, provides
            medical facilities to students of NUST and deals with medical
            emergencies to routine doctor appointments and medicine delivery
          </p>
          <div className="buttons">
            <Link to={logged ? "/doctor" : "/login"}>
              <Button className="green" variant="custom">
                {logged ? "View Doctors" : "Log In"}
              </Button>
            </Link>
            <Link to={logged ? "/meds" : "/signup"}>
              <Button className="pink" variant="custom">
                {logged ? "Buy Medicine" : "Sign Up"}
              </Button>
            </Link>
          </div>
        </div>
        <div className="image">
          <img src={MainImg} alt="Med" />
        </div>
      </div>

      <div className="about" id="about">
        <div className="nmc_image">
          <Carousels className="carousel" />
        </div>
        <div className="about_text">
          <h3 className="about_heading">About Us</h3>
          <p>
            NUST Medical Centre, present within premises of NUST, provides
            medical facilities to students of NUST and deals with medical
            emergencies to routine doctor appointments and medicine delivery.
            NUST Medical Centre, present within premises of NUST, provides
            medical facilities to students of NUST and deals with medical
            emergencies to routine doctor appointments and medicine delivery
            NUST Medical Centre.
          </p>
        </div>
      </div>

      <h3 className="services_heading">Services</h3>
      <div className="services">
        <div className="service_left">
          <div>
            <div>
              <img src={ServiceLogo} alt="Med" />
              <h5>Emergency</h5>
            </div>
            NUST Medical Centre provides emergency services to students within premises of NUST. Students can send their request with addresses and ambulance will be sent.
          </div>
          <div>
            <div>
              <img src={ServiceLogo} alt="Med" />
              <h5>Online Appointment</h5>
            </div>
            NUST Medical Centre, present within premises of NUST, provides facility to book online appointments with doctors of specific specialities
          </div>
        </div>
        <div className="service_img">
          <img src={ServiceImg} alt="Med" />
        </div>
        <div className="service_right">
          <div>
            <div>
              <img src={ServiceLogo} alt="Med" />
              <h5>Deliver Medcines</h5>
            </div>
            NUST Medical Centre, present within premises of NUST, provides facility of medicine delivery within NUST premises. Students can use web application to get the medicines
          </div>
          <div>
            <div>
              <img src={ServiceLogo} alt="Med" />
              <h5>Online Portal</h5>
            </div>
            NUST Medical Centre, present within premises of NUST, provides an online portal for doctors at NMC to monitor incoming appointments of patients
          </div>
        </div>
      </div>

      <div className="appointment">
        <h4>BOOK AN APPOINTMENT WITH DOCTORS AVAILABLE</h4>
        <p>Click button below to book appointment</p>
        <Link to="/doctor">
          <Button variant="outline-light" className="button">
            Book Appointment
          </Button>
        </Link>
      </div>
      <div id="footer">
        <Footer landing={true} />
      </div>
    </>
  );
}

export default Main;
