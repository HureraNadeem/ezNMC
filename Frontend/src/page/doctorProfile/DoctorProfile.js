import React, { useContext } from "react";
import Header from "../../comps/header/Header";
import Footer from "../../comps/footer/Footer";
import styles from "./doctorProfile.module.css";
import vector from "../../Assets/login_vector.jpg";
import Form from "react-bootstrap/Form";
import Button from "react-bootstrap/Button";
import axios from "axios";
import { UserContext } from "../../hooks/UserContext";

function DoctorProfile() {
  const [edit, SetEdit] = React.useState(false);
  const [err, setErr] = React.useState(false);
  const [message, setMessage] = React.useState("");

  const { user, setUser, token, setLogged, setToken, setOrderData } =
    useContext(UserContext);

  const [doctor, setDoctor] = React.useState({});

  const logout = () => {
    setToken("");
    setLogged(false);
    setUser({});
    setOrderData([]);
  };

  React.useEffect(() => {
    axios
      .get(`${process.env.REACT_APP_API_BASE_URL}/doctors-info`, {
        headers: { token: token },
      })
      .then((res) => setDoctor(res.data.data))
      .catch((error) => {
        if (error.response.status === 401) {
          logout();
        } 
      });
  }, []);

  function inputChanged(e) {
    const value = e.target.value;
    setDoctor({ ...doctor, [e.target.name]: value });
  }

  function editProfile(e) {
    e.preventDefault();
    SetEdit(true);
  }

  const submitForm = (e) => {
    e.preventDefault();
    axios
      .patch(`${process.env.REACT_APP_API_BASE_URL}/doctors`, doctor, {
        headers: { token: token },
      })
      .then((res) => {
        setUser({ name: doctor?.name });
        alert("Doctor profile has been updated!");
      })
      .catch((error) => {
        
        if (error.response.status === 400) {
          setErr(true);
        }
        if (error.response.status === 401) {
          logout();
        } else {
          setErr(true);
          setMessage("Cannot connect to server");
        }
      });
  };
  return (
    <>
      <Header doctor={true} />
      <div className={styles.main}>
        <div className={styles.image}>
          <img src={vector} alt="med" />
        </div>
        <div className={styles.form}>
          <h2>Doctor Profile</h2>
          <p>Click on Edit button to enable editing</p>
          <Form className={styles.formContainer}>
            <Form.Group className={styles.field} controlId="formEmpID">
              <Form.Label className={styles.label}>Employee ID:</Form.Label>
              <Form.Control
                id="empID"
                name="empID"
                type="text"
                placeholder="Employee ID"
                className={styles.input}
                value={doctor.employeeID}
                disabled
              />
            </Form.Group>
            <Form.Group className={styles.field} controlId="formName">
              <Form.Label className={styles.label}>Name:</Form.Label>
              <Form.Control
                id="name"
                name="name"
                type="text"
                placeholder="Name"
                className={styles.input}
                onChange={inputChanged}
                value={doctor.name}
                disabled={!edit}
              />
            </Form.Group>
            <Form.Group className={styles.field} controlId="formQual">
              <Form.Label className={styles.label}>Qualification</Form.Label>
              <Form.Control
                id="qual"
                name="qual"
                type="text"
                placeholder="Qualification"
                className={styles.input}
                value={doctor.qualification}
                disabled
              />
            </Form.Group>
            <Form.Group className={styles.field} controlId="formSpeciality">
              <Form.Label className={styles.label}>Speciality</Form.Label>
              <Form.Control
                id="speciality"
                name="speciality"
                type="text"
                placeholder="Speciality"
                className={styles.input}
                value={doctor.fieldOfSpeciality}
                disabled
              />
            </Form.Group>

            <Form.Group className={styles.field} controlId="formPassword">
              <Form.Label className={styles.label}>Password:</Form.Label>
              <Form.Control
                id="pic"
                name="password"
                type="text"
                placeholder="Password"
                className={styles.input}
                onChange={inputChanged}
                value={doctor.password}
                disabled={!edit}
              />
            </Form.Group>

            {err && (
              <Form.Text id="passwordHelpBlock" className={styles.error}>
                {message}
              </Form.Text>
            )}

            <div className={styles.btnGroup}>
              <Button
                variant="custom"
                type="submit"
                className={styles.buttonEdit}
                onClick={editProfile}
              >
                Edit
              </Button>
              <Button
                variant="custom"
                type="submit"
                className={styles.buttonSave}
                onClick={submitForm}
              >
                Save Changes
              </Button>
            </div>
          </Form>
        </div>
      </div>
      <Footer doctor={true} />
    </>
  );
}

export default DoctorProfile;
