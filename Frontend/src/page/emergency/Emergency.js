import React, { useContext } from "react";
import Header from "../../comps/header/Header";
import Footer from "../../comps/footer/Footer";
import styles from "./emergency.module.css";
import vector from "../../Assets/login_vector.jpg";
import Form from "react-bootstrap/Form";
import Button from "react-bootstrap/Button";
import axios from "axios";
import { useParams } from "react-router-dom";
import { UserContext } from "../../hooks/UserContext";
import { useNavigate } from "react-router-dom";

function Emergency() {
  const { token } = useContext(UserContext);
  const navigate = useNavigate();
  const id = useParams()["id"];
  const { logged, setLogged, setUser, setToken, setOrderData } =
    useContext(UserContext);
  const [err, setErr] = React.useState(false);

  const [request, setRequest] = React.useState({
    note: "",
    address: "",
  });

  const logout = () => {
    setToken("");
    setLogged(false);
    setUser({});
    setOrderData([]);
  };

  function inputChanged(e) {
    const value = e.target.value;
    setRequest({ ...request, [e.target.name]: value });
  }

  const sendEmergency = (e) => {
    e.preventDefault();
    if (logged) {
      axios
        .post(
          `${process.env.REACT_APP_API_BASE_URL}/emergency-appointments`,
          request,
          {
            headers: { token: token },
          }
        )
        .then((res) => {
          alert("Request has been made!");
          navigate("/");
        })
        .catch((error) => {
          if (error.response.status === 401) {
            logout();
          } else {
            setErr(true);
          }
        });
    }
  };

  return (
    <>
      <Header />
      <div className={styles.main}>
        <div className={styles.image}>
          <img src={vector} alt="med" />
        </div>
        <div className={styles.form}>
          {err ? (
            <div>No Item Found</div>
          ) : (
            <>
              <h2>Emergency</h2>
              <p>Fill the details in case of emergency </p>
              <Form className={styles.formContainer}>
                <Form.Group className="mb-3" controlId="formAddress">
                  <Form.Label className={styles.label}>Address:</Form.Label>
                  <Form.Control
                    id="address"
                    name="address"
                    type="text"
                    placeholder="Address"
                    value={request.address}
                    className={styles.input}
                    onChange={inputChanged}
                  />
                </Form.Group>

                <Form.Group className="mb-3" controlId="note">
                  <Form.Label className={styles.label}>Note:</Form.Label>
                  <Form.Control
                    as="textarea"
                    id="note"
                    name="note"
                    placeholder="Note"
                    value={request.note}
                    onChange={inputChanged}
                    className={styles.input}
                  />
                </Form.Group>

                <Button
                  variant="custom"
                  type="submit"
                  className={styles.buttonSave}
                  onClick={sendEmergency}
                >
                  Submit Request
                </Button>
              </Form>
            </>
          )}
        </div>
      </div>
      <Footer />
    </>
  );
}

export default Emergency;
