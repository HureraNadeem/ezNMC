import React from "react";
import Header from "../../comps/header/Header";
import Footer from "../../comps/footer/Footer";
import styles from "./signup.module.css";
import vector from "../../Assets/login_vector.jpg";
import Form from "react-bootstrap/Form";
import Button from "react-bootstrap/Button";
import { useNavigate } from "react-router-dom";
import axios from "axios";

function SignUp() {
  const [message, setMessage] = React.useState("");
  const [err, setErr] = React.useState(false);

  const [errorBools, setErrorBools] = React.useState({
    CMS: false,
    name: false,
    cnic: false,
    phone: false,
    email: false,
    password: false,
  });

  const [data, setData] = React.useState({
    cnic: "",
    CMS: "",
    name: "",
    phone: "",
    email: "",
    password: "",
  });
  const navigate = useNavigate();
  const isEmpty =
    data.cnic === "" ||
    data.CMS === "" ||
    data.name === "" ||
    data.phone === "" ||
    data.email === "" ||
    data.password === "";
  const submitForm = (e) => {
    e.preventDefault();
    axios
      .request({
        method: "POST",
        headers: { "Content-Type": "application/json" },
        url: `${process.env.REACT_APP_API_BASE_URL}/auth/signup`,
        data: data,
      })
      .then((res) => {
        navigate("/login");
      })
      .catch((error) => {
        if (error.response.status === 400) {
          setErr(true);
          setMessage(error.response.data.message);
        } else {
          setErr(true);
          setMessage("Cannot connect to server");
        }
      });
  };
  function inputChanged(e) {
    const value = e.target.value;
    const fieldName = e.target.name;
    if (fieldName === "cnic") {
      if (value.length !== 13) {
        setErrorBools({
          ...errorBools,
          cnic: true,
        });
      } else if (value.length === 13) {
        setErrorBools({
          ...errorBools,
          cnic: false,
        });
      }
    }
    if (fieldName === "email") {
      if (!/\S+@\S+\.\S+/.test(value)) {
        setErrorBools({
          ...errorBools,
          email: true,
        });
      } else {
        setErrorBools({
          ...errorBools,
          email: false,
        });
      }
    }
    if (fieldName === "CMS") {
      if (value.length !== 6) {
        setErrorBools({
          ...errorBools,
          CMS: true,
        });
      } else if (value.length === 6) {
        setErrorBools({
          ...errorBools,
          CMS: false,
        });
      }
    }
    if (fieldName === "phone") {
      if (value.length !== 13 || !value.startsWith("+92")) {
        setErrorBools({
          ...errorBools,
          phone: true,
        });
      } else if (value.length === 13 && value.startsWith("+92")) {
        setErrorBools({
          ...errorBools,
          phone: false,
        });
      }
    }
    if (fieldName === "password") {
      if (value.length < 8) {
        setErrorBools({
          ...errorBools,
          password: true,
        });
      } else if (value.length >= 8) {
        setErrorBools({
          ...errorBools,
          password: false,
        });
      }
    }
    setData({ ...data, [e.target.name]: value });
  }
  return (
    <>
      <Header />
      <div className={styles.main}>
        <div className={styles.image}>
          <img src={vector} alt="med" />
        </div>
        <div className={styles.form}>
          <h2>Sign Up</h2>
          <p>Fill the required fileds below to register as a user in NMC</p>
          <Form className={styles.formContainer}>
            <Form.Group className="mb-3" controlId="formCMS">
              <Form.Control
                id="CMS"
                name="CMS"
                type="text"
                value={data.CMS}
                onChange={inputChanged}
                placeholder="CMS ID"
                className={styles.input}
              />
              <p className={styles.errorMessage}>
                {errorBools.CMS && "The CMS must be 6 characters long!"}
              </p>
            </Form.Group>
            <Form.Group className="mb-3" controlId="formCNIC">
              <Form.Control
                id="cnic"
                name="cnic"
                type="text"
                value={data.cnic}
                onChange={inputChanged}
                placeholder="CNIC"
                className={styles.input}
              />
              <p className={styles.errorMessage}>
                {errorBools.cnic && "The CNIC must be 13 characters long!"}
              </p>
            </Form.Group>
            <Form.Group className="mb-3" controlId="formName">
              <Form.Control
                id="name"
                name="name"
                type="text"
                value={data.name}
                onChange={inputChanged}
                placeholder="Name"
                className={styles.input}
              />
            </Form.Group>
            <Form.Group className="mb-3" controlId="formPhone">
              <Form.Control
                id="phone"
                name="phone"
                type="text"
                value={data.phone}
                onChange={inputChanged}
                placeholder="Phone number"
                className={styles.input}
              />
              <p className={styles.errorMessage}>
                {errorBools.phone &&
                  "The Phone must be 13 characters long and start with +92!"}
              </p>
            </Form.Group>
            <Form.Group className="mb-3" controlId="formEmail">
              <Form.Control
                id="email"
                name="email"
                type="email"
                value={data.email}
                onChange={inputChanged}
                placeholder="Email"
                className={styles.input}
              />
              <p className={styles.errorMessage}>
                {errorBools.email && "The email is not valid!"}
              </p>
            </Form.Group>
            <Form.Group className="mb-3" controlId="formPassword">
              <Form.Control
                id="password"
                name="password"
                type="password"
                value={data.password}
                onChange={inputChanged}
                placeholder="Password"
                className={styles.input}
              />
              <p className={styles.errorMessage}>
                {errorBools.password &&
                  "The password should be atleast 8 digits long!"}
              </p>
            </Form.Group>
            {err && (
              <Form.Text id="passwordHelpBlock" className={styles.error}>
                {message}
              </Form.Text>
            )}

            {/* <Link to="/login"> */}
            <Button
              variant="custom"
              type="submit"
              onClick={submitForm}
              className={styles.button}
              disabled={
                isEmpty ||
                errorBools.CMS ||
                errorBools.cnic ||
                errorBools.email ||
                errorBools.name ||
                errorBools.password ||
                errorBools.phone
              }
            >
              Sign Up
            </Button>
            {/* </Link> */}
          </Form>
        </div>
      </div>
      <Footer />
    </>
  );
}

export default SignUp;
