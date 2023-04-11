import React, { useContext } from "react";
import Header from "../../comps/header/Header";
import Footer from "../../comps/footer/Footer";
import styles from "./appointmentForm.module.css";
import vector from "../../Assets/login_vector.jpg";
import Form from "react-bootstrap/Form";
import Button from "react-bootstrap/Button";
import axios from "axios";
import { useParams } from "react-router-dom";
import { UserContext } from "../../hooks/UserContext";
import { useNavigate } from "react-router-dom";

function AppointmentForm() {
  const { token } = useContext(UserContext);
  const navigate = useNavigate();

  const id = useParams()["id"];
  const { logged, setToken, setUser, setLogged, setOrderData } =
    useContext(UserContext);
  const [data, setData] = React.useState([]);
  const [err, setErr] = React.useState(false);

  const [request, setRequest] = React.useState({
    doctorId: id,
    timing: "Morning: 9AM to 1PM",
    description: "",
  });
  const isEmpty = request?.description === "";

  React.useEffect(() => {
    axios
      .get(`${process.env.REACT_APP_API_BASE_URL}/doctors/${id}`, {
        headers: { token: token },
      })
      .then((res) => setData(res.data.data))
      .catch((error) => {
        setErr(true);
      });
  }, []);

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

  const createAppointment = (e) => {
    e.preventDefault();
    if (logged) {
      axios
        .post(`${process.env.REACT_APP_API_BASE_URL}/appointments`, request, {
          headers: { token: token },
        })
        .then((res) => {
          alert("Appointment has been booked");
          navigate("/doctor");
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
              <h2>Book Appointment</h2>
              <p>Provide details to book your appointment with our doctors</p>
              <Form className={styles.formContainer}>
                <Form.Group className="mb-3" controlId="formCMS">
                  <Form.Label className={styles.label}>Doctor Name:</Form.Label>
                  <Form.Control
                    id="name"
                    name="name"
                    type="text"
                    placeholder="Doctor Name"
                    value={data.name}
                    className={styles.input}
                    disabled
                  />
                </Form.Group>
                <Form.Group className="mb-3" controlId="formTimimgs">
                  <Form.Label className={styles.label}>Timings:</Form.Label>

                  <Form.Select
                    aria-label="Default select example"
                    id="timing"
                    name="timing"
                    value={request.timing}
                    onChange={inputChanged}
                    className={styles.input}
                  >
                    {data.timings &&
                      data.timings.map((item, index) => (
                        <option key={index} value={item}>
                          {item}
                        </option>
                      ))}
                  </Form.Select>
                </Form.Group>

                <Form.Group className="mb-3" controlId="description">
                  <Form.Label className={styles.label}>Description:</Form.Label>
                  <Form.Control
                    as="textarea"
                    id="description"
                    name="description"
                    placeholder="Description"
                    value={request.description}
                    onChange={inputChanged}
                    className={styles.input}
                  />
                </Form.Group>

                <Button
                  variant="custom"
                  type="submit"
                  className={styles.buttonSave}
                  onClick={createAppointment}
                  disabled={isEmpty}
                >
                  Book Appointment
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

export default AppointmentForm;
