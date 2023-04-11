import styles from "./footer.module.css";
import React from "react";
import Location from "../../Assets/location.png";
import Call from "../../Assets/call.png";
import Mail from "../../Assets/mail.png";
import Med from "../../Assets/med_black.png";
import { Link } from "react-router-dom";
function Footer({ doctor, landing }) {
  return (
    <>
      <div className={styles.container}>
        <div>
          <div>
            <img src={Med} alt="Med" className={styles.logo} />
            <h3>NUST Medical Centre</h3>
          </div>
          <p>
            NUST Medical Centre, present within premises of NUST, provides
            medical facilities to students of NUST and deals with medical
            emergencies
            <br />
            <br />
            <span>
              Trusted by all <span>Nustians</span>
            </span>
          </p>
        </div>
        <div>
          <h3>Address Info</h3>
          <div>
            <img src={Location} alt="Location" />
            <p>
              National University of Sciences & Technology (NUST), Ravi Rd,
              H-12, Islamabad, Islamabad Capital Territory
            </p>
          </div>
          <div>
            <img src={Call} alt="Location" />
            <p>051 2442335</p>
          </div>
          <div>
            <img src={Mail} alt="Location" />
            <p>nmc@gmail.com</p>
          </div>
        </div>

        <div>
          <h3>Quick Links</h3>

          {landing && (
            <>
              <a href="#about">About Us</a>
              <a href="#footer">Contact Us</a>
            </>
          )}
          {!doctor && (
            <>
              <Link to="/doctor">Book Appointment</Link>
              <Link to="/meds">Buy Medicines</Link>
            </>
          )}
          {doctor && (
            <>
              <Link to="/appointment">Pending Appointments</Link>
              <Link to="/history">Past Appoinments</Link>
            </>
          )}
        </div>
      </div>
    </>
  );
}

export default Footer;
