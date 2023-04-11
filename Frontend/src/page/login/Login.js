import React from "react";
import Header from "../../comps/header/Header";
import Footer from "../../comps/footer/Footer";
import styles from "./login.module.css";
import vector from "../../Assets/login_vector.jpg";
import Form from "react-bootstrap/Form";
import Button from "react-bootstrap/Button";
import { useState, useContext } from "react";
import { Link } from "react-router-dom";
import { useNavigate } from "react-router-dom";
import axios from "axios";
import { UserContext } from "../../hooks/UserContext";

function Login() {
  const [doctor, setDoctor] = useState(false);
  const [message, setMessage] = React.useState("");
  const [err, setErr] = React.useState(false);
  const id = doctor ? "employeeID" : "CMS";
  const [data, setData] = React.useState({
    [id]: "",
    password: "",
  });

  const isEmpty = data.id === "" || data.password === "";

  const { logged, setLogged, user, setUser, token, setToken } =
    useContext(UserContext);
  const navigate = useNavigate();
  function inputChanged(e) {
    const value = e.target.value;
    setData({ ...data, [e.target.name]: value });
  }
  const shiftLogin = () => {
    setDoctor((value) => !value);
    const copy = { ...data };
    delete copy[[id]];
    setData({ ...copy });
  };

  const submitForm = (e) => {
    e.preventDefault();
    axios
      .request({
        method: "POST",
        headers: { "Content-Type": "application/json" },
        url: `${process.env.REACT_APP_API_BASE_URL}/auth/login`,
        data: { ...data, userType: doctor ? "doctor" : "student" },
      })
      .then((res) => {
        setUser(res.data.data);
        setToken(res.data.AccessToken);
        setLogged(true);
        // localStorage.setItem("token",res.data.AccessToken);
        // localStorage.setItem("user",JSON.stringify(res.data.data));

        if (doctor) {
          navigate("/appointment");
        } else {
          navigate(-1);
        }

        
      })
      .catch((error) => {
        

        if (error.response.status === 400) {
          setErr(true);
          setMessage(error.response.data.message);
        } else {
          setErr(true);
          setMessage("Credentials verification failed");
        }
      });
  };

  return (
    <>
      <Header />
      <div className={styles.main}>
        <div className={styles.image}>
          <img src={vector} alt="med" />
        </div>
        <div className={styles.form}>
          <h2>Log In</h2>
          <p>
            Enter your {doctor ? "Employee ID" : "CMS ID"} and Password to Log
            In
          </p>
          <Form className={styles.formContainer}>
            <Form.Group className="mb-3" controlId={doctor ? "EmpID" : "cms"}>
              <Form.Control
                id={doctor ? "employeeID" : "CMS"}
                name={doctor ? "employeeID" : "CMS"}
                type="text"
                onChange={inputChanged}
                value={doctor ? data.employeeID : data.CMS}
                placeholder={doctor ? "Employee ID" : "CMS ID"}
                className={styles.input}
              />
            </Form.Group>
            <Form.Group className="mb-3" controlId="password">
              <Form.Control
                id="password"
                name="password"
                type="password"
                onChange={inputChanged}
                value={data.password}
                placeholder="Password"
                className={styles.input}
              />
            </Form.Group>

            {err && (
              <Form.Text id="passwordHelpBlock" className={styles.error}>
                {message}
              </Form.Text>
            )}

            <div className={styles.changeLogin}>
              <Form.Text id="LoginChange">
                <p>
                  Want to Login as {doctor ? "Student" : "Doctor"}?{" "}
                  <span onClick={shiftLogin}>Click Here</span>
                </p>
              </Form.Text>
            </div>

            <Button
              variant="custom"
              type="submit"
              onClick={submitForm}
              className={styles.button}
              disabled={isEmpty}
            >
              Log In
            </Button>
          </Form>
        </div>
      </div>
      <Footer />
    </>
  );
}

export default Login;
