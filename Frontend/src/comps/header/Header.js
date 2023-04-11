import styles from "./Header.module.css";
import React, { useContext } from "react";
import Container from "react-bootstrap/Container";
import Nav from "react-bootstrap/Nav";
import Navbar from "react-bootstrap/Navbar";
import Logo from "../../Assets/med.png";
import Store from "../../Assets/store.png";
import userPic from "../../Assets/doctor.png";
import cart from "../../Assets/cart.png";
import Button from "react-bootstrap/Button";
import NavDropdown from "react-bootstrap/NavDropdown";
import { Link } from "react-router-dom";
import { UserContext } from "../../hooks/UserContext";

function Header({ doctor, landing }) {
  const { logged, setLogged, user, setUser, token, setToken } =
    useContext(UserContext);

  const clearStorage = () => {
    // localStorage.removeItem("token");
    // localStorage.removeItem("user");
    setLogged(false);
    setToken("");
    setUser({});
  };

  return (
    <div className={styles.header}>
      <Navbar
        collapseOnSelect
        expand="lg"
        className={styles.nav}
        variant="dark"
        fixed="top"
      >
        <Container>
          <Link to={!doctor ? "/" : ""} className={styles.brand}>
            <Navbar.Brand href="#home" className={styles.brand}>
              <img
                alt="Logo"
                src={Logo}
                width="30"
                height="30"
                className="d-inline-block align-top"
              />{" "}
              NUST Medical Centre
            </Navbar.Brand>
          </Link>
          <Navbar.Toggle
            aria-controls="responsive-navbar-nav"
            className={styles.toggle}
          />
          <Navbar.Collapse id="responsive-navbar-nav">
            <Nav className="me-auto"></Nav>
            <Nav className={styles.links}>
              {!doctor && (
                <Link to="/" className={styles.items}>
                  Home
                </Link>
              )}
              {!logged && (
                <>
                  <Link to="/login" className={styles.items}>
                    Login
                  </Link>
                  <Link to="/signup" className={styles.items}>
                    Sign Up
                  </Link>
                </>
              )}
              {landing && (
                <>
                  <a href="#about" className={styles.items}>
                    About Us
                  </a>
                  <a className={styles.items} href="#footer">
                    Contact Us
                  </a>
                </>
              )}
              {!doctor && (
                <>
                  <Link to="/meds" className={styles.items}>
                    Store
                  </Link>

                  <Link to="/doctor" className={styles.items}>
                    Appointment
                  </Link>
                  <Link to="/emergency" className={styles.items}>
                    Emergency
                  </Link>
                </>
              )}
              {logged && (
                <NavDropdown
                  className={styles.items}
                  title={
                    <>
                      <span className={styles.profileText}>{user.name}</span>
                      <img
                        src={userPic}
                        alt="profile"
                        className={styles.profile}
                      />
                    </>
                  }
                  id="basic-nav-dropdown"
                >
                  <div className={styles.dropdown}>
                    <Link to={doctor ? "/doctorProfile" : "/studentProfile"}>
                      Profile
                    </Link>
                    <NavDropdown.Divider />
                    {doctor && (
                      <>
                        <Link to="/history">Past Appointments</Link>
                        <NavDropdown.Divider />
                      </>
                    )}
                    {!doctor && (
                      <>
                        <Link to="/cart">
                          Cart
                          <img
                            src={Store}
                            alt="cart"
                            className={styles.store}
                          />
                        </Link>
                        <NavDropdown.Divider />
                      </>
                    )}

                    <Link to="/" onClick={clearStorage}>
                      Logout
                    </Link>
                  </div>
                </NavDropdown>
              )}
            </Nav>
          </Navbar.Collapse>
        </Container>
      </Navbar>
    </div>
  );
}

export default Header;
